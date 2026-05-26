const InputField = ({ label, error, icon: Icon, ...props }) => {
  return (
    <div className="mb-4">
      {label && <label className="label">{label}</label>}
      <div className="relative">
        {Icon && (
          <div
            className="absolute inset-y-0 left-0 
                                    pl-3 flex items-center pointer-events-none"
          >
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          className={`input-field 
                        ${Icon ? "pl-10" : ""} 
                        ${error ? "input-error" : ""}`}
          {...props}
        />
      </div>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default InputField;
