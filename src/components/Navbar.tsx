import { Link } from "react-router-dom";
import styles from "../module/navbar.module.css";

const Navbar = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/" className={styles.link}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/cart-list" className={styles.link}>
              Cart
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
