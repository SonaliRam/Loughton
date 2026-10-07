import { Link } from "react-router-dom";
import logo from "../../assets/images/loughton-logo-black.webp";

function Logo({ className = "" }) {
  return (
    <Link
      to="/"
      aria-label="Loughton Private GP, home"
      className={`inline-block shrink-0 ${className}`}
    >
      <img
        src={logo}
        alt="Loughton Private GP"
        width={1931}
        height={623}
        className="h-auto w-[8.75rem] md:w-[10rem] xl:w-[16.5rem]"
      />
    </Link>
  );
}

export default Logo;
