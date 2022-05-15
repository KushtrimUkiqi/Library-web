package com.finki.ukim.mk.library.models.dto.user;

import com.finki.ukim.mk.library.models.User;
import com.finki.ukim.mk.library.models.enums.Role;
import lombok.Data;

@Data
public class UserDetailsDto {
    private String username;
    private Role role;

    public static UserDetailsDto getInstance(User user)
    {
        UserDetailsDto userDetailsDto = new UserDetailsDto();
        userDetailsDto.username = user.getUsername();
        userDetailsDto.role = user.getRole();

        return userDetailsDto;
    }
}
