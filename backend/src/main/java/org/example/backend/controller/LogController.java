package org.example.backend.controller;
import org.apache.commons.logging.LogFactory;
import org.example.backend.model.Log;
import org.example.backend.model.LogRequest_DTO;
import org.example.backend.model.LogResponse_DTO;
import org.example.backend.model.Profile;
import org.example.backend.repository.LogRepository;
import org.example.backend.repository.ProfileRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class LogController {
    private static final org.apache.commons.logging.Log log = LogFactory.getLog(LogController.class);
    LogRepository logRepository;
    ProfileRepository profileRepository;

    public LogController(LogRepository logRepository, ProfileRepository profileRepository){
        this.logRepository = logRepository;
        this.profileRepository = profileRepository;
    }

    @PostMapping("/logs")
    public ResponseEntity<LogResponse_DTO> createLog(@RequestBody LogRequest_DTO dto){
        Optional<Profile> profile = profileRepository.findById(dto.getProfileId());
        if (profile.isPresent()){
            Profile searchedProfile = profile.get();
            Log log = new Log(searchedProfile, LocalDate.parse(dto.getDateOfLog()), LocalTime.parse(dto.getTimeOfLog()), dto.getLocation(), dto.getSubject(), dto.getBehavior(), dto.getNotes());
            Log newLog = logRepository.save(log);
            LogResponse_DTO showLog = new LogResponse_DTO(newLog);
            return ResponseEntity.status(HttpStatus.CREATED).body(showLog);
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/profiles/{id}/logs")
    public ResponseEntity<List<LogResponse_DTO>> getLogs(@PathVariable long id){
        Optional<Profile> checkProfile = profileRepository.findById(id);
        if (checkProfile.isPresent()){
            List<LogResponse_DTO> response = logRepository.findAllByProfileId(id)
                                                .stream()
                                                .map(log -> new LogResponse_DTO(log))
                                                .collect(Collectors.toList());
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

}
