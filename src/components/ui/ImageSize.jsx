// temporary guide for the design team: shows the image size each placeholder needs in bold red
// remove this component and its uses once the real images are added
function ImageSize({ sizes, corner = false }) {
  const position = corner
    ? "bottom-5 left-5 right-5 text-right md:left-auto"
    : "inset-0 grid place-items-center p-3 text-center";

  return (
    <span aria-hidden="true" className={`pointer-events-none absolute z-10 ${position}`}>
      <span className="inline-block space-y-1 rounded-box bg-white/90 px-2 py-1.5 normal-case tracking-normal md:px-3 md:py-2">
        {sizes.map((item) => (
          <span key={item.size} className={`block text-xs font-bold leading-snug text-[#e00000] sm:text-sm md:text-base ${item.className || ""}`}>
            {item.device ? `${item.device}: ` : ""}
            {item.size}
          </span>
        ))}
      </span>
    </span>
  );
}

export default ImageSize;
