package com.automationexercise.api.base;

import io.restassured.builder.RequestSpecBuilder;
import io.restassured.specification.RequestSpecification;
import org.testng.annotations.BeforeSuite;

public class BaseTest {

    protected static RequestSpecification baseRequestSpec;

    @BeforeSuite(alwaysRun = true)
    public void setup() {
        System.out.println("Initializing the base RequestSpecification...");

        baseRequestSpec = new RequestSpecBuilder()
                .setBaseUri("https://automationexercise.com/api" )
                .addHeader("User-Agent", "MyTestFramework/1.0")
                .build();

        System.out.println("Base RequestSpecification has been configured.");
    }
}
