package crud.security.service;

import crud.security.model.User;

import java.util.List;

public interface UserService {

    public List<User> getAllUser();

    public User findUserByName(String username);

    public User findUserById(Long id);

}
