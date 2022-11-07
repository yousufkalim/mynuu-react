import React, { useRef } from 'react';
import ProductDetailCard from '../components/ProductDetailCard';
import Cross from '../assets/icons/close.png';
import 'react-multi-carousel/lib/styles.css';

// const responsive = {
//   superLargeDesktop: {
//     // the naming can be any, depends on you.
//     breakpoint: { max: 4000, min: 3000 },
//     items: 3,
//   },
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 3,
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 464 },
//     items: 2,
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 1,
//   },
// };

function ProductPreview({ setOpenDetail, selectedProduct }) {
  const ref = useRef(null);

  console.log('Reference ', ref);
  console.log('Products => ', selectedProduct);

  return (
    <div ref={ref} className="product_preview">
      <button className="preview_close" type="submit" onClick={() => setOpenDetail(false)}>
        <img className="preview_close_img" src={Cross} alt="close" />
      </button>
      <div className="product_preview_wrapper">
        {selectedProduct?.products?.map((product) => (
          <ProductDetailCard product={product} />
        ))}
      </div>
      {/* <Carousel
        responsive={responsive}
        draggable={false}
        showDots
        autoPlay={false}
        autoPlaySpeed={1000}
        keyBoardControl
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={['tablet', 'mobile']}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        <div style={{ backgound: '#000' }}>2222</div>
        <div>3333</div>
        <div>4444</div>
        <div>5555</div>
        <div>6666</div>
      </Carousel> */}
      {/* <Carousel
        responsive={responsive}
        swipeable
        draggable
        showDots
        autoPlay={false}
        autoPlaySpeed={1000}
        // keyBoardControl
        // centerMode
        customTransition="all .5"
        transitionDuration={1500}
        containerClass="carousel_container"
        removeArrowOnDeviceType={['tablet', 'mobile']}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      > */}
      {/* </Carousel> */}
    </div>
  );
}

export default ProductPreview;
