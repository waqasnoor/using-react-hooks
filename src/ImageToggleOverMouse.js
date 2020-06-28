import React, { useRef } from "react";

const ImageToggleOverMouse = ({ primary, secondary }) => {
  const imageRef = useRef(null);
  return (
    <img
      src={primary}
      alt=""
      ref={imageRef}
      onMouseOver={() => {
        imageRef.current.src = secondary;
      }}
      onMouseOut={() => {
        imageRef.current.src = primary;
      }}
    />
  );
};
export default ImageToggleOverMouse;
