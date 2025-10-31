import axios from 'axios'
import { useEffect, useState } from 'react';
import { ProductsGrid } from './ProductsGrid';
import './HomePage.css';
import Header from '../../components/Header';


function HomePage({ cart }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchHomeData = async () => {
            const response = await axios.get('/api/products');
            setProducts(response.data);
        }
        fetchHomeData();
    }, []);

    return (
        <>
            <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
            <title>Ecommerce Project</title>

            <Header cart={cart} />

            <div className="home-page">
                <ProductsGrid products={products} />
            </div>
        </>
    )
}

export default HomePage;