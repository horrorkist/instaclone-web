interface IUploadImageResponse {
  errors: string[];
  messages: string[];
  result: {
    id: string;
    uploadURL: string;
  };
  success: boolean;
}

export const uploadImage = async (
  file: File,
  url: string
): Promise<IUploadImageResponse> => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });
  const result = await response.json();
  return result;
};
