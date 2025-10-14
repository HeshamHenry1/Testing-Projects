package com.automationexercise.api.client;

import com.automationexercise.api.pojos.BrandsListResponse;
import com.automationexercise.api.pojos.ProductsListResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
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

    // =================================================================
    //      جميع الدوال الآن لا تحتوي على User-Agent وتتوقع النجاح
    // =================================================================

    public ProductsListResponse getAllProducts() throws JsonProcessingException {
        Response response = RestAssured.given()
                .spec(this.requestSpec)
                .when()
                .get("/productsList");

        response.then().assertThat().statusCode(200);
        String jsonString = extractJsonFromHtml(response);
        return objectMapper.readValue(jsonString, ProductsListResponse.class);
    }

    public BrandsListResponse getAllBrands() throws JsonProcessingException {
        Response response = RestAssured.given()
                .spec(this.requestSpec)
                .when()
                .get("/brandsList");

        response.then().assertThat().statusCode(200);
        String jsonString = extractJsonFromHtml(response);
        return objectMapper.readValue(jsonString, BrandsListResponse.class);
    }

    public ProductsListResponse searchForProduct(String searchTerm) throws JsonProcessingException {
        Response response = RestAssured.given()
                .spec(this.requestSpec)
                .formParam("search_product", searchTerm)
                .when()
                .post("/searchProduct");

        response.then().assertThat().statusCode(200);
        String jsonString = extractJsonFromHtml(response);
        return objectMapper.readValue(jsonString, ProductsListResponse.class);
    }

    public Response putToBrandsList() {
        return RestAssured.given()
                .spec(this.requestSpec)
                .when()
                .put("/brandsList");
    }

    public Response searchProductWithoutParameter() {
        return RestAssured.given()
                .spec(this.requestSpec)
                .when()
                .post("/searchProduct");
    }


    public Response verifyLogin(String email, String password ) {
        return RestAssured.given()
                .spec(this.requestSpec)
                .accept(ContentType.JSON)
                .formParam("email", email)
                .formParam("password", password)
                .when()
                .post("/verifyLogin");
    }

    public Response verifyLoginWithoutEmail(String password) {
        return RestAssured.given()
                .spec(this.requestSpec)
                .accept(ContentType.JSON)
                .formParam("password", password)
                .when()
                .post("/verifyLogin");
    }

    public Response deleteToVerifyLogin() {
        return RestAssured.given()
                .spec(this.requestSpec)
                .accept(ContentType.JSON)
                .when()
                .delete("/verifyLogin");
    }
}
