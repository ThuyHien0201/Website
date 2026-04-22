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
    const name = searchParams.get("name") || "Tách trà Gốm sành";
    const company = searchParams.get("company") || "Nghệ nhân Bát Tràng";
    setQueryParams({ name, company });
  }, [location]);

  if (!match || !params) return <div>Invalid URL</div>;

  const type = params.type;

  const BottomCTA = () => (
    <div className="fixed bottom-0 left-0 right-0 p-6 bg-background/90 backdrop-blur-md border-t border-border/40 z-50 flex justify-center">
      <Link href="/contact" className="w-full max-w-sm">
        <Button className="w-full h-14 rounded-none bg-primary hover:bg-primary/90 text-primary-foreground tracking-widest uppercase text-xs transition-all duration-500">
          Khởi tạo cho doanh nghiệp
        </Button>
      </Link>
    </div>
  );

  // 1. TRACE
  if (type === "trace") {
    return (
      <div className="min-h-[100dvh] bg-background pb-32 max-w-md mx-auto shadow-2xl relative font-sans text-foreground">
        <div className="h-72 relative">
          <img src="/images/tea-jar-editorial.png" className="w-full h-full object-cover" alt="Product" />
          <div className="absolute inset-0 bg-black/20" />
          <Link href="/demo" className="absolute top-6 left-6 p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </div>
        
        <div className="px-8 -mt-12 relative z-10">
          <div className="bg-background border border-border/40 p-8 shadow-2xl">
            <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Xác thực nguồn gốc
            </div>
            <h1 className="text-3xl font-serif text-primary mb-2 leading-tight">{queryParams.name}</h1>
            <p className="text-muted-foreground font-light text-sm">{queryParams.company}</p>
          </div>

          <div className="mt-12 space-y-12">
            <div className="text-xs tracking-[0.2em] uppercase text-primary font-medium text-center border-b border-border/40 pb-4">
              Hành trình chế tác
            </div>
            
            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="text-xs font-serif italic text-muted-foreground pt-1">I.</div>
                <div>
                  <h3 className="font-serif text-xl text-primary mb-1">Tinh tuyển nguyên liệu</h3>
                  <p className="text-xs text-muted-foreground mb-2">12 Tháng 3, 2024</p>
                  <p className="text-sm font-light leading-relaxed">Đất sét tinh tuyển từ mỏ Trúc Thôn, ủ trong 30 ngày.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="text-xs font-serif italic text-muted-foreground pt-1">II.</div>
                <div>
                  <h3 className="font-serif text-xl text-primary mb-1">Tạo hình & Nung</h3>
                  <p className="text-xs text-muted-foreground mb-2">15 Tháng 4, 2024</p>
                  <p className="text-sm font-light leading-relaxed">Vuốt tay thủ công bởi nghệ nhân. Nung củi ở nhiệt độ 1200°C.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="text-xs font-serif italic text-muted-foreground pt-1">III.</div>
                <div>
                  <h3 className="font-serif text-xl text-primary mb-1">Phân phối</h3>
                  <p className="text-xs text-muted-foreground mb-2">20 Tháng 4, 2024</p>
                  <p className="text-sm font-light leading-relaxed">Gallery Gốm Việt, Quận 1, TP.HCM.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BottomCTA />
      </div>
    );
  }

  // Generic fallback for other types using similar editorial styling
  return (
    <div className="min-h-[100dvh] bg-background pb-32 max-w-md mx-auto shadow-2xl relative font-sans text-foreground">
      <div className="p-8 pt-12 border-b border-border/40">
        <Link href="/demo" className="inline-block p-3 rounded-full bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors mb-12">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
          {type.toUpperCase()} DOCUMENT
        </div>
        <h1 className="text-4xl font-serif text-primary mb-4 leading-tight">{queryParams.name}</h1>
        <p className="text-muted-foreground font-light">{queryParams.company}</p>
      </div>

      <div className="p-8 space-y-12">
        <div className="space-y-6">
           <h3 className="font-serif text-xl text-primary">Thông tin định danh</h3>
           <div className="space-y-4 text-sm font-light border-t border-border/40 pt-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mã định danh</span>
                <span>LOT-88291</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ngày khởi tạo</span>
                <span>24/10/2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Trạng thái pháp lý</span>
                <span className="text-secondary">Đã xác thực</span>
              </div>
           </div>
        </div>
      </div>
      <BottomCTA />
    </div>
  );
}
