import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ itemcount }) => {
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    const response = await fetch(
      'https://fakestoreapi.com/products/categories'
    );
    const data = await response.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand">
      <div className="container-fluid">
        <Link className="navbar-brand" to={`/`}>
          Amazon Clone
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to={`/`}>
                Home
              </Link>
            </li>
            {categories.length > 0 ? (
              <>
                {categories.map((val, idx) => (
                  <li className="nav-item" key={idx}>
                    <Link className="nav-link" to={`/${val}`}>
                      {val[0].toUpperCase() + val.slice(1)}
                    </Link>
                  </li>
                ))}
              </>
            ) : (
              // <>
              <span className="navbar-text">Loading Categories...</span>
              // </>
            )}
          </ul>
        </div>
        <Link className="navbar-brand" to={`/cart`}>
          <i className="bi-cart">
            <span className="position-realtive top-0 start-0 badge rounded-pill">
              {itemcount}
            </span>
          </i>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
