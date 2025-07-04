package com.enonic.xp.sdk;

import org.junit.jupiter.api.Test;

import com.enonic.xp.sdk.market.MarketConfig;
import com.enonic.xp.sdk.market.MarketConfigService;
import com.enonic.xp.testing.ScriptTestSupport;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class GetMarketConfigBeanTest
    extends ScriptTestSupport
{

    private MarketConfigService marketConfigService;

    @Override
    protected void initialize()
        throws Exception
    {
        super.initialize();

        this.marketConfigService = mock( MarketConfigService.class );

        addService( MarketConfigService.class, this.marketConfigService );
    }

    @Test
    public void testGetGraphqlUrl()
    {
        when( this.marketConfigService.getGraphqlUrl() ).thenReturn( "http://localhost:8080/graphql" );
        runFunction( "/test/GetMarketConfigBeanTest.js", "testGetGraphqlUrl", "http://localhost:8080/graphql" );
    }

    @Test
    public void testGetDefaultGraphqlUrl()
    {
        when( this.marketConfigService.getGraphqlUrl() ).thenReturn( null );
        runFunction( "/test/GetMarketConfigBeanTest.js", "testGetGraphqlUrl", MarketConfig.DEFAULT_GRAPHQL_URL );
    }

    @Test
    public void testGetMarketUrl()
    {
        when( this.marketConfigService.getGraphqlUrl() ).thenReturn( "https://localhost:8080/graphql" );
        runFunction( "/test/GetMarketConfigBeanTest.js", "testGetMarketUrl", "https://localhost:8080" );
    }

    @Test
    public void testGetMalformedMarketUrl()
    {
        when( this.marketConfigService.getGraphqlUrl() ).thenReturn( "this is not an url" );
        runFunction( "/test/GetMarketConfigBeanTest.js", "testGetMalformedMarketUrl" );
    }
}
