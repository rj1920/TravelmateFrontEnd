import { isLoggedIn } from "../auth";
import { privateAxios } from "./helper";

export const getAllDestination = () => {
  return privateAxios.get("/city").then((reponse) => reponse.data);
};

export const saveCities = (cities) => {
  localStorage.setItem("cities", JSON.stringify(cities));
};

//get Cities
export const getCities = () => {
    if (isLoggedIn()) {
      return JSON.parse(localStorage.getItem("cities"));
    } else {
      return undefined;
    }
  };

