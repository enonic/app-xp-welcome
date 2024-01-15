package com.enonic.xp.app.welcome;

import java.util.concurrent.CompletableFuture;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.condition.Condition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.enonic.xp.app.ApplicationKey;
import com.enonic.xp.app.ApplicationNotFoundException;
import com.enonic.xp.exception.InitializationException;
import com.enonic.xp.portal.script.PortalScriptService;
import com.enonic.xp.resource.ResourceKey;

@Component(immediate = true)
public final class WelcomeBootstrapService
{
    private static final Logger LOG = LoggerFactory.getLogger( WelcomeBootstrapService.class );

    private final PortalScriptService scriptService;

    @Reference(target="(osgi.condition.id=com.enonic.xp.server.deploy.ready)")
    private Condition deployReadyCondition;

    @Activate
    public WelcomeBootstrapService( final @Reference PortalScriptService scriptService)
    {
        this.scriptService = scriptService;
    }

    @Activate
    public void activate()
    {
        final ApplicationKey appKey = ApplicationKey.from( "com.enonic.xp.app.welcome" );
        final ResourceKey key = ResourceKey.from( appKey, "/bootstrap.js" );

        final int attempts = 10;

        // Script Service needs Welcome app to be configured. Configuration event happens in OSGi Config Admin thread and may happen a bit later
        // Thus we might need to do a few attempts.
        // But we can't do it directly in Activate method, because OSGi Config Admin thread might not see the Welcome app until we return from Activate.
        // It often does, but not always.
        CompletableFuture.runAsync( () -> {
            for (int attempt = 0; attempt < attempts; attempt++)
            {
                try
                {
                    scriptService.execute( key );
                    return;
                }
                catch ( ApplicationNotFoundException e )
                {
                    if ( attempt < attempts - 1 )
                    {
                        standBy();
                    }
                }
            }
            throw new InitializationException( "Could not initialize applications after " + attempts + "attempts" );
        } ).whenComplete( (result, error) -> {
            if ( error != null )
            {
                LOG.error( "Failed to execute Welcome bootstrap script", error );
            }
            else
            {
                LOG.info( "Welcome bootstrap script executed successfully" );
            }
        });
    }

    void standBy()
    {
        long initializationCheckPeriod = 1000;
        try
        {
            LOG.debug( "Waiting [{}ms] for script service to be initialized", initializationCheckPeriod );
            Thread.sleep( initializationCheckPeriod );
        }
        catch ( InterruptedException e )
        {
            throw new InitializationException( e, "Initialization thread interrupted" );
        }
    }
}
