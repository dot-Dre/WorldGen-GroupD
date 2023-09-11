import React, { useEffect, useState } from 'react';

function App() {
    const [mapData, setMapData] = useState(null);
    const [size, setSize] = useState('null');
    const [theme, setTheme] = useState('null');
    const [shouldRequest, setShouldRequest] = useState(false);

    useEffect(() => {
        if (!shouldRequest) return;

        let socket = new WebSocket("ws://130.195.6.107:8080/map");

        socket.addEventListener('open', () => {
            const params = {
                size: size,
                theme: theme
            };
            socket.send(JSON.stringify(params));
        });

        socket.addEventListener('message', (event) => {
            const receivedMapData = JSON.parse(event.data);
            setMapData(receivedMapData);
        });

        socket.addEventListener('close', () => {
            setShouldRequest(false);
        });

        return () => {
            socket.close();
        };
    }, [size, theme, shouldRequest]);

    return (
        <div>
            <select onChange={(e) => setSize(e.target.value)}>
                <option value="s">Small</option>
                <option value="m">Medium</option>
                <option value="l">Large</option>
            </select>
            <select onChange={(e) => setTheme(e.target.value)}>
                <option value="g">Graveyard</option>
                <option value="n">Necromancer's Dungeon</option>
            </select>
            <button onClick={() => setShouldRequest(true)}>Request Map</button>
            {/* Render the map based on mapData */}
            {mapData && <img src={`data:image/png;base64,${mapData}`} alt="Generated Map" />}
        </div>
    );
}

export default App;