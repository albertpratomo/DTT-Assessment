export const getRecHouses = async (id
    
  ) => {
    const response = await fetch(process.env.VUE_APP_API_URL, {
        headers: {
          'x-api-key': process.env.VUE_APP_API_KEY
        }})
    
    

  if (!response.ok) {
    throw new Error('Failed to fetch houses');
  }

  const houses = await response.json();

  // Shuffle the array randomly
  const shuffledHouses = shuffleArray(houses);

  // Return the first 3 elements from the shuffled array
  const filteredHouses = shuffledHouses.filter(house => house.id !== id && house.madeByMe === false);

  // Return the first 3 elements from the filtered array
  return filteredHouses.slice(0, 3);
};

// Helper function to shuffle an array randomly using Fisher-Yates algorithm
function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
  }