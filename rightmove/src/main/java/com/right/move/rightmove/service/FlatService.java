package com.right.move.rightmove.service;

import com.right.move.rightmove.model.FlatImage;
import com.right.move.rightmove.payload.request.CreateFlatRequest;
import com.right.move.rightmove.payload.request.UpdateFlatRequest;
import com.right.move.rightmove.payload.response.FlatResponse;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FlatService {

    // CRUD
    FlatResponse createFlat(CreateFlatRequest request);

    FlatResponse getFlatById(Long id);

    FlatResponse updateFlat(Long id, UpdateFlatRequest request);

    FlatResponse toggleAvailability(Long id);

    void deleteFlat(Long id);

    // Listings
    List<FlatResponse> getAllFlats();

    List<FlatResponse> getAllAvailableFlats();

    Page<FlatResponse> getFlatsPaginated(int page, int size, String sortBy, String direction);

    // Search & Filter
    List<FlatResponse> searchFlats(String city, String state);

    List<FlatResponse> filterFlats(Double minRent, Double maxRent, Integer bedrooms,
                                   String flatType, String furnishingStatus,
                                   Boolean petsAllowed, Boolean parkingAvailable);

    // Images
    void uploadImages(Long flatId, List<MultipartFile> images);

    FlatImage getImageById(Long imageId);

    void deleteImage(Long imageId);

    // Stats
    long countAvailableFlats();

    long countTotalFlats();
}