import axios from "axios";

export const roleView = () => {
  return axios({
    method: "GET",
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/roles`,
  });
};
