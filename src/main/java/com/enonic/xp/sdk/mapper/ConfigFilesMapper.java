package com.enonic.xp.sdk.mapper;

import java.util.List;

import com.enonic.xp.sdk.json.ConfigFileJson;
import com.enonic.xp.script.serializer.MapGenerator;
import com.enonic.xp.script.serializer.MapSerializable;

public class ConfigFilesMapper
    implements MapSerializable
{
    private final List<ConfigFileJson> configs;

    public ConfigFilesMapper( final List<ConfigFileJson> configs )
    {
        this.configs = configs;
    }

    @Override
    public void serialize( final MapGenerator gen )
    {
        gen.array( "configs" );
        configs.forEach( config -> {
            gen.map();
            gen.value( "name", config.getName() );
            gen.value( "folder", config.getFolder() );
            gen.value( "path", config.getPath() );
            gen.end();
        } );
        gen.end();
    }
}
