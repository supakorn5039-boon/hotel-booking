package models

import "time"

type BookingDto struct {
	Id        uint      `json:"id"`
	UserId    uint      `json:"user_id"`
	StartDate time.Time `json:"start_date"`
	EndDate   time.Time `json:"end_date"`
	Hotel     HotelDto  `json:"hotel"`
}

func (b *Booking) ToBookingDto() *BookingDto {
	return &BookingDto{
		Id:        b.ID,
		UserId:    b.UserId,
		StartDate: b.StartDate,
		EndDate:   b.EndDate,
		Hotel:     b.Hotel.ToHotelDto(),
	}
}
