import { Link } from "@inertiajs/react";

export default function WebsiteBavbar({ auth }) {
  
    return (
        <>
        <header className="header">
        <div className="top-bar">
            <div className="container">
                <div className="search-bar">
                    <input type="text" placeholder="Search for keywords" className="search-input" />
                </div>
            </div>
        </div>
        
        <nav className="navbar">
            <div className="container">
                <div className="nav-content">
                    <Link href="/" className="logo">

                        <img src="../../images/logo.png" alt="qhse Logo" />
                    </Link>
                    
                    <div className="nav-menu">
                        <button className="nav-item dropdown-btn">NEBOSH</button>
                        <button className="nav-item dropdown-btn">IOSH</button>
                       
                        <button className="nav-item dropdown-btn">All Courses</button>
                        <button className="nav-item dropdown-btn">Business Solutions</button>
                        <button className="nav-item dropdown-btn">FAQs</button>
                        
                        <a href="./about_us.html" className="nav-item">About Us</a>
                        <a href="./about_us.html" className="nav-item">Contact Us</a>
                    </div>
                    
                    <div className="nav-icons">
                        <button className="icon-btn">
                            <img src="../../images/gb.svg" alt="UK Flag" />
                        </button>
                        <button className="icon-btn">👤</button>
                        <button className="icon-btn">🛒</button>
                    </div>
                </div>
            </div>
        </nav>
    </header>
        
        </>
    );
}
