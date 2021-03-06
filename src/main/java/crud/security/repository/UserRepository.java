package crud.security.repository;

import crud.security.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    public User findUserByUsername(String username);

    public User findUserById(Long id);
}
