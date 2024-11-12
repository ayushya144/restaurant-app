import React, { useState, useEffect, useMemo, ReactNode } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Text } from "react-native-paper";
import useAuth, { AuthContext, oldRefToken } from "@/utils/authUtils";
import { deleteAllCookies, setCookie } from "@/utils/commonFuntions";
import { userSelector } from "@/store/slices/user";

interface AuthProviderProps {
  children: ReactNode;
}

interface Auth {
  token?: string;
  refreshToken?: string;
}

type RootStackParamList = {
  SignIn: undefined; // Define the parameters for the SignIn screen
  Home: undefined; // Define the parameters for the SignIn screen
  AdminOrders: undefined; // Define the parameters for the SignIn screen
  // other screens...
};

export function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [auth, setAuth] = useState<Auth>({ refreshToken: "" });
  const [loading, setLoading] = useState<boolean>(false);

  //   useEffect(() => {
  //     let isMounted = true;

  //     const getOldRefToken = async () => {
  //       try {
  //         const token = await oldRefToken; // Await the promise

  //         if (isMounted) {
  //           setAuth({ refreshToken: token || "" });
  //           setLoading(false);
  //         }
  //       } catch (error) {
  //         console.error("Failed to get old refresh token:", error);
  //         if (isMounted) {
  //           setLoading(false);
  //         }
  //       }
  //     };

  //     getOldRefToken(); // Call the function directly

  //     return () => {
  //       isMounted = false;
  //     };
  //   }, []);

  const token = auth?.token || auth?.refreshToken;

  const removeAuth = () => {
    dispatch({ type: "logout" });
    deleteAllCookies();
    setAuth({}); // Adjust if necessary
    navigation.navigate("SignIn");
  };

  const addAuth = ({ token = "", refreshToken = "" }: Auth) => {
    setCookie("token", token);
    setCookie("refresh", refreshToken);
    setAuth({ token, refreshToken });
  };

  const value = {
    authenticated: token,
    setAuth: addAuth,
    removeAuth,
    loading,
  };

  if (loading) {
    return <Text>Loading</Text>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

interface AuthRedirectProps {
  children: ReactNode;
  authenticatedRoute?: boolean;
}

export function AuthRedirect({
  children,
  authenticatedRoute = true,
}: AuthRedirectProps) {
  const auth = useAuth();
  const user = useSelector(userSelector);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const isAuthenticated = !!auth?.authenticated;

  // Memoize the redirect path to avoid excessive re-rendering
  const redirectPath = useMemo(() => {
    return isAuthenticated ? "AdminOrders" : "Home"; // Adjust these names to match your screen names
  }, [isAuthenticated]);

  // Redirect to sign-in if not authenticated and the route is protected
  useEffect(() => {
    if (!isAuthenticated && authenticatedRoute) {
      navigation.navigate("Home"); // Adjust the screen name as necessary
    } else if (isAuthenticated && !authenticatedRoute) {
      navigation.navigate(redirectPath);
    }
  }, [isAuthenticated, authenticatedRoute, navigation, redirectPath]);

  return <>{children}</>;
}

AuthRedirect.propTypes = {
  children: PropTypes.node,
  authenticatedRoute: PropTypes.bool,
};
