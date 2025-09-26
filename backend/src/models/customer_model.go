package models

type CustomerDto struct {
	Id   uint   `json:"id"`
	Name string `json:"name"`
	Text string `json:"text"`
}

func (c *Customer) ToCustomerDto() CustomerDto {
	return CustomerDto{
		Id:   c.ID,
		Name: c.Name,
		Text: c.Text,
	}
}
