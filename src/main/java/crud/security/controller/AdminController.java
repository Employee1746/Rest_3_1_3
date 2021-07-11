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
        model.addAttribute("currentRoles", userService.getUsersRolesById(id));  //для обображения списка ролей на панели
        List<User> userList = userService.getAllUser();
        model.addAttribute("users", userList);                                  //для обображения списка всех пользователей
        model.addAttribute("roles", roleService.getRolesList());
        return "admin";
    }

    @PatchMapping("/edit")
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
    public String deleteUser(Long id) {
        userService.deleteUser(id);
        return "redirect:/admin";
    }
}
