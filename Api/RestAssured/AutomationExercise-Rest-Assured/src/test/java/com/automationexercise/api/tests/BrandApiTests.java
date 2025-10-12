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

public class BrandApiTests extends BaseTest {

    private ApiClient apiClient;

    @BeforeClass
    public void setupClient() {
        apiClient = new ApiClient(baseRequestSpec);
    }

    @Test(description = "Get all brands and verify the list is not empty.")
    public void testGetAllBrandsList() throws JsonProcessingException {
        System.out.println("Executing test: Get All Brands List");

        BrandsListResponse brandsResponse = apiClient.getAllBrands();

        Assert.assertEquals(brandsResponse.getResponseCode(), 200, "Response code in JSON should be 200.");

        List<Brand> brandsList = brandsResponse.getBrands();
        Assert.assertNotNull(brandsList, "Brands list should not be null.");
        Assert.assertFalse(brandsList.isEmpty(), "Brands list should not be empty.");
        System.out.println("Successfully received " + brandsList.size() + " brands.");

        Brand firstBrand = brandsList.get(0);
        Assert.assertNotNull(firstBrand.getBrand(), "First brand's name should not be null.");
        Assert.assertTrue(firstBrand.getId() > 0, "First brand's ID should be a positive number.");

        System.out.println("Test 'Get All Brands List' was successful!");
    }


    @Test(description = "Verify that PUT method is not allowed for /brandsList endpoint.", priority = 2)
    public void testPutToBrandsListReturns405() {
        System.out.println("Executing test: PUT to /brandsList (Negative)");

        Response response = apiClient.putToBrandsListWithoutDefaultSpec();

        response.then()
                .assertThat()
                .statusCode(405);

        String responseBody = response.asString().replaceAll("<[^>]*>", "");
        Assert.assertTrue(responseBody.contains("This request method is not supported."));

        System.out.println("Test correctly verified that PUT method is rejected with 405.");
    }
}
