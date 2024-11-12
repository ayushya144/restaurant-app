import React, { useContext, useEffect, useState } from "react";
import { getCookie } from "./commonFuntions";

// Define the type for the AuthContext value
interface AuthContextType {
  authenticated?: string | boolean; // Token can be a string or undefined
  setAuth: (auth: { token: string; refreshToken: string }) => void;
  removeAuth?: () => void;
  loading?: boolean; // Optionally include loading state
}

// Create the AuthContext with a default value
export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined
);

// Custom hook to use the AuthContext
function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Function to get the refresh token from cookies
export async function getOldRefToken(): Promise<string | false> {
  const cookieValue = await getCookie("refresh");
  return cookieValue ? JSON.parse(cookieValue) : false;
}

// Initial state variable for oldRefToken, set in an async way
export const oldRefToken: Promise<string | false> = getOldRefToken();

export default useAuth;
