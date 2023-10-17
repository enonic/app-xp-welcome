package com.enonic.xp.app.welcome;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import com.enonic.xp.app.welcome.market.MarketConfig;
import com.enonic.xp.app.welcome.market.MarketConfigService;
import com.enonic.xp.testing.ScriptTestSupport;

public class GetMarketConfigBeanTest
    extends ScriptTestSupport
{

    private MarketConfigService marketConfigService;

    @Override
    protected void initialize()
        throws Exception
    {
        super.initialize();

        this.marketConfigService = Mockito.mock( MarketConfigService.class );

        addService( MarketConfigService.class, this.marketConfigService );
    }

    @Test
    public void testGetGraphqlUrl()
    {
        Mockito.when( this.marketConfigService.getGraphqlUrl() ).thenReturn( "http://localhost:8080/graphql" );
        runFunction( "/test/GetMarketConfigBeanTest.js", "testGetGraphqlUrl", "http://localhost:8080/graphql" );
    }

    @Test
    public void testGetDefaultGraphqlUrl()
    {
        Mockito.when( this.marketConfigService.getGraphqlUrl() ).thenReturn( null );
        runFunction( "/test/GetMarketConfigBeanTest.js", "testGetGraphqlUrl", MarketConfig.DEFAULT_GRAPHQL_URL );
    }

    @Test
    public void testGetMarketUrl()
    {
        Mockito.when( this.marketConfigService.getGraphqlUrl() ).thenReturn( "https://localhost:8080/graphql" );
        runFunction( "/test/GetMarketConfigBeanTest.js", "testGetMarketUrl", "https://localhost:8080" );
    }

    @Test
    public void testGetMalformedMarketUrl()
    {
        Mockito.when( this.marketConfigService.getGraphqlUrl() ).thenReturn( "this is not an url" );
        runFunction( "/test/GetMarketConfigBeanTest.js", "testGetMalformedMarketUrl" );
    }
}
