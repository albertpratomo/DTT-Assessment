export const createHouse = async (formData, formDataImage) => {
  try {
    const response1 = await fetch(process.env.VUE_APP_API_URL, {
      method: "POST",
      headers: {
        "x-api-key": process.env.VUE_APP_API_KEY,
      },
      body: formData,
    });

    if (!response1.ok) {
      throw new Error("Failed to create the listing");
    }

    const jsonResponse1 = await response1.json();
    console.log('API RESPONSE 1:', jsonResponse1);

    const id = jsonResponse1.id; // Get the 'id' from response1

    console.log("FD"  + formData);
    console.log(formDataImage.get("image.name"));

    const response2 = await fetch(`${process.env.VUE_APP_API_URL}/${id}/upload`, {
      method: "POST",
      headers: {
        "x-api-key": process.env.VUE_APP_API_KEY,
        'Content-Type': 'multipart/form-data'
      },
      body: formDataImage,
    });

    if (!response2.ok) {
      throw new Error("Failed to upload the image");
    }
    console.log(response2.status);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

