import { useState } from 'react';
import { formatMoney } from '../../utils/money';
import axios from 'axios';
import { DeliveryOptions } from './DeliveryOptions';
import { DeliveryDate } from './DeliveryDate';


export function CartItemDetails({ cartItem, loadCart, deliveryOptions }) {
    const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
    const [quantity, setQuantity] = useState(cartItem.quantity);

    const removeCartItem = async () => {
        await axios.delete(`/api/cart-items/${cartItem.productId}`);
        await loadCart();
    }

    const updateQuantity = async () => {
        if (isUpdatingQuantity) {
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
                quantity
            })
            await loadCart();
        }
        setIsUpdatingQuantity(!isUpdatingQuantity);
    }

    const updateQuantityInput = (event) => {
        setQuantity(Number(event.target.value));
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') updateQuantity();
        if (event.key === 'Escape') {
            setQuantity(cartItem.quantity);
            setIsUpdatingQuantity(false);
        }
    }

    return (
        <div key={cartItem.productId} className="cart-item-container">
            <DeliveryDate deliveryOptions={deliveryOptions} cartItem={cartItem} />

            <div className="cart-item-details-grid">
                <img className="product-image"
                    src={cartItem.product.image} />

                <div className="cart-item-details">
                    <div className="product-name">
                        {cartItem.product.name}
                    </div>
                    <div className="product-price">
                        {formatMoney(cartItem.product.priceCents)}
                    </div>
                    <div className="product-quantity">
                        <span>
                            Quantity: {
                                isUpdatingQuantity
                                    ? <input value={quantity} type="text" className="quantity-input"
                                        onChange={updateQuantityInput} onKeyDown={handleKeyDown}
                                    />
                                    : <span className="quantity-label">{cartItem.quantity}</span>
                            }
                        </span>

                        <span className="update-quantity-link link-primary"
                            onClick={updateQuantity}>
                            Update
                        </span>
                        <span className="delete-quantity-link link-primary"
                            onClick={removeCartItem}>
                            Delete
                        </span>
                    </div>
                </div>

                <DeliveryOptions
                    deliveryOptions={deliveryOptions}
                    cartItem={cartItem}
                    loadCart={loadCart}
                />
            </div>
        </div>
    )
}