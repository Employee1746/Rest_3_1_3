package crud.security.controller;

import crud.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;

@Controller
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public String user(Principal principal, Model model) {
        Long id = userService.findUserByName(principal.getName()).getId();
        model.addAttribute("currentUser", userService.findUserById(id));
        model.addAttribute("currentRoles", userService.getStringUsersRolesById(id));
        model.addAttribute("userRole", userService.findUserByName(principal.getName()).getRoles());
        return "user";
    }
}
