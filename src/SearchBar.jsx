export default function SearchBar({ setQuerys }) {
    const handleInputChange = (event) => {
      setQuerys(event.target.value);
    };
  
    return (
      <div className="my-5 w-75 mx-auto">
        <input
          type="text"
          className="form-control"
          id="query"
          placeholder="Search by product name"
          onChange={handleInputChange}
        />
      </div>
    );
  }
  