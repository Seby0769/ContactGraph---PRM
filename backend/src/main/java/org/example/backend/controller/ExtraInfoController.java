package org.example.backend.controller;

import org.example.backend.model.ExtraInfo;
import org.example.backend.model.ExtraInfoRequest_DTO;
import org.example.backend.model.ExtraInfoResponse_DTO;
import org.example.backend.model.Profile;
import org.example.backend.repository.ExtraInfoRepository;
import org.example.backend.repository.ProfileRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ExtraInfoController {
    ExtraInfoRepository extraInfoRepository;
    ProfileRepository profileRepository;

    public ExtraInfoController(ExtraInfoRepository extraInfoRepository, ProfileRepository profileRepository) {
        this.extraInfoRepository = extraInfoRepository;
        this.profileRepository = profileRepository;
    }

    @GetMapping("/profiles/{id}/extraInfo")
    public ResponseEntity<ExtraInfoResponse_DTO> getExtraInfo(@PathVariable long id){
        Optional<Profile> profile = profileRepository.findById(id);
        if (profile.isPresent()){
            Optional<ExtraInfo> checkExtraInfo = extraInfoRepository.findByProfileId(id);
            if (checkExtraInfo.isPresent()){
                ExtraInfo extraInfo = checkExtraInfo.get();
                ExtraInfoResponse_DTO showExtraInfo = new ExtraInfoResponse_DTO(extraInfo);
                return ResponseEntity.status(HttpStatus.OK).body(showExtraInfo);
            }
            else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/extraInfo")
    public ResponseEntity<ExtraInfoResponse_DTO> addExtraInfo(@RequestBody ExtraInfoRequest_DTO dto){
        Optional<Profile> profile = profileRepository.findById(dto.getProfileId());
        if (profile.isPresent()){
            Profile searchedProfile = profile.get();
            ExtraInfo newExtraInfo = new ExtraInfo(searchedProfile, dto.getKeyTraits(), dto.getVocalBaseline(), dto.getPhysicalBaseline(), dto.getIdiosyncrasies(), dto.getTriggers(), dto.getTheTells(), dto.getEvasionTactic(), dto.getCoreDriver(), dto.getPersuasionVector());
            extraInfoRepository.save(newExtraInfo);
            ExtraInfoResponse_DTO extraInfoResponseDto = new ExtraInfoResponse_DTO(newExtraInfo);
            return ResponseEntity.status(HttpStatus.CREATED).body(extraInfoResponseDto);
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/extraInfo/{id}")
    public ResponseEntity<ExtraInfoResponse_DTO> updateExtraInfo(@PathVariable long id, @RequestBody ExtraInfoRequest_DTO dto){
        Optional<ExtraInfo> extraInfo = extraInfoRepository.findById(id);
        if (extraInfo.isPresent()){
            ExtraInfo updatedExtraInfo = extraInfo.get();
            updatedExtraInfo.setKeyTraits(dto.getKeyTraits());
            updatedExtraInfo.setVocalBaseline(dto.getVocalBaseline());
            updatedExtraInfo.setPhysicalBaseline(dto.getPhysicalBaseline());
            updatedExtraInfo.setIdiosyncrasies(dto.getIdiosyncrasies());
            updatedExtraInfo.setTriggers(dto.getTriggers());
            updatedExtraInfo.setTheTells(dto.getTheTells());
            updatedExtraInfo.setEvasionTactic(dto.getEvasionTactic());
            updatedExtraInfo.setCoreDriver(dto.getCoreDriver());
            updatedExtraInfo.setPersuasionVector(dto.getPersuasionVector());
            extraInfoRepository.save(updatedExtraInfo);
            ExtraInfoResponse_DTO extraInfoResponseDto = new ExtraInfoResponse_DTO(updatedExtraInfo);
            return ResponseEntity.status(HttpStatus.OK).body(extraInfoResponseDto);
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/extraInfo/{id}")
    public ResponseEntity<Void> deleteExtraInfo(@PathVariable long id) {
        Optional<ExtraInfo> extraInfo = extraInfoRepository.findById(id);
        if (extraInfo.isPresent()) {
            ExtraInfo extraInfoToDelete = extraInfo.get();
            extraInfoRepository.delete(extraInfoToDelete);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
