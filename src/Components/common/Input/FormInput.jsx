const FormInput = ({ name, type, label, value, placeholder, onChange, error }) => {
  return (
    <div className="w-full">
      <label className="block text-gray-700 font-bold mb-1" htmlFor={name}>
        {label}
      </label>
      <input
        className={`w-full p-1.5 bg-white rounded-md border ${error ? "border-red-500" : ""}`}
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-xs italic error-animation">{error}</p>}
    </div>
  );
};

export default FormInput;
