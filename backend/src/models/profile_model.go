package models

type ProfileDto struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"omitempty"`
}

func (p *ProfileDto) ToProfileDto() ProfileDto {
	return ProfileDto{
		Email:    p.Email,
		Password: p.Password,
	}
}
