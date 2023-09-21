import React, { useState } from 'react';
import { Container, Button, Typography, Grid, Box, TextField } from '@mui/material';

function MapView() {
    const [infoText, setInfoText] = useState('Game details will appear here.');

    const handleRegenerateClick = () => {
        console.log(`Regenerating dungeon...`);
        // Add your regeneration logic here.
    };

    const handleBeginGame = () => {
        console.log(`Beginning game...`);
        // Logic for starting the game
    };

    const handleSaveGame = () => {
        console.log(`Saving game...`);
        // Logic for saving the game
    };

    return (
        <Grid container spacing={0}>
            {/* Control Panel on the left */}
            <Grid item xs={2} style={{ backgroundColor: '#E0E0E0', borderRight: '2px solid #3C3C3C' }}>
                <Container style={{ width: '80%', textAlign: 'center', color: '#3C3C3C', paddingTop: '50px', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>

                    <Typography variant="h4" gutterBottom style={{ textTransform: 'uppercase', fontFamily: 'fantasy' }}>
                        All Done
                    </Typography>

                    {/* Game Details Text Box */}
                    <Box mb={4} width="100%">
                        <TextField
                            fullWidth
                            variant="outlined"
                            multiline
                            rows={4}
                            value={infoText}
                            disabled // If you don't want users to modify it
                        />
                    </Box>

                    {/* Begin and Save Game Buttons */}
                    <Button
                        variant="outlined"
                        fullWidth
                        size="medium"
                        style={{ marginBottom: '15px', color: '#3C3C3C', borderColor: '#3C3C3C', backgroundColor: '#D0D0D0' }}
                        onClick={handleBeginGame}
                    >
                        Begin Game
                    </Button>
                    <Button
                        variant="outlined"
                        fullWidth
                        size="medium"
                        style={{ marginBottom: '15px', color: '#3C3C3C', borderColor: '#3C3C3C', backgroundColor: '#D0D0D0' }}
                        onClick={handleSaveGame}
                    >
                        Save Game
                    </Button>

                    {/* Regenerate Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        style={{ marginBottom: '20px', backgroundColor: '#3C3C3C', color: '#E0E0E0' }}
                        onClick={handleRegenerateClick}
                        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#4C4C4C'; }}
                        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#3C3C3C'; }}
                    >
                        Regenerate
                    </Button>
                </Container>
            </Grid>

            {/* Map View on the right */}
            <Grid item xs={10}>
                <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
                    {/* This is where your map or any other content will go. */}
                </div>
            </Grid>
        </Grid>
    );
}

export default MapView;