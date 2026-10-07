// shows the real image when a src is given, otherwise a palette placeholder
function ImagePlaceholder({ src, alt = "", className = "" }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`h-full w-full bg-linear-to-br from-cream via-cream to-tan ${className}`}
    />
  );
}

export default ImagePlaceholder;
