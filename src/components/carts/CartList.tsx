import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../app/store";
import styles from "../../module/product.module.css";
import type { Cart } from "../../types/Cart";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchCarts } from "../../features/cart/cartSlice";
import { fetchUsers } from "../../features/user/userSlice";
import type { User } from "../../types/User";

const CartList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const cartData = useSelector((state: RootState) => state.cart.carts);
  const userData = useSelector((state: RootState) => state.user.users);

  useEffect(() => {
    dispatch(fetchCarts());
    dispatch(fetchUsers());
  }, [dispatch]);

  console.log(cartData);
  return (
    <div>
      <div className={styles.searchCategory}>
        <button className={styles.btn} onClick={() => navigate("/cart-form")}>
          + Add Cart
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Cart ID</th>
            <th>Customer Name</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {cartData?.map((item: Cart) => {
            const matchingUser = userData.find(
              (user: User) => user.id === item.userId,
            );
            const userName = matchingUser
              ? matchingUser.name.firstname + " " + matchingUser.name.lastname
              : "Unknown User";
            return (
              <tr key={item?.id}>
                <td>{item?.id}</td>
                <td>{userName}</td>
                <td>
                  {new Date(item.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td>
                  <button
                    style={{ padding: "10px" }}
                    onClick={() => navigate(`/cart-form/${item.id}`)}
                  >
                    Edit
                  </button>{" "}
                  <button
                    style={{ padding: "10px" }}
                    // onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CartList;
