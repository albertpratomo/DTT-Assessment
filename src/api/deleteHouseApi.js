export const deleteHouse = async (id) => {
  try {
    const response = await fetch(`${process.env.VUE_APP_API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "x-api-key": process.env.VUE_APP_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete listing");
    }
    console.log(response.status);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

