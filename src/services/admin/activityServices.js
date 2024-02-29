import { privateAxios } from "../helper";

// export const insertFlight = (flightData) => {
//     return myAxios
//     .post("/flight", flightData)
//     .then((response) => response.data);
//   };
  

  export const insertActivity = (activityData) => {
    return privateAxios.post("/activity", activityData).then((reponse) => reponse.data);
  };

  export const getAllActivities = () => {
    return privateAxios.get("/activity").then((reponse) => reponse.data);
  };

  export const getActivityById = (id) => {
    return privateAxios.get(`/activity/${id}`).then((reponse) => reponse.data);
  };

  export const updateActivity = (activityData) => {
    return privateAxios.put("/activity", activityData).then((reponse) => reponse.data);
  };

  export const getActivitiesByDestCity = (destCity) => {
    return privateAxios.get(`/activity/getByDestcity?cityName=${destCity}`).then((reponse) => reponse.data);
  }