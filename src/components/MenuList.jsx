import React from 'react';
import Cross from '../assets/icons/close.png';

const categories = ['Wines by the glass', 'Wine list', 'Spirits', 'Drink menu'];

function MenuList({ setCategory, setOpenList }) {
  const selectCategory = (cat) => {
    setCategory(cat);
  };

  return (
    <div className="popup">
      <div className="popup_select">Select Type</div>
      <div className="popup_list">
        {categories?.map((item) => (
          <button
            type="submit"
            onClick={() => {
              selectCategory(item);
              setOpenList(false);
            }}
            className="popup_name"
          >
            {item}
          </button>
        ))}
      </div>
      <button onClick={() => setOpenList(false)} className="popup_btn" type="submit">
        <img className="popup_btn_icon" src={Cross} alt="close" />
      </button>
    </div>
  );
}

export default MenuList;
