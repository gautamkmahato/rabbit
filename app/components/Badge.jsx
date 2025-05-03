export default function Badge({ className = "", variant = "default", ...props }) {
  const baseStyles = "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold";
  const variants = {
    default: "bg-muted text-muted-foreground",
    outline: "border border-border text-foreground",
  };

  return (
    <div className={`${baseStyles} ${variants[variant] || ""} ${className}`} {...props} />
  );
}
