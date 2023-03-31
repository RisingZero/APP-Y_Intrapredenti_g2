package dto

var CommonStatus = struct {
	Ok    string
	Error string
}{
	Ok:    "ok",
	Error: "bad",
}

type CommonResponse struct {
	Status  string `json:"status"`
	Message string `json:"message"`
}

type CommonResponseWithData struct {
	CommonResponse
	Data interface{} `json:"data"`
}
