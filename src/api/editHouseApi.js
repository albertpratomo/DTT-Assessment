export const editHouse = async (id,formData, formDataImage) => {
  try {
    const response1 = await fetch(`${process.env.VUE_APP_API_URL}/${id}`, {
      method: "POST",
      headers: {
        "x-api-key": process.env.VUE_APP_API_KEY,
      },
      body: formData,
    });

    if (!response1.ok) {
      throw new Error("Failed to edit the listing");
    }


    console.log("ID"  + id);
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

