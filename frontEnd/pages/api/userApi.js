import axios from "axios";

export const addUser = (data) => {
  return axios({
    method: "POST",
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/users`,
    headers: { "Content-Type": "application/json" },
    data,
  });
};

export const userView = (_id) => {
  return axios({
    method: "GET",
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/users/${_id}`,
  });
};

export const editView = (_id, data) => {
  return axios({
    method: "PATCH",
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/users/${_id}`,
    headers: { "Content-Type": "application/json" },
    data,
  });
};

export const getSortData = (page, limit, filed, order) => {
  return axios({
    method: "GET",
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/users?page=${page}&limit=${limit}&sort=${filed}&orderby=${order}`,
  });
};

export const getAllUsers = (page, limit, value) => {
  return axios({
    method: "GET",
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/users?page=${page}&limit=${limit}&name=${value}`,
  });
};

export const userDelete = (_id) => {
  return axios({
    method: "DELETE",
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/users/${_id}`,
  });
};
