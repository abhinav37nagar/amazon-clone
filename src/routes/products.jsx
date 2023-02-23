import { useState, useEffect } from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Product from '../component/product';

export async function loader({ params }) {
  let url = `https://fakestoreapi.com/products`;
  if (params && params.category) url += `/category/${params.category}`;
  const response = await fetch(url);
  const products = await response.json();

  console.log(products);
  return { products };
}

const Products = ({ updateCall }) => {
  const { products } = useLoaderData();
  const navigation = useNavigation();

  const [criteria, setCriteria] = useState('rating');
  const [sortedProducts, setSortedProducts] = useState(products);
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    let sorted = products.sort((a, b) => {
      if (criteria === 'rating') return b.rating.rate - a.rating.rate;
      if (criteria === 'price-desc') return b.price - a.price;
      if (criteria === 'price-asc') return a.price - b.price;
      return b.rating.rate - a.rating.rate;
    });
    console.log(
      'sorted',
      sorted.map((val) => val.rating.rate)
    );
    setSortedProducts([...sorted]);
  }, [criteria, products]);

  return (
    <>
      <ul class="list-group">
        <button
          className="list-group-item list-group-item-action list-group-item-info"
          type="button"
          onClick={() => setExpand(!expand)}
        >
          Sort By{' '}
          <span>
            {expand ? (
              <i className="bi-arrow-up"></i>
            ) : (
              <i className="bi-arrow-down"></i>
            )}
          </span>
        </button>
        {expand ? (
          <>
            <li
              className={`list-group-item list-group-item-action ${
                criteria === 'price-asc' ? ' list-group-item-primary' : ''
              }`}
              type="button"
              onClick={() => setCriteria('price-asc')}
            >
              Price (Lowest First)
            </li>
            <li
              className={`list-group-item list-group-item-action ${
                criteria === 'price-desc' ? ' list-group-item-primary' : ''
              }`}
              type="button"
              onClick={() => setCriteria('price-desc')}
            >
              Price (Highest First)
            </li>
            <li
              className={`list-group-item list-group-item-action ${
                criteria === 'rating' ? ' list-group-item-primary' : ''
              }`}
              type="button"
              onClick={() => setCriteria('rating')}
            >
              Rating
            </li>
          </>
        ) : (
          <></>
        )}
      </ul>
      {navigation.state === 'loading' ? (
        <div className="row">
          {sortedProducts.map((val, idx) => (
            <div
              className="col-md-4 d-flex justify-content-center align-items-center"
              key={idx}
            >
              <Product details={'null'} />
            </div>
          ))}
        </div>
      ) : (
        <div className="row">
          {sortedProducts.map((val, idx) => (
            <div
              className="col-md-4 d-flex justify-content-center align-items-center"
              key={idx}
            >
              <Product details={val} updateCall={updateCall} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Products;
