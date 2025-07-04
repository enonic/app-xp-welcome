package com.enonic.xp.sdk.mapper;

import com.enonic.xp.sdk.json.ApplicationJson;
import com.enonic.xp.script.serializer.MapGenerator;
import com.enonic.xp.script.serializer.MapSerializable;

public class ApplicationMapper
    implements MapSerializable
{
    private final ApplicationJson application;

    public ApplicationMapper( final ApplicationJson application )
    {
        this.application = application;
    }

    @Override
    public void serialize( final MapGenerator gen )
    {
        gen.value( "applicationKey", application.getKey() );
        gen.value( "displayName", application.getDisplayName() );
        gen.value( "description", application.getDescription() );
        gen.value( "version", application.getVersion() );
        gen.value( "url", application.getUrl() );
        gen.value( "deploymentUrl", application.getWebappUrl() );
        gen.value( "adminToolsUrls", application.getAdminToolsUrls() );
        gen.value( "icon", application.getIconAsBase64() );
    }
}
