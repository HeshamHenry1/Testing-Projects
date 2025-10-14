package com.automationexercise.api.tests;

import com.automationexercise.api.base.BaseTest;
import com.automationexercise.api.client.ApiClient;
import com.automationexercise.api.pojos.Brand;
import com.automationexercise.api.pojos.BrandsListResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import java.util.List;

import static org.hamcrest.Matchers.*;

public class BrandApiTests extends BaseTest {

    private ApiClient apiClient;

    @BeforeClass
    public void setupClient() {
        apiClient = new ApiClient(baseRequestSpec);
    }



    @Test(description = "Get all brands and verify the list is not empty.", priority = 1)
    public void testGetAllBrandsList() throws JsonProcessingException {
        System.out.println("Executing test: Get All Brands List (Positive)");

        BrandsListResponse brandsResponse = apiClient.getAllBrands();

        Assert.assertEquals(brandsResponse.getResponseCode(), 200, "Response code in JSON should be 200.");
        List<Brand> brandsList = brandsResponse.getBrands();
        Assert.assertFalse(brandsList.isEmpty(), "Brands list should not be empty.");
        System.out.println("Test 'Get All Brands List' was successful!");
    }



    @Test(description = "Verify that PUT method is not allowed for /brandsList endpoint.", priority = 2)
    public void testPutToBrandsListReturns405() {
        System.out.println("Executing test: PUT to /brandsList (Negative)");

        Response response = apiClient.putToBrandsList();

        response.then()
                .assertThat()
                .statusCode(405)
                .body("message", equalTo("This request method is not supported."));

        System.out.println("Test correctly verified that PUT method is rejected with 405.");
    }
}
