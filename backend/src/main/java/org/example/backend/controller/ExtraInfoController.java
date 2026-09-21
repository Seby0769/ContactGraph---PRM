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
            ExtraInfo extraInfo = extraInfoRepository.findByProfileId(id);
            ExtraInfoResponse_DTO showExtraInfo = new ExtraInfoResponse_DTO(extraInfo);
            return ResponseEntity.status(HttpStatus.OK).body(showExtraInfo);
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
}
