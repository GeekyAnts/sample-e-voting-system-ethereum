import axios, { AxiosError, AxiosRequestHeaders, AxiosResponse } from "axios";
import { errorMessageHandler } from "./error-messages";

//this will go in the env variables after when used with a real api base url
const baseTestUrl = `https://OpaqueAliveZettabyte.joyan11.repl.co`;
const authorization = true;
type ServerError = { error: string };

const getBaseUrl = () => {
  return baseTestUrl;
};

const createHeader = async (authorization: boolean) => {
  const headers: AxiosRequestHeaders = {
    "Access-Control-Allow-Origin": "*",
  };

  if (authorization === true) {
    const token = "";
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

const handleSuccessfulResponse = (response: AxiosResponse) => {
  if (response.status >= 200 && response.status <= 300) {
    return JSON.parse(response.data);
  }
};

const handleErrorResponse = (serverError: AxiosError<ServerError>) => {
  if (serverError.message === "Network Error") {
    console.log("Network Error, Please try again later");
  } else {
    if (serverError.response?.status) {
      return errorMessageHandler(serverError.response.status);
    }
  }
};

const handleGetRequest = async (endPoint: string) => {
  const allHeaders = await createHeader(authorization);
  try {
    const response = await axios.get(`${getBaseUrl()}${endPoint}`, {
      headers: allHeaders,
    });
    return handleSuccessfulResponse(response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      console.log(handleErrorResponse(serverError));
    }
  }
};

const handlePostRequest = async (
  endPoint: string,
  data?: any
): Promise<any> => {
  const allHeaders = await createHeader(authorization);
  try {
    const response = await axios.post(
      `${getBaseUrl()}${endPoint}`,
      { data: "post" },
      { headers: allHeaders }
    );
    return handleSuccessfulResponse(response);
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      console.log(handleErrorResponse(serverError));
    }
  }
};

const handlePatchRequest = async (
  endPoint: string,
  data?: any
): Promise<any> => {
  const allHeaders = await createHeader(authorization);
  try {
    const response = await axios.patch(
      `${getBaseUrl()}${endPoint}`,
      { data: "patch" },
      { headers: allHeaders }
    );
    return handleSuccessfulResponse(response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      console.log(handleErrorResponse(serverError));
    }
  }
};

const handleDeleteRequest = async (
  endPoint: string,
  data?: any
): Promise<any> => {
  const allHeaders = await createHeader(authorization);
  try {
    const response = await axios.delete(`${getBaseUrl()}${endPoint}`, {
      headers: allHeaders,
      data: "delete",
    });
    return handleSuccessfulResponse(response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      console.log(handleErrorResponse(serverError));
    }
  }
};

const handlePutRequest = async (endPoint: string, data?: any): Promise<any> => {
  console.log(endPoint);
  const allHeaders = await createHeader(authorization);
  try {
    const response = await axios.put(
      `${getBaseUrl()}${endPoint}`,
      { data: "put" },
      {
        headers: allHeaders,
      }
    );
    return handleSuccessfulResponse(response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      console.log(handleErrorResponse(serverError));
    }
  }
};

export {
  handleGetRequest,
  handlePostRequest,
  handlePutRequest,
  handlePatchRequest,
  handleDeleteRequest,
};
