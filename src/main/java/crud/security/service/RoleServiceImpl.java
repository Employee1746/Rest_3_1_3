package crud.security.service;

import crud.security.model.Role;
import crud.security.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Role> getRolesList() {
        return roleRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Set<Role> getRolesFromArray(String[] roles) {
        Set<Role> roleSet = new HashSet<>();
        for (String role : roles) {
            if (role.equals("ROLE_USER")) {
                roleSet.add(new Role(1L, "ROLE_USER"));
            } else if (role.equals("ROLE_ADMIN")) {
                roleSet.add(new Role(2L, "ROLE_ADMIN"));
            }
        }
        return roleSet;
    }
}
