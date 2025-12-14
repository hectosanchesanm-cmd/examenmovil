import { nanoid } from "nanoid/non-secure";
const utils = {
  isBlob: (file: any): file is Blob => {
    return file instanceof Blob;
  },
  createFileImage: async (uri: string): Promise<Blob> => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  },
};

export default utils;
