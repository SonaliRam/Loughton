import { Link } from "react-router-dom";

const base =
  "relative isolate inline-flex items-center justify-center overflow-hidden rounded-md border text-ui whitespace-nowrap transition-colors duration-300 before:absolute before:left-1/2 before:top-[-155%] before:-z-10 before:h-[294%] before:w-[115%] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:transition-[top] before:duration-500 before:ease-[cubic-bezier(0.4,0,0.2,1)] before:content-[''] hover:before:top-1/2 focus-visible:before:top-1/2 motion-reduce:before:transition-none";

const variants = {
  primary: "border-tan bg-tan text-white before:bg-white hover:text-ink focus-visible:text-ink",
  outline: "border-tan bg-transparent text-ink before:bg-tan hover:text-white focus-visible:text-white",
  light: "border-white bg-transparent text-white before:bg-white hover:text-ink focus-visible:text-ink",
  dark: "border-ink bg-transparent text-ink before:bg-ink hover:text-white focus-visible:text-white",
};

const sizes = {
  md: "px-8 py-3",
  lg: "px-10 py-[1.125rem]",
};

function Button({
  to,
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}

export default Button;
