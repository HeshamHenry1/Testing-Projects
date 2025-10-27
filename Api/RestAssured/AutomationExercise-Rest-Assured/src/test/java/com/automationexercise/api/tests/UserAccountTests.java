package com.automationexercise.api.tests;

import com.automationexercise.api.base.BaseTest;
import com.automationexercise.api.client.ApiClient;
import com.automationexercise.api.pojos.User;
import com.github.javafaker.Faker;
import io.restassured.path.json.JsonPath;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.automationexercise.api.pojos.UserDetailResponse;
public class UserAccountTests extends BaseTest {

    private ApiClient apiClient;
    private Faker faker;

    @BeforeClass
    public void setupClient() {
        apiClient = new ApiClient(baseRequestSpec);
        faker = new Faker();
    }

    @Test(description = "Create a new user account with random data.")
    public void testCreateUserAccount() {
        System.out.println("Executing test: Create User Account (Positive)");

        User newUser = new User();
        newUser.setName(faker.name().fullName());
        newUser.setEmail(faker.internet().emailAddress());
        newUser.setPassword(faker.internet().password(8, 16));
        newUser.setTitle("Mr");
        newUser.setBirthDate(String.valueOf(faker.number().numberBetween(1, 28)));
        newUser.setBirthMonth("January");
        newUser.setBirthYear(String.valueOf(faker.number().numberBetween(1980, 2005)));
        newUser.setFirstName(faker.name().firstName());
        newUser.setLastName(faker.name().lastName());
        newUser.setCompany(faker.company().name());
        newUser.setAddress1(faker.address().streetAddress());
        newUser.setCountry("United States");
        newUser.setState(faker.address().state());
        newUser.setCity(faker.address().city());
        newUser.setZipcode(faker.address().zipCode());
        newUser.setMobileNumber(faker.phoneNumber().cellPhone());

        System.out.println("Creating user with email: " + newUser.getEmail());

        Response response = apiClient.createAccount(newUser);

        Assert.assertEquals(response.getStatusCode(), 200);

        JsonPath jsonPath = new JsonPath(response.asString());
        Assert.assertEquals(jsonPath.getInt("responseCode"), 201, "responseCode in body should be 201.");
        Assert.assertEquals(jsonPath.getString("message"), "User created!", "Success message is not correct.");

        System.out.println("Test 'Create User Account' was successful!");
    }

    @Test(description = "Create and then delete a user account.", priority = 2)
    public void testCreateThenDeleteUserAccount() {
        System.out.println("Executing test: Create and then Delete User Account (Full Lifecycle)");

        User newUser = new User();
        String userEmail = faker.internet().emailAddress();
        String userPassword = faker.internet().password(8, 16);

        newUser.setName(faker.name().fullName());
        newUser.setEmail(userEmail);
        newUser.setPassword(userPassword);
        newUser.setTitle("Mrs");
        newUser.setBirthDate(String.valueOf(faker.number().numberBetween(1, 28)));
        newUser.setBirthMonth("May");
        newUser.setBirthYear(String.valueOf(faker.number().numberBetween(1980, 2005)));
        newUser.setFirstName(faker.name().firstName());
        newUser.setLastName(faker.name().lastName());
        newUser.setCompany(faker.company().name());
        newUser.setAddress1(faker.address().streetAddress());
        newUser.setCountry("Canada");
        newUser.setState(faker.address().state());
        newUser.setCity(faker.address().city());
        newUser.setZipcode(faker.address().zipCode());
        newUser.setMobileNumber(faker.phoneNumber().cellPhone());

        System.out.println("Attempting to create user: " + userEmail);
        Response createResponse = apiClient.createAccount(newUser);
        Assert.assertEquals(createResponse.getStatusCode(), 200);
        JsonPath createJson = new JsonPath(createResponse.asString());
        Assert.assertEquals(createJson.getInt("responseCode"), 201, "User creation failed.");
        System.out.println("User successfully created.");


        System.out.println("Attempting to delete user: " + userEmail);
        Response deleteResponse = apiClient.deleteAccount(userEmail, userPassword);

        deleteResponse.then()
                .assertThat()
                .statusCode(200);

        JsonPath deleteJson = new JsonPath(deleteResponse.asString());
        Assert.assertEquals(deleteJson.getInt("responseCode"), 200, "Response code in delete body should be 200.");
        Assert.assertEquals(deleteJson.getString("message"), "Account deleted!", "Delete success message is incorrect.");

        System.out.println("Test 'Create and Delete User' was successful!");
    }

    @Test(description = "Create, update, and then delete a user account.", priority = 3)
    public void testCreateUpdateDeleteUserLifecycle() {
        System.out.println("Executing test: Create, Update, and Delete User Account (Full Lifecycle)");


        User user = new User();
        String userEmail = faker.internet().emailAddress();
        String userPassword = faker.internet().password(8, 16);
        String originalFirstName = faker.name().firstName();

        user.setName(faker.name().fullName());
        user.setEmail(userEmail);
        user.setPassword(userPassword);
        user.setTitle("Mr");
        user.setBirthDate("10");
        user.setBirthMonth("July");
        user.setBirthYear("1990");
        user.setFirstName(originalFirstName);
        user.setLastName(faker.name().lastName());
        user.setCompany(faker.company().name());
        user.setAddress1(faker.address().streetAddress());
        user.setCountry("Australia");
        user.setState(faker.address().state());
        user.setCity(faker.address().city());
        user.setZipcode(faker.address().zipCode());
        user.setMobileNumber(faker.phoneNumber().cellPhone());

        System.out.println("Attempting to create user: " + userEmail);
        Response createResponse = apiClient.createAccount(user);
        Assert.assertEquals(createResponse.getStatusCode(), 200);
        JsonPath createJson = new JsonPath(createResponse.asString());
        Assert.assertEquals(createJson.getInt("responseCode"), 201, "User creation failed.");
        System.out.println("User successfully created with name: " + originalFirstName);


        String updatedFirstName = "UpdatedName" + faker.number().digits(3);
        System.out.println("Attempting to update user's first name to: " + updatedFirstName);
        user.setFirstName(updatedFirstName);

        Response updateResponse = apiClient.updateAccount(user);

        updateResponse.then().assertThat().statusCode(200);
        JsonPath updateJson = new JsonPath(updateResponse.asString());
        Assert.assertEquals(updateJson.getInt("responseCode"), 200, "Response code in update body should be 200.");
        Assert.assertEquals(updateJson.getString("message"), "User updated!", "Update success message is incorrect.");
        System.out.println("User successfully updated.");


        System.out.println("Attempting to delete user: " + userEmail);
        Response deleteResponse = apiClient.deleteAccount(userEmail, userPassword);
        deleteResponse.then().assertThat().statusCode(200);
        System.out.println("User successfully deleted.");

        System.out.println("Test 'Create, Update, Delete Lifecycle' was successful!");
    }

    @Test(description = "Create, Read, and Delete a user account.", priority = 4)
    public void testCreateReadDeleteUserLifecycle() throws JsonProcessingException, InterruptedException {
        System.out.println("Executing test: Create, Read, and Delete User Account (Full Lifecycle)");

        User userToCreate = new User();
        String userEmail = faker.internet().emailAddress();
        String userPassword = faker.internet().password(8, 16);
        String userFirstName = faker.name().firstName();

        userToCreate.setName(faker.name().fullName());
        userToCreate.setEmail(userEmail);
        userToCreate.setPassword(userPassword);
        userToCreate.setFirstName(userFirstName);
        userToCreate.setTitle("Mr");
        userToCreate.setBirthDate(String.valueOf(faker.number().numberBetween(1, 28)));
        userToCreate.setBirthMonth("April");
        userToCreate.setBirthYear(String.valueOf(faker.number().numberBetween(1980, 2005)));
        userToCreate.setLastName(faker.name().lastName());
        userToCreate.setCompany(faker.company().name());
        userToCreate.setAddress1(faker.address().streetAddress());
        userToCreate.setCountry("United States");
        userToCreate.setState(faker.address().state());
        userToCreate.setCity(faker.address().city());
        userToCreate.setZipcode(faker.address().zipCode());
        userToCreate.setMobileNumber(faker.phoneNumber().cellPhone());

        System.out.println("Attempting to create user: " + userEmail);
        Response createResponse = apiClient.createAccount(userToCreate);
        System.out.println("Create User Response Body: " + createResponse.getBody().asString());

        Assert.assertEquals(createResponse.getStatusCode(), 200, "Create account API call failed.");
        JsonPath createJson = new JsonPath(createResponse.asString());
        Assert.assertEquals(createJson.getInt("responseCode"), 201, "User creation failed in response body.");
        System.out.println("User successfully created.");

        UserDetailResponse detailResponse = null;
        int maxRetries = 5;
        int retryCount = 0;

        System.out.println("Attempting to get details for user: " + userEmail + " with retry mechanism...");

        while (retryCount < maxRetries) {
            detailResponse = apiClient.getUserDetailByEmail(userEmail);
            if (detailResponse != null && detailResponse.getResponseCode() == 200) {
                System.out.println("Success! User found on attempt " + (retryCount + 1));
                break;
            }
            System.out.println("Attempt " + (retryCount + 1) + " failed. User not found. Retrying in 2 seconds...");
            Thread.sleep(2000);
            retryCount++;
        }

        Assert.assertNotNull(detailResponse, "User details response is null after all retries.");
        Assert.assertEquals(detailResponse.getResponseCode(), 200, "Failed to get user details with code 200 even after retries.");

        User fetchedUser = detailResponse.getUser();
        Assert.assertNotNull(fetchedUser, "User object in response is null.");

        Assert.assertEquals(fetchedUser.getEmail(), userEmail, "Fetched email does not match created email.");


        System.out.println("Successfully fetched and verified user details.");

        System.out.println("Attempting to delete user: " + userEmail);
        Response deleteResponse = apiClient.deleteAccount(userEmail, userPassword);
        deleteResponse.then().assertThat().statusCode(200);
        JsonPath deleteJson = new JsonPath(deleteResponse.asString());
        Assert.assertEquals(deleteJson.getInt("responseCode"), 200, "Delete response code in body should be 200.");
        Assert.assertEquals(deleteJson.getString("message"), "Account deleted!", "Delete success message is incorrect.");
        System.out.println("User successfully deleted.");

        System.out.println("Test 'Create, Read, Delete Lifecycle' was successful!");
    }
}
