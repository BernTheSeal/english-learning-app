const Select = ({ value, setter, options, placeholder }) => {
  return (
    <select
      className="login-register-input px-4"
      value={value}
      onChange={(e) => setter(e.target.value)}
    >
      <option className="bg-amber-200" value="" disabled>
        {placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt.toUpperCase()}
        </option>
      ))}
    </select>
  );
};

export default Select;
