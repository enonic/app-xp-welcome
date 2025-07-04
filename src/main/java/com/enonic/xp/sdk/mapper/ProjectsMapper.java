package com.enonic.xp.sdk.mapper;

import java.util.List;

import com.enonic.xp.sdk.json.ProjectJson;
import com.enonic.xp.script.serializer.MapGenerator;
import com.enonic.xp.script.serializer.MapSerializable;

public class ProjectsMapper
    implements MapSerializable
{
    private final List<ProjectJson> projects;

    public ProjectsMapper( final List<ProjectJson> projects )
    {
        this.projects = projects;
    }

    @Override
    public void serialize( final MapGenerator gen )
    {
        gen.array( "projects" );
        projects.forEach( project -> {
            gen.map();
            gen.value( "name", project.getName() );
            gen.value( "displayName", project.getDisplayName() );
            gen.value( "description", project.getDescription() );
            gen.value( "parent", project.getParent() );
            gen.value( "icon", project.getIconAsBase64() );
            gen.end();
        } );
        gen.end();
    }
}
