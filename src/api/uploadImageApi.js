export const uploadImage = async (id,formDataImage) => {
  try {
    const response = await fetch(`${process.env.VUE_APP_API_URL}/${id}/upload`, {
      method: "POST",
      headers: {
        "x-api-key": process.env.VUE_APP_API_KEY,
      },
      body: formDataImage,
    });
    if (!response.ok) {
      throw new Error("Failed to upload the image");
    }

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

