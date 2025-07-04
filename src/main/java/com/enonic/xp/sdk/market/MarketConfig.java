package com.enonic.xp.sdk.market;

public @interface MarketConfig
{
    String DEFAULT_GRAPHQL_URL = "https://market.enonic.com/api/graphql";

    String graphqlUrl() default DEFAULT_GRAPHQL_URL;
}
