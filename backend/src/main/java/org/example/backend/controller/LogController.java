package org.example.backend.controller;
import org.example.backend.model.Log;
import org.example.backend.dto.LogRequest_DTO;
import org.example.backend.dto.LogResponse_DTO;
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

    @PutMapping("/logs/{id}")
    public ResponseEntity<LogResponse_DTO> updatedLog(@PathVariable long id, @RequestBody LogRequest_DTO log){
        Optional<Log> logToCheck = logRepository.findById(id);
        if (logToCheck.isPresent()){
            Log logToUpdate = logToCheck.get();
            logToUpdate.setDateOfLog(LocalDate.parse(log.getDateOfLog()));
            logToUpdate.setTimeOfLog(LocalTime.parse(log.getTimeOfLog()));
            logToUpdate.setLocation(log.getLocation());
            logToUpdate.setSubject(log.getSubject());
            logToUpdate.setBehavior(log.getBehavior());
            logToUpdate.setNotes(log.getNotes());
            logRepository.save(logToUpdate);
            LogResponse_DTO logUpdated = new LogResponse_DTO(logToUpdate);

            return ResponseEntity.status(HttpStatus.OK).body(logUpdated);
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/logs/{id}")
    public ResponseEntity<Void> deleteLog (@PathVariable long id){
        Optional<Log> logToCheck = logRepository.findById(id);
        if (logToCheck.isPresent()){
            Log logToDelete = logToCheck.get();
            logRepository.delete(logToDelete);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
