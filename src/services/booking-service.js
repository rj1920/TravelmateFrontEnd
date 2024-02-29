import { privateAxios } from "./helper";

export const getAllBookings = () => {
  return privateAxios.get("/booking").then((reponse) => reponse.data);
};

export const getBookingById = (bookingId) => {
  return privateAxios.get(`/booking/${bookingId}`).then((reponse) => reponse.data);
};

export const doBooking = (bookingData) => {
  return privateAxios.post("/booking", bookingData).then((reponse) => reponse.data);
};


export const getAnalysis = () => {
  return privateAxios.get("/booking/getAnalysis").then((reponse) => reponse.data);
};
export const getBookingByUser=(userId)=>{
return privateAxios.get(`/booking/${userId}/all`).then((reponse) => reponse.data);
};


export const updateBookingStatus = (bookingId) => {
  return privateAxios.put(`/booking/${bookingId}`).then((response) => response.data);
};
