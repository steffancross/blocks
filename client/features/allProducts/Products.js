import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from './ProductSlice';
import { Link } from 'react-router-dom';

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <div className="all-products">
        {products.map((product) => {
          return (
            <div className="individual-product" key={product.id}>
              <Link to={`/products/${product.id}`}>
                <img src={product.image}></img>
                <p>{product.name}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Products;
