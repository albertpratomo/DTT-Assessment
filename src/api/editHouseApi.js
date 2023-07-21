import {uploadImage} from "@/api/uploadImageApi";
export const editHouse = async (id,formData, formDataImage) => {
  try {
    const response = await fetch(`${process.env.VUE_APP_API_URL}/${id}`, {
      method: "POST",
      headers: {
        "x-api-key": process.env.VUE_APP_API_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to edit the listing");
    }


    // console.log("ID"  + id);
    // console.log("FD"  + formData);
    // console.log(formDataImage.get("image.name"));
    await uploadImage(id,formDataImage);
    
  } catch (error) {
    console.error(error);
    throw error;
  }
};

