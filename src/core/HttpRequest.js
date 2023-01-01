// import React from 'react'
import axios from "axios";
import { objectMap } from "./Helper";

const getRequest = async (beckendserver, url, data, oldData = false) => {
  try {
    let result = await axios.get(
      beckendserver + url + (data ? "/" + data : data),
      {
        headers: {
          token:
            localStorage.getItem('token'),
        },
      }
    );

    if (oldData) {
      return result;
    }
    return result.data;
  } catch (error) {
    errorHandling(error, oldData);
  }
};

const postRequest = async (beckendserver, url, data, oldData) => {
  try {
    if (!Array.isArray(data.values) && !(data.values instanceof FormData)) {
      data.values = objectMap(data.values, (v) =>
        v instanceof Date ? v.toISOString() : v
      );
    }
    let result;
    result = await axios.post(beckendserver + url, data.values, {
      headers: {
        token:
          localStorage.getItem('token'),
      },
    });
    return result.data;
  } catch (error) {
    errorHandling(error, oldData);
  }
};

const putRequest = async (beckendserver, url, data, oldData) => {
  try {
    let dataWillUpdated = oldData;
    if (!oldData) {
      dataWillUpdated = data.values;
    }
    data.values = objectMap(data.values, (v) =>
      v instanceof Date ? v.toISOString() : v
    );

    Object.entries(data.values).forEach((entry) => {
      let key = entry[0];
      let value = entry[1];

      dataWillUpdated[key] = value;
    });
    let result = await axios.put(beckendserver + url, dataWillUpdated, {
      headers: {
        token:
          localStorage.getItem('token'),
      },
    });

    return result.data;
  } catch (error) {
    errorHandling(error, oldData);
  }
};

const deleteRequest = async (beckendserver, url, data, oldData) => {
  try {
    let result = await axios.delete(beckendserver + url + "/" + data, {
      headers: {
        token:
          localStorage.getItem('token'),
      },
    });
    return result.data;
  } catch (error) {
    errorHandling(error, oldData);
  }
};

const errorHandling = (error, oldData) => {
  if (error.response) {
    var response = error.response;
    var responseData = response.data || {};
    let text = responseData.message;

    if (typeof oldData === "function") {
      return oldData(error.response);
    }
    alert(text);
    if (responseData.returnValue === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    throw text;
  }
};

export function HttpRequest(backendserver, url, method, data, oldData) {
  method = method || "GET";
  data = data || {};

  // let beckendserver = process.env.REACT_APP_BACKEND

  if (method === "GET") {
    data = typeof data === "object" ? "" : data;

    return getRequest(backendserver, url, data, oldData);
  }

  if (method === "POST") {
    return postRequest(backendserver, url, data, oldData);
  }

  if (method === "PUT") {
    return putRequest(backendserver, url, data, oldData);
  }

  if (method === "DELETE") {
    return deleteRequest(backendserver, url, data, oldData);
  }
}

export default HttpRequest;
