package crud.security.controller;

import crud.security.model.User;
import crud.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;

    @Autowired
    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public String homePage(Principal principal, Model model) {
        Long id = userService.findUserByName(principal.getName()).getId();
        model.addAttribute("id", id);
        return "profileAdmin";
    }

    @GetMapping("/users")
    public String showAllUsers(Model model) {
        List<User> userList = userService.getAllUser();
        model.addAttribute("users", userList);
        return "all-users";
    }


    @GetMapping("details/{id}")
    public String adminDetails(@PathVariable("id") Long id, Model model) {
        model.addAttribute("user", userService.findUserById(id));
        return "detailsForAdmin";
    }

    @GetMapping("/user/details/{id}")
    public String userDetails(@PathVariable("id") Long id, Model model) {
        model.addAttribute("user", userService.findUserById(id));
        return "detailsAll";
    }



}
