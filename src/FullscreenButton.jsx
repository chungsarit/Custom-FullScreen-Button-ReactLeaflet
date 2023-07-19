import React, { useEffect, useRef, useState } from 'react';
import { useMap } from 'react-leaflet';
import Button from '@mui/material/Button';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

function FullscreenButton({ position = 'topright' }) {
    const map = useMap();
    const buttonRef = useRef();
    const [isFullscreen, setIsFullscreen] = useState(false);

    const baseStyle = {
        width: '32px', height: '32px', padding: '0', position: 'absolute', zIndex: 1000, minWidth: '30px', marginLeft: '10px', marginTop: '75px', maxHeight: '32px', maxWidth: '32px', backgroundColor: '#ffffff'
    };

    const styleTopLeft = { ...baseStyle };
    const styleTopRight = { ...baseStyle, right: '10.5px' };
    const styleButtomLeft = { ...baseStyle, bottom: '75px' };
    const styleButtomRight = { ...baseStyle, bottom: '92px', right: '10.5px' };

    useEffect(() => {
        const buttonElement = buttonRef.current;
        if (buttonElement) {
            L.DomEvent.disableClickPropagation(buttonElement);
            L.DomEvent.disableScrollPropagation(buttonElement);
        }
    }, []);

    const handleFullScreen = (e) => {
        e.stopPropagation();

        const mapContainer = map.getContainer();

        // Check if we're currently in fullscreen mode
        if (
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement
        ) {
            // If we're in fullscreen mode, exit it
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            } else if (document.mozCancelFullScreen) { // Firefox
                document.mozCancelFullScreen();
                setIsFullscreen(false);
            } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
                document.webkitExitFullscreen();
                setIsFullscreen(false);
            } else if (document.msExitFullscreen) { // IE/Edge
                document.msExitFullscreen();
                setIsFullscreen(false);
            }
        } else {
            // If we're not in fullscreen mode, enter it
            if (mapContainer.requestFullscreen) {
                mapContainer.requestFullscreen();
                setIsFullscreen(true);
            } else if (mapContainer.mozRequestFullScreen) { // Firefox
                mapContainer.mozRequestFullScreen();
                setIsFullscreen(true);
            } else if (mapContainer.webkitRequestFullscreen) { // Chrome, Safari and Opera
                mapContainer.webkitRequestFullscreen();
                setIsFullscreen(true);
            } else if (mapContainer.msRequestFullscreen) { // IE/Edge
                mapContainer.msRequestFullscreen();
                setIsFullscreen(true);
            }
        }
    };
    return (

        <Button variant="contained" color="primary" onClick={handleFullScreen} ref={buttonRef}
            style={
                position === 'topright' ? styleTopRight :
                    position === 'bottomleft' ? styleButtomLeft :
                        position === 'bottomright' ? styleButtomRight :
                            styleTopLeft
            } >
            {isFullscreen ? <FullscreenExitIcon style={{ color: 'black' }} /> : <FullscreenIcon style={{ color: 'black', fontSize: 'xlarge' }} />}
        </Button>

    );
}

export default FullscreenButton;