package org.example.backend.repository;

import org.example.backend.controller.ExtraInfoController;
import org.example.backend.model.ExtraInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExtraInfoRepository extends JpaRepository<ExtraInfo, Long> {
    ExtraInfo findByProfileId(Long profileId);
}
