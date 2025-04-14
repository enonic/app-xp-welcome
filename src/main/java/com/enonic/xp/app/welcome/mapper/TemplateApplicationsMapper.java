package com.enonic.xp.app.welcome.mapper;

import java.util.List;

import com.enonic.xp.app.welcome.json.TemplateApplicationJson;
import com.enonic.xp.script.serializer.MapGenerator;
import com.enonic.xp.script.serializer.MapSerializable;

public class TemplateApplicationsMapper
    implements MapSerializable
{
    private final List<TemplateApplicationJson> applications;

    public TemplateApplicationsMapper( final List<TemplateApplicationJson> applications )
    {
        this.applications = applications;
    }

    @Override
    public void serialize( final MapGenerator gen )
    {
        gen.array( "applications" );
        applications.forEach( application -> {
            gen.map();
            gen.value( "key", application.key );
            gen.value( "config", application.config );
            gen.end();
        } );
        gen.end();
    }
}
