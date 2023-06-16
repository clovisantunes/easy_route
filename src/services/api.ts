import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { AuthTokenError } from "./errors/AuthTokenError";
import { signOut } from "@/contexts/AuthContext";
export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: "https://api-deslocamento.herokuapp.com/api/v1",
  });
  api.interceptors.response.use(
    (response) => {
      return response;
    }, (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (typeof window !== undefined) {
            signOut();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }
      return Promise.reject(error);
    }
  );
  return api;
}
