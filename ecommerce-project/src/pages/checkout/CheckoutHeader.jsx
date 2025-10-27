import { Link } from 'react-router'
import './CheckoutHeader.css'
import MobileLogo from '../../assets/images/mobile-logo.png'
import Logo from '../../assets/images/logo.png'
import CheckoutLockLogo from '../../assets/images/icons/checkout-lock-icon.png'

function CheckoutHeader() {
    return (
        <div className="checkout-header">
            <div className="header-content">
                <div className="checkout-header-left-section">
                    <Link to="/">
                        <img className="logo" src={Logo} />
                        <img className="mobile-logo" src={MobileLogo} />
                    </Link>
                </div>

                <div className="checkout-header-middle-section">
                    Checkout (<Link className="return-to-home-link"
                        to="/">3 items</Link>)
                </div>

                <div className="checkout-header-right-section">
                    <img src={CheckoutLockLogo} />
                </div>
            </div>
        </div>
    )
}

export default CheckoutHeader