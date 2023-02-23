import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import CartRow from '../component/cart-row';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setItems(
      Object.keys(localStorage)
        .map((val) => parseFloat(val.slice(val.lastIndexOf('-') + 1)))
        .filter(
          (val) =>
            val &&
            parseFloat(JSON.parse(localStorage.getItem(`item-${val}`))?.count) > 0
        )
    );
  }, []);

  useEffect(() => {
    let sum = 0;
    for (let val of items) {
      let item = JSON.parse(localStorage.getItem(`item-${val}`));
      sum += parseFloat(item.price) * parseFloat(item.count);
    }
    setTotal(sum);
  }, [items]);

  return (
    <>
      <table className="table container">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Count</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((val, idx) => (
            <tr key={idx}>
              <th scope="row">{idx + 1}</th>
              <CartRow key={val} id={val} />
            </tr>
          ))}
        </tbody>
        <tfoot>
          <th scope="row"></th>
          <th scope="row"></th>
          <th scope="row">Total:</th>
          <th scope="row text-muted">
            &#8377;
            {total > 2000 ? total - Math.round(total * 0.1) : total}
          </th>
        </tfoot>
        <tfoot>
          <th scope="row"></th>
          <th scope="row"></th>
          <th scope="row">Discount:</th>
          <th scope="row">
            -&#8377;{total > 2000 ? Math.round(total * 0.1) : 0}
          </th>
        </tfoot>
      </table>
      <div class="d-grid gap-2 col-6 mx-auto">
        <Link class="btn btn-primary" to={`/checkout`}>
          Continue to Checkout
        </Link>
      </div>
    </>
  );
};

export default Cart;
