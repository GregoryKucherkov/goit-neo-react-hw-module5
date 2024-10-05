import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

function SearchBar({ onSearch }) {
  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchQuery = form.elements.text.value;

    if (!searchQuery) {
      toast.error("The field can't be emty, type in the query!");
      return;
    }
    onSearch(searchQuery);
    form.reset();
  };
  return (
    <div>
      <form onSubmit={handleSearch} className={css.form}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movie"
          name="text"
        />
        <button type="submit" className={css.btn}>
          Search
        </button>
      </form>
      <>{}</>
    </div>
  );
}

export default SearchBar;
