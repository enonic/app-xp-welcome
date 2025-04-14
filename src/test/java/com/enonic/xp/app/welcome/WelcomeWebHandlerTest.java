package com.enonic.xp.app.welcome;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.enonic.xp.portal.PortalRequest;
import com.enonic.xp.portal.PortalResponse;
import com.enonic.xp.portal.controller.ControllerScript;
import com.enonic.xp.portal.controller.ControllerScriptFactory;
import com.enonic.xp.resource.ResourceKey;
import com.enonic.xp.web.HttpMethod;
import com.enonic.xp.web.HttpStatus;
import com.enonic.xp.web.WebResponse;
import com.enonic.xp.web.handler.WebHandlerChain;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class WelcomeWebHandlerTest
{
    private WelcomeWebHandler handler;

    private ControllerScriptFactory controllerScriptFactory;

    private PortalRequest request;

    private WebHandlerChain chain;

    @BeforeEach
    public void setup()
    {
        this.controllerScriptFactory = mock( ControllerScriptFactory.class );

        this.handler = new WelcomeWebHandler( this.controllerScriptFactory );
        this.request = new PortalRequest();

        this.chain = mock( WebHandlerChain.class );
    }

    @Test
    public void testCanHandle()
    {
        this.request.setRawPath( "/" );
        assertTrue( this.handler.canHandle( this.request ) );

        this.request.setRawPath( "/site/a/b" );
        assertFalse( this.handler.canHandle( this.request ) );
    }

    @Test
    public void testDoHandle()
    {
        PortalResponse portalResponse = PortalResponse.create().
            status( HttpStatus.OK ).
            body( "html" ).
            build();

        ControllerScript controllerScript = mock( ControllerScript.class );
        when( controllerScript.execute( any( PortalRequest.class ) ) ).thenReturn( portalResponse );
        when( controllerScriptFactory.fromScript( any( ResourceKey.class ) ) ).thenReturn( controllerScript );

        this.request.setRawPath( "/" );
        this.request.setMethod( HttpMethod.GET );

        final WebResponse response = this.handler.doHandle( this.request, null, this.chain );
        assertEquals( HttpStatus.OK, response.getStatus() );
        assertEquals( "html", response.getBody() );
    }
}
