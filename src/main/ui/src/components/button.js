export const getImageFromServer = (mapSize,mapTheme) => {
    return fetch(`http://localhost:8080/generateImage?Map%20Size=${mapSize}&Map%20Theme=${mapTheme}`)
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