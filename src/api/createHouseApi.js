export const createHouse = async (houseData) => {
  console.log('FORM DATA: '+JSON.stringify(houseData));
  const formData = new FormData();
  formData.append("price", houseData.price);
  formData.append("bedrooms", houseData.bedrooms);
  formData.append("bathrooms", houseData.bathrooms);
  formData.append("size", houseData.size);
  formData.append("streetName", houseData.streetname);
  formData.append("houseNumber", houseData.housenumber);
  formData.append("numberAddition", houseData.additionoptional);
  formData.append("zip", houseData.postalcode);
  formData.append("city", houseData.city);
  formData.append("constructionYear", houseData.constructionyear);
  formData.append("hasGarage", houseData.garage);
  formData.append("description", houseData.description);

  // try {
  //   const response = await fetch(process.env.VUE_APP_API_URL, {
  //     method: "POST",
  //     headers: {
  //       "x-api-key": process.env.VUE_APP_API_KEY,
  //     },
  //     body: formData,
  //   });

  //   if (!response.ok) {
  //     throw new Error("Failed to create the listing");
  //   }
  //   console.log('API RESPONSE: ' + response.json());
  // } catch (error) {
  //   console.error(error);
  //   throw error;
  // }
};
