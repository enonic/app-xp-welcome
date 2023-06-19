package com.enonic.xp.app.welcome.mapper;

import java.util.List;

import com.enonic.xp.app.welcome.json.ApplicationJson;
import com.enonic.xp.script.serializer.MapGenerator;
import com.enonic.xp.script.serializer.MapSerializable;

public class ApplicationsMapper
    implements MapSerializable
{
    private final List<ApplicationJson> applications;

    public ApplicationsMapper( final List<ApplicationJson> applications )
    {
        this.applications = applications;
    }

    @Override
    public void serialize( final MapGenerator gen )
    {
        gen.array( "applications" );
        applications.forEach( application -> {
            gen.map();
            gen.value( "applicationKey", application.getKey() );
            gen.value( "displayName", application.getDisplayName() );
            gen.value( "description", application.getDescription() );
            gen.value( "version", application.getVersion() );
            gen.value( "url", application.getUrl() );
            gen.value( "deploymentUrl", application.getWebappUrl() );
            gen.value( "adminToolsUrls", application.getAdminToolsUrls() );
            gen.value( "icon", application.getIconAsBase64() );
            gen.end();
        } );
        gen.end();
    }
}