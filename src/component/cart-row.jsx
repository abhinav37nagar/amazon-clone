import { useState, useEffect } from 'react';

const CartRow = ({ id, add }) => {
  const [product, setProduct] = useState({});
  const [count] = useState(
    parseFloat(JSON.parse(localStorage.getItem(`item-${id}`))?.count) | 0
  );
  const [price, setPrice] = useState(
    parseFloat(JSON.parse(localStorage.getItem(`item-${id}`))?.price) | 0
  );

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setProduct(json);
        setPrice(json.price)
      });
  }, [id]);

  return (
    <>
      <td>{product.title}</td>
      <td>{count}</td>
      <td>&#8377;{price * count}</td>
    </>
  );
};

export default CartRow;
