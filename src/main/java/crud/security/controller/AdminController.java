package crud.security.controller;

import crud.security.model.Role;
import crud.security.model.User;
import crud.security.service.RoleService;
import crud.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUser() {
        return new ResponseEntity<>(userService.getAllUser(), HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getOneUser(@PathVariable("id") long id) {
        User user = userService.findUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable("id") long id, @RequestBody User user) {
        userService.updateUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("users/{id}")
    public ResponseEntity<?> apiDeleteUser(@PathVariable("id") long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/users")
    public ResponseEntity<User> newUser(@RequestBody User user) {
        userService.saveUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

//    @GetMapping("/user")
//    public ResponseEntity<User> getCurrentUser(Principal principal) {
//        Long id = userService.findUserByName(principal.getName()).getId();
//        User user = userService.findUserById(id);
//        user.setUserRolesString(userService.getStringUsersRolesById(id));
//        return new ResponseEntity<>(user, HttpStatus.OK);
//    }

    //    @GetMapping("/roles")
//    public List<Role> getAllRoles() {
//        return roleService.getRolesList();
//    }
//
//    @PostMapping("/users")
//    public User saveUser(@RequestBody User user) {
//        userService.saveUser(user);
//        return user;
//    }
//
//    @DeleteMapping("/users/{id}")
//    public void deleteUser(@PathVariable Long id) {
//        userService.deleteUser(id);
//    }


    //    @GetMapping()
//    public String admin(Principal principal, Model model,
//                        @ModelAttribute("newUser") User user) {
//        Long id = userService.findUserByName(principal.getName()).getId();
//        model.addAttribute("currentUser", userService.findUserById(id));        //для обображения активного пользователя во вкладке
//        model.addAttribute("currentRoles", userService.getStringUsersRolesById(id));  //для обображения списка ролей на панели
//        List<User> userList = userService.getAllUser();
//        model.addAttribute("users", userList);                                  //для обображения списка всех пользователей
//        model.addAttribute("roles", roleService.getRolesList());
//        return "admin";
//    }
//
//    @PostMapping("/save")
//    public String saveUser(@ModelAttribute("newUser") User user,
//                           @RequestParam("chosenRoles") String[] chosenRoles) {
//        userService.saveUser(user, chosenRoles);
//        return "redirect:/admin";
//    }
//
    @GetMapping("/findOne")
    @ResponseBody
    public User findOne(long id) {
        return userService.findUserById(id);
    }


//
//    @PatchMapping("/edit")
//    public String editUSer(User user, String[] updatedRoles) {
//        userService.updateUser(user, updatedRoles);
//        return "redirect:/admin";
//    }
//
//    @DeleteMapping("/delete")
//    public String deleteUser(Long id) {
//        userService.deleteUser(id);
//        return "redirect:/admin";
//    }
}
