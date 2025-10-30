import axios from 'axios'
import { useState, useEffect, Fragment } from 'react'
import Header from "../components/Header"
import { Link } from 'react-router'
import '../components/Header.css'
import './OrdersPage.css'
import BuyAgain from '../assets/images/icons/buy-again.png'
import dayjs from 'dayjs'
import { formatMoney } from '../utils/money'


function OrdersPage({ cart }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('api/orders?expand=products')
            .then(response => {
                setOrders(response.data)
                console.log(response.data)
            })
    }, []);

    return (
        <>
            <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />
            <title>Orders</title>

            <Header cart={cart} />
            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <div className="orders-grid">
                    {orders.map(order => {
                        return (
                            <div key={order.id} className="order-container">

                                <div className="order-header">
                                    <div className="order-header-left-section">
                                        <div className="order-date">
                                            <div className="order-header-label">Order Placed:</div>
                                            <div>{dayjs(order.orderTimeMs).format('MMMM D')}</div>
                                        </div>
                                        <div className="order-total">
                                            <div className="order-header-label">Total:</div>
                                            <div>{formatMoney(order.totalCostCents)}</div>
                                        </div>
                                    </div>

                                    <div className="order-header-right-section">
                                        <div className="order-header-label">Order ID:</div>
                                        <div>{order.id}</div>
                                    </div>
                                </div>

                                <div className="order-details-grid">
                                    {order.products.map(orderProduct => {
                                        return (
                                            <Fragment key={orderProduct.productId}>
                                                <div className="product-image-container">
                                                    <img src={orderProduct.product.image} />
                                                </div>

                                                <div className="product-details">
                                                    <div className="product-name">
                                                        {orderProduct.product.name}
                                                    </div>
                                                    <div className="product-delivery-date">
                                                        Arriving on: {
                                                            dayjs(orderProduct.estimatedDeliveryTimeMs)
                                                                .format('MMMM D')
                                                        }
                                                    </div>
                                                    <div className="product-quantity">
                                                        Quantity: {orderProduct.quantity}
                                                    </div>
                                                    <button className="buy-again-button button-primary">
                                                        <img className="buy-again-icon" src={BuyAgain} />
                                                        <span className="buy-again-message">Add to Cart</span>
                                                    </button>
                                                </div>

                                                <div className="product-actions">
                                                    <Link to="/tracking">
                                                        <button className="track-package-button button-secondary">
                                                            Track package
                                                        </button>
                                                    </Link>
                                                </div>
                                            </Fragment>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default OrdersPage