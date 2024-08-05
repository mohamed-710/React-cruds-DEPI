import Swal from "sweetalert2";
export default function TableShow({ products ,updateProduct,deleteProduct}) {
  const handelUpdateClick= (index) => {
    updateProduct(index);
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };
    const handleDelete = (index) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        time:1000
      }).then((result) => {
        if (result.isConfirmed) {
          deleteProduct(index)
          Swal.fire({
            title: "Deleted!",
            text: "Your tabel has been deleted.",
            icon: "success",
            time:1000
          });
        }
      });
    };
    return (
      <div className="w-75 mx-auto mt-5 my-5" id="table-list">
        <table className="table">
          <thead>
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Count</th>
              <th>Description</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody id="table-body">
            {products.map((item,index)=>(
              <tr key={index} >
                <th>{index+1}</th>
                <td>{item.name}</td>
                <td>{item.price}$</td>
                <td>{item.Cat}</td>
                <td>{item.count}</td>
                <td>{item.description}</td>
                <td>
                  <button className="btn btn-outline-success" onClick={()=>handelUpdateClick(index)}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                </td>
                <td>
                  <button className="btn btn-outline-danger"onClick={()=>handleDelete(index)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
  