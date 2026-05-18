import { CtaButton } from "@/components/ui/cta-button";

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center bg-white px-6 text-center font-sans">
      <h1 className="text-9xl font-bold text-[#0c964b] mb-4 tracking-tighter">404</h1>
      <h2 className="text-3xl font-bold text-[#0F1B2D] mb-4">Không tìm thấy trang</h2>
      <p className="text-[#4A5868] text-lg max-w-md mx-auto mb-8">
        Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không thể truy cập.
      </p>
      <CtaButton href="/">Về trang chủ</CtaButton>
    </div>
  );
}