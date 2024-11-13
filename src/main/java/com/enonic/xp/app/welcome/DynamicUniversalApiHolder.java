package com.enonic.xp.app.welcome;

import com.enonic.xp.api.ApiDescriptor;
import com.enonic.xp.portal.universalapi.UniversalApiHandler;

public final class DynamicUniversalApiHolder
{
    final UniversalApiHandler apiHandler;

    private final ApiDescriptor apiDescriptor;

    DynamicUniversalApiHolder( final UniversalApiHandler apiHandler, final ApiDescriptor apiDescriptor )
    {
        this.apiHandler = apiHandler;
        this.apiDescriptor = apiDescriptor;
    }

    public ApiDescriptor getApiDescriptor()
    {
        return apiDescriptor;
    }
}
