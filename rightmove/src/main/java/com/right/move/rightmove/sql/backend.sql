
-- Drop tables if they already exist (optional)
DROP TABLE IF EXISTS flat_images;
DROP TABLE IF EXISTS flats;

-- =========================================
-- Table: flats
-- =========================================
CREATE TABLE flats (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    -- Basic Info
    title VARCHAR(255) NOT NULL,
    description TEXT,

    -- Location
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(20),

    -- Pricing
    rent_amount DOUBLE NOT NULL,
    security_deposit DOUBLE,

    -- Property Details
    bedrooms INT NOT NULL,
    bathrooms INT,
    area_sqft DOUBLE,
    flat_type VARCHAR(50),
    furnishing_status VARCHAR(50) NOT NULL,

    -- Amenities
    pets_allowed BOOLEAN DEFAULT FALSE,
    parking_available BOOLEAN DEFAULT FALSE,
    bachelors_allowed BOOLEAN DEFAULT TRUE,
    available BOOLEAN DEFAULT TRUE,

    owner_name VARCHAR(255),
    owner_contact_number VARCHAR(20),

    -- Timestamps
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =========================================
-- Table: flat_images
-- =========================================
CREATE TABLE flat_images (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    file_name VARCHAR(255),
    content_type VARCHAR(100),

    -- Image stored as binary (LONGBLOB for large files)
    data LONGBLOB,

    flat_id BIGINT,

    CONSTRAINT fk_flat_images_flat
        FOREIGN KEY (flat_id)
        REFERENCES flats(id)
        ON DELETE CASCADE
);

-- =========================================
-- Indexes (Recommended for performance)
-- =========================================
CREATE INDEX idx_flat_city ON flats(city);
CREATE INDEX idx_flat_state ON flats(state);
CREATE INDEX idx_flat_rent ON flats(rent_amount);
CREATE INDEX idx_flat_available ON flats(available);

CREATE INDEX idx_flat_images_flat_id ON flat_images(flat_id);
