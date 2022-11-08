/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-return-await */
import React, { useEffect, useRef, useState } from 'react';

import AllProducts from '../components/AllProducts';
import Header from '../components/Header';
import MenuList from '../components/MenuList';
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
        />
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
