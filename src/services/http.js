import axios from 'axios';

const API_DEV = 'url';
const API_TEST = 'url';
let url;

if (process.env.NODE_ENV === 'production') {
  url = window.location.origin + '/api';
} else if (process.env.NODE_ENV === 'development') {
  url = API_DEV;
}

const API_URL = url;

export const HttpTransport = async (method, params) => {
  let data = {
    id: 1,
    jsonrpc: '2.0',
    method: method
  };

  if (params) {
    console.info(params);
    data.params = params;
  }

  try {
    const res = await axios({
      baseURL: API_URL,
      method: 'POST',
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    });

    console.warn(res.data.result);
    return res.data.result;
  } catch (error) {
    console.warn(error);
    throw error;
  }
};
