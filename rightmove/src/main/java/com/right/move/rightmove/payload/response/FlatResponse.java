package com.right.move.rightmove.payload.response;

import com.right.move.rightmove.model.Flat;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class FlatResponse {

    private Long id;
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
    private Boolean available;
    private String status;
    private List<String> images;
    private String ownerName;
    private  String ownerContactNumber;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}