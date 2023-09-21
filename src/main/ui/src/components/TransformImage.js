import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const TransformImage = ({ img, imgWidth, imgHeight }) => {
  return (
      <TransformWrapper style={{width:imgWidth, height:imgHeight}}>
        <TransformComponent style={{width:imgWidth, height:imgHeight}}>
          <img
            style={{width:imgWidth, height:imgHeight}}
            src={img}
            alt="crashed"
          />
        </TransformComponent>
      </TransformWrapper>
  );
};

export default TransformImage;
