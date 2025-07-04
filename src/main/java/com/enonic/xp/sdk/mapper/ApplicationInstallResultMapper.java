package com.enonic.xp.sdk.mapper;

import com.enonic.xp.sdk.json.ApplicationInstallResultJson;
import com.enonic.xp.sdk.json.ApplicationJson;
import com.enonic.xp.script.serializer.MapGenerator;
import com.enonic.xp.script.serializer.MapSerializable;

public class ApplicationInstallResultMapper
    implements MapSerializable
{
    private final ApplicationInstallResultJson result;

    public ApplicationInstallResultMapper( final ApplicationInstallResultJson result )
    {
        this.result = result;
    }

    @Override
    public void serialize( final MapGenerator gen )
    {
        gen.value( "failure", result.getFailure() );
        final ApplicationJson app = result.getApplication();
        if ( app != null )
        {
            gen.map( "application" );
            new ApplicationMapper( app ).serialize( gen );
            gen.end();
        }
    }
}
