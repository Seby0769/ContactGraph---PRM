package org.example.backend.dto;

import org.example.backend.model.ExtraInfo;

public class ExtraInfoResponse_DTO {
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

    public ExtraInfoResponse_DTO(ExtraInfo extraInfo) {
        this.id = extraInfo.getId();
        this.profileId = extraInfo.getProfile().getId();
        this.keyTraits = extraInfo.getKeyTraits();
        this.vocalBaseline = extraInfo.getVocalBaseline();
        this.physicalBaseline = extraInfo.getPhysicalBaseline();
        this.idiosyncrasies = extraInfo.getIdiosyncrasies();
        this.triggers = extraInfo.getTriggers();
        this.theTells = extraInfo.getTheTells();
        this.evasionTactic = extraInfo.getEvasionTactic();
        this.coreDriver = extraInfo.getCoreDriver();
        this.persuasionVector = extraInfo.getPersuasionVector();
    }

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
