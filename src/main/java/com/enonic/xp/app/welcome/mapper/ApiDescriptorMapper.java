package com.enonic.xp.app.welcome.mapper;

import com.enonic.xp.api.ApiDescriptor;
import com.enonic.xp.page.DescriptorKey;
import com.enonic.xp.script.serializer.MapGenerator;
import com.enonic.xp.script.serializer.MapSerializable;

public class ApiDescriptorMapper
    implements MapSerializable
{

    private final ApiDescriptor apiDescriptor;

    public ApiDescriptorMapper( ApiDescriptor apiDescriptor )
    {
        this.apiDescriptor = apiDescriptor;
    }

    @Override
    public void serialize( final MapGenerator gen )
    {
        final DescriptorKey descriptorKey = apiDescriptor.getKey();

        gen.value( "descriptor", descriptorKey.toString() );
        gen.value( "application", descriptorKey.getApplicationKey().getName() );
        gen.value( "name", descriptorKey.getName() );
        gen.value( "displayName", apiDescriptor.getDisplayName() );
        gen.value( "description", apiDescriptor.getDescription() );
        gen.value( "documentationUrl", apiDescriptor.getDocumentationUrl() );
        gen.value( "mount", apiDescriptor.isMount() );

        if ( apiDescriptor.getAllowedPrincipals() != null )
        {
            gen.array( "allowedPrincipals" );
            apiDescriptor.getAllowedPrincipals().forEach( gen::value );
            gen.end();
        }
    }
}
