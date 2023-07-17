export const getHouseById = async ( id
    
  ) => {
    const response = await fetch(`https://api.intern.d-tt.nl/api/houses/${id}`, {
        headers: {
          'x-api-key': 'the-api-key'
        }})
        if (!response.ok) {
            throw new Error('Failed to fetch house');
          }
    return await response.json()
  }