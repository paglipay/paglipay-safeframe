import React, { forwardRef } from "react";

export const SFrame = forwardRef(({ id }, forwardedRef) => {
  return (
    <iframe
      ref={forwardedRef}
      title={id}
      id={id}
      src="https://paglipay.github.io/iframe-post-messages/frame3.htm"
      frameBorder="1"
      style={{ display: "block", height: "200px", border: "1px solid black" }}
    ></iframe>
  );
});

export default SFrame
