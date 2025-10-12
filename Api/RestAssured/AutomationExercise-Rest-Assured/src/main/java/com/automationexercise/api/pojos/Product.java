package com.automationexercise.api.pojos;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Product {

    @JsonProperty("id")
    private int id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("price")
    private String price;

    @JsonProperty("brand")
    private String brand;

    @JsonProperty("category")
    private Category category; // سيستخدم الكلاس الداخلي Category


    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getPrice() { return price; }
    public void setPrice(String price) { this.price = price; }
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }




    public static class Category {

        @JsonProperty("usertype")
        private UserType usertype;

        @JsonProperty("category")
        private String category;


        public UserType getUsertype() { return usertype; }
        public void setUsertype(UserType usertype) { this.usertype = usertype; }
        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }

        public static class UserType {

            @JsonProperty("usertype")
            private String usertype;


            public String getUsertype() { return usertype; }
            public void setUsertype(String usertype) { this.usertype = usertype; }
        }
    }
}
