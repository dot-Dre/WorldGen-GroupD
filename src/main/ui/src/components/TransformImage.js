import { Typography } from "@mui/material";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ourPalette } from "../Theme";

const TransformImage = ({ img, imgWidth, imgHeight, left, top }) => {
  return (
      <TransformWrapper initialScale={1} initialPositionX={0} initialPositionY={0} style={{width:imgWidth, height:imgHeight}}>
        <TransformComponent style={{width:"100vw", height:"100vh"}}>
          <img
            style={{width:imgWidth, height:imgHeight, marginLeft:left, marginTop:top}}
            src={img}
            alt={(<Typography style={{fontFamily:"monospace", color:ourPalette.white}}>
            Map Not Found
          </Typography>)}
          />
        </TransformComponent>
      </TransformWrapper>
  );
};

export default TransformImage;
