package com.enonic.xp.app.welcome;

import java.util.concurrent.CompletableFuture;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.enonic.xp.app.ApplicationKey;
import com.enonic.xp.app.ApplicationService;
import com.enonic.xp.portal.script.PortalScriptService;
import com.enonic.xp.resource.ResourceKey;
import com.enonic.xp.script.ScriptExports;

@Component(immediate = true, service = WelcomeBootstrapService.class)
public class WelcomeBootstrapService
{

    private static final Logger LOG = LoggerFactory.getLogger( WelcomeBootstrapService.class );

    private final PortalScriptService scriptService;

    private final ApplicationService applicationService;

    @Activate
    public WelcomeBootstrapService( final @Reference PortalScriptService scriptService,
                                    final @Reference ApplicationService applicationService )
    {
        this.scriptService = scriptService;
        this.applicationService = applicationService;
    }

    @Activate
    public void activate()
    {
        final ApplicationKey appKey = ApplicationKey.from( "com.enonic.xp.app.welcome" );
        LOG.debug( "Activating {} application", appKey );
        while ( applicationService.get( appKey ) == null )
        {
            try
            {
                LOG.debug( "Waiting 100 ms for {} application to become available", appKey );
                Thread.sleep( 100 );
            }
            catch ( InterruptedException e )
            {
                LOG.error( "Error while waiting for {} application to start", appKey, e );
            }
        }
        ResourceKey key = ResourceKey.from( appKey, "/bootstrap.js" );
        final CompletableFuture<ScriptExports> completableFuture = this.scriptService.executeAsync( key );
        completableFuture.whenComplete( ( u, e ) -> {
            if ( e != null )
            {
                LOG.error( "Error while bootstrapping {} application ", key.getApplicationKey(), e );
            }
            else
            {
                LOG.debug( "Finished bootstrapping {} application", appKey );
            }
        } );

    }
}
