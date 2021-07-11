package crud.security.service;

import crud.security.model.Role;
import crud.security.model.User;

import java.util.List;
import java.util.Map;

public interface UserService {

    public List<User> getAllUser();

    public User findUserByName(String username);

    public User findUserById(Long id);

    public void saveUser(User user, String[] chosenRoles);

    public void updateUser(User user, String[] updatedRoles);

    public void deleteUser(Long id);

    public String getUsersRolesById(Long id);

}
