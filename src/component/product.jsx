import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const Product = ({ details }) => {
  const [count, setCount] = useState(
    parseFloat(JSON.parse(localStorage.getItem(`item-${details.id}`))?.count) |
      0
  );

  const updateCall = useOutletContext();

  useEffect(() => {
    let temp = details.price;
    localStorage.setItem(
      `item-${details.id}`,
      JSON.stringify({ count: count, price: temp })
    );
    updateCall();
  }, [details.id, details.price, count]);

  const addToCart = () => {
    setCount(count + 1);
  };

  const removeFromCart = () => {
    if (count <= 0) return;
    setCount(count - 1);
  };

  return (
    <>
      {details !== 'null' ? (
        <div className="card m-3" style={{ width: '18rem' }}>
          <div>
            <img
              src={details.image}
              className="card-img-top"
              alt="..."
              style={{ maxHeight: '9rem', objectFit: 'contain' }}
            />
            <h5 className="card-title">{details.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {details.description.slice(0, 100)}...
            </h6>
            <h6 className="card-text mb-2">Price: {details.price}</h6>
            <h6 className="card-text mb-2">Rating: {details.rating.rate}</h6>
            {count === 0 ? (
              <div className="d-flex justify-content-around">
                <div
                  className="btn btn-primary flex-fill"
                  onClick={() => addToCart()}
                >
                  Add to cart
                </div>
              </div>
            ) : (
              <div
                className="btn-group d-flex"
                role="group"
                aria-label="Basic example"
              >
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => removeFromCart()}
                >
                  <i className="bi-dash"></i>
                </button>
                <button type="button" className="btn btn-primary">
                  {count}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => addToCart()}
                >
                  <i className="bi-plus"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="card placeholder-wave m-3" style={{ width: '18rem' }}>
          <div className="placeholder col-12" style={{ height: '9rem' }} />
          <h5 className="card-title">
            {' '}
            <span className="placeholder col-10"></span>
          </h5>
          <h6 className="card-subtitle">
            <span className="placeholder col-8"></span>
            <span className="placeholder col-6"></span>
            <span className="placeholder col-8"></span>
            <span className="placeholder col-6"></span>
          </h6>
          <div className="btn btn-primary placeholder" aria-hidden="true"></div>
        </div>
      )}
    </>
  );
};

export default Product;
