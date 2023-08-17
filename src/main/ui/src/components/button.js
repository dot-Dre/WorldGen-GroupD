export const getImageFromServer = (ipAddress) => {
  const apiUrl = `http://${ipAddress}:8080/getMap`;

  return fetch(apiUrl)
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

export const copyIPv4 = () => {
  return fetch('https://api64.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      // Get the IPv4 address
      var ipv4Address = data.ip;

      // Copy the IPv4 address to clipboard
      navigator.clipboard.writeText(ipv4Address);
    })
    .catch(error => {
      console.error('Error fetching IP address:', error);
    });
};