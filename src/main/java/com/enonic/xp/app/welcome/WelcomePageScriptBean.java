package com.enonic.xp.app.welcome;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UncheckedIOException;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import java.util.function.Supplier;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.io.ByteSource;
import com.google.common.net.MediaType;

import com.enonic.xp.admin.tool.AdminToolDescriptorService;
import com.enonic.xp.admin.tool.AdminToolDescriptors;
import com.enonic.xp.app.Application;
import com.enonic.xp.app.ApplicationDescriptor;
import com.enonic.xp.app.ApplicationDescriptorService;
import com.enonic.xp.app.ApplicationKey;
import com.enonic.xp.app.ApplicationService;
import com.enonic.xp.app.welcome.json.ApplicationInstallResultJson;
import com.enonic.xp.app.welcome.json.ApplicationJson;
import com.enonic.xp.app.welcome.json.ConfigFileJson;
import com.enonic.xp.app.welcome.json.ProjectJson;
import com.enonic.xp.app.welcome.json.SiteJson;
import com.enonic.xp.app.welcome.json.TemplateApplicationJson;
import com.enonic.xp.app.welcome.mapper.ApplicationInstallResultMapper;
import com.enonic.xp.app.welcome.mapper.ApplicationMapper;
import com.enonic.xp.app.welcome.mapper.ApplicationsMapper;
import com.enonic.xp.app.welcome.mapper.ConfigFilesMapper;
import com.enonic.xp.app.welcome.mapper.ProjectsMapper;
import com.enonic.xp.app.welcome.mapper.SitesMapper;
import com.enonic.xp.app.welcome.mapper.TemplateApplicationsMapper;
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
import com.enonic.xp.context.ContextAccessor;
import com.enonic.xp.context.ContextBuilder;
import com.enonic.xp.data.PropertyTree;
import com.enonic.xp.home.HomeDir;
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
import com.enonic.xp.security.IdProvider;
import com.enonic.xp.security.IdProviderKey;
import com.enonic.xp.security.PrincipalKey;
import com.enonic.xp.security.RoleKeys;
import com.enonic.xp.security.SecurityService;
import com.enonic.xp.security.User;
import com.enonic.xp.security.auth.AuthenticationInfo;
import com.enonic.xp.util.HexEncoder;
import com.enonic.xp.web.servlet.ServletRequestHolder;
import com.enonic.xp.web.servlet.ServletRequestUrlHelper;

public class WelcomePageScriptBean
    implements ScriptBean
{
    private static final Logger LOG = LoggerFactory.getLogger( WelcomePageScriptBean.class );

    private static final Set<String> ALLOWED_PROTOCOLS = Set.of( "http", "https" );

    private static final Set<String> ALLOWED_CONFIG_EXTENSIONS = Set.of( ".cfg", ".properties", ".xml" );

    public static final String FILE_NAME = "enonic-xp.template";

    public static final User SUPER_USER =
        User.create().key( PrincipalKey.ofSuperUser() ).login( PrincipalKey.ofSuperUser().getId() ).build();

    private Supplier<ApplicationService> applicationServiceSupplier;

    private Supplier<ResourceService> resourceServiceSupplier;

    private Supplier<JettyConfigService> jettyConfigServiceSupplier;

    private Supplier<ContentService> contentServiceSupplier;

    private Supplier<ProjectService> projectServiceSupplier;

    private Supplier<SecurityService> securityServiceSupplier;

    private Supplier<ApplicationDescriptorService> applicationDescriptorServiceSupplier;

    private Supplier<AdminToolDescriptorService> adminToolDescriptorServiceSupplier;

    private ObjectMapper objectMapper;

    @Override
    public void initialize( final BeanContext beanContext )
    {
        this.objectMapper = new ObjectMapper();

        this.applicationServiceSupplier = beanContext.getService( ApplicationService.class );
        this.resourceServiceSupplier = beanContext.getService( ResourceService.class );
        this.jettyConfigServiceSupplier = beanContext.getService( JettyConfigService.class );
        this.contentServiceSupplier = beanContext.getService( ContentService.class );
        this.projectServiceSupplier = beanContext.getService( ProjectService.class );
        this.securityServiceSupplier = beanContext.getService( SecurityService.class );
        this.applicationDescriptorServiceSupplier = beanContext.getService( ApplicationDescriptorService.class );
        this.adminToolDescriptorServiceSupplier = beanContext.getService( AdminToolDescriptorService.class );
    }

    public String getContentStudioUrl()
    {
        for ( Application application : applicationServiceSupplier.get().getInstalledApplications() )
        {
            if ( application.getKey().equals( ApplicationKey.from( "com.enonic.app.contentstudio" ) ) )
            {
                return ServletRequestUrlHelper.createUri( ServletRequestHolder.getRequest(),
                                                          "/admin/tool/" + application.getKey() + "/main" );
            }
        }
        return null;
    }

    public Boolean canLoginAsSu()
    {
        final IdProvider idProvider = createAdminContext().callWith( () -> {
            return securityServiceSupplier.get().getIdProvider( IdProviderKey.from( "system" ) );
        } );

        if ( idProvider == null )
        {
            return false;
        }

        final PropertyTree config = idProvider.getIdProviderConfig().getConfig();
        final Boolean adminUserCreationEnabled = config.getBoolean( "adminUserCreationEnabled" );

        return adminUserCreationEnabled != null && adminUserCreationEnabled == true;
    }

    public Object getApplications()
    {
        List<ApplicationJson> applications = new ArrayList<>();
        for ( Application application : applicationServiceSupplier.get().getInstalledApplications() )
        {
            if ( application.isSystem() )
            {
                continue;
            }

            applications.add( toApplicationJson( application ) );
        }
        applications.sort( Comparator.comparing( ApplicationJson::getDisplayName ) );

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
                boolean hasMaster = masterSitesAsMap.containsKey( siteId );
                siteJsons.add( toSiteJson( site, repositoryId, hasMaster ) );
            } );
        } );

        return new SitesMapper( siteJsons );
    }

    private static SiteJson toSiteJson( final Content site, final RepositoryId repositoryId, final boolean hasMaster )
    {
        final ContentId siteId = site.getId();
        final SiteJson.Builder builder =
            SiteJson.create().id( siteId.toString() ).name( site.getName().toString() ).displayName( site.getDisplayName() ).projectName(
                repositoryId.toString().replaceFirst( ProjectConstants.PROJECT_REPO_ID_PREFIX, "" ) ).repositoryName(
                repositoryId.toString() ).path( site.getPath().toString() ).hasDraft( true ).hasMaster( hasMaster );
        if ( site.getLanguage() != null )
        {
            builder.language( site.getLanguage().getLanguage() );
        }
        return builder.build();
    }

    public Object getProjects()
    {
        List<ProjectJson> projects = new ArrayList<>();
        projects.addAll(
            createAdminContext( ContentConstants.CONTENT_REPO_ID ).callWith( () -> projectServiceSupplier.get().list() ).stream().sorted(
                Comparator.comparing( project -> project.getName().getRepoId().toString() ) ).map(
                project -> ProjectJson.create().project( project ).iconAsBase64( getProjectIconAsBase64( project ) ).build() ).collect(
                Collectors.toList() ) );

        return new ProjectsMapper( projects );
    }

    public ConfigFilesMapper getConfigs()
    {
        List<ConfigFileJson> configs = new ArrayList<>();
        Path configFolder = HomeDir.get().toPath().resolve( "config" );
        try
        {
            Files.list( configFolder ).map( ConfigFileJson::new )
                .filter( config -> ALLOWED_CONFIG_EXTENSIONS.stream().anyMatch( config.getName()::endsWith ) )
                .sorted( Comparator.comparing( ConfigFileJson::getName ) ).collect(
                Collectors.toCollection( () -> configs ) );
        }
        catch ( IOException e )
        {
            LOG.error( "Could not read config folder at " + configFolder, e );
        }

        return new ConfigFilesMapper( configs );
    }

    public TemplateApplicationsMapper getTemplateApplications()
    {
        List<TemplateApplicationJson> templateApps = new ArrayList<>();

        Path filePath = HomeDir.get().toPath().resolve( "config" ).resolve( FILE_NAME );
        if ( Files.exists( filePath ) )
        {
            try
            {
                templateApps.addAll( mustParseJsonFile( filePath.toString() ) );
            }
            catch ( Exception e )
            {
                LOG.error( "Could not parse template file", e );
            }
        }

        return new TemplateApplicationsMapper( templateApps );
    }

    public boolean deleteTemplateFile()
    {
        Path filePath = HomeDir.get().toPath().resolve( "config" ).resolve( FILE_NAME );
        try
        {
            Files.delete( filePath );
            return true;
        }
        catch ( NoSuchFileException e )
        {
            // no file to delete
        }
        catch ( IOException e )
        {
            LOG.warn( "Could not delete template applications file at " + filePath, e );
        }
        return false;
    }

    public String createConfigFile( final String appKey, final String config )
    {
        Path filePath = HomeDir.get().toPath().resolve( "config" ).resolve( appKey + ".cfg" );
        try
        {
            return Files.writeString( filePath, config, StandardOpenOption.CREATE_NEW ).toString();
        }
        catch ( FileAlreadyExistsException e )
        {
            return null;
        }
        catch ( IOException e )
        {
            throw new UncheckedIOException( "Failed to write config file at " + filePath, e );
        }
    }

    public ApplicationInstallResultMapper installApplication( final String urlString, final String shaString )
    {
        final byte[] sha512 = Optional.ofNullable( shaString ).map( HexEncoder::fromHex ).orElse( null );
        final ApplicationInstallResultJson result = new ApplicationInstallResultJson();
        String failure;
        try
        {
            final URL url = URI.create( urlString ).toURL();
            if ( ALLOWED_PROTOCOLS.contains( url.getProtocol() ) )
            {
                return new ApplicationInstallResultMapper( installApplication( url, sha512 ) );
            }
            else
            {
                LOG.error( failure = "Illegal protocol: " + url.getProtocol() );
                result.setFailure( failure );

                return new ApplicationInstallResultMapper( result );
            }

        }
        catch ( MalformedURLException | IllegalArgumentException e )
        {
            LOG.error( failure = "Failed to upload application from " + urlString, e );
            result.setFailure( failure );

            return new ApplicationInstallResultMapper( result );
        }
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

    public String getDefaultApplicationIconAsBase64()
    {
        return "data:" + MediaType.SVG_UTF_8.toString() + ";base64, " +
            Base64.getEncoder().encodeToString( getDefaultIcon( "application.svg" ) );
    }

    public ApplicationMapper getInstalledApplication( final String key )
    {
        if ( key == null || key.isEmpty() )
        {
            return null;
        }
        final Application application = this.applicationServiceSupplier.get().getInstalledApplication( ApplicationKey.from( key ) );
        return Optional.ofNullable( application ).map( app -> new ApplicationMapper( toApplicationJson( app ) ) ).orElse( null );
    }

    private ApplicationInstallResultJson installApplication( final URL url, final byte[] sha512 )
    {
        final ApplicationInstallResultJson result = new ApplicationInstallResultJson();

        try
        {
            ContextBuilder.from( ContextAccessor.current() ).authInfo(
                AuthenticationInfo.create().principals( RoleKeys.ADMIN ).user( SUPER_USER ).build() ).build().runWith( () -> {

                final Application application = this.applicationServiceSupplier.get().installGlobalApplication( url, sha512 );

                result.setApplication( toApplicationJson( application ) );

            } );

        }
        catch ( Exception e )
        {
            final String failure = "Failed to process application from " + url;
            LOG.error( failure, e );

            result.setFailure( failure );
        }
        return result;
    }

    private ApplicationJson toApplicationJson( final Application application )
    {
        ApplicationKey applicationKey = application.getKey();
        ApplicationJson.Builder builder =
            ApplicationJson.create().application( application ).description( getApplicationDescription( applicationKey ) ).iconAsBase64(
                getApplicationIconAsBase64( applicationKey ) );

        Resource resource = resourceServiceSupplier.get().getResource( ResourceKey.from( applicationKey, "/webapp/webapp.js" ) );
        if ( resource.exists() )
        {
            String webappUrl = ServletRequestUrlHelper.createUri( ServletRequestHolder.getRequest(), "/webapp/" + application.getKey() );
            builder.webappUrl( webappUrl );
        }

        List<String> adminToolsUris = getApplicationAdminToolsUris( applicationKey );
        adminToolsUris.forEach( builder::addAdminToolsUrl );

        return builder.build();
    }

    private List<TemplateApplicationJson> mustParseJsonFile( String filePath )
    {
        try (FileInputStream in = new FileInputStream( filePath ))
        {
            return objectMapper.readValue( in, new TypeReference<>()
            {
            } );
        }
        catch ( JsonProcessingException e )
        {
            throw new UncheckedIOException( "Failed to parse template applications file at " + filePath, e );
        }
        catch ( IOException e )
        {
            throw new UncheckedIOException( "Failed to read template applications file at " + filePath, e );
        }
    }

    private List<RepositoryId> getProjectIds()
    {
        List<RepositoryId> repositoryIds = new ArrayList<>();
        repositoryIds.add( ContentConstants.CONTENT_REPO_ID );
        repositoryIds.addAll( createAdminContext( ContentConstants.CONTENT_REPO_ID, ContentConstants.BRANCH_MASTER ).callWith(
            () -> projectServiceSupplier.get().list() ).stream().map( Project::getName ).map( ProjectName::getRepoId ).filter(
            repoId -> !repoId.equals( ContentConstants.CONTENT_REPO_ID ) ).sorted( Comparator.comparing( RepositoryId::toString ) ).collect(
            Collectors.toList() ) );
        return repositoryIds;
    }

    private List<String> getApplicationAdminToolsUris( final ApplicationKey applicationKey )
    {
        AdminToolDescriptorService service = this.adminToolDescriptorServiceSupplier.get();
        AdminToolDescriptors descriptors = service.getByApplication( applicationKey );

        return descriptors.getList().stream().map(
            descriptor -> service.generateAdminToolUri( applicationKey.toString(), descriptor.getName() ) ).collect( Collectors.toList() );
    }

    private String getApplicationDescription( final ApplicationKey applicationKey )
    {
        ApplicationDescriptor applicationDescriptor = applicationDescriptorServiceSupplier.get().get( applicationKey );
        return applicationDescriptor != null ? applicationDescriptor.getDescription() : null;
    }

    private String getApplicationIconAsBase64( final ApplicationKey applicationKey )
    {
        ApplicationDescriptor applicationDescriptor = applicationDescriptorServiceSupplier.get().get( applicationKey );
        if ( applicationDescriptor == null || applicationDescriptor.getIcon() == null )
        {
            return getDefaultApplicationIconAsBase64();
        }
        Icon icon = applicationDescriptor.getIcon();
        return "data:" + icon.getMimeType() + ";base64, " + Base64.getEncoder().encodeToString( icon.toByteArray() );
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
        try (InputStream in = getClass().getResourceAsStream( name ))
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
        return ContextBuilder.create().branch( branch ).repositoryId( repositoryId ).authInfo( this.createAdminAuthInfo() ).build();
    }

    private AuthenticationInfo createAdminAuthInfo()
    {
        return AuthenticationInfo.create().principals( RoleKeys.ADMIN ).user(
            User.create().key( PrincipalKey.ofSuperUser() ).login( PrincipalKey.ofSuperUser().getId() ).build() ).build();
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
