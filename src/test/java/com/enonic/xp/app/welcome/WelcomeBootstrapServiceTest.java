package com.enonic.xp.app.welcome;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.osgi.framework.BundleContext;

import com.enonic.xp.app.ApplicationKey;
import com.enonic.xp.app.ApplicationNotFoundException;
import com.enonic.xp.portal.script.PortalScriptService;
import com.enonic.xp.resource.ResourceKey;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.timeout;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class WelcomeBootstrapServiceTest
{
    private WelcomeBootstrapService service;

    private PortalScriptService scriptService;

    private ApplicationKey appKey;

    @BeforeEach
    public void setup()
    {
        this.scriptService = mock( PortalScriptService.class );

        this.service = new WelcomeBootstrapService( this.scriptService );

        this.appKey = ApplicationKey.from( "com.enonic.xp.sdk" );
    }

    @Test
    public void testActivateAppNotReady()
    {
        final ResourceKey resourceKey = ResourceKey.from( appKey, "/bootstrap.js" );

        when( scriptService.execute( resourceKey ) ).thenThrow( ApplicationNotFoundException.class ).thenReturn( mock() );

        final BundleContext bundleContext = mock();
        when( bundleContext.getBundle().getSymbolicName() ).thenReturn( appKey.toString() );
        service.activate( bundleContext );

        verify( scriptService, timeout( 10000 ).times( 2 ) ).execute( resourceKey );
    }

    @Test
    public void testActivateAppNeverReady()
    {
        final ResourceKey resourceKey = ResourceKey.from( appKey, "/bootstrap.js" );

        when( scriptService.execute( resourceKey ) ).thenThrow( ApplicationNotFoundException.class );

        final BundleContext bundleContext = mock();
        when( bundleContext.getBundle().getSymbolicName() ).thenReturn( appKey.toString() );
        service.activate( bundleContext );

        verify( scriptService, timeout( 20000 ).times( 10 ) ).execute( resourceKey );
    }

    @Test
    public void testActivateAppFailure()
    {
        final ResourceKey resourceKey = ResourceKey.from( appKey, "/bootstrap.js" );
        when( scriptService.execute( resourceKey ) ).thenThrow( new RuntimeException( "Something unexpected" ) );

        final BundleContext bundleContext = mock();
        when( bundleContext.getBundle().getSymbolicName() ).thenReturn( appKey.toString() );
        service.activate( bundleContext );

        verify( this.scriptService, timeout( 10000 ).only() ).execute( resourceKey );
    }

}
