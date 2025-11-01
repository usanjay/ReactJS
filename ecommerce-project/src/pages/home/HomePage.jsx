import axios from 'axios'
import { useEffect, useState } from 'react';
import { ProductsGrid } from './ProductsGrid';
import './HomePage.css';
import Header from '../../components/Header';
import { useSearchParams } from 'react-router';


function HomePage({ cart, loadCart }) {
    const [products, setProducts] = useState([]);
    const [searchParams] = useSearchParams();
    let search = searchParams.get('search');

    useEffect(() => {
        const fetchHomeData = async () => {
            const urlPath = search ? `/api/products?search=${search}` :'/api/products';
            const response = await axios.get(urlPath);
            setProducts(response.data);
        }
        fetchHomeData();
    }, [search]);

    return (
        <>
            <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
            <title>Ecommerce Project</title>

            <Header cart={cart} />

            <div className="home-page">
                <ProductsGrid products={products} loadCart={loadCart} />
            </div>
        </>
    )
}

export default HomePage;