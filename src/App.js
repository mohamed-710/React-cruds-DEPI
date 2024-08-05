import './App.css';
import { useState ,useEffect} from "react";
import CreateProduct from './CreateProduct';
import TableShow from './ProductTable';
import SearchBar from './SearchBar';
import WarningMessage from './WarningMessage';
function App() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setQuerys] = useState('');
  const [editProductIndex, setEditProductIndex] = useState(null);

  useEffect(()=>
  {
    const storedProducts=localStorage.getItem('products');
    if(storedProducts)
    {
      setProducts(JSON.parse(storedProducts))
    }
  },[]);

  useEffect(()=>
  {
    if (products.length > 0) {
    localStorage.setItem('products',JSON.stringify(products));
    }
  },[products]);

  const addProduct = (product) => {
    if (editProductIndex !== null) {
      const updatedProducts = products.map((p, index) =>
        index === editProductIndex ? product : p
      );
      setProducts(updatedProducts);
      setEditProductIndex(null);
    }
    else {
    const newProducts = [...products];
    newProducts.push(product);
    setProducts(newProducts)
    console.log(newProducts)
    }
  
  };
  const clearProducts = () => {
    setProducts([]);
  };
  const deleteProduct = (index) => {
    const updatedProducts = products.map((product, i) => {
      if (i === index) {
        return { ...product, count: product.count - 1 };
      }
      return product;
    }).filter((product) => product.count > 0);
  
    setProducts(updatedProducts);
  };
  

  const searchProducts = products.filter((product) => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const updateProduct = (index) => {
    setEditProductIndex(index);
  };
  return (
    <>
      <CreateProduct 
      addProduct={addProduct}
      clearProducts={clearProducts}
      products={products}
      editProductIndex={editProductIndex!==null?products[editProductIndex]:null}
      />
      <SearchBar setQuerys={setQuerys} />
      {products.length > 0 ?
        (
          <>
            <TableShow 
            products={searchProducts} 
            updateProduct={updateProduct} 
            deleteProduct={deleteProduct}/>
          </>
        ) :
        (
          <WarningMessage />
        )
      };
    </>
  );
}
export default App;
