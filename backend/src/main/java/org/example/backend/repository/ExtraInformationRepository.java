package org.example.backend.repository;

import org.example.backend.model.ExtraInformation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExtraInformationRepository extends JpaRepository<ExtraInformation, Long> {
}
