const FormSelect = ({ name, label, options = [], value, placeholder, onChange, error }) => {
  return (
    <div className="w-full">
      <label className="block text-gray-700 font-bold mb-1" htmlFor={name}>
        {label}
      </label>
      <select
        className={`w-full p-1.5 bg-white rounded-md border ${error ? "border-red-500" : ""}`}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      >
        <option value="">--Select {label}--</option>
        {options.map((option) => (
          <option key={option.id} value={`${option.id}|${option.libelle}`}>
            {option.libelle}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs italic error-animation">{error}</p>}
    </div>
  );
};

export default FormSelect;
