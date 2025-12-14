import { Response, MessageResponse, ImageResponse } from "@/constants/types";
import utils from "@/utils/utils";
import callApi from "@/utils/callApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const urlAPI = process.env.EXPO_PUBLIC_API_URL;

let image = {
  GET: async (userId: string, imageId: string): Promise<Response<Blob>> => {
    let token = await AsyncStorage.getItem("token");
    let response = await callApi.GetImage(
      `${urlAPI}/images/${userId}/${imageId}`,
      token != null ? token : ""
    );
    if (utils.isBlob(response)) {
      return { success: true, data: response };
    }
    return { success: false, error: response.error };
  },
  DELETE: async (
    userId: string,
    imageId: string
  ): Promise<Response<MessageResponse>> => {
    let token = await AsyncStorage.getItem("token");
    let response = await callApi.DELETE(
      `${urlAPI}/images/${userId}/${imageId}`,
      token != null ? token : ""
    );
    return { success: response.success };
  },
  UPLOAD: async (
    mimetype: string,
    uri: string
  ): Promise<Response<ImageResponse>> => {
    let token = await AsyncStorage.getItem("token");
    let response = await callApi.PostImage(
      `${urlAPI}/images`,
      token != null ? token : "",
      uri,
      mimetype
    );
    if (response.success) return { success: true, data: response.data };
    return { success: false, error: response.error };
  },
};

export default image;
