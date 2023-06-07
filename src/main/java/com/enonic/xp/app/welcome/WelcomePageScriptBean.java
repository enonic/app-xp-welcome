package com.enonic.xp.app.welcome;

import java.io.IOException;
import java.io.InputStream;
import java.io.UncheckedIOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.function.Supplier;
import java.util.stream.Collectors;

import com.enonic.xp.admin.tool.AdminToolDescriptor;
import com.enonic.xp.admin.tool.AdminToolDescriptorService;
import com.enonic.xp.admin.tool.AdminToolDescriptors;
import com.enonic.xp.app.Application;
import com.enonic.xp.app.ApplicationDescriptor;
import com.enonic.xp.app.ApplicationDescriptorService;
import com.enonic.xp.app.ApplicationKey;
import com.enonic.xp.app.ApplicationService;
import com.enonic.xp.app.welcome.json.ProjectJson;
import com.enonic.xp.app.welcome.json.SiteJson;
import com.enonic.xp.app.welcome.json.ApplicationJson;
import com.enonic.xp.app.welcome.mapper.ProjectsMapper;
import com.enonic.xp.app.welcome.mapper.SitesMapper;
import com.enonic.xp.app.welcome.mapper.ApplicationsMapper;
import com.enonic.xp.attachment.Attachment;
import com.enonic.xp.branch.Branch;
import com.enonic.xp.content.Content;
import com.enonic.xp.content.ContentConstants;
import com.enonic.xp.content.ContentId;
import com.enonic.xp.content.ContentQuery;
import com.enonic.xp.content.ContentService;
import com.enonic.xp.content.FindContentIdsByQueryResult;
import com.enonic.xp.content.GetContentByIdsParams;
import com.enonic.xp.context.Context;
import com.enonic.xp.context.ContextBuilder;
import com.enonic.xp.icon.Icon;
import com.enonic.xp.project.Project;
import com.enonic.xp.project.ProjectConstants;
import com.enonic.xp.project.ProjectName;
import com.enonic.xp.project.ProjectService;
import com.enonic.xp.repository.RepositoryId;
import com.enonic.xp.resource.Resource;
import com.enonic.xp.resource.ResourceKey;
import com.enonic.xp.resource.ResourceService;
import com.enonic.xp.schema.content.ContentTypeName;
import com.enonic.xp.script.bean.BeanContext;
import com.enonic.xp.script.bean.ScriptBean;
import com.enonic.xp.security.PrincipalKey;
import com.enonic.xp.security.RoleKeys;
import com.enonic.xp.security.User;
import com.enonic.xp.security.auth.AuthenticationInfo;
import com.enonic.xp.web.servlet.ServletRequestHolder;
import com.enonic.xp.web.servlet.ServletRequestUrlHelper;
import com.google.common.io.ByteSource;
import com.google.common.net.MediaType;

public class WelcomePageScriptBean
    implements ScriptBean
{
    private Supplier<ApplicationService> applicationServiceSupplier;

    private Supplier<ResourceService> resourceServiceSupplier;

    private Supplier<JettyConfigService> jettyConfigServiceSupplier;

    private Supplier<ContentService> contentServiceSupplier;

    private Supplier<ProjectService> projectServiceSupplier;

    private Supplier<ApplicationDescriptorService> applicationDescriptorServiceSupplier;

    private Supplier<AdminToolDescriptorService> adminToolDescriptorServiceSupplier;

    @Override
    public void initialize( final BeanContext beanContext )
    {
        this.applicationServiceSupplier = beanContext.getService( ApplicationService.class );
        this.resourceServiceSupplier = beanContext.getService( ResourceService.class );
        this.jettyConfigServiceSupplier = beanContext.getService( JettyConfigService.class );
        this.contentServiceSupplier = beanContext.getService( ContentService.class );
        this.projectServiceSupplier = beanContext.getService( ProjectService.class );
        this.applicationDescriptorServiceSupplier = beanContext.getService( ApplicationDescriptorService.class );
        this.adminToolDescriptorServiceSupplier = beanContext.getService( AdminToolDescriptorService.class );
    }

    public String getContentStudioUrl()
    {
        for ( Application application : applicationServiceSupplier.get().getInstalledApplications() )
        {
            if ( application.getKey().equals( ApplicationKey.from( "com.enonic.app.contentstudio" ) ) )
            {
                return ServletRequestUrlHelper.createUri( ServletRequestHolder.getRequest(), "/admin/tool/" + application.getKey() + "/main" );
            }
        }
        return null;
    }

    public Object getApplications()
    {
        List<ApplicationJson> applications = new ArrayList<>();
        for ( Application application : applicationServiceSupplier.get().getInstalledApplications() )
        {
            ApplicationKey applicationKey = application.getKey();
            ApplicationJson.Builder builder = ApplicationJson.create().
                application( application ).
                description( getApplicationDescription( applicationKey ) ).
                iconAsBase64( getApplicationIconAsBase64( applicationKey ) );

            Resource resource = resourceServiceSupplier.get().getResource( ResourceKey.from( applicationKey, "/webapp/webapp.js" ) );
            if ( resource.exists() )
            {
                String webappUrl =
                    ServletRequestUrlHelper.createUri( ServletRequestHolder.getRequest(), "/webapp/" + application.getKey() );
                builder.webappUrl( webappUrl );
            }

            List<String> adminToolsUris = getApplicationAdminToolsUris( applicationKey );
            adminToolsUris.forEach( uri -> builder.addAdminToolsUrl( uri ) );

            applications.add( builder.build() );
        }
        return new ApplicationsMapper( applications );
    }

    public Object getSites()
    {
        ContentService contentService = contentServiceSupplier.get();

        ContentQuery contentQuery = ContentQuery.create().addContentTypeName( ContentTypeName.site() ).size( -1 ).build();

        List<SiteJson> siteJsons = new ArrayList<>();

        getProjectIds().forEach( repositoryId -> {
            Map<ContentId, Content> draftSitesAsMap = createAdminContext( repositoryId, ContentConstants.BRANCH_DRAFT ).callWith( () -> {
                FindContentIdsByQueryResult queryResult = contentService.find( contentQuery );
                return contentService.getByIds( new GetContentByIdsParams( queryResult.getContentIds() ) );
            } ).stream().collect( Collectors.toMap( Content::getId, Function.identity() ) );

            Map<ContentId, Content> masterSitesAsMap = createAdminContext( repositoryId, ContentConstants.BRANCH_MASTER ).callWith( () -> {
                FindContentIdsByQueryResult queryResult = contentService.find( contentQuery );
                return contentService.getByIds( new GetContentByIdsParams( queryResult.getContentIds() ) );
            } ).stream().collect( Collectors.toMap( Content::getId, Function.identity() ) );

            draftSitesAsMap.keySet().forEach( siteId -> {
                Content site = draftSitesAsMap.get( siteId );
                final SiteJson.Builder builder = SiteJson.create().
                    id( siteId.toString() ).
                    name( site.getName().toString() ).
                    displayName( site.getDisplayName() ).
                    projectName( repositoryId.toString().replaceFirst( ProjectConstants.PROJECT_REPO_ID_PREFIX, "" ) ).
                    repositoryName( repositoryId.toString() ).
                    path( site.getPath().toString() ).
                    hasDraft( draftSitesAsMap.containsKey( siteId ) ).
                    hasMaster( masterSitesAsMap.containsKey( siteId ) );
                if ( site.getLanguage() != null )
                {
                    builder.language( site.getLanguage().getLanguage() );
                }
                siteJsons.add( builder.build() );
            } );
        } );

        return new SitesMapper( siteJsons );
    }

    public Object getProjects()
    {
        List<ProjectJson> projects = new ArrayList<>();
        projects.addAll( createAdminContext( ContentConstants.CONTENT_REPO_ID ).
            callWith( () -> projectServiceSupplier.get().list() ).
            stream().
            filter( project -> !project.getName().getRepoId().equals( ContentConstants.CONTENT_REPO_ID ) ).
            sorted( Comparator.comparing( project -> project.getName().getRepoId().toString() ) ).
            map( project -> ProjectJson.create().
                project( project ).
                iconAsBase64( getProjectIconAsBase64( project ) ).
                build() ).
            collect( Collectors.toList() ) );

        return new ProjectsMapper( projects );
    }

    public String getXpUrl()
    {
        return createUrl( jettyConfigServiceSupplier.get().getHttpXpPort() );
    }

    public String getManagementApiUrl()
    {
        return createUrl( jettyConfigServiceSupplier.get().getHttpManagementPort() );
    }

    public String getStatisticsApiUrl()
    {
        return createUrl( jettyConfigServiceSupplier.get().getHttpMonitorPort() );
    }

    private List<RepositoryId> getProjectIds()
    {
        List<RepositoryId> repositoryIds = new ArrayList<>();
        repositoryIds.add( ContentConstants.CONTENT_REPO_ID );
        repositoryIds.addAll( createAdminContext( ContentConstants.CONTENT_REPO_ID, ContentConstants.BRANCH_MASTER ).
            callWith( () -> projectServiceSupplier.get().list() ).
            stream().
            map( Project::getName ).
            map( ProjectName::getRepoId ).
            filter( repoId -> !repoId.equals( ContentConstants.CONTENT_REPO_ID ) ).
            sorted( Comparator.comparing( RepositoryId::toString ) ).
            collect( Collectors.toList() ) );
        return repositoryIds;
    }

    private List<String> getApplicationAdminToolsUris( final ApplicationKey applicationKey )
    {
        AdminToolDescriptorService service = this.adminToolDescriptorServiceSupplier.get();
        AdminToolDescriptors descriptors = service.getByApplication( applicationKey );

        return descriptors.getList().
            stream().
            map( descriptor -> service.generateAdminToolUri( applicationKey.toString(), descriptor.getName() ) ).
            collect( Collectors.toList() );
    }

    private String getApplicationDescription( final ApplicationKey applicationKey )
    {
        ApplicationDescriptor applicationDescriptor = applicationDescriptorServiceSupplier.get().get( applicationKey );
        return applicationDescriptor != null ? applicationDescriptor.getDescription() : null;
    }

    private String getApplicationIconAsBase64( final ApplicationKey applicationKey )
    {
        ApplicationDescriptor applicationDescriptor = applicationDescriptorServiceSupplier.get().get( applicationKey );
        Icon icon = applicationDescriptor != null ? applicationDescriptor.getIcon() : null;
        byte[] iconBytes = icon != null ? icon.toByteArray() : getDefaultIcon( "application.svg" );
        String mimeType = icon != null ? icon.getMimeType() : MediaType.SVG_UTF_8.toString();
        return "data:" + mimeType + ";base64, " + Base64.getEncoder().encodeToString( iconBytes );
    }

    private String getProjectIconAsBase64( final Project project )
    {
        final Attachment iconAttachment = project.getIcon();
        final ByteSource icon = createAdminContext().callWith( () -> projectServiceSupplier.get().getIcon( project.getName() ) );
        final String defaultIconName = project.getParent() == null ? "project.svg" : "layer.svg";
        byte[] iconBytes = icon != null ? getIconFromByteSource( icon ) : getDefaultIcon( defaultIconName );
        String mimeType = icon != null ? iconAttachment.getMimeType() : MediaType.SVG_UTF_8.toString();
        return "data:" + mimeType + ";base64, " + Base64.getEncoder().encodeToString( iconBytes );
    }

    private byte[] getIconFromByteSource( final ByteSource icon )
    {
        try
        {
            return icon.read();
        }
        catch ( IOException e )
        {
            throw new UncheckedIOException( "Failed to load icon from ByteSource", e );
        }
    }

    private byte[] getDefaultIcon( final String name )
    {
        try ( InputStream in = getClass().getResourceAsStream( name ) )
        {
            return in.readAllBytes();
        }
        catch ( IOException e )
        {
            throw new UncheckedIOException( "Failed to load default image: " + name, e );
        }
    }

    private Context createAdminContext()
    {
        return ContextBuilder.create().authInfo( this.createAdminAuthInfo() ).build();
    }

    private Context createAdminContext( final RepositoryId repositoryId )
    {
        return ContextBuilder.create().repositoryId( repositoryId ).authInfo( this.createAdminAuthInfo() ).build();
    }

    private Context createAdminContext( final RepositoryId repositoryId, final Branch branch )
    {
        return ContextBuilder.create().
            branch( branch ).
            repositoryId( repositoryId ).
            authInfo( this.createAdminAuthInfo() ).
            build();
    }

    private AuthenticationInfo createAdminAuthInfo()
    {
        return AuthenticationInfo.create().
        principals( RoleKeys.ADMIN ).
        user( User.create().
            key( PrincipalKey.ofSuperUser() ).
            login( PrincipalKey.ofSuperUser().getId() ).
            build() ).
        build();
    }

    private String createUrl( final int port )
    {
        return "http://" + getHost() + ":" + port;
    }

    private String getHost()
    {
        final String host = jettyConfigServiceSupplier.get().getHost();
        return host == null || "".equals( host ) || "0.0.0.0".equals( host ) ? "localhost" : host;
    }
}
