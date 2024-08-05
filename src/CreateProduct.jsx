import { useState,useEffect } from "react"
import Swal from "sweetalert2";

export default function CreateProduct({ addProduct, clearProducts, products ,editProductIndex}) {
    // Update this after we know (ref)
    const [product, setProduct] = useState({
        name: "",
        Cat: "",
        price: "",
        count: "",
        description: "",
    });
    const [errors,setErrors]=useState({});
    
    useEffect(()=>
    {
        if(editProductIndex)
        {
            setProduct(editProductIndex);
        }
        else 
        {
            clearInputs();
        }
    },[editProductIndex]);
    
    const validate = (product) => {
        let errors = {};
        if (!product.name) errors.name = "Name is required";
        if (!product.price) errors.price = "Price is required";
        if (!product.Cat) errors.Cat = "Category is required";
        if (!product.count) {
            errors.count = "Count is required";
        } else if (Number(product.count) >= 100) {
            errors.count = "Count must be less than 100";
        }
        return errors;
    };
    const handelChange = (event) => {
        const { name, value } = event.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }))
    }
    const handelSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate(product);
        if (Object.keys(validationErrors).length === 0) {
            addProduct(product); 
            clearInputs(); 
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Your Update has been saved",
                showConfirmButton: false,
                timer: 1000,
            });
        } else {
            setErrors(validationErrors);
        }
    };

    const clearInputs = () => {
        setProduct({
            name: "",
            Cat: "",
            price: "",
            count: "",
            description: "",
        });
        setErrors({});
    };

    return <div>
        <div className="container shadow-lg rounded-5 w-75 py-5 px-3 mt-5">
            <h1 className="text-center mb-4">CRUD Project</h1>
            <form id="submit-product" onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label htmlFor="product_name" className="form-label" />
                    <input
                        type="text"
                        className="form-control"
                        id="product_name"
                        placeholder="product_name"
                        name="name"
                        value={product.name}
                        onChange={handelChange} />
                         {errors.name && <p className="text-danger">{errors.name}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="product_price" className="form-label" />
                    <input
                        type="text"
                        className="form-control"
                        id="product_price"
                        placeholder="product_price"
                        name="price"
                        value={product.price}
                        onChange={handelChange} />
                         {errors.price && <p className="text-danger">{errors.price}</p>}

                </div>
                <div className="mb-3">
                    <label htmlFor="product_category" className="form-label" />
                    <input
                        type="text"
                        className="form-control"
                        id="product_category"
                        placeholder="product_category"
                        name="Cat"
                        value={product.Cat}
                        
                        onChange={handelChange} 
                        />
                         {errors.Cat && <p className="text-danger">{errors.Cat}</p>}

                </div>
                <div className="mb-3">
                    <label htmlFor="product_count" className="form-label" />
                    <input
                        type="number"
                        className="form-control"
                        id="product_count"
                        placeholder="product_count"
                        name="count"
                        value={product.count}
                        onChange={handelChange} />
                         {errors.count && <p className="text-danger">{errors.count}</p>}

                </div>
                <div className="mb-3">
                    <label htmlFor="product_desc" className="form-label" />
                    <textarea
                        className="form-control"
                        id="product_desc"
                        rows={3}
                        name="description"
                        value={product.description}
                        onChange={handelChange} />
                </div>
                <div className="button-container">
                    <button className="btn btn-primary m-3" id="add-ptn">{editProductIndex?"update product":"Add product"}</button>
                    <button type="button" className="btn btn-primary m-3" id="clear-btn" onClick={clearInputs}>Clear Form</button>
                    {products.length > 0 && (
                        <button type="button" className="btn btn-danger m-3" id="delete-btn" onClick={clearProducts}>
                            Delete All
                        </button>
                    )}
                </div>
            </form>
        </div>
    </div>
}