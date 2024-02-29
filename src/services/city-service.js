import { privateAxios } from "./helper";

export const getAllCities=()=>{
return privateAxios.get("/city").then((reponse) => reponse.data);
};

export const getCityById = (id) => {
    return privateAxios.get(`/city/${id}`).then((reponse) => reponse.data);
  };

  export const insertCity = (cityData) => {
    return privateAxios.post("/city", cityData).then((reponse) => reponse.data);
  };

  export const deleteCity = (cityId) => {
    return privateAxios.delete(`/city/${cityId}`).then((reponse) => reponse.data);
  };