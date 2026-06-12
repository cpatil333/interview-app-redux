import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import styles from "../../module/product.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../features/user/userSlice";
import { setProducts } from "../../features/products/productSlice";
import { type AppDispatch, type RootState } from "../../app/store";
import { getProducts } from "../../services/productServices";
import { CheckCartFormData } from "../../utilis/CheckCartFormData";

const CartForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState({
    id: 0,
    userId: "select",
    date: "",
    productId: "select",
    quantity: 0,
  });

  const users = useSelector((state: RootState) => state.user.users);
  const products = useSelector((state: RootState) => state.product.products);

  useEffect(() => {
    dispatch(fetchUsers());
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getProducts();
        const data = dispatch(setProducts(response));
        console.log(data);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Something went wrong!");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validInput = {
      userId: inputValue.userId,
      productId: inputValue.productId,
      quantity: inputValue.quantity,
    };
    const isValid = CheckCartFormData(validInput);
    if (!isValid) {
      return;
    }
    
  };

  const handleChangeInput = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <form onSubmit={handleSubmit}>
        <div className={styles.lableInputDiv}>
          <label htmlFor="userId">User :</label>
          <select
            name="userId"
            value={inputValue.userId}
            onChange={handleChangeInput}
          >
            <option value="select">Select</option>[
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name.firstname + " " + user.name.lastname}
              </option>
            ))}
            ]
          </select>
        </div>
        <div className={styles.lableInputDiv}>
          <label htmlFor="productId">Product :</label>
          <select
            name="productId"
            value={inputValue.productId}
            onChange={handleChangeInput}
          >
            <option value="select">Select</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.title}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.lableInputDiv}>
          <label htmlFor="price">Quantity :</label>
          <input
            name="quantity"
            type="number"
            value={inputValue.quantity}
            onChange={handleChangeInput}
          />
        </div>
        <div className={styles.lableInputDiv}>
          <button type="submit">{id ? "Update" : "Submit"}</button>
        </div>
      </form>
    </div>
  );
};

export default CartForm;
