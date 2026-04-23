package com.right.move.rightmove.service.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.nio.file.*;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
public class FileStorageService {

    @Value("${app.upload.dir:uploads/flat-images}")
    private String uploadDir;

    private Path rootLocation;

    private static final List<String> ALLOWED_TYPES = Arrays.asList(
            "image/jpeg", "image/jpg", "image/png", "image/webp"
    );

    private static final long MAX_SIZE = 10 * 1024 * 1024; // 10MB

    @PostConstruct
    public void init() {
        rootLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new RuntimeException("Could not create upload folder: " + uploadDir);
        }
    }

    // Save file to disk, return the stored UUID filename
    public String storeFile(MultipartFile file) {
        validate(file);

        String extension = getExtension(file.getOriginalFilename());
        String storedFileName = UUID.randomUUID() + "." + extension;

        try {
            Path target = rootLocation.resolve(storedFileName);
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
            return storedFileName;
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file: " + file.getOriginalFilename());
        }
    }

    // Delete file from disk
    public void deleteFile(String storedFileName) {
        try {
            Path file = rootLocation.resolve(storedFileName).normalize();
            Files.deleteIfExists(file);
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete file: " + storedFileName);
        }
    }

    // Load file path (used by ImageController to serve it)
    public Path loadFilePath(String storedFileName) {
        return rootLocation.resolve(storedFileName).normalize();
    }


    public String buildFileUrl(String storedFileName) {
        return "/api/images/" + storedFileName;
    }



    private void validate(MultipartFile file) {
        if (file == null || file.isEmpty())
            throw new RuntimeException("File is empty");

        if (!ALLOWED_TYPES.contains(file.getContentType()))
            throw new RuntimeException("File type not allowed: " + file.getContentType()
                    + ". Allowed: jpeg, jpg, png, webp");

        if (file.getSize() > MAX_SIZE)
            throw new RuntimeException("File size exceeds 10MB limit");
    }

    private String getExtension(String fileName) {
        if (fileName == null || !fileName.contains(".")) return "jpg";
        return fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
    }
}