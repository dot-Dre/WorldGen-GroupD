export const MapRequest = (mapRequest) => { // WILL NEED TO REFACTOR
  const mapTheme = mapRequest.theme;
  const mapSize = mapRequest.size;
  const roomNumber = mapRequest.roomNumber
  const seed = mapRequest.seed
  const variance = mapRequest.variance

  // Construct the URL with query parameters
  const urlCustom = `http://localhost:8080/getCustomMap?theme=${mapTheme}&size=${mapSize}&roomNumber=${roomNumber}&seed=${seed}&variance=${variance}`;

  const urlQuick = `http://localhost:8080/getQuickMap?theme=${mapTheme}&size=${mapSize}`;

  var url = urlCustom

  if (roomNumber === -1) {
    url = urlQuick
  }

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
