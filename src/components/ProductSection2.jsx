/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import ProductSectionHoc from '../hoc/ProductSectionHoc';

function ProductSection2({ products, setOpenDetail }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 4000);
  }, []);

  console.log('Loading ', loaded);

  return (
    <ProductSectionHoc productsLength={products?.products?.length} sectionTitle={products.title}>
      <div className="product_section_2">
        {products?.products?.map((item) => (
          <div role="presentation" className="product_card_2" onClick={() => setOpenDetail(true)}>
            {!loaded && <Skeleton className="skeleton" count={5} />}

            <div className="product_image">
              <img
                className="product_img"
                onLoad={() => setLoaded(true)}
                alt="product"
                src={item?.photo}
              />
            </div>
            <div className="product_content">
              <div className="product_heading text_ellipsis_2">{item?.name}</div>
              <div className="product_description_container">
                <div className="product_description text_ellipsis_1">{item?.description}</div>
                <div className="product_price">{`$${item?.price}`}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ProductSectionHoc>
  );
}

export default ProductSection2;
