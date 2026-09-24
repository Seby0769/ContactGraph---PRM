package org.example.backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.example.backend.dto.UserRequest_DTO;
import org.example.backend.model.User;
import org.example.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Optional;

@RestController
public class UserController {
    UserRepository userRepository;
    BCryptPasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody UserRequest_DTO dto){
        Optional<User> userToCheck = userRepository.findByUsername(dto.getUsername());
        if (userToCheck.isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        else {
            User user = new User(dto.getUsername(), passwordEncoder.encode(dto.getPassword()));
            userRepository.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody UserRequest_DTO dto, HttpServletRequest request){
        Optional<User> userToCheck = userRepository.findByUsername(dto.getUsername());
        if (userToCheck.isPresent()){
            User user = userToCheck.get();
            if (passwordEncoder.matches(dto.getPassword(), user.getPassword())){
                HttpSession session = request.getSession();
                session.setAttribute("UserId", user.getId());
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(user.getUsername(), null, new ArrayList<>());
                SecurityContextHolder.getContext().setAuthentication(authToken);
                session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());
                return ResponseEntity.status(HttpStatus.OK).build();
            }
            else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if (session == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        else {
            session.invalidate();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
    }
}
