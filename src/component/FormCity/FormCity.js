import PropTypes from 'prop-types';

export default function FormCity({ onSubmit: onSubmit_ }) {
  const onSubmit = (e) => {
    e.preventDefault(false);
    onSubmit_(e);
    e.target.city.value = ''
  };

  return (
    <form className="search-box" onSubmit={onSubmit}>
      <label htmlFor="city">Type city name here</label>
      <input
        type="text"
        className="search-bar"
        name="city"
        id="city"
        placeholder="Search..."
        defaultValue="New York"
      />
    </form>
  );
}

FormCity.propTypes = {
  onSubmit: PropTypes.func.isRequired
}
