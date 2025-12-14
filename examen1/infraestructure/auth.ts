import callApi from "@/utils/callApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthResponse } from "@/constants/types";

const urlAPI = process.env.EXPO_PUBLIC_API_URL;

const auth = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    let parameter = {
      email: email,
      password: password,
    };
    let response = await callApi.POST(`${urlAPI}/auth/login`, "", parameter);
    if (response.success) {
      await AsyncStorage.setItem("token", response.data.token);
      await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return { success: response.success };
  },
  register: async (email: string, password: string): Promise<AuthResponse> => {
    let parameter = {
      email: email,
      password: password,
    };
    let response = await callApi.POST(`${urlAPI}/auth/register`, "", parameter);
    if (response.success)
      await AsyncStorage.setItem("token", response.data.token);
    return { success: response.success };
  },
};

export default auth;
