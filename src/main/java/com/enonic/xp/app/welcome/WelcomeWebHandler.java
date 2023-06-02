package com.enonic.xp.app.welcome;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import com.enonic.xp.app.ApplicationKey;
import com.enonic.xp.portal.PortalRequest;
import com.enonic.xp.portal.controller.ControllerScript;
import com.enonic.xp.portal.controller.ControllerScriptFactory;
import com.enonic.xp.resource.ResourceKey;
import com.enonic.xp.web.WebRequest;
import com.enonic.xp.web.WebResponse;
import com.enonic.xp.web.handler.BaseWebHandler;
import com.enonic.xp.web.handler.WebHandler;
import com.enonic.xp.web.handler.WebHandlerChain;

@Component(immediate = true, service = WebHandler.class)
public class WelcomeWebHandler
    extends BaseWebHandler
{
    private final ControllerScriptFactory controllerScriptFactory;

    @Activate
    public WelcomeWebHandler( final @Reference ControllerScriptFactory controllerScriptFactory )
    {
        super( 99 );
        this.controllerScriptFactory = controllerScriptFactory;
    }

    @Override
    protected boolean canHandle( final WebRequest webRequest )
    {
        return webRequest.getRawPath().equals( "/" );
    }

    @Override
    protected WebResponse doHandle( final WebRequest webRequest, final WebResponse webResponse, final WebHandlerChain webHandlerChain )
    {
        PortalRequest portalRequest = new PortalRequest( webRequest );
        portalRequest.setContextPath( portalRequest.getBaseUri() );
        final ApplicationKey applicationKey = ApplicationKey.from( "com.enonic.xp.app.welcome" );
        portalRequest.setApplicationKey( applicationKey );

        ResourceKey scriptDir = ResourceKey.from( applicationKey, "welcome" );
        ControllerScript controllerScript = controllerScriptFactory.fromScript( scriptDir.resolve( scriptDir.getName() + ".js" ) );
        return controllerScript.execute( portalRequest );
    }
}
