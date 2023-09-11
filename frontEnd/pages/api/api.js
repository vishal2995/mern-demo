import axios from "axios";

export const administratorLogin = (data) => {
  return axios({
    method: "POST",
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/login`,
    headers: { "Content-Type": "application/json" },
    data,
  });
};

export const administratorSignup = (data) => {
  return axios({
    method: "POST",
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/signup`,
    headers: { "Content-Type": "application/json" },
    data,
  });
};
