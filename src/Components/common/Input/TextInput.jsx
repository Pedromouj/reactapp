const TextField = (props) => {
  const { name, id, error, label, ...rest } = props;
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input name={name} id={id} {...rest} />
      {error && <p>{error}</p>}
    </>
  );
};

export default TextField;
