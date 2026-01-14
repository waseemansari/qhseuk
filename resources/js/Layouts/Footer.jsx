import { Link } from "@inertiajs/react";

export default function Footer({ auth }) {
  
    return (
        <>
        
         <footer className="footer">
        <div className="container">
            <div className="footer-content">
                <div className="footer-column">
                    <h3>Got a question?</h3>
                    <p>Call us on: <a href="tel:447350194829">+44 7350 194829</a></p>
                    <p>WhatsApp: <a href="https://wa.me/447350194829">+44 7350 194829</a></p>
                    <p>Email us: <a href="mailto:info@qhseinternational.com?subject=Support%20Request&body=Hello%2C">info@qhseinternational.com</a></p>
                    <p>Send us your enquiry using our <a href="#">contact form</a></p>
                    <div className="social-links">
                        <a href="https://www.facebook.com/profile.php?id=61583808452696" target="_blank" className="fa fa-facebook"></a>
                        <a href="https://www.instagram.com/qhseinternationaluk/" target="_blank" className="fa fa-instagram"></a>
                        <a href="https://www.linkedin.com/search/results/all/?heroEntityKey=urn%3Ali%3Aorganization%3A109381486&keywords=QHSE%20International%20Ltd.&origin=ENTITY_SEARCH_HOME_HISTORY&sid=tBZ" target="_blank" className="fa fa-instagram"></a>
                        <a href="https://x.com/qhseintluk" target="_blank" className="fa fa-twitter"></a>
                        
                    </div>
                </div>

                <div className="footer-column">
                    <h3>About us</h3>
                    <ul>
                        <li><a href="#">About QHSE</a></li>
                        <li><a href="#">Our pass pledge</a></li>
                        <li><a href="#">Vacancies</a></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>Courses</h3>
                    <ul>
                        <li><a href="#">NEBOSH Courses</a></li>
                        <li><a href="#">IOSH Courses</a></li>
                        
                        <li><a href="#">Short courses</a></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>Popular Courses</h3>
                    <ul>
                        <li><a href="#">NEBOSH General Certificate</a></li>
                        <li><a href="#">IOSH Managing Safely</a></li>
                        <li><a href="#">NEBOSH National Diploma</a></li>
                        <li><a href="#">NEBOSH Construction Certificate</a></li>
                        <li><a href="#">NEBOSH Certificate in Fire Safety</a></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>Legal Information</h3>
                    <ul>
                        <li><a href="#">Terms & Conditions</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Cookie Policy</a></li>
                        <li><a href="#">GDPR</a></li>
                        <li><a href="#">Copyright Notice</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="payment-logos">
                   
                    <img src="https://res.cloudinary.com/ddoiy8grq/image/upload/w_auto,c_scale,f_auto/f_auto/v1658399747/logos/card-icon-visa_mrvf3w.png" alt="Visa" />
                    <img src="https://res.cloudinary.com/ddoiy8grq/image/upload/w_auto,c_scale,f_auto/f_auto/v1658399747/logos/card-icon-maestro_huiw9n.png" alt="Maestro" />
                    <img src="https://res.cloudinary.com/ddoiy8grq/image/upload/w_auto,c_scale,f_auto/f_auto/v1658399747/logos/card-icon-mastercard_nt7pgn.png" alt="Mastercard" />
                    <img src="https://res.cloudinary.com/ddoiy8grq/image/upload/w_auto,c_scale,f_auto/f_auto/v1658399747/logos/card-icon-amex_uvqseq.png" alt="American Express" />
                </div>
                <p className="copyright">© 2020-2025 QHSEINTERNATIONAL HSC (UK) Ltd. Registered in England and Wales. Company No. 06534364</p>
            </div>
        </div>
    </footer>
        </>
    );
}
