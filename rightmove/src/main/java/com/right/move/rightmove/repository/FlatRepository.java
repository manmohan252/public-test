package com.right.move.rightmove.repository;

import com.right.move.rightmove.model.Flat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlatRepository extends JpaRepository<Flat, Long> {

    List<Flat> findByAvailableTrue();
    List<Flat> findByCityIgnoreCase(String city);
    List<Flat> findByStateIgnoreCase(String state);
    List<Flat> findByCityIgnoreCaseAndStateIgnoreCase(String city, String state);
    long countByAvailableTrue();
}