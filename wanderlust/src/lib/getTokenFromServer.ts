import { headers } from "next/headers";
import { auth } from "./auth";

export const getTokenFromServer = async() => {
    const JWTtoken = await auth.api.getToken({
        headers: await headers()
      })
    
      const token = JWTtoken?.token;

      return token;
}