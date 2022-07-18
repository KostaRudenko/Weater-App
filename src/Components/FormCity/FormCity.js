export default function FormCity({ onSubmit }) {
    return (
        <form className="search-box" onSubmit={onSubmit}>
            <label htmlFor="city">Type city name here  </label>
            <input
                type="text"
                className="search-bar"
                placeholder="Search..."
                name="city"
            />
        </form>
    );
}