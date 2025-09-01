const Error = ({ errors }) => {
  if (!errors) return null;

  const { errorCategory, message, errors: validationErrors } = errors;

  return (
    <div className="error">
      {errorCategory === "validation_error" ? (
        <div>{validationErrors?.[0]?.message || "Validation failed."}</div>
      ) : (
        <div>{message}</div>
      )}
    </div>
  );
};

export default Error;
