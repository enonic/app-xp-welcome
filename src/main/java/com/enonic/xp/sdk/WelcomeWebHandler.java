package com.enonic.xp.sdk;

import org.osgi.framework.BundleContext;
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

    private final ApplicationKey applicationKey;

    @Activate
    public WelcomeWebHandler( final @Reference ControllerScriptFactory controllerScriptFactory, final BundleContext context )
    {
        super( 99 );
        this.controllerScriptFactory = controllerScriptFactory;
        this.applicationKey = ApplicationKey.from( context.getBundle() );
    }

    @Override
    protected boolean canHandle( final WebRequest webRequest )
    {
        return webRequest.getRawPath().equals( "/" ) || webRequest.getRawPath().startsWith( "/" + applicationKey + "/_static/" );
    }

    @Override
    protected WebResponse doHandle( final WebRequest webRequest, final WebResponse webResponse, final WebHandlerChain webHandlerChain )
    {
        final PortalRequest portalRequest = new PortalRequest( webRequest );
        portalRequest.setContextPath( webRequest.getRawPath().equals( "/" ) ? "" : "/" + applicationKey );
        portalRequest.setApplicationKey( applicationKey );

        final ResourceKey scriptDir = ResourceKey.from( applicationKey, "welcome" );
        final ControllerScript controllerScript = controllerScriptFactory.fromScript( scriptDir.resolve( scriptDir.getName() + ".js" ) );
        return controllerScript.execute( portalRequest );
    }
}
