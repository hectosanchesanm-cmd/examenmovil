import { Platform } from "react-native";

const callApi = {
  Get: async (url: string, token?: string): Promise<any> => {
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  },
  POST: async (url: string, token: string, data: object): Promise<any> => {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  },
  PATCH: async (url: string, token: string, data: object): Promise<any> => {
    let response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  },
  PUT: async (url: string, token: string, data: object): Promise<any> => {
    let response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  },
  DELETE: async (url: string, token: string, data?: object): Promise<any> => {
    let response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  },
  GetImage: async (url: string, token: string): Promise<any> => {
    let response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) return await response.blob();
    else return await response.json();
  },
  PostImage: async (
    url: string,
    token: string,
    uri: string,
    type: string | null = "image/jpeg"
  ): Promise<any> => {
    let formData = new FormData();
    formData.append("image", {
      uri: Platform.OS === "ios" ? uri.replace("file://", "") : uri,
      type: "image/jpeg",
      name: "photo.jpg",
    } as any);
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!response.ok) throw new Error(await response.text());
    return await response.json();
  },
};

export default callApi;
