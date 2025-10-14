package com.automationexercise.api.tests;

import com.automationexercise.api.base.BaseTest;
import com.automationexercise.api.client.ApiClient;
import com.automationexercise.api.pojos.ProductsListResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import static org.hamcrest.Matchers.*;

public class ProductApiTests extends BaseTest {

    private ApiClient apiClient;

    @BeforeClass
    public void setupClient() {
        apiClient = new ApiClient(baseRequestSpec);
    }

    @Test(description = "Get all products and verify the list is not empty.", priority = 1)
    public void testGetAllProductsList() throws JsonProcessingException {
        System.out.println("Executing test: Get All Products List (Positive)");
        ProductsListResponse productsResponse = apiClient.getAllProducts();
        Assert.assertEquals(productsResponse.getResponseCode(), 200);
        Assert.assertFalse(productsResponse.getProducts().isEmpty());
        System.out.println("Test 'Get All Products List' was successful!");
    }

    @Test(description = "Search for a product and verify the results.", priority = 2)
    public void testSearchForProduct() throws JsonProcessingException {
        System.out.println("Executing test: Search for a product");
        ProductsListResponse searchResponse = apiClient.searchForProduct("Blue Top");
        Assert.assertEquals(searchResponse.getResponseCode(), 200);
        Assert.assertFalse(searchResponse.getProducts().isEmpty());
        System.out.println("Test 'Search for a product' was successful!");
    }

    @Test(description = "Verify that PUT method is not allowed for /productsList endpoint.", priority = 3)
    public void testPutToProductsListReturns405() {
        System.out.println("Executing test: PUT to /productsList (Negative)");
        Response response = apiClient.putToBrandsList();

        response.then()
                .assertThat()
                .statusCode(405)
                .body("message", equalTo("This request method is not supported."));
        System.out.println("Test correctly verified that PUT method is rejected with 405.");
    }

    @Test(description = "Verify error for searching without a parameter.", priority = 4)
    public void testSearchProductWithoutParameterReturnsError() {
        System.out.println("Executing test: Search product without parameter (Negative)");
        Response response = apiClient.searchProductWithoutParameter();

        response.then()
                .assertThat()
                .statusCode(400)
                .body("message", equalTo("Bad request, search_product parameter is missing in POST request."));
        System.out.println("Test correctly verified the 400 Bad Request error.");
    }
}
