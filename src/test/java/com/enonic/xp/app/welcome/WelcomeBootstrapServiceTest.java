package com.enonic.xp.app.welcome;

import java.util.concurrent.CompletableFuture;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.osgi.framework.Version;

import com.enonic.xp.app.Application;
import com.enonic.xp.app.ApplicationKey;
import com.enonic.xp.app.ApplicationService;
import com.enonic.xp.portal.script.PortalScriptService;
import com.enonic.xp.resource.ResourceKey;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class WelcomeBootstrapServiceTest
{
    private WelcomeBootstrapService service;

    private PortalScriptService scriptService;

    private ApplicationService applicationService;

    private ApplicationKey appKey;

    @BeforeEach
    public void setup()
    {
        this.scriptService = mock( PortalScriptService.class );
        this.applicationService = mock( ApplicationService.class );

        this.service = new WelcomeBootstrapService( this.scriptService, this.applicationService );

        this.appKey = ApplicationKey.from( "com.enonic.xp.app.welcome" );
        final Application app = mockApplication( appKey, "Welcome App" );

        when( applicationService.get( any( ApplicationKey.class ) ) ).thenReturn( null ).thenReturn( null ).thenReturn( app );
    }

    @Test
    public void testActivateAppNotReady()
    {
        final ResourceKey resourceKey = ResourceKey.from( appKey, "/bootstrap.js" );
        when( scriptService.executeAsync( resourceKey ) ).thenReturn( CompletableFuture.completedFuture( null ) );

        this.service.activate();

        Mockito.verify( this.scriptService, Mockito.only() ).executeAsync( resourceKey );
    }

    @Test
    public void testActivateAppFailure()
    {
        final ResourceKey resourceKey = ResourceKey.from( appKey, "/bootstrap.js" );
        when( scriptService.executeAsync( resourceKey ) ).thenReturn( CompletableFuture.failedFuture( new Exception( "Test error" ) ) );

        this.service.activate();

        Mockito.verify( this.scriptService, Mockito.only() ).executeAsync( resourceKey );
    }

    private Application mockApplication( ApplicationKey applicationKey, String displayName )
    {
        Application application = mock( Application.class );
        when( application.getKey() ).thenReturn( applicationKey );
        when( application.getVersion() ).thenReturn( Version.valueOf( "1.0.0" ) );
        when( application.getDisplayName() ).thenReturn( displayName );
        return application;
    }
}
