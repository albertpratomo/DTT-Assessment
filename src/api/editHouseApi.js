export const editHouse = async (id,formData, formDataImage) => {
  try {
    // const response1 = await fetch(`${process.env.VUE_APP_API_URL}/${id}`, {
    //   method: "POST",
    //   headers: {
    //     "x-api-key": process.env.VUE_APP_API_KEY,
    //   },
    //   body: formData,
    // });

    // if (!response1.ok) {
    //   throw new Error("Failed to edit the listing");
    // }

    // const jsonResponse1 = await response1.json();
    // console.log('API RESPONSE 1:', jsonResponse1);

    // const id = jsonResponse1.id; // Get the 'id' from response1

    //const id= '9376';
    console.log("ID"  + id);
    console.log("FD"  + formData);
    for (var pair of formDataImage.entries()) {
      console.log(pair[0] + ", " + pair[1]);
      const imageObject = {};

      for (const key in pair[1]) {
          const value = pair[1][key];
          const notFunction = typeof value !== "function";
          notFunction && (imageObject[key] = value);
      }
      console.log(JSON.stringify(imageObject));
    }
    // const response2 = await fetch(`${process.env.VUE_APP_API_URL}/${id}/upload`, {
    //   method: "POST",
    //   headers: {
    //     "x-api-key": process.env.VUE_APP_API_KEY,
    //     'Content-Type': 'multipart/form-data'
    //   },
    //   body: formDataImage,
    // });

    // if (!response2.ok) {
    //   throw new Error("Failed to upload the image");
    // }
    // console.log(response2.status);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

