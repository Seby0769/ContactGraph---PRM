package org.example.backend.controller;

import org.example.backend.model.Profile;
import org.example.backend.repository.ProfileRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class ProfileController {
    ProfileRepository profileRepository;

    public ProfileController(ProfileRepository profileRepository){
        this.profileRepository = profileRepository;
    }

    @GetMapping("/profiles")
    public List<Profile> getProfiles(){
        return profileRepository.findAll();
    }

    @PostMapping("/profiles")
    public ResponseEntity<Profile> createProfile(@RequestBody Profile profile){
        Profile newProfile = profileRepository.save(profile);
        return ResponseEntity.status(HttpStatus.CREATED).body(newProfile);
    }

    @PutMapping("/profiles/{id}")
    public ResponseEntity<Profile> updateProfile(@PathVariable long id, @RequestBody Profile profile){
        Optional<Profile> profileToCheck = profileRepository.findById(id);
        if (profileToCheck.isPresent()){
            Profile profileToUpdate = profileToCheck.get();
            profileToUpdate.setLastName(profile.getLastName());
            profileToUpdate.setFirstName(profile.getFirstName());
            profileToUpdate.setDateOfBirth(profile.getDateOfBirth());
            profileToUpdate.setGender(profile.getGender());
            profileToUpdate.setOccupation(profile.getOccupation());
            profileToUpdate.setCity(profile.getCity());
            profileRepository.save(profileToUpdate);
            return ResponseEntity.status(HttpStatus.OK).body(profileToUpdate);
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(profile);
        }
    }

    @DeleteMapping("/profiles/{id}")
    public ResponseEntity<Void> deleteProfile(@PathVariable long id){
        Optional<Profile> profileToCheck = profileRepository.findById(id);
        if (profileToCheck.isPresent()){
            Profile profileToDelete = profileToCheck.get();
            profileRepository.delete(profileToDelete);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
