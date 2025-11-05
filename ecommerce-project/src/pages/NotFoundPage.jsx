import Header from '../components/Header'
import './NotFoundPage.css';

function NotFoundPage({cart}) {
    return (
        <>
            <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
            <title>404 Page Not Found</title>

            <Header cart={cart}/>

            
            <div className="error-msg-container">
                <div className="error-msg">404 (Not Found)</div>
            </div>
        </>
    )
}

export default NotFoundPage;