package com.automationexercise.api.base;

import io.restassured.builder.RequestSpecBuilder;
import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;
import org.testng.annotations.BeforeClass;


public class BaseTest {

    protected RequestSpecification baseRequestSpec;


    @BeforeClass(alwaysRun = true )
    public void setup() {
        baseRequestSpec = new RequestSpecBuilder()
                .setBaseUri("https://automationexercise.com/api" )
                .setContentType(ContentType.JSON) // Setting a default content type
                .build();
    }
}
