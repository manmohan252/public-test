package com.right.move.rightmove.service.impl;

import com.right.move.rightmove.exception.BadRequestException;
import com.right.move.rightmove.model.Flat;
import com.right.move.rightmove.model.FlatImage;
import com.right.move.rightmove.payload.request.CreateFlatRequest;
import com.right.move.rightmove.payload.request.UpdateFlatRequest;
import com.right.move.rightmove.payload.response.FlatResponse;
import com.right.move.rightmove.repository.FlatImageRepository;
import com.right.move.rightmove.repository.FlatRepository;
import com.right.move.rightmove.service.FlatService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FlatServiceImpl implements FlatService {

    private final FlatRepository flatRepository;
    private final FlatImageRepository flatImageRepository;

    // ─────────────────────────────────────────────
    // CREATE
    // ─────────────────────────────────────────────

    @Override
    @Transactional
    public FlatResponse createFlat(CreateFlatRequest request) {
        Flat flat = Flat.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .address(request.getAddress())
                .city(request.getCity())
                .state(request.getState())
                .pincode(request.getPincode())
                .rentAmount(request.getRentAmount())
                .bedrooms(request.getBedrooms())
                .bathrooms(request.getBathrooms())
                .areaSqft(request.getAreaSqft())
                .flatType(request.getFlatType())
                .furnishingStatus(request.getFurnishingStatus())
                .petsAllowed(request.getPetsAllowed() != null ? request.getPetsAllowed() : false)
                .parkingAvailable(request.getParkingAvailable() != null ? request.getParkingAvailable() : false)
                .available(true)
                .ownerName(request.getOwnerName())
                .ownerContactNumber(request.getOwnerContactNumber())
                .build();

        return mapToResponse(flatRepository.save(flat));
    }

    // ─────────────────────────────────────────────
    // READ — single
    // ─────────────────────────────────────────────

    @Override
    public FlatResponse getFlatById(Long id) {
        return mapToResponse(findFlatOrThrow(id));
    }

    // ─────────────────────────────────────────────
    // READ — listings
    // ─────────────────────────────────────────────

    @Override
    public List<FlatResponse> getAllFlats() {
        return flatRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<FlatResponse> getAllAvailableFlats() {
        return flatRepository.findByAvailableTrue()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public Page<FlatResponse> getFlatsPaginated(int page, int size, String sortBy, String direction) {
        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return flatRepository.findAll(pageable).map(this::mapToResponse);
    }


    @Override
    public List<FlatResponse> searchFlats(String city, String state) {
        if (city != null && state != null) {
            return flatRepository.findByCityIgnoreCaseAndStateIgnoreCase(city, state)
                    .stream().map(this::mapToResponse).toList();
        } else if (city != null) {
            return flatRepository.findByCityIgnoreCase(city)
                    .stream().map(this::mapToResponse).toList();
        } else if (state != null) {
            return flatRepository.findByStateIgnoreCase(state)
                    .stream().map(this::mapToResponse).toList();
        }
        return getAllAvailableFlats();
    }

    @Override
    public List<FlatResponse> filterFlats(
            Double minRent,
            Double maxRent,
            Integer bedrooms,
            String flatType,
            String furnishingStatus,
            Boolean petsAllowed,
            Boolean parkingAvailable
    ) {
        return flatRepository.findAll()
                .stream()
                .filter(f -> minRent == null || f.getRentAmount() >= minRent)
                .filter(f -> maxRent == null || f.getRentAmount() <= maxRent)
                .filter(f -> bedrooms == null || f.getBedrooms().equals(bedrooms))
                .filter(f -> flatType == null || f.getFlatType().equalsIgnoreCase(flatType))
                .filter(f -> furnishingStatus == null || furnishingStatus.equalsIgnoreCase(f.getFurnishingStatus()))
                .filter(f -> petsAllowed == null || f.getPetsAllowed().equals(petsAllowed))
                .filter(f -> parkingAvailable == null || f.getParkingAvailable().equals(parkingAvailable))
                .map(this::mapToResponse)
                .toList();
    }



    @Override
    @Transactional
    public FlatResponse updateFlat(Long id, UpdateFlatRequest request) {
        Flat flat = findFlatOrThrow(id);

        if (request.getTitle() != null) flat.setTitle(request.getTitle());
        if (request.getDescription() != null) flat.setDescription(request.getDescription());
        if (request.getAddress() != null) flat.setAddress(request.getAddress());
        if (request.getCity() != null) flat.setCity(request.getCity());
        if (request.getState() != null) flat.setState(request.getState());
        if (request.getPincode() != null) flat.setPincode(request.getPincode());
        if (request.getRentAmount() != null) flat.setRentAmount(request.getRentAmount());
        if (request.getBedrooms() != null) flat.setBedrooms(request.getBedrooms());
        if (request.getBathrooms() != null) flat.setBathrooms(request.getBathrooms());
        if (request.getAreaSqft() != null) flat.setAreaSqft(request.getAreaSqft());
        if (request.getFlatType() != null) flat.setFlatType(request.getFlatType());
        if (request.getFurnishingStatus() != null) flat.setFurnishingStatus(request.getFurnishingStatus());
        if (request.getPetsAllowed() != null) flat.setPetsAllowed(request.getPetsAllowed());
        if (request.getParkingAvailable() != null) flat.setParkingAvailable(request.getParkingAvailable());
        if(request.getOwnerName()!=null) flat.setOwnerName(request.getOwnerName());
        if(request.getOwnerContactNumber()!=null) flat.setOwnerName(request.getOwnerContactNumber());
        return mapToResponse(flatRepository.save(flat));
    }

    @Override
    @Transactional
    public FlatResponse toggleAvailability(Long id) {
        Flat flat = findFlatOrThrow(id);
        flat.setAvailable(!flat.getAvailable());
        return mapToResponse(flatRepository.save(flat));
    }


    @Override
    @Transactional
    public void deleteFlat(Long id) {
        if (!flatRepository.existsById(id)) {
            throw new RuntimeException("Flat not found with id: " + id);
        }
        flatRepository.deleteById(id);
    }



    @Override
    @Transactional
    public void uploadImages(Long flatId, List<MultipartFile> images) {

        if (images == null || images.isEmpty()) {
            throw new RuntimeException("No images provided");
        }


        Flat flat = flatRepository.findById(flatId)
                .orElseThrow(() -> new RuntimeException("Flat not found"));

        List<FlatImage> imageList = new ArrayList<>();

        for (MultipartFile file : images) {
            try {

                FlatImage image = FlatImage.builder()
                        .fileName(file.getOriginalFilename())

                        .contentType(
                                file.getContentType() != null ? file.getContentType() : "image/jpeg"
                        )
                        .data(file.getBytes())
                        .flat(flat)
                        .build();

                imageList.add(image);

            } catch (IOException e) {
                e.printStackTrace(); // debugging
                throw new RuntimeException("Failed to upload: " + file.getOriginalFilename());
            }
        }


        flatImageRepository.saveAll(imageList);
    }

    @Override
    public FlatImage getImageById(Long imageId) {
        return flatImageRepository.findById(imageId)
                .orElseThrow(() -> new RuntimeException("Image not found with id: " + imageId));
    }

    @Override
    @Transactional
    public void deleteImage(Long imageId) {
        if (!flatImageRepository.existsById(imageId)) {
            throw new RuntimeException("Image not found with id: " + imageId);
        }
        flatImageRepository.deleteById(imageId);
    }


    @Override
    public long countAvailableFlats() {
        return flatRepository.countByAvailableTrue();
    }

    @Override
    public long countTotalFlats() {
        return flatRepository.count();
    }

  
    private Flat findFlatOrThrow(Long id) {
        return flatRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Flat not found with id: " + id));
    }

    private FlatResponse mapToResponse(Flat flat) {
        List<String> imageUrls = new ArrayList<>();
        if (flat.getImages() != null) {
            for (FlatImage img : flat.getImages()) {
                imageUrls.add("/api/flats/images/" + img.getId());
            }
        }

        return FlatResponse.builder()
                .id(flat.getId())
                .title(flat.getTitle())
                .description(flat.getDescription())
                .address(flat.getAddress())
                .city(flat.getCity())
                .state(flat.getState())
                .pincode(flat.getPincode())
                .rentAmount(flat.getRentAmount())
                .bedrooms(flat.getBedrooms())
                .bathrooms(flat.getBathrooms())
                .areaSqft(flat.getAreaSqft())
                .flatType(flat.getFlatType())
                .furnishingStatus(flat.getFurnishingStatus())
                .petsAllowed(flat.getPetsAllowed())
                .parkingAvailable(flat.getParkingAvailable())
                .available(flat.getAvailable())
                .ownerName(flat.getOwnerName())
                .ownerContactNumber(flat.getOwnerContactNumber())
                .images(imageUrls)
                .build();
    }
}