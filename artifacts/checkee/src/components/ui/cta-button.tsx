import { Button } from "./button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

interface CtaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "default" | "large";
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export function CtaButton({ 
  size = "default", 
  href, 
  className = "", 
  children,
  ...props 
}: CtaButtonProps) {
  const isLarge = size === "large";
  
  const buttonContent = (
    <Button 
      className={`rounded-full bg-[#C45B17] hover:bg-[#D6711A] text-white font-semibold tracking-wide transition-all duration-300 shadow-[0_8px_24px_rgba(196,91,23,0.28)] hover:shadow-[0_12px_32px_rgba(196,91,23,0.35)] hover:scale-105 group flex items-center justify-between gap-4 ${
        isLarge ? "px-8 py-4 text-base h-auto" : "px-6 py-3 text-[14px] md:text-[15px] h-auto"
      } ${className}`}
      {...props}
    >
      <span>{children}</span>
      <div className={`bg-white rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1 ${
        isLarge ? "h-8 w-8" : "h-7 w-7"
      }`}>
        <ArrowRight className={`text-[#C45B17] ${isLarge ? "w-4 h-4" : "w-3.5 h-3.5"}`} />
      </div>
    </Button>
  );

  if (href) {
    return <Link href={href}>{buttonContent}</Link>;
  }

  return buttonContent;
}