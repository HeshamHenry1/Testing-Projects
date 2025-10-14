package com.automationexercise.api.tests;

import com.automationexercise.api.base.BaseTest;
import com.automationexercise.api.client.ApiClient;
import io.restassured.path.json.JsonPath;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;


public class LoginApiTests extends BaseTest {

    private ApiClient apiClient;

    @BeforeClass
    public void setupClient() {
        apiClient = new ApiClient(baseRequestSpec);
    }

    @Test(description = "Verify login with valid credentials.")
    public void testVerifyLoginWithValidDetails() {
        System.out.println("Executing test: Verify Login with valid details (Positive)");

        String validEmail = "test_199@test.test";
        String validPassword = "test1234";

        Response response = apiClient.verifyLogin(validEmail, validPassword);

        Assert.assertEquals(response.getStatusCode(), 200, "Status code should be 200.");



        String responseBody = response.asString();

        JsonPath jsonPath = new JsonPath(responseBody);

        Assert.assertEquals(jsonPath.getInt("responseCode"), 200, "responseCode in body should be 200.");
        Assert.assertEquals(jsonPath.getString("message"), "User exists!", "message in body should be 'User exists!'.");


        System.out.println("Test 'Verify Login' was successful!");
    }

    @Test(description = "Verify error when logging in without email parameter.", priority = 2)
    public void testVerifyLoginWithoutEmailReturnsError() {
        System.out.println("Executing test: Verify Login without email (Negative)");

        Response response = apiClient.verifyLoginWithoutEmail("anypassword");

        Assert.assertEquals(response.getStatusCode(), 200, "Status code should be 200 (as per API behavior).");

        JsonPath jsonPath = new JsonPath(response.asString());
        Assert.assertEquals(jsonPath.getInt("responseCode"), 400, "responseCode in body should be 400.");
        Assert.assertEquals(jsonPath.getString("message"), "Bad request, email or password parameter is missing in POST request.", "Error message is not correct.");

        System.out.println("Test correctly verified the 400 Bad Request error for missing email.");
    }

    @Test(description = "Verify that DELETE method is not allowed for /verifyLogin endpoint.", priority = 3)
    public void testDeleteToVerifyLoginReturnsError() {
        System.out.println("Executing test: DELETE to /verifyLogin (Negative)");

        Response response = apiClient.deleteToVerifyLogin();

        Assert.assertEquals(response.getStatusCode(), 200, "Status code should be 200 (as per API behavior).");

        JsonPath jsonPath = new JsonPath(response.asString());
        Assert.assertEquals(jsonPath.getInt("responseCode"), 405, "responseCode in body should be 405.");
        Assert.assertEquals(jsonPath.getString("message"), "This request method is not supported.", "Error message is not correct.");

        System.out.println("Test correctly verified that DELETE method is rejected.");
    }

    @Test(description = "Verify error when logging in with invalid details.", priority = 4)
    public void testVerifyLoginWithInvalidDetailsReturnsError() {
        System.out.println("Executing test: Verify Login with invalid details (Negative)");

        String invalidEmail = "test_19911@test.test";
        String invalidPassword = "test123456";
        System.out.println("Using invalid credentials: email=" + invalidEmail + ", password=" + invalidPassword);

        Response response = apiClient.verifyLogin(invalidEmail, invalidPassword);

        Assert.assertEquals(response.getStatusCode(), 200, "Status code should be 200 (as per API behavior).");

        JsonPath jsonPath = new JsonPath(response.asString());
        Assert.assertEquals(jsonPath.getInt("responseCode"), 404, "responseCode in body should be 404 for 'User not found'.");
        Assert.assertEquals(jsonPath.getString("message"), "User not found!", "Error message is not correct.");

        System.out.println("Test correctly verified the 404 User not found error.");
    }
}
