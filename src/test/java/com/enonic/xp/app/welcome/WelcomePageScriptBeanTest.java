package com.enonic.xp.app.welcome;


import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.osgi.framework.Version;

import com.enonic.xp.admin.tool.AdminToolDescriptor;
import com.enonic.xp.admin.tool.AdminToolDescriptorService;
import com.enonic.xp.admin.tool.AdminToolDescriptors;
import com.enonic.xp.app.Application;
import com.enonic.xp.app.ApplicationDescriptor;
import com.enonic.xp.app.ApplicationDescriptorService;
import com.enonic.xp.app.ApplicationKey;
import com.enonic.xp.app.ApplicationService;
import com.enonic.xp.app.Applications;
import com.enonic.xp.attachment.Attachment;
import com.enonic.xp.content.Content;
import com.enonic.xp.content.ContentId;
import com.enonic.xp.content.ContentIds;
import com.enonic.xp.content.ContentQuery;
import com.enonic.xp.content.Contents;
import com.enonic.xp.content.FindContentIdsByQueryResult;
import com.enonic.xp.content.GetContentByIdsParams;
import com.enonic.xp.data.PropertyTree;
import com.enonic.xp.icon.Icon;
import com.enonic.xp.page.DescriptorKey;
import com.enonic.xp.project.Project;
import com.enonic.xp.project.ProjectName;
import com.enonic.xp.project.ProjectService;
import com.enonic.xp.project.Projects;
import com.enonic.xp.repository.RepositoryId;
import com.enonic.xp.resource.Resource;
import com.enonic.xp.resource.ResourceKey;
import com.enonic.xp.resource.ResourceService;
import com.enonic.xp.security.IdProvider;
import com.enonic.xp.security.IdProviderConfig;
import com.enonic.xp.security.IdProviderKey;
import com.enonic.xp.security.SecurityService;
import com.enonic.xp.testing.ScriptTestSupport;
import com.google.common.io.ByteSource;
import com.google.common.net.MediaType;

public class WelcomePageScriptBeanTest
    extends ScriptTestSupport
{
    private ApplicationService applicationService;

    private JettyConfigService jettyConfigService;

    private ProjectService projectService;

    private ResourceService resourceService;

    private SecurityService securityService;

    private ApplicationDescriptorService applicationDescriptorService;

    private AdminToolDescriptorService adminToolDescriptorService;

    @Override
    protected void initialize()
        throws Exception
    {
        super.initialize();

        this.applicationService = Mockito.mock( ApplicationService.class );
        this.projectService = Mockito.mock( ProjectService.class );
        this.resourceService = Mockito.mock( ResourceService.class );
        this.securityService = Mockito.mock( SecurityService.class );
        this.applicationDescriptorService = Mockito.mock( ApplicationDescriptorService.class );
        this.adminToolDescriptorService = Mockito.mock( AdminToolDescriptorService.class );

        JettyConfig jettyConfig = Mockito.mock( JettyConfig.class, invocation -> invocation.getMethod().getDefaultValue() );
        this.jettyConfigService = new JettyConfigService( jettyConfig );

        addService( ApplicationService.class, this.applicationService );
        addService( JettyConfigService.class, this.jettyConfigService );
        addService( ProjectService.class, this.projectService );
        addService( ResourceService.class, this.resourceService );
        addService( SecurityService.class, this.securityService );
        addService( ApplicationDescriptorService.class, this.applicationDescriptorService );
        addService( AdminToolDescriptorService.class, this.adminToolDescriptorService );
    }

    @Test
    public void testgetApplications()
    {
        ApplicationKey applicationKey = ApplicationKey.from( "applicationKey" );
        Application application = mockApplication( applicationKey, "application" );

        ApplicationKey regularApplicationKey = ApplicationKey.from( "regularApplicationKey" );
        Application regularApplication = mockApplication( regularApplicationKey, "regularApplication" );

        ApplicationKey webApplicationKey = ApplicationKey.from( "webApplicationKey" );
        Application webApplication = mockApplication( webApplicationKey, "webApplication" );

        Applications applications = Applications.from( application, regularApplication, webApplication );

        Mockito.when( applicationService.getInstalledApplications() ).thenReturn( applications );

        mockApplication( applicationKey, false, "main" );
        mockApplication( regularApplicationKey, false );
        mockApplication( webApplicationKey, true );

        runFunction( "/test/WelcomePageScriptBeanTest.js", "getApplications" );
    }

    @Test
    public void testGetXpUrl()
    {
        runFunction( "/test/WelcomePageScriptBeanTest.js", "getXpUrl" );
    }

    @Test
    public void testGetManagementApiUrl()
    {
        runFunction( "/test/WelcomePageScriptBeanTest.js", "getManagementApiUrl" );
    }

    @Test
    public void testGetStatisticsApiUrl()
    {
        runFunction( "/test/WelcomePageScriptBeanTest.js", "getStatisticsApiUrl" );
    }

    @Test
    public void testGetContentStudioUrl()
    {
        ApplicationKey csKey = ApplicationKey.from( "com.enonic.app.contentstudio" );
        Application cs = mockApplication( csKey, "Content Studio" );

        Applications applications = Applications.from( cs );

        Mockito.when( applicationService.getInstalledApplications() ).thenReturn( applications );

        runFunction( "/test/WelcomePageScriptBeanTest.js", "getContentStudioUrl" );
    }

    @Test
    public void testHost()
    {
        JettyConfig jettyConfig = Mockito.mock( JettyConfig.class, invocation -> invocation.getMethod().getDefaultValue() );
        Mockito.when( jettyConfig.host() ).thenReturn( "192.168.1.1" );

        this.jettyConfigService = new JettyConfigService( jettyConfig );
        addService( JettyConfigService.class, this.jettyConfigService );

        runFunction( "/test/WelcomePageScriptBeanTest.js", "getStatisticsApiUrlWithSpecifiedHost" );
    }

    @Test
    public void testHost_Empty()
    {
        JettyConfig jettyConfig = Mockito.mock( JettyConfig.class, invocation -> invocation.getMethod().getDefaultValue() );
        Mockito.when( jettyConfig.host() ).thenReturn( "" );

        this.jettyConfigService = new JettyConfigService( jettyConfig );
        addService( JettyConfigService.class, this.jettyConfigService );

        runFunction( "/test/WelcomePageScriptBeanTest.js", "getStatisticsApiUrlWithEmptyHost" );
    }

    @Test
    public void testHost_Zero()
    {
        JettyConfig jettyConfig = Mockito.mock( JettyConfig.class, invocation -> invocation.getMethod().getDefaultValue() );
        Mockito.when( jettyConfig.host() ).thenReturn( "0.0.0.0" );

        this.jettyConfigService = new JettyConfigService( jettyConfig );
        addService( JettyConfigService.class, this.jettyConfigService );

        runFunction( "/test/WelcomePageScriptBeanTest.js", "getStatisticsApiUrlWithZeroHost" );
    }

    @Test
    public void testcanLoginAsSu()
    {
        PropertyTree config = new PropertyTree();
        config.setBoolean( "adminUserCreationEnabled", true );
        IdProviderConfig idProviderConfig = IdProviderConfig.create().
            applicationKey( ApplicationKey.from( "com.enonic.xp.app.standardidprovider" ) ).
            config( config ).
            build();

        IdProvider idProvider = Mockito.mock( IdProvider.class );

        Mockito.when( idProvider.getIdProviderConfig() ).thenReturn( idProviderConfig );
        Mockito.when( securityService.getIdProvider( Mockito.any( IdProviderKey.class ) ) ).thenReturn( idProvider );

        runFunction( "/test/WelcomePageScriptBeanTest.js", "canLoginAsSu" );
    }

    @Test
    public void testGetSites()
    {
        Content content1 = Content.create().
                id( ContentId.from( "siteId1" ) ).
                displayName( "displayName1" ).
                path( "/parent/test-site1" ).
                language( Locale.ENGLISH ).
                build();

        Content content2 = Content.create().
            id( ContentId.from( "siteId2" ) ).
            displayName( "displayName2" ).
            path( "/parent/test-site2" ).
            build();

        Project defaultProject = Project.create().
            name( ProjectName.from( RepositoryId.from( "com.enonic.cms.default" ) ) ).
            displayName( "default" ).
            build();

        Project customProject = Project.create().
            name( ProjectName.from( RepositoryId.from( "com.enonic.cms.custom" ) ) ).
            displayName( "custom" ).
            build();

        Projects projects = Projects.create().addAll( List.of( defaultProject, customProject ) ).build();

        FindContentIdsByQueryResult findContentIdsByQueryResult = FindContentIdsByQueryResult.create().contents(
            ContentIds.create().add( content1.getId() ).add( content2.getId() ).build() ).build();

        Mockito.when( projectService.list() ).thenReturn( projects );
        Mockito.when( contentService.find( Mockito.any( ContentQuery.class ) ) ).thenReturn( findContentIdsByQueryResult );
        Mockito.when( contentService.getByIds( Mockito.any( GetContentByIdsParams.class ) ) ).
            thenReturn( Contents.create().add( content1 ).build() ).
            thenReturn( Contents.create().add( content2 ).build() );

        runFunction( "/test/WelcomePageScriptBeanTest.js", "getSites" );
    }

    @Test
    public void testGetProjects()
    {
        ProjectName projectName1 = ProjectName.from( "project1" );
        Project project1 = mockProject( projectName1 );

        ProjectName projectName2 = ProjectName.from( "project2" );
        Project project2 = mockProject( projectName2, projectName1 );

        ArrayList<Project> projects = new ArrayList<>();
        projects.add( project1 );
        projects.add( project2 );

        Mockito.when( projectService.list() ).thenReturn( Projects.from( projects ) );

        ByteSource icon = ByteSource.wrap( new byte[]{123} );
        Mockito.when( projectService.getIcon( Mockito.mock( ProjectName.class ) ) ).thenReturn( icon );

        runFunction( "/test/WelcomePageScriptBeanTest.js", "getProjects" );
    }

    private Application mockApplication( ApplicationKey applicationKey, String displayName )
    {
        Application application = Mockito.mock( Application.class );
        Mockito.when( application.getKey() ).thenReturn( applicationKey );
        Mockito.when( application.getVersion() ).thenReturn( Version.valueOf( "1.0.0" ) );
        Mockito.when( application.getDisplayName() ).thenReturn( displayName );
        return application;
    }

    private Project mockProject( ProjectName name)
    {
        Project project = Mockito.mock( Project.class );
        Mockito.when( project.getName() ).thenReturn( name );
        Mockito.when( project.getDisplayName() ).thenReturn( "displayName" );
        Mockito.when( project.getDescription() ).thenReturn( "description" );
        Attachment attachment = Mockito.mock( Attachment.class );
        Mockito.when( attachment.getMimeType() ).thenReturn( MediaType.SVG_UTF_8.toString() );
        Mockito.when( project.getIcon() ).thenReturn( attachment );
        return project;
    }

    private Project mockProject( ProjectName name, ProjectName parent )
    {
        Project project = this.mockProject( name );
        Mockito.when( project.getParent() ).thenReturn( parent );
        return project;
    }

    private void mockApplication( ApplicationKey applicationKey, boolean isWebapp )
    {
        Resource resource = Mockito.mock( Resource.class );
        Mockito.when( resource.exists() ).thenReturn( isWebapp );
        Mockito.when( resourceService.getResource( ResourceKey.from( applicationKey, "/webapp/webapp.js" ) ) ).thenReturn( resource );

        Icon icon = Icon.from( new byte[]{123}, MediaType.JPEG.toString(), Instant.now() );
        ApplicationDescriptor applicationDescriptor = ApplicationDescriptor.create().key( applicationKey ).icon( icon ).build();
        Mockito.when( applicationDescriptorService.get( applicationKey ) ).thenReturn( applicationDescriptor );

        Mockito.when( adminToolDescriptorService.getByApplication( applicationKey ) ).thenReturn( AdminToolDescriptors.empty() );
    }

    private void mockApplication( ApplicationKey applicationKey, boolean isWebapp, String descriptorName )
    {
        mockApplication( applicationKey, isWebapp );

        DescriptorKey descriptorKey = DescriptorKey.from( applicationKey, descriptorName );
        AdminToolDescriptor adminToolDescriptor = AdminToolDescriptor.create().key( descriptorKey ).build();
        Mockito.when( adminToolDescriptorService.getByApplication( applicationKey ) ).thenReturn( AdminToolDescriptors.from( adminToolDescriptor ) );

        String adminToolUri = "admin/tool/" + applicationKey.toString() + "/" + descriptorName;
        Mockito.when( adminToolDescriptorService.generateAdminToolUri( applicationKey.toString(), descriptorName ) ).thenReturn( adminToolUri );
    }
}
