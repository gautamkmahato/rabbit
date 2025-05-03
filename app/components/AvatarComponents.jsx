import { forwardRef } from "react";
import gkm from '../../public/gkm.jpg'

// Avatar Component
const Avatar = forwardRef(({ className = "", size = "md", ...props }, ref) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  const baseClass = "relative flex shrink-0 overflow-hidden rounded-full";
  const finalClass = `${baseClass} ${sizeClasses[size] || sizeClasses.md} ${className}`;

  return <div ref={ref} className={finalClass} {...props} />;
});
Avatar.displayName = "Avatar";

// AvatarImage Component
const AvatarImage = ({ className = "", ...props }) => {
  const baseClass = "aspect-square h-full w-full object-cover";
  return <img className={`${baseClass} ${className}`} {...props} />;
  // return <img className={`${baseClass} ${className}`} {...props} />;
};
AvatarImage.displayName = "AvatarImage";

// AvatarFallback Component
const AvatarFallback = ({ className = "", children, ...props }) => {
  const baseClass = "flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground text-xs";
  return (
    <div className={`${baseClass} ${className}`} {...props}>
      {children}
    </div>
  );
};
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
