/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import ProductSection1 from './ProductSection1';
import ProductSection2 from './ProductSection2';
import ProductSection3 from './ProductSection3';
import Product from './Product';
import HeaderImage from '../assets/images/header.jpg';
import Wine3 from '../assets/images/products/wine3.jpg';
import Wine5 from '../assets/images/products/wine5.jpg';
import Wine2 from '../assets/images/products/wine2.jpg';
import ProductMobile from './ProductMobile';

const recommendedProducts = [
  {
    name: 'Vodka',
    description: 'Test testetsttete',
    photo: HeaderImage,
    price: 22,
  },
  {
    name: 'Pine apple juice',
    description: 'Test testetsttete',
    photo: Wine3,
    price: 22,
  },
  {
    name: 'Text test test test heading test test',
    description:
      'Test Description tess test test test test Test Description tess test test test test Test Description tess test test test test',
    photo: Wine2,
    price: 130,
  },
  {
    name: 'Text test test test heading test test',
    description: 'Test Description tess test test test test',
    photo: Wine5,
    price: 85,
  },
  {
    name: 'Text test test test heading test test',
    description: 'Test Description tess test test test test',
    photo: HeaderImage,
    price: 100,
  },
];

function AllProducts({ products, setOpenDetail, setSelectedProduct }) {
  const [mobileView, setMobileView] = useState(false);

  const media = window.matchMedia('(max-width: 500px)').matches;

  useEffect(() => {
    setMobileView(media);
  }, [media]);

  let firstSecion = 0;
  let secondSection = 1;
  let thirdSection = 2;

  return (
    <div className="products">
      <div className="products_container">
        <div className="category_name">RECOMMENDED FOR YOU</div>
        <div className="products_wrapper">
          {recommendedProducts.map((item) => (
            <Product key={item.name} product={item} />
          ))}
        </div>
      </div>
      {
        // eslint-disable-next-line consistent-return
        mobileView
          ? products?.map((item) => (
            <ProductMobile
              setOpenDetail={setOpenDetail}
              setSelectedProduct={setSelectedProduct}
              key={products?.title}
              products={item}
            />
          ))
          : products?.map((item, ind) => {
            const index = ind;
            if (firstSecion === index) {
              firstSecion += 3;
              return (
                <ProductSection2
                  setOpenDetail={setOpenDetail}
                  setSelectedProduct={setSelectedProduct}
                  key={products?.title}
                  products={item}
                />
              );
            }
            if (secondSection === index) {
              secondSection += 3;
              return (
                <ProductSection1
                  setOpenDetail={setOpenDetail}
                  setSelectedProduct={setSelectedProduct}
                  key={products?.title}
                  products={item}
                />
              );
            }
            if (thirdSection === index) {
              thirdSection += 3;
              return (
                <ProductSection3
                  setOpenDetail={setOpenDetail}
                  setSelectedProduct={setSelectedProduct}
                  key={products?.title}
                  products={item}
                />
              );
            }
          })
      }
    </div>
  );
}

export default AllProducts;
