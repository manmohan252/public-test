package com.right.move.rightmove.payload.request;

import com.right.move.rightmove.model.Flat;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateFlatRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "State is required")
    private String state;

    private String pincode;

    @NotNull(message = "Rent amount is required")
    @Min(value = 0, message = "Rent must be positive")
    private Double rentAmount;

    @NotNull(message = "Bedrooms count is required")
    @Min(value = 1, message = "At least 1 bedroom required")
    private Integer bedrooms;

    private Integer bathrooms;

    private Double areaSqft;

    @NotNull(message = "Flat type is required")
    private String flatType;

    private String furnishingStatus; // FURNISHED, SEMI_FURNISHED, UNFURNISHED

    private Boolean petsAllowed;

    private Boolean parkingAvailable;
    private String ownerName;
    private  String ownerContactNumber;
}