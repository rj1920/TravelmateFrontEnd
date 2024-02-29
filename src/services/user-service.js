import { myAxios, privateAxios } from "./helper";

export const signup = (user) => {
  return myAxios
  .post("/users/signup", user)
  .then((response) => response.data);
};


export const signin = (credentials) => {
    return myAxios
    .post("/authenticate", credentials)
    .then((response) => response.data);
  };

  export const getAllUsers = () => {
    return privateAxios.get("/users").then((reponse) => reponse.data);
  };

  export const getUserById = (id) => {
    return privateAxios.get(`/users/getUser/${id}`).then((reponse) => reponse.data);
  };

  export const updateUser = (userId,userData) => {
    
    return privateAxios.put(`/users/${userId}`,userData).then((reponse) => reponse.data);
  };

  export const deactivateUser = (userId) => {
    
    return privateAxios.put(`/users/deactivate/${userId}`).then((reponse) => reponse.data);
  };

  export const reactivateUser = (userId) => {
    
    return privateAxios.put(`/users/reactivate/${userId}`).then((reponse) => reponse.data);
  };

