package com.right.move.rightmove.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "flats")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Flat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ── Basic Info ────────────────────────────────────────────────

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    // ── Location ──────────────────────────────────────────────────

    @Column(nullable = false)
    private String address;     

    @Column(nullable = false)
    private String city;         

    @Column(nullable = false)
    private String state;         
    private String pincode; 

    // ── Pricing ───────────────────────────────────────────────────

    @Column(nullable = false)
    private Double rentAmount;    

    private Double securityDeposit; 

    // ── Property Details ──────────────────────────────────────────

    @Column(nullable = false)
    private Integer bedrooms;

    private Integer bathrooms;

    private Double areaSqft;     

    private String flatType;   


    @Column(nullable = false)
    private String furnishingStatus; 

    // ── Amenities ─────────────────────────────────────────────────

    @Builder.Default
    private Boolean petsAllowed = false;

    @Builder.Default
    private Boolean parkingAvailable = false;

    @Builder.Default
    private Boolean bachelorsAllowed = true;
    private Boolean available=true;
private String ownerName;
private  String ownerContactNumber;
    // ── Status ────────────────────────────────────────────────────



    // ── Timestamps ────────────────────────────────────────────────

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;


    @OneToMany(mappedBy = "flat", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<FlatImage> images = new ArrayList<>();



    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // ── Enums ─────────────────────────────────────────────────────





}