import React from 'react';

function ProductDetailCard({ product }) {
  return (
    <div className="card_detail">
      <div className="product_image">
        <img className="product_img" alt="product" src={product?.photo} />
      </div>
      <div className="product_content">
        <div className="product_heading">{product?.name}</div>
        <div className="product_description">{product?.description}</div>
        <div className="product_price">{`$${product?.price}`}</div>
      </div>
    </div>
  );
}

export default ProductDetailCard;
