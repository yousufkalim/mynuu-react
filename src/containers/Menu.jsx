/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-return-await */
import React, { useEffect, useRef, useState } from 'react';
import { createFilter } from 'react-search-input';

import AllProducts from '../components/AllProducts';
import Header from '../components/Header';
import HeaderImage from '../assets/images/header.jpg';
import MenuList from '../components/MenuList';
import Wine from '../assets/images/products/wine.jpg';
import Wine3 from '../assets/images/products/wine3.jpg';
import Wine4 from '../assets/images/products/wine4.jpg';
import Wine6 from '../assets/images/products/wine6.jpg';
import Wine8 from '../assets/images/products/wine8.jpg';
import Wine9 from '../assets/images/products/wine9.jpg';
import Spinner from '../assets/icons/spinner.gif';
import ProductPreview from './ProductPreview';

import {
  getAllMenus,
  getProductsByMenu,
  getProductsByCategory,
  getProducts,
  getAllSubCategories,
  getRestaurantById,
} from '../utils/getData';

// const subCat = [
//   { id: 1, name: 'Maxican Wine' },
//   { id: 2, name: 'Maxican Wine' },
//   { id: 3, name: 'Maxican Wine' },
//   { id: 4, name: 'Maxican Wine' },
//   { id: 5, name: 'Maxican Wine' },
//   { id: 6, name: 'Maxican Wine' },
//   { id: 7, name: 'Maxican Wine' },
//   { id: 8, name: 'Maxican Wine' },
//   { id: 9, name: 'Maxican Wine' },
//   { id: 10, name: 'Maxican Wine' },
//   { id: 11, name: 'Maxican Wine' },
//   { id: 12, name: 'Maxican Wine' },
//   { id: 13, name: 'Maxican Wine' },
//   { id: 14, name: 'Maxican Wine' },
//   { id: 15, name: 'Maxican Wine' },
//   { id: 16, name: 'Maxican Wine' },
//   { id: 17, name: 'Maxican Wine' },
//   { id: 18, name: 'Maxican Wine' },
//   { id: 19, name: 'Maxican Wine' },
//   { id: 20, name: 'Maxican Wine' },
// ];

const productWithCategories = [
  {
    title: 'MAXICAN WINE',
    products: [
      {
        name: 'Vodka',
        description: 'Test testetsttete',
        photo: Wine,
        price: 22,
      },
      {
        name: 'Pine apple juice',
        description: 'Test testetsttete',
        photo: HeaderImage,
        price: 22,
      },
      {
        name: 'Text test test test heading test test',
        description: 'Test Description tess test test test test',
        photo: Wine,
        price: 100,
      },
      {
        name: 'Vodka',
        description: 'Test testetsttete',
        photo: HeaderImage,
        price: 22,
      },
      {
        name: 'Pine apple juice',
        description: 'Test testetsttete',
        photo: HeaderImage,
        price: 22,
      },
    ],
  },
  {
    title: 'CHAMPANGE AND SPARKLING DRINKS',
    products: [
      {
        name: 'Vodka',
        description: 'Test testetsttete',
        photo: Wine3,
        price: 22,
      },
      {
        name: 'Pine apple juice',
        description: 'Test testetsttete',
        photo: HeaderImage,
        price: 22,
      },
      {
        name: 'Text test test test heading test test',
        description: 'Test Description tess test test test test',
        photo: HeaderImage,
        price: 100,
      },
      {
        name: 'Vodka',
        description: 'Test testetsttete',
        photo: Wine,
        price: 22,
      },
      {
        name: 'Pine apple juice',
        description: 'Test testetsttete',
        photo: HeaderImage,
        price: 22,
      },
    ],
  },
  {
    title: 'TEQUILA ANEJO',
    products: [
      {
        name: 'Text test test test Test Heading tess test test t',
        description: 'Test Description tess test test test test',
        photo: Wine6,
        price: 100,
      },
      {
        name: 'Text test test test',
        description: 'Test testetsttete',
        photo: HeaderImage,
        price: 83,
      },
      {
        name: 'Text test test test',
        description: 'Test testetsttete',
        photo: Wine8,
        price: 22,
      },
      {
        name: 'Text test test test',
        description: 'Test testetsttete',
        photo: HeaderImage,
        price: 22,
      },
      {
        name: 'Text test test test',
        description: 'Test testetsttete',
        photo: HeaderImage,
        price: 83,
      },
      {
        name: 'Text test test test',
        description: 'Test testetsttete',
        photo: Wine4,
        price: 22,
      },
      {
        name: 'Text test test test',
        description: 'Test testetsttete',
        photo: HeaderImage,
        price: 22,
      },
    ],
  },
  {
    title: 'VODKA COCKTAILS',
    products: [
      {
        name: 'Mujeres Divine Mujeres Divine',
        description: 'Titos vodka, Lime juice, Mint agave, Lime juice, Mint agave',
        photo: Wine9,
        price: 100,
      },
      {
        name: 'Mujeres Divine',
        description: 'Titos vodka, Lime juice, Mint agave',
        photo: HeaderImage,
        price: 100,
      },
      {
        name: 'Text test test test',
        description: 'Test testetsttete',
        photo: HeaderImage,
        price: 83,
      },
      {
        name: 'Text test test test',
        description: 'Test testetsttete',
        photo: Wine8,
        price: 22,
      },
      {
        name: 'Text test test test',
        description: 'Test testetsttete',
        photo: HeaderImage,
        price: 22,
      },
    ],
  },
];

const FIELDS_TO_FILTERS = ['name'];

function Menu() {
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMenu, setSelectedMenu] = useState();
  const [selectedProduct, setSelectedProduct] = useState({
    products: {},
    selectedId: '',
  });
  const [restaurant, setRestaurant] = useState({});

  const [stopScroll, setStopScroll] = useState(false);
  const [openList, setOpenList] = useState(true);
  const [searchTerm, setSerachTerm] = useState('');
  const [openDetail, setOpenDetail] = useState(false);
  const [loading, setLoading] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    if (selectedMenu?.name) {
      getProductsByMenu(selectedMenu, setLoading, setProducts);
    }
  }, [selectedMenu]);

  useEffect(() => {
    if (selectedCategory?.id) {
      getProductsByCategory(selectedCategory, setLoading, setProducts);
    } else {
      getProducts(setLoading, setProducts);
    }
  }, [selectedCategory]);

  useEffect(() => {
    getAllMenus(setMenus);
    getAllSubCategories(selectedMenu, setCategories);
    getProducts(setLoading, setProducts);
    getRestaurantById('UrFryd4KEYQsgh3DGViBvXqyIGP2', setRestaurant);
  }, []);

  const onScroll = () => {
    const { scrollTop } = document.getElementById('menu');
    const mobile = window.matchMedia('(max-width: 500px)').matches;

    if (mobile) {
      if (scrollTop > 100) {
        setStopScroll(true);
      } else if (stopScroll) {
        setStopScroll(false);
      }
    } else if (scrollTop > 212) {
      setStopScroll(true);
    } else if (stopScroll) {
      setStopScroll(false);
    }
  };

  const searchProducts = productWithCategories?.map((item) => ({
    ...item,
    products: item?.products?.filter(createFilter(searchTerm, FIELDS_TO_FILTERS)),
  }));

  return (
    <div
      id="menu"
      style={{ overflowY: openList ? 'hidden' : 'auto' }}
      onScroll={onScroll}
      ref={ref}
      className="menu"
    >
      {loading && (
        <div className="spinner_container">
          <img className="spinner" src={Spinner} alt="loading" />
        </div>
      )}
      <Header
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        stopScroll={stopScroll}
        restaurant={restaurant}
        setProducts={setProducts}
        setOpenList={setOpenList}
        setSerachTerm={setSerachTerm}
        setLoading={setLoading}
      />
      {openList && (
        <div className="popup_container">
          <MenuList menus={menus} setSelectedMenu={setSelectedMenu} setOpenList={setOpenList} />
        </div>
      )}
      <div className="menu_content">
        <AllProducts
          products={products}
          setSelectedProduct={setSelectedProduct}
          setOpenDetail={setOpenDetail}
          allProducts={searchProducts}
        />
        {/* {
          subCat?.map((item) => (
            <div style={{ marginTop: '50px' }}>{item}</div>
          ))
        } */}
      </div>
      {openDetail && (
        <div className="popup_container">
          <ProductPreview selectedProduct={selectedProduct} setOpenDetail={setOpenDetail} />
        </div>
      )}
    </div>
  );
}

export default Menu;
