/* eslint-disable no-unused-expressions */
import React, { useEffect, useRef } from 'react';
import ProductDetailCard from '../components/ProductDetailCard';
import Cross from '../assets/icons/close.png';

function ProductPreview({ setOpenDetail, selectedProduct }) {
  const ref = useRef(null);
  const productRef = useRef(null);

  useEffect(() => {
    const { products, selectedId } = selectedProduct;
    if (productRef) {
      const findIndex = products?.findIndex((item) => item?.id === selectedId);
      if (findIndex !== 0) {
        const prevPosition = productRef?.current?.childNodes[findIndex]?.clientWidth;
        const prevElementWidth = prevPosition + 40;
        const elementPosition = productRef?.current?.childNodes[findIndex].offsetLeft;
        productRef?.current.scrollTo({
          left: elementPosition - prevElementWidth,
          behavior: 'smooth',
        });
      }
    }
  }, [selectedProduct]);

  return (
    <div ref={ref} className="product_preview">
      <button className="preview_close" type="submit" onClick={() => setOpenDetail(false)}>
        <img className="preview_close_img" src={Cross} alt="close" />
      </button>
      <div
        style={{
          justifyContent: `${selectedProduct?.products?.length > 1 ? 'flex-start' : 'center'}`,
        }}
        id="product_preview_wrapper"
        className="product_preview_wrapper"
        ref={productRef}
      >
        {selectedProduct?.products?.map((product) => (
          <ProductDetailCard
            active={product?.id === selectedProduct?.selectedId}
            key={product?.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductPreview;
