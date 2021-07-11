package crud.security.controller;

import crud.security.model.User;
import crud.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
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
        model.addAttribute("currentUser", userService.findUserById(id));        //для обображения активного пользователя во вкладке
        model.addAttribute("currentRoles", userService.getUsersRolesById(id));  //для обображения списка ролей пользователя на панели
        model.addAttribute("userRole", userService.findUserByName(principal.getName()).getRoles());
        return "user";
    }
//    @GetMapping("user/profile")
//    public String homePage(Principal principal, Model model) {
//        Long id = userService.findUserByName(principal.getName()).getId();
//        model.addAttribute("id", id);
//        return "profile";
//    }
//
//    @GetMapping("user/details/{id}")
//    public String userDetails(@PathVariable("id") Long id, Model model, Principal principal) {
//        User user = userService.findUserById(id);
//        if (user.getUsername().equals(principal.getName())) {
//            model.addAttribute("user", userService.findUserById(id));
//            return "detailsForUser";
//        }
//        return "redirect:/login";
//    }
//
//    @GetMapping
//    public String index() {
//        return "index";
//    }
//
//    @GetMapping("/logout")
//    public String logout(){
//        return "/logout";
//    }
}
