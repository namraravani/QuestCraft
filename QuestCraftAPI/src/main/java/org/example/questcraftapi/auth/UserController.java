package org.example.questcraftapi.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserDocument> registerUser(@RequestBody UserDocument user) { //, user.getRole()

        UserDocument registeredUser = userService.createUser(user);
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<UserDocument> loginUser(@RequestBody UserDocument user) {
        Optional<UserDocument> existingUser = userService.findUserByUsername(user.getUsername());
        if (existingUser.isPresent()) {
            if (userService.comparePassword(existingUser.get(), user.getPassword())) {
                return new ResponseEntity<>(existingUser.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<UserDocument> getUserById(@PathVariable String id) {
//        Optional<UserDocument> user = userService.findById(id);
//        if (user.isPresent()) {
//            return new ResponseEntity<>(user.get(), HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }
//
//    @GetMapping
//    public ResponseEntity<List<UserDocument>> getAllUsers() {
//        List<UserDocument> users = userService.getAllUsers();
//        return new ResponseEntity<>(users, HttpStatus.OK);
//    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDocument> updateUser(@PathVariable String id, @RequestBody UserDocument updates) {
        UserDocument updatedUser = userService.updateUser(id, updates);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}