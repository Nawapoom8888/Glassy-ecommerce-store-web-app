import React from "react";
import { Helmet } from "react-helmet-async";

function Metadata({ title, description, keywords }) {
  return (
    <Helmet>
      <title>{`${title} | Glassy`}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
}

Metadata.defaultProps = {
  title: `Glassy Shop`,
  description: `Sunglasses Shop`,
  keywords: `sunglasses, brand name`,
};

export default Metadata;
