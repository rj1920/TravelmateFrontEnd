import { privateAxios } from "./helper";

export const getAllPayments = () => {
  return privateAxios.get("/payments").then((reponse) => reponse.data);
};

export const getPaymentById = (paymentId) => {
  return privateAxios.get(`/payments/${paymentId}`).then((reponse) => reponse.data);
};

export const doPayment = (paymentData) => {
  return privateAxios.post("/payments", paymentData).then((reponse) => reponse.data);
};