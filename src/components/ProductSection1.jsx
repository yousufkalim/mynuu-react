import React from 'react';
import ProductSectionHoc from '../hoc/ProductSectionHoc';

function ProductSection1({ products, setOpenDetail, setSelectedProduct }) {
  console.log('Products ', products);

  const handleSelectProduct = (index) => {
    const obj = {
      products: products?.products,
      selectedIndex: index,
    };
    setSelectedProduct(obj);
    setOpenDetail(true);
  };

  return (
    <ProductSectionHoc
      productsLength={products?.products?.length}
      sectionTitle={products.categoryName}
    >
      <div className="product_section_1">
        {products?.products?.map((item, index) => (
          <div
            role="presentation"
            className="product_card_1"
            onClick={() => handleSelectProduct(index)}
          >
            <div className="product_image">
              <img className="product_img" alt="product" src={item?.image} />
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
