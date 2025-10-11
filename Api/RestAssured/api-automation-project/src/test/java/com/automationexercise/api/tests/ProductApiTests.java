package com.automationexercise.api.tests;

import com.automationexercise.api.base.BaseTest;
import com.automationexercise.api.client.ApiClient;
import com.automationexercise.api.pojos.Product;
import com.automationexercise.api.pojos.ProductsListResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import java.util.List;

public class ProductApiTests extends BaseTest {

    private ApiClient apiClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeClass
    public void setupClient() {
        apiClient = new ApiClient(baseRequestSpec);
    }

    @Test(description = "Get all products and verify the list is not empty.", priority = 1)
    public void testGetAllProductsList() throws JsonProcessingException {
        System.out.println("Executing test: Get All Products List (Positive)");

        ProductsListResponse productsResponse = apiClient.getAllProducts();

        Assert.assertEquals(productsResponse.getResponseCode(), 200, "Response code in JSON should be 200.");
        List<Product> productList = productsResponse.getProducts();
        Assert.assertFalse(productList.isEmpty(), "Products list should not be empty.");
        System.out.println("Test 'Get All Products List' was successful!");
    }

    @Test(description = "Verify that a raw POST to /productsList is rejected with 405.", priority = 2)
    public void testRawPostToProductsListReturns405() {
        System.out.println("Executing test: Raw POST to /productsList (Negative)");

        Response response = apiClient.postToProductsListWithoutDefaultSpec();

        response.then()
                .assertThat()
                .statusCode(405);


        String jsonString = response.asString().replaceAll("<[^>]*>", "");
        Assert.assertTrue(jsonString.contains("This request method is not supported."));

        System.out.println("Test correctly verified that a raw POST is rejected with 405.");
    }
}