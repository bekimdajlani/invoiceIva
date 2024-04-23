import axios from "axios";
import { clientAction } from "./client-slice";

const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:8081/api/invoices");

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getClientData = async () => {
  return async (dispatch) => {
    try {
      const clientData = await fetchData();
      dispatch(clientAction.replaceClient(clientData));
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
};

export const sendClientData = (client) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await axios.post(
        "http://localhost:3000/api/customers",
        client,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    };
    console.log("console in client action  " + client);
    try {
      const response = await sendRequest();
      const clientData = await fetchData();
      console.log('console in client action ' + response)
      dispatch(clientAction.replaceClient(clientData));
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
};

export const deleteClient = (id) => {
  return async (dispatch) => {
    const deleteRequest = async () => {
      const response = await axios.post(
        "http://localhost:3000/api/customers",
        id,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    };

    try {
      const deleteResponse = await deleteRequest();
      console.log(deleteResponse);
        const clients = await getClientData();
        dispatch(clientAction.replaceClient(clients))
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}