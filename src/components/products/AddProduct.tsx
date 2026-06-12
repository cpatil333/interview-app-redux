import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import styles from "../../module/product.module.css";
import type { Product } from "../../types/Product";
import { useDispatch, useSelector } from "react-redux";
import {
  editProduct,
  getSingleProduct,
  postProduct,
} from "../../services/productServices";
import {
  addProduct,
  getProduct,
  updateProduct,
} from "../../features/products/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import type { RootState } from "../../app/store";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [inputValue, setInputValue] = useState<Product>({
    id: 0,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
  });

  const singleProduct = useSelector(
    (state: RootState) => state.product.setSelectedProduct,
  );

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const response = await getSingleProduct(Number(id));
        dispatch(getProduct(response));
        if (response) {
          setInputValue({
            id: response.id,
            title: response.title,
            price: response.price,
            description: response.description,
            category: response.category,
            image: response.image,
          });
        }
      };
      fetchProduct();
    }
  }, [id, dispatch]);

  const handleChangeInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (name === "image" && files && files.length > 0) {
      setInputValue((prev) => ({
        ...prev,
        [name]: files[0].name,
      }));
    } else {
      setInputValue((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (id) {
        const response = await editProduct(inputValue);
        if (response) {
          dispatch(updateProduct(response));
          alert("Product updated successfully...!");
          navigate("/");
        } else {
          console.log("Something went wrong!");
        }
      } else {
        const response = await postProduct(inputValue);
        if (response) {
          dispatch(addProduct(response));
          alert("Product saved successfully...!");
          navigate("/");
        } else {
          console.log("Something went wrong!");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(singleProduct);

  return (
    <div className={styles.productForm}>
      <h2>New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.lableInputDiv}>
          <label htmlFor="title">Product Name :</label>
          <input
            name="title"
            type="text"
            placeholder="Enter Product Title"
            value={inputValue.title}
            onChange={handleChangeInput}
          />
        </div>
        <div className={styles.lableInputDiv}>
          <label htmlFor="price">Price :</label>
          <input
            name="price"
            type="number"
            placeholder="Enter Price"
            value={inputValue.price}
            onChange={handleChangeInput}
          />
        </div>
        <div className={styles.lableInputDiv}>
          <label htmlFor="description">Description :</label>
          <textarea
            name="description"
            placeholder="Enter Description"
            value={inputValue.description}
            onChange={handleChangeInput}
          />
        </div>
        <div className={styles.lableInputDiv}>
          <label htmlFor="category">Category :</label>
          <select
            name="category"
            value={inputValue.category}
            onChange={handleChangeInput}
          >
            <option value="select">Select</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="jewelery">Jewelery</option>
            <option value="electronics">Electronics</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
        </div>
        <div className={styles.lableInputDiv}>
          <label htmlFor="image">Product Image :</label>
          <input
            name="image"
            type="file"
            placeholder="Upload Product Image"
            onChange={handleChangeInput}
          />
          <br />
          <span>{inputValue.image}</span>
        </div>
        <div className={styles.lableInputDiv}>
          <button type="submit">{id ? "Update" : "Submit"}</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
