package com.enonic.xp.sdk;

import org.junit.jupiter.api.Test;

import com.enonic.xp.testing.ScriptTestSupport;

public class StoreBeanTest
    extends ScriptTestSupport
{

    @Test
    public void testPutGet()
    {
        runFunction( "/test/StoreBeanTest.js", "testPutGet" );
    }

    @Test
    public void testGetNotExists()
    {
        runFunction( "/test/StoreBeanTest.js", "testGetNotExists" );
    }

    @Test
    public void testPutRemove()
    {
        runFunction( "/test/StoreBeanTest.js", "testPutRemove" );
    }

    @Test
    public void testGetByUrl()
    {
        runFunction( "/test/StoreBeanTest.js", "testGetByUrl" );
    }

    @Test
    public void testGetByUrlNotExists()
    {
        runFunction( "/test/StoreBeanTest.js", "testGetByUrlNotExists" );
    }
}
