import dayjs from "dayjs";
import BuyAgain from '../../assets/images/icons/buy-again.png'
import { Link } from 'react-router'

export function CartItemsDetails({ orderProduct }) {
    return (
        <>
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
        </>
    )
}