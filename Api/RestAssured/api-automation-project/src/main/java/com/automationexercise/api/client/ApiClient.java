package com.automationexercise.api.client;

import com.automationexercise.api.pojos.BrandsListResponse;
import com.automationexercise.api.pojos.ProductsListResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;

public class ApiClient {

    private final RequestSpecification requestSpec;
    private final ObjectMapper objectMapper = new ObjectMapper();


    public ApiClient(RequestSpecification spec) {
        this.requestSpec = spec;
    }

    private String extractJsonFromHtml(Response response) {
        String htmlResponse = response.asString();
        return htmlResponse.replaceAll("<[^>]*>", "");
    }


    public ProductsListResponse getAllProducts() throws JsonProcessingException {
        Response response = RestAssured.given()
                .spec(this.requestSpec)
                .when()
                .get("/productsList");

        response.then().assertThat().statusCode(200);
        String jsonString = extractJsonFromHtml(response);
        return objectMapper.readValue(jsonString, ProductsListResponse.class);
    }


    public Response postToProductsListWithoutDefaultSpec() {
        return RestAssured.given()
                .baseUri("https://automationexercise.com/api" )
                .when()
                .post("/productsList");
    }

    public BrandsListResponse getAllBrands() throws JsonProcessingException {
        Response response = RestAssured.given()
                .spec(this.requestSpec)
                .when()
                .get("/brandsList"); // <-- تغيير الـ Endpoint هنا

        response.then().assertThat().statusCode(200);
        String jsonString = extractJsonFromHtml(response);
        return objectMapper.readValue(jsonString, BrandsListResponse.class);
    }

    public Response putToBrandsListWithoutDefaultSpec() {
        return RestAssured.given()
                .baseUri("https://automationexercise.com/api" )
                .when()
                .put("/brandsList");
    }
}
