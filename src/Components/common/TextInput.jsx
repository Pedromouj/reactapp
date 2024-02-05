const TextInput = ({ label, type = "text", idname, ...rest }) => (
  <div>
    <label htmlFor={idname} className="block mb-2 text-sm font-medium text-gray-900">
      {label}
    </label>
    <input
      {...rest}
      type={type}
      name={idname}
      id={idname}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 disabled:bg-gray-300"
      required
    />
  </div>
);

export default TextInput;
