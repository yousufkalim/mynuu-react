import React from 'react';
import ProductSectionHoc from '../hoc/ProductSectionHoc';

function ProductSection3({ products, setOpenDetail }) {
  return (
    <ProductSectionHoc productsLength={products?.products?.length} sectionTitle={products.title}>
      <div className="product_section_3">
        {products?.products?.map((item) => (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <div role="presentation" className="product_card_3" onClick={() => setOpenDetail(true)}>
            <div className="product_content">
              <div className="product_heading text_ellipsis_2">{item?.name}</div>
              <div className="product_description text_ellipsis_2">{item?.description}</div>
              <div className="product_details">See Details</div>
            </div>
            <div className="product_image">
              <img className="product_img" alt="product" src={item?.photo} />
            </div>
          </div>
        ))}
      </div>
    </ProductSectionHoc>
  );
}

export default ProductSection3;
