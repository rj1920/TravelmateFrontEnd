import { privateAxios } from "../helper";

export const insertFlight = (flightData) => {
  return privateAxios
    .post("/flight", flightData)
    .then((reponse) => reponse.data);
};

export const getAllFlights = () => {
  return privateAxios.get("/flight").then((reponse) => reponse.data);
};

export const getFlightById = (id) => {
  return privateAxios.get(`/flight/${id}`).then((reponse) => reponse.data);
};

export const updateFlight = (flightData) => {
  return privateAxios
    .put("/flight", flightData)
    .then((reponse) => reponse.data);
};
export const getByFromDestcity=(fromCity,destinationCity)=>{
  return privateAxios
  .get(`/flight/getByFromDestcity?fromCity=${fromCity}&destinationCity=${destinationCity}`).then((reponse)=>reponse.data);
};