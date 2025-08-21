package models

type UserDto struct {
	Id       uint   `json:"-"`
	Email    string `json:"email"`
	Password string `json:"-"`
	Role     string `json:"role"`
}

type CreadentialDto struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (u *User) ToDto() UserDto {
	return UserDto{
		Id:       u.ID,
		Email:    u.Email,
		Password: u.Password,
		Role:     u.Role,
	}
}
