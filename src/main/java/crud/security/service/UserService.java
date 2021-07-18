package crud.security.service;

import crud.security.model.User;

import java.util.List;

public interface UserService {

    public List<User> getAllUser();

    public User findUserByName(String username);

    public User findUserById(Long id);

    public void saveUser(User user);

    public User updateUser(User user);

    public void deleteUser(Long id);

    public String getStringUsersRolesById(Long id);

}
