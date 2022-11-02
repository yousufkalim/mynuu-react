import React, { useState } from 'react';
// import Skeleton from 'react-loading-skeleton';

function Product({ product }) {
  const [loaded, setLoaded] = useState(false);

  console.log('Loaded ', loaded);

  return (
    <div className="product" style={{ backgroundImage: `url(${product.photo})` }}>
      {/* {
              !loaded && (
                <Skeleton className="skeleton" count={5} />
              )
      } */}
      <img alt="wine" onLoad={() => setLoaded(true)} />
      <div className="product_overlay" />
      <div className="product_data">
        <div className="product_name text_ellipsis_1">{product?.name}</div>
        <div className="product_description text_ellipsis_1">{product?.description}</div>
        <div className="product_price">{`$${product?.price}`}</div>
      </div>
    </div>
  );
}

export default Product;
