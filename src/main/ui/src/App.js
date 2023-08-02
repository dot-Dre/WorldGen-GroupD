import React, { useState } from 'react';
import './App.css';
import { getImageFromServer } from './components/button';

function App() {

  const [imageSrc, setImageSrc] = useState(null);

  const handleButtonClick = () => {
    getImageFromServer()
      .then(imageUrl => setImageSrc(imageUrl))
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="App">
      <button onClick={handleButtonClick}>Get Image from Backend</button>
      {imageSrc && <img src={imageSrc} alt="Received from server" />}
    </div>
  );
}

export default App;
