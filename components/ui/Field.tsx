type BaseProps = {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
};

const baseInput =
  "w-full border-0 border-b bg-transparent py-3 text-cream placeholder:text-haze/60 focus:outline-none focus:ring-0 transition-colors";
const okBorder = "border-line focus:border-gold-deep";
const badBorder = "border-red-400 focus:border-red-400";

/**
 * Native `<select>` inherits its background from the parent (transparent in
 * our case), but the OPTION list is a separate popup drawn by the OS/browser.
 * Chrome will happily draw white-on-white options unless we give the select
 * a solid `background-color`. So we force one on the select AND on options.
 */
const selectCls =
  "cursor-pointer appearance-none pr-8 [background:var(--color-noir)] " +
  "[&_option]:bg-noir [&_option]:text-cream [&_option:checked]:text-gold";

export function Field({
  label,
  name,
  error,
  required,
  type = "text",
  ...rest
}: BaseProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow mb-2 block text-mist">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`${baseInput} ${error ? badBorder : okBorder}`}
        {...rest}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextArea({
  label,
  name,
  error,
  required,
  ...rest
}: BaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow mb-2 block text-mist">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        rows={4}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`${baseInput} resize-none ${error ? badBorder : okBorder}`}
        {...rest}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function Select({
  label,
  name,
  error,
  required,
  children,
  ...rest
}: BaseProps & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow mb-2 block text-mist">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          className={`${baseInput} ${selectCls} ${error ? badBorder : okBorder}`}
          {...rest}
        >
          {children}
        </select>
        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gold" aria-hidden>
          ▾
        </span>
      </div>
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
