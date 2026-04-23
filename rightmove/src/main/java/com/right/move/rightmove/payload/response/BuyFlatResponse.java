package com.right.move.rightmove.payload.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
@Data
@Builder

public class BuyFlatResponse {
    private Long id;
    private String title;
    private String description;
    private String address;
    private String city;
    private String state;
    private String pincode;
    private Double sellAmount;
    private Integer bedrooms;
    private Integer bathrooms;
    private Double areaSqft;
    private String flatType;
    private String furnishingStatus;
    private Boolean parkingAvailable;
    private Boolean available;
    private List<String> images;
    private String ownerName;
    private  String ownerContactNumber;
}
