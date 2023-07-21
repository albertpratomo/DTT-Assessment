export const getHouseById = async ( id
    
  ) => {
    const response = await fetch(process.env.VUE_APP_API_URL+'/'+id, {
        headers: {
          'x-api-key': process.env.VUE_APP_API_KEY
        }})
        if (!response.ok) {
            throw new Error('Failed to fetch house');
          }
    return await response.json()
  }