import { useRoute, useLocation, Link } from "wouter";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function DemoPreview() {
  const [match, params] = useRoute("/demo/preview/:type");
  const [location] = useLocation();
  
  const [queryParams, setQueryParams] = useState({ name: "Sản phẩm Mẫu", company: "Thương hiệu Mẫu" });
  
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const name = searchParams.get("name") || "Cà phê Robusta Măng Đen";
    const company = searchParams.get("company") || "HTX Nông nghiệp Măng Đen";
    setQueryParams({ name, company });
  }, [location]);

  if (!match || !params) return <div>Invalid URL</div>;

  const type = params.type;

  const BottomCTA = () => (
    <div className="fixed bottom-0 left-0 right-0 p-6 bg-[#040613]/90 backdrop-blur-md hairline-t z-50 flex justify-center">
      <Link href="/contact" className="w-full max-w-sm">
        <Button className="w-full h-12 rounded-md bg-[#83776D] hover:bg-[#83776D]/90 text-white tracking-[0.15em] uppercase text-[11px] transition-all duration-300">
          Khởi tạo cho doanh nghiệp
        </Button>
      </Link>
    </div>
  );

  return (
    <div className="min-h-[100dvh] bg-[#060B25] pb-32 max-w-md mx-auto shadow-2xl relative font-sans text-white border-x border-white/5">
      <div className="h-64 relative">
        <img src="/images/hero-coffee.png" className="w-full h-full object-cover opacity-70" alt="Product" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#060B25]" />
        <Link href="/demo" className="absolute top-6 left-6 p-3 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-colors border border-white/10">
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>
      
      <div className="px-8 -mt-16 relative z-10">
        <div className="bg-[#0A1130] border border-white/10 p-8 rounded-md shadow-2xl">
          <div className="text-[10px] tracking-[0.15em] uppercase text-[#83776D] mb-4">
            Xác thực nguồn gốc
          </div>
          <h1 className="text-2xl font-normal text-white mb-2 leading-tight">{queryParams.name}</h1>
          <p className="text-[#B8B5AE] font-light text-[13px]">{queryParams.company}</p>
        </div>

        <div className="mt-12 space-y-10">
          <div className="text-[11px] tracking-[0.15em] uppercase text-[#83776D] mb-6 hairline-b pb-4">
            Hành trình chế tác
          </div>
          
          <div className="space-y-10">
            <div className="flex gap-6">
              <div className="text-[13px] text-[#B8B5AE] pt-1">01.</div>
              <div>
                <h3 className="font-normal text-[15px] text-white mb-1">Thu hoạch</h3>
                <p className="text-[11px] uppercase tracking-wide text-[#B8B5AE] mb-3">12 Tháng 3, 2024</p>
                <p className="text-[13px] text-[#B8B5AE] leading-relaxed">Hái chọn lọc 100% trái chín tại nông trại Măng Đen, độ cao 1200m.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-[13px] text-[#B8B5AE] pt-1">02.</div>
              <div>
                <h3 className="font-normal text-[15px] text-white mb-1">Sơ chế & Rang mộc</h3>
                <p className="text-[11px] uppercase tracking-wide text-[#B8B5AE] mb-3">15 Tháng 4, 2024</p>
                <p className="text-[13px] text-[#B8B5AE] leading-relaxed">Sơ chế Honey, phơi giàn kính. Rang mộc chuẩn Medium Dark.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-[13px] text-[#B8B5AE] pt-1">03.</div>
              <div>
                <h3 className="font-normal text-[15px] text-white mb-1">Đóng gói</h3>
                <p className="text-[11px] uppercase tracking-wide text-[#B8B5AE] mb-3">20 Tháng 4, 2024</p>
                <p className="text-[13px] text-[#B8B5AE] leading-relaxed">Đóng gói van một chiều, dán tem truy xuất nguồn gốc Checkee.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomCTA />
    </div>
  );
}