export const getImageFromServer = () => {
    return fetch('http://localhost:8080/getMap')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then(imageBlob => URL.createObjectURL(imageBlob))
      .catch(error => {
        console.error('Error fetching map:', error);
        throw error;
      });
  };
