import React, { useState } from 'react';
import { Container, Button, Typography, Grid, Box, Dialog, DialogTitle } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Lottie from "lottie-react";
import animationData from "./assets/overlay.json";
import theme from '../Theme';

function Generate() {
    const [infoText, setInfoText] = useState('');
    const [showPopup, setShowPopup] = useState(true); // State to control the visibility of the popup

    const handleGenerateClick = () => {
        console.log(`Generating dungeon...`);
        setShowPopup(false); // Hide the popup when the generate button is clicked
        // Add your generation logic here.
    };

    const handleMouseOver = (text) => {
        setInfoText(text);
    };

    const handleMouseOut = () => {
        setInfoText('');
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container spacing={0}>
                {/* Control Panel on the left */}
                <Grid item xs={2} style={{ backgroundColor: '#E0E0E0', borderRight: '2px solid #3C3C3C' }}>
                    <Container style={{ width: '80%', textAlign: 'center', color: '#3C3C3C', paddingTop: '50px', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <Typography variant="h4" gutterBottom style={{ textTransform: 'uppercase', fontFamily: 'fantasy' }}>
                                Theme
                            </Typography>
                            <Button
                                variant="outlined"
                                fullWidth
                                size="medium"
                                style={{ marginBottom: '15px', color: '#3C3C3C', borderColor: '#3C3C3C', backgroundColor: '#D0D0D0' }}
                                onClick={() => handleGenerateClick('Graveyard')}
                                onMouseOver={() => handleMouseOver('Graveyard: A spooky and haunted place filled with undead creatures.')}
                                onMouseOut={handleMouseOut}
                            >
                                Graveyard
                            </Button>
                            <Button
                                variant="outlined"
                                fullWidth
                                size="medium"
                                style={{ marginBottom: '15px', color: '#3C3C3C', borderColor: '#3C3C3C', backgroundColor: '#D0D0D0' }}
                                onClick={() => handleGenerateClick('Mansion')}
                                onMouseOver={() => handleMouseOver('Mansion: A grand house that may have hidden secrets and rooms.')}
                                onMouseOut={handleMouseOut}
                            >
                                Mansion
                            </Button>
                            <Button
                                variant="outlined"
                                fullWidth
                                size="medium"
                                style={{ marginBottom: '15px', color: '#3C3C3C', borderColor: '#3C3C3C', backgroundColor: '#D0D0D0' }}
                                onClick={() => handleGenerateClick('Basement')}
                                onMouseOver={() => handleMouseOver('Basement: The dark underbelly of a house, where unknown dangers lurk.')}
                                onMouseOut={handleMouseOut}
                            >
                                Basement
                            </Button>
                            <Typography variant="h6" gutterBottom style={{ marginTop: '20px', textTransform: 'uppercase', fontFamily: 'fantasy' }}>
                                Map Size
                            </Typography>
                            <Grid container spacing={3} justifyContent="center">
                                <Grid item><Button variant="outlined" size="medium" style={{ color: '#3C3C3C', borderColor: '#3C3C3C', backgroundColor: '#D0D0D0' }} onMouseOver={() => handleMouseOver('Small map size.')} onMouseOut={handleMouseOut}>S</Button></Grid>
                                <Grid item><Button variant="outlined" size="medium" style={{ color: '#3C3C3C', borderColor: '#3C3C3C', backgroundColor: '#D0D0D0' }} onMouseOver={() => handleMouseOver('Medium map size.')} onMouseOut={handleMouseOut}>M</Button></Grid>
                                <Grid item><Button variant="outlined" size="medium" style={{ color: '#3C3C3C', borderColor: '#3C3C3C', backgroundColor: '#D0D0D0' }} onMouseOver={() => handleMouseOver('Large map size.')} onMouseOut={handleMouseOut}>L</Button></Grid>
                            </Grid>
                            <Box mt={3} p={2} style={{ backgroundColor: '#D0D0D0', borderRadius: '5px' }}>
                                <Typography>{infoText}</Typography>
                            </Box>
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            style={{ marginBottom: '20px', backgroundColor: '#3C3C3C', color: '#E0E0E0' }}
                            onClick={handleGenerateClick}
                            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#4C4C4C'; }}
                            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#3C3C3C'; }}
                        >
                            Generate
                        </Button>
                    </Container>
                </Grid>
                {/* Game Window on the right */}
                <Grid item xs={10}>
                    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
                        {/* Lottie animation */}
                        <Lottie animationData={animationData} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />

                        {/* Popup */}
                        <Dialog open={showPopup} onClose={() => setShowPopup(false)}>
                            <DialogTitle>Please select a Theme and Map size</DialogTitle>
                        </Dialog>
                    </div>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default Generate;
