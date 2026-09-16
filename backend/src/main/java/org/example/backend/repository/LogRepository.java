package org.example.backend.repository;

import org.example.backend.model.Log;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LogRepository extends JpaRepository<Log, Long> {
    List<Log> findAllByProfileId(Long profileId);
}
