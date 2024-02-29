import { privateAxios } from "../helper";

export const getAllHotels = () => {
  return privateAxios.get("/hotel").then((reponse) => reponse.data);
};

export const insertHotel = (hotelData) => {
  return privateAxios.post("/hotel", hotelData).then((reponse) => reponse.data);
};

export const insertRooms = (roomData, hotelId) => {
  return privateAxios
    .post(`/room/${hotelId}`, roomData)
    .then((reponse) => reponse.data);
};

export const getHotelById = (hotelId) => {
  return privateAxios.get(`/hotel/${hotelId}`).then((reponse) => reponse.data);
};

export const updateHotels = (hotelData) => {
  return privateAxios.put("/hotel", hotelData).then((reponse) => reponse.data);
};

export const getHotelsByDestCity = (destCity) => {
  return privateAxios
    .get(`/hotel/getByDestcity?cityName=${destCity}`)
    .then((reponse) => reponse.data);
};


export const getByFromDestcity=(fromCity,destinationCity)=>{
  return privateAxios
  .get(`/flight/getByFromDestcity?fromCity=${fromCity}destinationCity=${destinationCity}`).then((reponse)=>reponse.data);
};

export const uploadImages = (hotelId, formData) => {
  return privateAxios
    .post(`/hotel/${hotelId}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((reponse) => reponse.data);
};
