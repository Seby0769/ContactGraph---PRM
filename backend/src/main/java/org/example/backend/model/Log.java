package org.example.backend.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class Log {
    @ManyToOne
    private Profile profile;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    LocalDate dateOfLog;
    LocalTime timeOfLog;
    String location;
    String subject;
    String behavior;
    String notes;

    public Log(){};

    public Log(Profile profile, LocalDate dateOfLog, LocalTime timeOfLog, String location, String subject, String behavior, String notes) {
        this.profile = profile;
        this.dateOfLog = dateOfLog;
        this.timeOfLog = timeOfLog;
        this.location = location;
        this.subject = subject;
        this.behavior = behavior;
        this.notes = notes;
    }

    public Long getId() {
        return id;
    }

    public Profile getProfile() {
        return profile;
    }

    public LocalDate getDateOfLog() {
        return dateOfLog;
    }

    public LocalTime getTimeOfLog() {
        return timeOfLog;
    }

    public String getLocation() {
        return location;
    }

    public String getSubject() {
        return subject;
    }

    public String getBehavior() {
        return behavior;
    }

    public String getNotes() {
        return notes;
    }


    public void setDateOfLog(LocalDate dateOfLog) {
        this.dateOfLog = dateOfLog;
    }

    public void setTimeOfLog(LocalTime timeOfLog) {
        this.timeOfLog = timeOfLog;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public void setBehavior(String behavior) {
        this.behavior = behavior;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
