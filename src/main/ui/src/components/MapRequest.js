export const MapRequest = (mapRequest) => { // WILL NEED TO REFACTOR 
  const mapTheme = mapRequest.theme;
  const mapSize = mapRequest.size;

  // Construct the URL with query parameters
  const url = `http://localhost:8080/getMap?param1=${mapTheme}&param2=${mapSize}`;
  // const url = 'http://localhost:8080/getMap'

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.blob();
    })
    .catch((error) => {
      console.error('Error fetching map:', error);
      throw error;
    });
};
