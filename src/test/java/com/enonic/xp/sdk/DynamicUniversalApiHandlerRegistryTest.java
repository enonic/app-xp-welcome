package com.enonic.xp.sdk;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;

import com.enonic.xp.api.ApiDescriptor;
import com.enonic.xp.portal.universalapi.UniversalApiHandler;
import com.enonic.xp.web.WebResponse;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class DynamicUniversalApiHandlerRegistryTest
{
    @Test
    void test()
    {
        final DynamicUniversalApiHandlerRegistry instance = new DynamicUniversalApiHandlerRegistry();

        final UniversalApiHandler universalApiHandler = webRequest -> WebResponse.create().build();

        final Map<String, Object> properties = new HashMap<>();

        properties.put( "applicationKey", "admin" );
        properties.put( "apiKey", "widget" );
        properties.put( "displayName", "Display Name" );
        properties.put( "description", "Brief description" );
        properties.put( "documentationUrl", "https://docs.enonic.com" );
        properties.put( "mount", "true" );
        properties.put( "allowedPrincipals", new String[]{"role:system.everyone", "role:custom.role"} );

        instance.addApiHandler( universalApiHandler, properties );

        final List<ApiDescriptor> apiDescriptors = instance.getAllApiDescriptors();

        assertEquals( 1, apiDescriptors.size() );

        final ApiDescriptor apiDescriptor = apiDescriptors.get( 0 );

        assertEquals( "admin:widget", apiDescriptor.getKey().toString() );
        assertEquals( "admin", apiDescriptor.getKey().getApplicationKey().toString() );
        assertEquals( "widget", apiDescriptor.getKey().getName() );
        assertEquals( "Display Name", apiDescriptor.getDisplayName() );
        assertEquals( "Brief description", apiDescriptor.getDescription() );
        assertEquals( "https://docs.enonic.com", apiDescriptor.getDocumentationUrl() );
        assertTrue( apiDescriptor.isMount() );
        assertEquals( 2, apiDescriptor.getAllowedPrincipals().getSize() );

        instance.removeApiHandler( universalApiHandler );

        assertEquals( 0, instance.getAllApiDescriptors().size() );
    }

    @Test
    void testInvalidConfig()
    {
        final DynamicUniversalApiHandlerRegistry instance = new DynamicUniversalApiHandlerRegistry();

        final UniversalApiHandler universalApiHandler = webRequest -> WebResponse.create().build();

        IllegalArgumentException exception = assertThrows( IllegalArgumentException.class,
                                                           () -> instance.addApiHandler( universalApiHandler,
                                                                                         Map.of( "applicationKey", "admin", "apiKey",
                                                                                                 "widget", "displayName", "Display Name",
                                                                                                 "description", "Brief description",
                                                                                                 "documentationUrl",
                                                                                                 "https://docs.enonic.com", "mount", "true",
                                                                                                 "allowedPrincipals", -1 ) ) );

        assertEquals( "Invalid allowedPrincipals. Value must be string or string array.", exception.getMessage() );
    }

    @Test
    void testConfig()
    {
        final DynamicUniversalApiHandlerRegistry instance = new DynamicUniversalApiHandlerRegistry();

        final UniversalApiHandler universalApiHandler = webRequest -> WebResponse.create().build();

        instance.addApiHandler( universalApiHandler,
                                Map.of( "applicationKey", "admin", "apiKey", "widget", "displayName", "Display Name", "description",
                                        "Brief description", "documentationUrl", "https://docs.enonic.com", "mount", "true",
                                        "allowedPrincipals", "role:system.everyone" ) );

        final List<ApiDescriptor> apiDescriptors = instance.getAllApiDescriptors();

        assertEquals( 1, apiDescriptors.size() );

        final ApiDescriptor apiDescriptor = apiDescriptors.get( 0 );

        assertEquals( "admin:widget", apiDescriptor.getKey().toString() );
        assertEquals( "admin", apiDescriptor.getKey().getApplicationKey().toString() );
        assertEquals( "widget", apiDescriptor.getKey().getName() );
        assertEquals( "Display Name", apiDescriptor.getDisplayName() );
        assertEquals( "Brief description", apiDescriptor.getDescription() );
        assertEquals( "https://docs.enonic.com", apiDescriptor.getDocumentationUrl() );
        assertTrue( apiDescriptor.isMount() );
        assertEquals( 1, apiDescriptor.getAllowedPrincipals().getSize() );
    }
}
