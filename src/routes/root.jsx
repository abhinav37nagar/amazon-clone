import { Outlet } from 'react-router-dom';
import Header from '../component/header';
import { useState, useEffect } from 'react';

const Root = () => {
  const [itemcount, setItemcount] = useState(0);

  useEffect(() => {
    updateCall();
  }, []);

  const updateCall = () => {
    let count = 0;
    Object.values(localStorage).forEach((val) => {
      count += parseFloat(JSON.parse(val)?.count) | 0;
    });
    setItemcount(count);
  };

  return (
    <>
      <Header itemcount={itemcount} />
      <Outlet context={updateCall} />
    </>
  );
};

export default Root;
