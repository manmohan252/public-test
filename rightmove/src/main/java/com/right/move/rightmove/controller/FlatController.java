package com.right.move.rightmove.controller;

import com.right.move.rightmove.model.FlatImage;
import com.right.move.rightmove.payload.request.CreateFlatRequest;
import com.right.move.rightmove.payload.request.UpdateFlatRequest;
import com.right.move.rightmove.payload.response.FlatResponse;
import com.right.move.rightmove.service.FlatService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/flats")
@RequiredArgsConstructor
public class FlatController {

    private final FlatService flatService;

    // ─────────────────────────────────────────────
    // CREATE
    // ─────────────────────────────────────────────

    @PostMapping
    public ResponseEntity<FlatResponse> createFlat(
            @Valid @RequestBody CreateFlatRequest request
    ) {
        FlatResponse response = flatService.createFlat(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // ─────────────────────────────────────────────
    // READ — single
    // ─────────────────────────────────────────────

    @GetMapping("/{id}")
    public ResponseEntity<FlatResponse> getFlatById(@PathVariable Long id) {
        return ResponseEntity.ok(flatService.getFlatById(id));
    }

    // ─────────────────────────────────────────────
    // READ — listings
    // ─────────────────────────────────────────────

    @GetMapping
    public ResponseEntity<List<FlatResponse>> getAllFlats() {
        return ResponseEntity.ok(flatService.getAllFlats());
    }

    @GetMapping("/available")
    public ResponseEntity<List<FlatResponse>> getAllAvailableFlats() {
        return ResponseEntity.ok(flatService.getAllAvailableFlats());
    }

    @GetMapping("/paginated")
    public ResponseEntity<Page<FlatResponse>> getFlatsPaginated(
            @RequestParam(defaultValue = "0")  int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction
    ) {
        return ResponseEntity.ok(flatService.getFlatsPaginated(page, size, sortBy, direction));
    }

    // ─────────────────────────────────────────────
    // READ — search & filter
    // ─────────────────────────────────────────────

    @GetMapping("/search")
    public ResponseEntity<List<FlatResponse>> searchFlats(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String state
    ) {
        return ResponseEntity.ok(flatService.searchFlats(city, state));
    }

    @GetMapping("/filter")
    public ResponseEntity<List<FlatResponse>> filterFlats(
            @RequestParam(required = false) Double minRent,
            @RequestParam(required = false) Double maxRent,
            @RequestParam(required = false) Integer bedrooms,
            @RequestParam(required = false) String flatType,
            @RequestParam(required = false) String furnishingStatus,
            @RequestParam(required = false) Boolean petsAllowed,
            @RequestParam(required = false) Boolean parkingAvailable
    ) {
        return ResponseEntity.ok(flatService.filterFlats(
                minRent, maxRent, bedrooms,
                flatType, furnishingStatus,
                petsAllowed, parkingAvailable
        ));
    }

    // ─────────────────────────────────────────────
    // UPDATE
    // ─────────────────────────────────────────────

    @PutMapping("/updated/{id}")
    public ResponseEntity<FlatResponse> updateFlat(
            @PathVariable Long id,
            @Valid @RequestBody UpdateFlatRequest request
    ) {
        return ResponseEntity.ok(flatService.updateFlat(id, request));
    }

    @PutMapping("/{id}/toggle-availability")
    public ResponseEntity<FlatResponse> toggleAvailability(@PathVariable Long id) {
        return ResponseEntity.ok(flatService.toggleAvailability(id));
    }

    // ─────────────────────────────────────────────
    // DELETE
    // ─────────────────────────────────────────────

    @DeleteMapping("/delete-flat/{id}")
    public ResponseEntity<Map<String, String>> deleteFlat(@PathVariable Long id) {
        flatService.deleteFlat(id);
        return ResponseEntity.ok(Map.of("message", "Flat deleted successfully"));
    }

    // ─────────────────────────────────────────────
    // IMAGES
    // ─────────────────────────────────────────────

    @PostMapping("/{flatId}/images")
    public ResponseEntity<Map<String, String>> uploadImages(
            @PathVariable Long flatId,
            @RequestParam("images") List<MultipartFile> images
    ) {
        flatService.uploadImages(flatId, images);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Images uploaded successfully"));
    }

    @GetMapping("/images/{imageId}")
    public ResponseEntity<byte[]> getImage(@PathVariable Long imageId) {
        FlatImage image = flatService.getImageById(imageId);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(image.getContentType()));
        headers.setContentLength(image.getData().length);

        return new ResponseEntity<>(image.getData(), headers, HttpStatus.OK);
    }

    @DeleteMapping("/images/{imageId}")
    public ResponseEntity<Map<String, String>> deleteImage(@PathVariable Long imageId) {
        flatService.deleteImage(imageId);
        return ResponseEntity.ok(Map.of("message", "Image deleted successfully"));
    }

    // ─────────────────────────────────────────────
    // STATS
    // ─────────────────────────────────────────────

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getStats() {
        return ResponseEntity.ok(Map.of(
                "totalFlats",     flatService.countTotalFlats(),
                "availableFlats", flatService.countAvailableFlats()
        ));
    }
}