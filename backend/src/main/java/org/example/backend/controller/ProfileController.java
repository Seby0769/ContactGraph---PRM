package org.example.backend.controller;

import org.example.backend.model.Profile;
import org.example.backend.repository.ProfileRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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
}
