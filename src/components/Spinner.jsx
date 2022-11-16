/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Circle } from 'rc-progress';

function Spinner({
  setLoadData, timer, loadData, setLoading,
}) {
  const [percent, setPercent] = useState(0);
  const [innerPercent, setInnerPercent] = useState(102);

  const changeIncrease = () => {
    if (percent <= 99) {
      setTimeout(() => {
        setPercent((prevState) => prevState + 1);
      }, timer);
    }
  };

  useEffect(() => {
    if (percent === 100 && loadData) {
      setTimeout(() => {
        setLoadData(true);
        setLoading(false);
      }, 200);
    }
  }, [percent, loadData]);

  const changeDecrease = () => {
    if (percent >= -3) {
      setTimeout(() => {
        setInnerPercent((prevState) => prevState - 1);
      }, 5);
    }
  };

  useEffect(() => {
    changeIncrease();
    changeDecrease();
  }, [percent]);

  return (
    <div className="spinner_container">
      <div className="spinner_wrapper">
        <Circle
          className="spinner"
          trailColor="#000"
          trailWidth={7}
          percent={percent}
          strokeWidth={7}
          strokeColor="#fff"
        />
        <div className="spinner_inner_container">
          <Circle
            className={`spinner_inner ${percent === 100 && 'inner_path_completed'}`}
            trailColor="#fff"
            trailWidth={2}
            percent={innerPercent}
            strokeWidth={3}
            strokeColor="#000"
          />
          <div className="spinner_percent">{`${percent}%`}</div>
        </div>
      </div>
    </div>
  );
}

export default Spinner;
