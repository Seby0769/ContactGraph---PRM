package org.example.backend.dto;

import org.example.backend.model.Log;

public class LogResponse_DTO {
    Long id;
    Long profileId;
    String dateOfLog;
    String timeOfLog;
    String location;
    String subject;
    String behavior;
    String notes;

    public LogResponse_DTO(Log log) {
        this.id = log.getId();
        this.profileId = log.getProfile().getId();
        this.dateOfLog = log.getDateOfLog().toString();
        this.timeOfLog = log.getTimeOfLog().toString();
        this.location = log.getLocation();
        this.subject = log.getSubject();
        this.behavior = log.getBehavior();
        this.notes = log.getNotes();
    }

    public Long getId() {
        return id;
    }

    public Long getProfileId() {
        return profileId;
    }

    public String getDateOfLog() {
        return dateOfLog;
    }

    public String getTimeOfLog() {
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
}
