import { ChevronDownIcon } from "./Icons";

// label above any control, linked by id so screen readers announce it
function FormField({ id, label, className = "", children }) {
  return (
    <div data-reveal className={className}>
      <label htmlFor={id} className="form-label mb-3 block">
        {label}
      </label>
      {children}
    </div>
  );
}

// a native select with our own arrow, so it stays accessible and styled
export function SelectInput({ id, name, placeholder, options, ...rest }) {
  return (
    <div className="relative">
      <select id={id} name={name} defaultValue="" required className="form-control" {...rest}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-body" />
    </div>
  );
}

export default FormField;
