import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import {
  Button,
  TextInput,
  Title,
  Paragraph,
  Snackbar,
} from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import useAuth from "@/utils/authUtils";
import { setUserInfo } from "@/store/slices/user";
import { useSignInMutation } from "@/store/apis/signIn";

// Define the types for the form data
interface SignInFormData {
  email: string;
  password: string;
}

// Validation schema
// const RESERVATION_FORM_VALIDATION = Yup.object().shape({
//   email: validationSchema.email,
//   password: validationSchema.password,
// });

const SignIn: React.FC = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const [signInGet, { data, isSuccess }] = useSignInMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    mode: "onTouched",
    // resolver: yupResolver(RESERVATION_FORM_VALIDATION),
  });

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUserInfo(data.data.user));
      auth.setAuth(data.data);
    }
  }, [isSuccess]);

  const onSubmit = async (formData: SignInFormData) => {
    console.log({ formData });
    const body = {
      //   email: formData.email.trim(),
      //   password: formData.password.trim(),
      email: "admin@restaurant.com",
      password: "Admin@123",
    };
    try {
      const response = await signInGet(body);
      //   if (response?.data?.success) {
      //     Snackbar.show({
      //       text: "Sign-in successful.",
      //       duration: Snackbar.DURATION_SHORT,
      //     });
      //   } else {
      //     Snackbar.show({
      //       text:
      //         response?.error?.data?.message ||
      //         "Sign-in failed. Please try again.",
      //       duration: Snackbar.DURATION_SHORT,
      //     });
      //   }
    } catch (apiError) {
      //   Snackbar.show({
      //     text: "Error during sign-in. Please try again.",
      //     duration: Snackbar.DURATION_SHORT,
      //   });
      console.error("Error during sign-in:", apiError);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftPanel}>
        {/* <Image
          source={require("../../assets/brand-image/punjabi-touch-logo.png")}
          style={styles.logo}
        /> */}
        <Title style={styles.title}>Welcome Back</Title>
        <Paragraph style={styles.subtitle}>
          Sign in to continue to your dashboard
        </Paragraph>
      </View>

      <View style={styles.rightPanel}>
        <Title style={styles.signInTitle}>Sign In to Your Account</Title>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              label="Email"
              mode="outlined"
              style={styles.input}
              error={!!errors.email}
              placeholderTextColor={errors.email ? "red" : undefined}
              //   onFocus={() => errors.email && clearErrors("email")}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              label="Password"
              mode="outlined"
              style={styles.input}
              secureTextEntry
              error={!!errors.password}
              placeholderTextColor={errors.password ? "red" : undefined}
              //   onFocus={() => errors.password && clearErrors("password")}
            />
          )}
        />
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
        >
          Sign In
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  leftPanel: {
    flex: 1,
    backgroundColor: "linear-gradient(to bottom right, #000000, #FF616F)",
    justifyContent: "center",
    alignItems: "center",
    color: "#FFFFFF",
    padding: 20,
  },
  logo: {
    width: "50%",
    height: "auto",
    marginBottom: 16,
  },
  title: {
    color: "#FFFFFF",
    fontWeight: "600",
    marginBottom: 8,
  },
  subtitle: {
    color: "#FFFFFF",
    opacity: 0.8,
    marginBottom: 24,
  },
  rightPanel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  signInTitle: {
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
    width: "100%",
  },
  button: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#FF1744",
  },
});

export default SignIn;
