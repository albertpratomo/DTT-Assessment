import {uploadImage} from "@/api/uploadImageApi";
export const createHouse = async (formData,formDataImage) => {
  try {
    const response = await fetch(process.env.VUE_APP_API_URL, {
      method: "POST",
      headers: {
        "x-api-key": process.env.VUE_APP_API_KEY,
      },
      body: formData,
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);

    if (!response.ok) {
      throw new Error("Failed to create the listing");
    }

    const id = jsonResponse.id; // Get the 'id' from response create house

    const responseImage = await uploadImage(id,formDataImage);
    console.log("res img stat: "+responseImage.status);
    if(!responseImage.ok){
      throw new Error("error upload image");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

