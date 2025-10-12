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
import static org.hamcrest.Matchers.*;

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

    @Test(description = "Search for a product and verify the results.", priority = 2)
    public void testSearchForProduct() throws JsonProcessingException {
        System.out.println("Executing test: Search for a product");
        String searchTerm = "Blue Top";

        ProductsListResponse searchResponse = apiClient.searchForProduct(searchTerm);

        Assert.assertEquals(searchResponse.getResponseCode(), 200, "Response code in JSON should be 200.");

        List<Product> foundProducts = searchResponse.getProducts();
        Assert.assertNotNull(foundProducts, "Search results list should not be null.");
        Assert.assertFalse(foundProducts.isEmpty(), "Search for '" + searchTerm + "' should return at least one product.");
        System.out.println("Successfully found " + foundProducts.size() + " product(s) for search term '" + searchTerm + "'.");

        Product firstResult = foundProducts.get(0);
        Assert.assertTrue(
                firstResult.getName().toLowerCase().contains(searchTerm.toLowerCase()),
                "The product name '" + firstResult.getName() + "' should contain the search term '" + searchTerm + "'."
        );

        System.out.println("Test 'Search for a product' was successful!");
    }

    @Test(description = "Verify error for a raw search request without a parameter.", priority = 3)
    public void testRawSearchProductWithoutParameterReturnsError() {
        System.out.println("Executing test: Raw Search product without parameter (Negative)");

        Response response = apiClient.searchProductRaw();

        response.then()
                .assertThat()
                .statusCode(400);

        String responseBody = response.asString().replaceAll("<[^>]*>", "");
        Assert.assertTrue(responseBody.contains("Bad request, search_product parameter is missing in POST request."));

        System.out.println("Test correctly verified the 400 Bad Request error for a raw request.");
    }
}