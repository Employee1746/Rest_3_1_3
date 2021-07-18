package crud.security.controller;

import crud.security.model.User;
import crud.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    public ResponseEntity<User> getCurrentUser(Principal principal) {
        User user = userService.findUserByName(principal.getName());
        user.setUserRolesString(userService.getStringUsersRolesById(user.getId()));
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
