import React from 'react';
import ProductSectionHoc from '../hoc/ProductSectionHoc';

function ProductSection1({ products, setOpenDetail }) {
  console.log('Products ', products);
  return (
    <ProductSectionHoc productsLength={products?.products?.length} sectionTitle={products.title}>
      <div className="product_section_1">
        {products?.products?.map((item) => (
          <div role="presentation" className="product_card_1" onClick={() => setOpenDetail(true)}>
            <div className="product_image">
              <img className="product_img" alt="product" src={item?.photo} />
            </div>
            <div className="product_content">
              <div className="product_heading text_ellipsis_2">{item?.name}</div>
              <div className="product_description text_ellipsis_1">{item?.description}</div>
              <div className="product_price">{`$${item?.price}`}</div>
            </div>
          </div>
        ))}
      </div>
    </ProductSectionHoc>
  );
}

export default ProductSection1;
