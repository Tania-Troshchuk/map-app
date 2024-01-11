import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

export const responseHandler = async <T>(
  response: Promise<AxiosResponse<T>>
): Promise<T> => {
  return await response
    .then((response) => response.data)
    .catch((error: AxiosError<{ message: string }>) => {
      const message = error.response?.data
        ? error.response.data.message
        : error.message;

      toast.error(message);
      console.debug(error);

      return Promise.reject(new Error(message));
    });
};
