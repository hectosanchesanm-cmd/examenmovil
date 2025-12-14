import { TaskResponse, Response } from "@/constants/types";
import callApi from "@/utils/callApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const urlAPI = process.env.EXPO_PUBLIC_API_URL;

const todos = {
  getAll: async (): Promise<Response<TaskResponse[]>> => {
    let token = await AsyncStorage.getItem("token");
    let response = await callApi.Get(
      `${urlAPI}/todos`,
      token != null ? token : ""
    );
    return {
      success: response.success,
      count: response.data.count,
      data: response.data,
    };
  },
  getById: async (taskId: string): Promise<Response<TaskResponse>> => {
    let token = await AsyncStorage.getItem("token");
    let response = await callApi.Get(
      `${urlAPI}/todos/${taskId}`,
      token != null ? token : ""
    );
    return {
      success: response.success,
      count: response.count,
      data: response.data,
    };
  },

  create: async (task: TaskResponse): Promise<Response<TaskResponse>> => {
    let token = await AsyncStorage.getItem("token");
    let response = await callApi.POST(
      `${urlAPI}/todos`,
      token != null ? token : "",
      task
    );
    return { success: response.success, data: response.data };
  },
  update: async (task: TaskResponse): Promise<Response<TaskResponse>> => {
    let token = await AsyncStorage.getItem("token");
    let response = await callApi.PATCH(
      `${urlAPI}/todos/${task.id}`,
      token != null ? token : "",
      task
    );
    return { success: response.success, data: response.data };
  },
  partialUpdate: async (
    task: TaskResponse
  ): Promise<Response<TaskResponse>> => {
    let token = await AsyncStorage.getItem("token");
    let response = await callApi.PATCH(
      `${urlAPI}/todos/${task.id}`,
      token != null ? token : "",
      task
    );
    return { success: response.success, data: response.data };
  },
  delete: async (id: string): Promise<Response<TaskResponse>> => {
    let token = await AsyncStorage.getItem("token");
    let response = await callApi.DELETE(
      `${urlAPI}/todos/${id}`,
      token != null ? token : ""
    );
    return {
      success: response.success,
      data: response.data,
      message: response.message,
    };
  },
};

export default todos;
