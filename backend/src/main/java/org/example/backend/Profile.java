package org.example.backend;

import java.time.LocalDate;

public class Profile {
    String lastName;
    String firstName;
    LocalDate dateOfBirth;
    String gender;
    String occupation;
    String city;

    public Profile(String lastName, String firstName, LocalDate dateOfBirth, String gender, String occupation, String city) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.occupation = occupation;
        this.city = city;
    }

    public String getLastName() {
        return lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public String getOccupation() {
        return occupation;
    }

    public String getCity() {
        return city;
    }
}
