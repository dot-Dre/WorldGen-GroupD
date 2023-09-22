import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const TransformImage = ({ img, imgWidth, imgHeight, left }) => {
  return (
      <TransformWrapper initialScale={1.5} initialPositionX={-300} initialPositionY={-300} style={{width:imgWidth, height:imgHeight}}>
        <TransformComponent style={{width:imgWidth, height:imgHeight}}>
          <img
            style={{width:imgWidth, height:imgHeight, marginLeft:left}}
            src={img}
            alt="crashed"
          />
        </TransformComponent>
      </TransformWrapper>
  );
};

export default TransformImage;
