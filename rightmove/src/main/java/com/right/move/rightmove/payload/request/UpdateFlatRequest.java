package com.right.move.rightmove.payload.request;

import lombok.Data;

@Data
public class UpdateFlatRequest {
    private String title;
    private String description;
    private String address;
    private String city;
    private String state;
    private String pincode;
    private Double rentAmount;
    private Integer bedrooms;
    private Integer bathrooms;
    private Double areaSqft;
    private String flatType;
    private String furnishingStatus;
    private Boolean petsAllowed;
    private Boolean parkingAvailable;
    private String ownerName;
    private  String ownerContactNumber;
}