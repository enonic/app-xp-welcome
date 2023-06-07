package com.enonic.xp.app.welcome.mapper;

import java.util.List;

import com.enonic.xp.app.welcome.json.SiteJson;
import com.enonic.xp.script.serializer.MapGenerator;
import com.enonic.xp.script.serializer.MapSerializable;

public class SitesMapper
    implements MapSerializable
{
    private final List<SiteJson> sites;

    public SitesMapper( final List<SiteJson> sites )
    {
        this.sites = sites;
    }

    @Override
    public void serialize( final MapGenerator gen )
    {
        gen.array( "sites" );
        sites.forEach( site -> {
            gen.map();
            gen.value( "id", site.getId() );
            gen.value( "name", site.getName() );
            gen.value( "displayName", site.getDisplayName() );
            gen.value( "projectName", site.getProjectName() );
            gen.value( "repositoryName", site.getRepositoryName() );
            gen.value( "language", site.getLanguage() );
            gen.value( "path", site.getPath() );
            gen.value( "hasDraft", site.hasDraft() );
            gen.value( "hasMaster", site.hasMaster() );
            gen.end();
        } );
        gen.end();
    }
}
