package org.example.backend.model;

import jakarta.persistence.*;

@Entity
public class ExtraInformation {
    @OneToOne
    Profile profile;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    String keyTraits;
    String vocalBaseline;
    String physicalBaseline;
    String idiosyncrasies;
    String triggers;
    String theTells;
    String evasionTactic;
    String coreDriver;
    String persuasionVector;

    public ExtraInformation(){};

    public ExtraInformation(Profile profile, String keyTraits, String vocalBaseline, String physicalBaseline, String idiosyncrasies, String triggers, String theTells, String evasionTactic, String coreDriver, String persuasionVector) {
        this.profile = profile;
        this.keyTraits = keyTraits;
        this.vocalBaseline = vocalBaseline;
        this.physicalBaseline = physicalBaseline;
        this.idiosyncrasies = idiosyncrasies;
        this.triggers = triggers;
        this.theTells = theTells;
        this.evasionTactic = evasionTactic;
        this.coreDriver = coreDriver;
        this.persuasionVector = persuasionVector;
    }

    public Profile getProfile() {
        return profile;
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

    public void setProfile(Profile profile) {
        this.profile = profile;
    }

    public void setKeyTraits(String keyTraits) {
        this.keyTraits = keyTraits;
    }

    public void setVocalBaseline(String vocalBaseline) {
        this.vocalBaseline = vocalBaseline;
    }

    public void setPhysicalBaseline(String physicalBaseline) {
        this.physicalBaseline = physicalBaseline;
    }

    public void setIdiosyncrasies(String idiosyncrasies) {
        this.idiosyncrasies = idiosyncrasies;
    }

    public void setTriggers(String triggers) {
        this.triggers = triggers;
    }

    public void setTheTells(String theTells) {
        this.theTells = theTells;
    }

    public void setEvasionTactic(String evasionTactic) {
        this.evasionTactic = evasionTactic;
    }

    public void setCoreDriver(String coreDriver) {
        this.coreDriver = coreDriver;
    }

    public void setPersuasionVector(String persuasionVector) {
        this.persuasionVector = persuasionVector;
    }
}
