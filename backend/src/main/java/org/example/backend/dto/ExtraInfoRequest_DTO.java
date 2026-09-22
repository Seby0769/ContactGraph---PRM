package org.example.backend.dto;

public class ExtraInfoRequest_DTO {
    Long id;
    Long profileId;
    String keyTraits;
    String vocalBaseline;
    String physicalBaseline;
    String idiosyncrasies;
    String triggers;
    String theTells;
    String evasionTactic;
    String coreDriver;
    String persuasionVector;

    public Long getId() {
        return id;
    }

    public Long getProfileId() {
        return profileId;
    }

    public String getKeyTraits() {
        return keyTraits;
    }

    public String getVocalBaseline() {
        return vocalBaseline;
    }

    public String getPhysicalBaseline() {
        return physicalBaseline;
    }

    public String getIdiosyncrasies() {
        return idiosyncrasies;
    }

    public String getTriggers() {
        return triggers;
    }

    public String getTheTells() {
        return theTells;
    }

    public String getEvasionTactic() {
        return evasionTactic;
    }

    public String getCoreDriver() {
        return coreDriver;
    }

    public String getPersuasionVector() {
        return persuasionVector;
    }
}
