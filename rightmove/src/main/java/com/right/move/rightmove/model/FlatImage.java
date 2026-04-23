package com.right.move.rightmove.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;


@Table(name = "flat_images")
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class FlatImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;

    private String contentType;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] data;

    @ManyToOne
    @JoinColumn(name = "flat_id")
    private Flat flat;
}
