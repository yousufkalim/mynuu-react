import React from 'react';

function ProductDetailCard({ product, active }) {
  const media = window.matchMedia('(max-width: 500px)').matches;
  return (
    <div className={`card_detail ${active && 'card_detail-active'}`}>
      <div className="product_image">
        <img className="product_img" alt="product" src={product?.image} />
      </div>
      <div className="product_content">
        <div className="product_heading">{product?.name}</div>
        <div className="product_description">{product?.description}</div>
        <div className="product_price">
          {media ? `${product?.price} USD` : `$${product?.price}`}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailCard;
