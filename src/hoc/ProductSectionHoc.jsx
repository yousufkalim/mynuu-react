import React from 'react';

function ProductSectionHoc({ children, sectionTitle, productsLength }) {
  return (
    <div className="product_section">
      {productsLength > 0 && <div className="heading">{sectionTitle}</div>}
      {children}
    </div>
  );
}

export default ProductSectionHoc;
