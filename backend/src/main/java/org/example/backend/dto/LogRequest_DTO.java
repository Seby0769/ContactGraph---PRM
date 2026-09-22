package org.example.backend.dto;

public class LogRequest_DTO {
    Long profileId;
    String dateOfLog;
    String timeOfLog;
    String location;
    String subject;
    String behavior;
    String notes;

    public long getProfileId() {
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
