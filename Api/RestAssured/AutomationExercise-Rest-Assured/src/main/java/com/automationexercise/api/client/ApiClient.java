package com.automationexercise.api.client;

import com.automationexercise.api.pojos.BrandsListResponse;
import com.automationexercise.api.pojos.ProductsListResponse;
import com.automationexercise.api.pojos.User;
import com.automationexercise.api.pojos.UserDetailResponse;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;

import java.util.Map;
@JsonIgnoreProperties(ignoreUnknown = true)
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

    public Response createAccount(User user) {
        Map<String, Object> userAsMap = objectMapper.convertValue(user, new TypeReference<>() {});

        return RestAssured.given()
                .spec(this.requestSpec)
                .accept(ContentType.JSON)
                .formParams(userAsMap)
                .when()
                .post("/createAccount");
    }

    public Response deleteAccount(String email, String password) {
        return RestAssured.given()
                .spec(this.requestSpec)
                .formParam("email", email)
                .formParam("password", password)
                .when()
                .delete("/deleteAccount");
    }

    public Response updateAccount(User user) {
        return RestAssured.given()
                .spec(this.requestSpec)
                .formParam("name", user.getName())
                .formParam("email", user.getEmail())
                .formParam("password", user.getPassword())
                .formParam("title", user.getTitle())
                .formParam("birth_date", user.getBirthDate())
                .formParam("birth_month", user.getBirthMonth())
                .formParam("birth_year", user.getBirthYear())
                .formParam("firstname", user.getFirstName())
                .formParam("lastname", user.getLastName())
                .formParam("company", user.getCompany())
                .formParam("address1", user.getAddress1())
                .formParam("country", user.getCountry())
                .formParam("zipcode", user.getZipcode())
                .formParam("state", user.getState())
                .formParam("city", user.getCity())
                .formParam("mobile_number", user.getMobileNumber())
                .formParam("address2", user.getAddress2() != null ? user.getAddress2() : "")
                .when()
                .put("/updateAccount");
    }

    public UserDetailResponse getUserDetailByEmail(String email) throws JsonProcessingException {
        Response response = RestAssured.given()
                .spec(this.requestSpec)
                .header("User-Agent", "MyTestFramework/1.0")
                .queryParam("email", email)
                .when()
                .get("/getUserDetailByEmail");

        System.out.println("Response Body from getUserDetailByEmail: " + response.getBody().asString());

        response.then().assertThat().statusCode(200);
        String jsonString = extractJsonFromHtml(response);
        return objectMapper.readValue(jsonString, UserDetailResponse.class);
    }
}
