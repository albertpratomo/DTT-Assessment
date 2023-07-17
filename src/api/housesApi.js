export const getHouses = async (
    
  ) => {
    const response = await fetch(`https://api.intern.d-tt.nl/api/houses`, {
        headers: {
          'x-api-key': 'the-api-key'
        }})
        if (!response.ok) {
            throw new Error('Failed to fetch houses');
          }
    return await response.json()
  }