import { ArrowRight } from "lucide-react";
import { Button } from "./button";
import { useLocation } from "wouter";

interface TrialButtonProps {
  size?: "default" | "large";
  className?: string;
  children?: React.ReactNode;
}

export function TrialButton({ size = "default", className = "", children = "Dùng thử miễn phí" }: TrialButtonProps) {
  const [, navigate] = useLocation();
  const isLarge = size === "large";

  const handleClick = () => {
    navigate("/demo");
  };

  return (
    <Button
      onClick={handleClick}
      className={`rounded-full bg-[#ed8302] hover:bg-[#d47200] text-white font-semibold tracking-wide transition-all duration-300 shadow-[0_8px_24px_rgba(196,91,23,0.28)] hover:shadow-[0_12px_32px_rgba(196,91,23,0.35)] hover:scale-105 group flex items-center justify-between gap-4 ${
        isLarge ? "px-8 py-4 text-base h-auto" : "px-6 py-3 text-[14px] md:text-[15px] h-auto"
      } ${className}`}
    >
      <span>{children}</span>
      <div className={`bg-white rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1 ${isLarge ? "h-8 w-8" : "h-7 w-7"}`}>
        <ArrowRight className={`text-[#ed8302] ${isLarge ? "w-4 h-4" : "w-3.5 h-3.5"}`} />
      </div>
    </Button>
  );
}
