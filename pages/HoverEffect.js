import React from "react";
import ImageToggleOverMouse from "../src/ImageToggleOverMouse";

const ImageWithHoverEffect = () => {
  return (
    <div>
      <ImageToggleOverMouse
        primary="/speakers/bw/Speaker-187.jpg"
        secondary="/speakers/Speaker-187.jpg"
        alt=""
      />
      &nbsp; &nbsp; &nbsp;
      <ImageToggleOverMouse
        primary="/speakers/bw/Speaker-1124.jpg"
        secondary="/speakers/Speaker-1124.jpg"
        alt=""
      />
    </div>
  );
};

export default ImageWithHoverEffect;
