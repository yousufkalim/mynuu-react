/* eslint-disable jsx-a11y/no-static-element-interactions */
// Init
// import dayjs from 'dayjs';
import moment from 'moment';
import React, { useEffect, useState, useRef } from 'react';
import SearchInput from 'react-search-input';
// import HeaderImg from '../assets/images/header.jpg';
import MenuIcon from '../assets/icons/menu.png';
import SearchIcon from '../assets/icons/SearchIcon.svg';
import '../css/Header.css';

// Component
export default function Header({
  subCategories,
  setSelectedSubCategory,
  stopScroll,
  setOpenList,
  selectedSubCategory,
  setSerachTerm,
}) {
  const [currentSatus, setCurrentSatus] = useState(0);
  const [focused, setFocused] = useState(false);

  const searchRef = useRef(null);

  const getTimeOfDay = () => {
    const todayDate = moment().utcOffset(0, true).format();
    const timeString = todayDate?.split('T')?.[1]?.split(':')?.[0];
    // eslint-disable-next-line radix
    const time = parseInt(timeString);

    if (time < 12 && time > 3) {
      setCurrentSatus('Good Morning');
    } else if (time >= 12 && time < 18) {
      setCurrentSatus('Good Afternoon');
    } else {
      setCurrentSatus('Good Evening');
    }
  };

  useEffect(() => {
    getTimeOfDay();
  }, []);

  const handleSubCategory = (item) => {
    if (item?.id === selectedSubCategory?.id) {
      setSelectedSubCategory(null);
    } else {
      setSelectedSubCategory(item);
    }
  };

  return (
    <div className="header_wrapper">
      <div className="header_container">
        <div className="header_overlay" />
        <div className="heading">LAN NO 20</div>
        <div className="description">
          <span />
          <div>CANTINA</div>
          <span />
        </div>
        {/* <img className="header_img" src={HeaderImg} alt="header" /> */}
      </div>
      <div className={`header ${stopScroll && 'sticky_header'}`}>
        <div className="header_top">
          <div className="header_left">
            <div className={`header_status ${focused && 'header_status_hide'}`}>{currentSatus}</div>
            <div className="header_text">Choose Your Desired Drinks</div>
          </div>
          <div className={`header_right ${focused && 'header_focused'}`}>
            {/* // eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
            <div
              role="presentation"
              className="header_serach"
              onBlur={() => setFocused(false)}
              onClick={() => {
                setFocused(true);
              }}
            >
              <SearchInput
                ref={searchRef}
                id="search"
                placeholder="Search"
                className="search-input"
                onChange={setSerachTerm}
              />
              <img src={SearchIcon} alt="" className="search-input-icon" />
            </div>
            <button className="header_menu" type="submit" onClick={() => setOpenList(true)}>
              <img src={MenuIcon} alt="menu" />
              <span>Menu</span>
            </button>
          </div>
        </div>
        <div className="header_subcategories">
          {subCategories?.map((item) => (
            <button
              className={`header_subcategory ${
                item?.id === selectedSubCategory?.id && 'header_subcategory_active'
              }`}
              onClick={() => handleSubCategory(item)}
              type="submit"
              key={item.id}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
