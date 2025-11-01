import { NavLink, useNavigate, useSearchParams } from 'react-router'
import { useState } from 'react'
import { getCartQnty } from '../utils/getCartQnty'
import LogoWhite from '../assets/images/logo-white.png'
import MobileLogoWhite from '../assets/images/mobile-logo-white.png'
import SearchIcon from '../assets/images/icons/search-icon.png'
import CartIcon from '../assets/images/icons/cart-icon.png'
import './Header.css'

function Header({ cart }) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const searchText = searchParams.get('search');
    const [search, setSearch] = useState(searchText || '');
    const searchInput = (event) => {
        setSearch(event.target.value);
    }

    const searchItems = () => {
        navigate(`/?search=${search}`);
    }

    return (
        <div className="header">
            <div className="left-section">
                <NavLink to="/" className="header-link">
                    <img className="logo"
                        src={LogoWhite} />
                    <img className="mobile-logo"
                        src={MobileLogoWhite} />
                </NavLink>
            </div>

            <div className="middle-section">
                <input className="search-bar" type="text" placeholder="Search" onChange={searchInput} />

                <button className="search-button" onClick={searchItems}>
                    <img className="search-icon" src={SearchIcon} />
                </button>
            </div>

            <div className="right-section">
                <NavLink to="/orders" className="orders-link header-link" >

                    <span className="orders-text">Orders</span>
                </NavLink>

                <NavLink to="/checkout" className="cart-link header-link">
                    <img className="cart-icon" src={CartIcon} />
                    <div className="cart-quantity">{getCartQnty(cart)}</div>
                    <div className="cart-text">Cart</div>
                </NavLink>
            </div>
        </div>
    )
}

export default Header;