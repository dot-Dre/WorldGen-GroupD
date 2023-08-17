import React, { useState } from 'react';
import './App.css';
import { getImageFromServer, copyIPv4 } from './components/button';

function App() {
  
  const [imageSrc, setImageSrc] = useState(null);
  const [customIP, setCustomIP] = useState('');

  const handleButtonClick = (ipAddress) => {
    getImageFromServer(ipAddress)
      .then(imageUrl => setImageSrc(imageUrl))
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="App">
      <button onClick={() => handleButtonClick(customIP)}>Get Image from Backend</button>
    
      <input
        type="text"
        placeholder="Paste IP address here"
        value={customIP}
        onChange={event => setCustomIP(event.target.value)}
      />
    
      <button onClick={copyIPv4}>Copy IPv4 Address</button>
      {imageSrc && <img src={imageSrc} alt="Received from server" />}
      </div>
  );
}

export default App;
