import './FormCity.css';

export default function FormCity({ onSubmit }) {
    return (
        <form className="search-box" onSubmit={onSubmit}>
            <div className="search-box__body">
                <input
                    type="text"
                    className="search-box__input"
                    placeholder="Weather in your city"
                    id="city"
                    required
                />
                <button className="search-box__submit" type="submit">Search</button>
            </div>
            
        </form>
    );
}