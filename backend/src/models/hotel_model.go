package models

type HotelDto struct {
	Id          int64  `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Rating      int    `json:"rating"`
	Price       int    `json:"price"`
	Image       string `json:"image"`
	People      int    `json:"people"`
}

func (h *Hotel) ToHotelDto() HotelDto {
	return HotelDto{
		Id:          int64(h.ID),
		Name:        h.Name,
		Description: h.Description,
		Rating:      h.Rating,
		Price:       h.Price,
		Image:       h.Image,
		People:      h.People,
	}
}
