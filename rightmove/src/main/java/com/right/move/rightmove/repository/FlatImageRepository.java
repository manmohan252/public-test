package com.right.move.rightmove.repository;

import com.right.move.rightmove.model.FlatImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlatImageRepository extends JpaRepository<FlatImage, Long> {
}
