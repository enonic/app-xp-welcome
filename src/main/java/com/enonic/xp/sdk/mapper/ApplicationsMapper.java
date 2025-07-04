package com.enonic.xp.sdk.mapper;

import java.util.List;

import com.enonic.xp.sdk.json.ApplicationJson;
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
            new ApplicationMapper( application ).serialize( gen );
            gen.end();
        } );
        gen.end();
    }
}
