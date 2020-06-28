import React from "react";
import ImageToggleOnScroll from "../src/ImageToggleOnScroll";

const ImageWithScrollEffect = () => {
  const imageNumbers = [823, 187, 1124, 1269, 1530, 1725, 5996];

  return (
    <div>
      {imageNumbers.map((num) => (
        <div key={num}>
          <ImageToggleOnScroll
            primary={`/speakers/bw/Speaker-${num}.jpg`}
            secondary={`/speakers/Speaker-${num}.jpg`}
            alt=""
          />
        </div>
      ))}
    </div>
  );
};

export default ImageWithScrollEffect;
