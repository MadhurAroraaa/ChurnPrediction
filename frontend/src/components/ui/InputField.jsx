/**
 * Premium Input Field component with helper text
 */
const InputField = ({ 
  label, 
  name, 
  type = 'text',
  value,
  onChange,
  required = false,
  min,
  max,
  step,
  placeholder,
  helperText,
  className = '',
  ...props 
}) => {
  return (
    <div className={className}>
      {label && (
        <label 
          htmlFor={name}
          className="block text-sm font-medium text-text-secondary mb-2"
        >
          {label}
          {required && <span className="text-risk-high ml-1">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        className="
          w-full px-4 py-3
          glass border border-border rounded-xl
          text-text-primary placeholder:text-text-muted
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50
          focus:shadow-glow
          transition-all duration-300
          disabled:opacity-50 disabled:cursor-not-allowed
          hover:border-border-hover
        "
        {...props}
      />
      {helperText && (
        <p className="mt-1.5 text-xs text-text-muted">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default InputField;

