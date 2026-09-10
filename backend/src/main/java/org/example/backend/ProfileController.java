package org.example.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
public class ProfileController {
    @GetMapping("/profiles")
    public List<Profile> getProfiles(){
        List<Profile> profiles = new ArrayList<>();
        Profile john = new Profile("Ion", "Andrei", LocalDate.of(1990, 1, 15), "Male", "Worker", "NYC");
        profiles.add(john);

        return profiles;
    }
}
