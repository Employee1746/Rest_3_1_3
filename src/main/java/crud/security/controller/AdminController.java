package crud.security.controller;

import crud.security.model.User;
import crud.security.service.RoleService;
import crud.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping()
    public String admin(Principal principal, Model model,
                        @ModelAttribute("newUser") User user) {
        Long id = userService.findUserByName(principal.getName()).getId();
        model.addAttribute("currentUser", userService.findUserById(id));        //для обображения активного пользователя во вкладке
        model.addAttribute("currentRoles", userService.getUsersRolesById(id));  //для обображения списка ролей пользователя на панели
        List<User> userList = userService.getAllUser();
        model.addAttribute("users", userList);                                  //для обображения списка всех пользователей
        model.addAttribute("roles", roleService.getRolesList());
        return "admin";
    }

    @PostMapping("/edit")
    public String editUSer(User user, String[] updatedRoles) {
        userService.updateUser(user, updatedRoles);
        return "redirect:/admin";
    }

    @GetMapping("/findOne")
    @ResponseBody
    public User findOne(long id) {
        return userService.findUserById(id);
    }

    @PostMapping("/save")
    public String saveUser(@ModelAttribute("newUser") User user,
                           @RequestParam("chosenRoles") String[] chosenRoles) {
        userService.saveUser(user, chosenRoles);
        return "redirect:/admin";
    }

    @DeleteMapping("/delete")
    public String delete(Long id) {
        userService.deleteUser(id);
        return "redirect:/admin";
    }

//    @DeleteMapping("/delete/{id}")
//    public String deleteUser(@PathVariable("id") Long id) {
//        userService.deleteUser(id);
//        return "redirect:/admin";
//    }


//    @GetMapping()
//    public String adminPanel(@ModelAttribute("user") User user, Principal principal, Model model) {
//        Long id = userService.findUserByName(principal.getName()).getId();
//        List<User> userList = userService.getAllUser();
//        model.addAttribute("users", userList);
//        model.addAttribute("user", userService.findUserById(id));
//        model.addAttribute("roles", roleService.getRolesList());
////        model.addAttribute("id", id);
//        return "adminPanel";
//    }
//
//    @PostMapping()
//    public String createUser(@ModelAttribute("user") User user,
//                             @RequestParam("chosenRoles") String[] chosenRoles) {
//        userService.saveUser(user, chosenRoles);
//        return "redirect:/admin";
//    }
//
//    @GetMapping("/update/{id}")
//    public String updateUserForm(@PathVariable("id") Long id, Model model) {
//        System.out.println("updateUserForm " + id);
//        model.addAttribute("user", userService.findUserById(id));
//        model.addAttribute("roles", roleService.getRolesList());
//        return "redirect:/admin";
//    }
//
//    @PostMapping("/update")
//    public String updateUser(User user, @RequestParam("updatedRoles") String[] updatedRoles) {
//        userService.updateUser(user, updatedRoles);
//        return "redirect:/admin";
//    }


//    @GetMapping("user-update/{id}")
//    public String updateUserForm(@PathVariable("id") Long id, Model model) {
//        model.addAttribute("user", userService.getUserById(id));
//        return "/user-update";
//    }
//
//    @PostMapping("/user-update")
//    public String updateUser(User user) {
//        userService.updateUser(user);
//        return "redirect:/";
//    }

//    @GetMapping()
//    public String homePage(Principal principal, Model model) {
//        Long id = userService.findUserByName(principal.getName()).getId();
//        List<User> userList = userService.getAllUser();
//        model.addAttribute("users", userList);
//        model.addAttribute("id", id);
//        return "profileAdmin";
//    }

//    @GetMapping("/users")
//    public String showAllUsers(Model model) {
//        List<User> userList = userService.getAllUser();
//        model.addAttribute("users", userList);
//        return "all-users";
//    }

    //    @GetMapping("/create")
//    public String createForm(@ModelAttribute("user") User user, Model model) {
//        model.addAttribute("roles", roleService.getRolesList());
//        return "createUser-form";
//    }
//
//
//    @GetMapping("details/{id}")
//    public String adminDetails(@PathVariable("id") Long id, Model model) {
//        model.addAttribute("user", userService.findUserById(id));
//        return "detailsForAdmin";
//    }
//
//    @GetMapping("/user/details/{id}")
//    public String userDetails(@PathVariable("id") Long id, Model model) {
//        model.addAttribute("user", userService.findUserById(id));
//        return "detailsAll";
//    }
//


//    @DeleteMapping("/delete/{id}")
//    public String deleteUser(@PathVariable("id") Long id) {
//        userService.deleteUser(id);
//        return "redirect:/admin";
//    }
}
