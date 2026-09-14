//package org.example.backend.controller;
//
//import org.example.backend.model.Profile;
//import org.example.backend.repository.ProfileRepository;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;
//
//import java.time.LocalDate;
//
//@Component
//public class OneTimePost implements CommandLineRunner {
//
//    ProfileRepository profileRepository;
//    public OneTimePost(ProfileRepository profileRepository){
//        this.profileRepository = profileRepository;
//    }
//
//    @Override
//    public void run(String... args) throws Exception {
//        Profile john = new Profile("Paul", "John", LocalDate.of(1990, 1, 12), "Male", "Worker", "NYC");
//        profileRepository.save(john);
//    }
//}
