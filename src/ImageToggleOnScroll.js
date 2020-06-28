import React, { useRef, useState, useEffect } from "react";

const ImageToggleOverMouse = ({ primary, secondary }) => {
  const imageRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [componentState, setComponentState] = useState("isLoading");

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    scrollHandler();
    setComponentState("ready");
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [componentState]);

  const isInView = () => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      return rect.top >= 0 && rect.bottom <= window.innerHeight;
    }
    return false;
  };
  const scrollHandler = () => {
    setInView(isInView);
  };

  return componentState === "isLoading" ? null : (
    <>
      <img
        src={inView ? secondary : primary}
        alt=""
        ref={imageRef}
        width="200"
        height="200"
      />
    </>
  );
};
export default ImageToggleOverMouse;
