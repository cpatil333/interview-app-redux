import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { deleteSingleProduct, getProducts } from "../services/productServices";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, setProducts } from "../features/products/productSlice";
import type { RootState } from "../app/store";
import styles from "../module/product.module.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [filteredData, setFilterdData] = useState<Product[]>([]);

  const dispatch = useDispatch();
  const productList = useSelector((state: RootState) => state.product.products);

  //console.log(productList.filter((item) => !item.title || !item.category));

  useEffect(() => {
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

  // console.log(productList);

  useEffect(() => {
    const filteredSearch = productList.filter((item: Product) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchText.toLowerCase());

      const matchesCateogry =
        selectedText === "" ||
        selectedText === "select" ||
        selectedText === "all" ||
        item.category.toLowerCase() === selectedText.toLowerCase();

      return matchesSearch && matchesCateogry;
    });

    setFilterdData(filteredSearch);
  }, [productList, searchText, selectedText]);

  const handleDelete = async (id: number) => {
    try {
      const response = await deleteSingleProduct(id);
      if (response) {
        dispatch(deleteProduct(response));
        alert("Product deleted..");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const searchData = filteredData.length >= 0 ? filteredData : productList;
  return (
    <div>
      <div className={styles.searchCategory}>
        <button
          className={styles.btn}
          onClick={() => navigate("/product-form")}
        >
          + Add Product
        </button>

        <input
          type="text"
          placeholder="Search products.."
          onChange={(e) => setSearchText(e.target.value.trim())}
        />
        <select onChange={(e) => setSelectedText(e.target.value)}>
          <option value="select">Select</option>
          <option value="all">All</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Products</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {searchData?.map((item: Product) => (
            <tr key={item?.id}>
              <td>
                <img src={item?.image} alt={item.title} />
              </td>
              <td style={{ textAlign: "left" }}>{item?.title}</td>
              <td>{item?.price}</td>
              <td>{item?.category}</td>
              <td>
                <button
                  style={{ padding: "10px" }}
                  onClick={() => navigate(`/product-form/${item.id}`)}
                >
                  Edit
                </button>
                <button
                  style={{ padding: "10px" }}
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
