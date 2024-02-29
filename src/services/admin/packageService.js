import { privateAxios } from "../helper";

export const getAllPackages = () => {
  return privateAxios.get("/package").then((reponse) => reponse.data);
};

export const insertPackage = (packageData) => {
  return privateAxios
    .post("/package", packageData)
    .then((reponse) => reponse.data);
};

export const getPackageById = (packageId) => {
  return privateAxios
    .get(`/package/${packageId}`)
    .then((reponse) => reponse.data);
};

export const updatePackage = (packageData) => {
  return privateAxios
    .put("/package", packageData)
    .then((reponse) => reponse.data);
};

export const uploadImages = (packageId, formData) => {
  return privateAxios
    .post(`/package/${packageId}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((reponse) => reponse.data);
};

export const getPkgByDestination=(destinationCity)=>{
  return privateAxios.get(`/package/filterByCity/${destinationCity}`).then((reponse) => reponse.data);
};
