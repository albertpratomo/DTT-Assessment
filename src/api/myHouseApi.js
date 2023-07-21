export const getMyHouses = async (
    
  ) => {
    const response = await fetch(process.env.VUE_APP_API_URL, {
        headers: {
          'x-api-key': process.env.VUE_APP_API_KEY
        }})
        if (!response.ok) {
            throw new Error('Failed to fetch houses');
          }
          const houses = await response.json();

          // Filter houses where 'madeByMe' is true
          const myHouses = houses.filter((house) => house.madeByMe === true);
        
          return myHouses;
  }