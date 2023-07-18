export const getHouses = async (
    
  ) => {
    const response = await fetch(process.env.VUE_APP_API_URL, {
        headers: {
          'x-api-key': process.env.VUE_APP_API_KEY
        }})
        if (!response.ok) {
            throw new Error('Failed to fetch houses');
          }
    return await response.json()
  }