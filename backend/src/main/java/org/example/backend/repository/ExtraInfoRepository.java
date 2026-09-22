package org.example.backend.repository;

import org.example.backend.model.ExtraInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ExtraInfoRepository extends JpaRepository<ExtraInfo, Long> {
    Optional<ExtraInfo> findByProfileId(Long profileId);
}
