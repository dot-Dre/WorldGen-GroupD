import React, { useState } from 'react';
import './App.css';
import { getImageFromServer } from './components/button';

function App() {
    const [imageSrc, setImageSrc] = useState(null);
    const [mapSize, setMapSize] = useState('s');
    const [mapTheme, setMapTheme] = useState('g');

    const handleButtonClick = () => {
        getImageFromServer(mapSize, mapTheme)
            .then(imageUrl => setImageSrc(imageUrl))
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="App">
            <div>
                <label htmlFor="mapSize">Select Map Size: </label>
                <select id="mapSize" value={mapSize} onChange={event => setMapSize(event.target.value)}>
                    <option value="s">Small</option>
                    <option value="m">Medium</option>
                    <option value="l">Large</option>
                </select>
            </div>
            <div>
                <label htmlFor="mapTheme">Select Map Theme: </label>
                <select id="mapTheme" value={mapTheme} onChange={event => setMapTheme(event.target.value)}>
                    <option value="g">Graveyard</option>
                    <option value="n">Necromancer's Dungeon</option>
                </select>
            </div>
            <button onClick={handleButtonClick}>Get Image from Backend</button>
            {imageSrc && <img src={imageSrc} alt="Received from server" />}
        </div>
    );
}

export default App;