import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="134" cy="136" r="125" />
    <rect x="0" y="290" rx="15" ry="15" width="276" height="37" />
    <rect x="0" y="351" rx="15" ry="15" width="277" height="65" />
    <rect x="0" y="441" rx="15" ry="15" width="116" height="39" />
    <rect x="141" y="429" rx="34" ry="34" width="120" height="63" />
  </ContentLoader>
);

export default Skeleton;
