package crud.security.service;

import crud.security.model.Role;
import crud.security.model.User;
import crud.security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, RoleService roleService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> getAllUser() {
        List<User> userList = userRepository.findAll();
        for (User user : userList) {
            user.setUserRolesString(getStringUsersRolesById(user.getId()));
        }
        return userList;
    }

    @Override
    @Transactional(readOnly = true)
    public User findUserByName(String username) {
        return userRepository.findUserByUsername(username);
    }

    @Override
    @Transactional(readOnly = true)
    public User findUserById(Long id) {
        return userRepository.findUserById(id);
    }

    @Override
    @Transactional
    public void saveUser(User user/*, String[] chosenRoles*/) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        //user.setRoles(roleService.getRolesFromArray(chosenRoles));
        userRepository.save(user);
    }

    @Override
    @Transactional
    public User updateUser(User user/*, String[] updatedRoles*/) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
//        user.setRoles(roleService.getRolesFromArray(updatedRoles));
        userRepository.save(user);

        return user;
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    @Transactional
    public String getStringUsersRolesById(Long id) {
        List<Role> roles = new ArrayList<>(userRepository.findUserById(id).getRoles());
        StringBuilder currentUserRoles = new StringBuilder();
        for (Role role : roles) {
            currentUserRoles.append(role.getName().replaceAll("ROLE_", " "));
        }
        return currentUserRoles.toString();
    }
}
