import { useRoute, useLocation, Link } from "wouter";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, CheckCircle2, Factory, Truck, MapPin, 
  Globe, Leaf, Recycle, ShieldCheck, Clock, 
  Thermometer, User, Utensils, AlertCircle 
} from "lucide-react";
import { motion } from "framer-motion";

export default function DemoPreview() {
  const [match, params] = useRoute("/demo/preview/:type");
  const [location] = useLocation();
  
  // Parse query params
  const [queryParams, setQueryParams] = useState({ name: "Sản phẩm Demo", company: "Công ty Demo" });
  
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const name = searchParams.get("name") || "Cà phê Robusta Măng Đen";
    const company = searchParams.get("company") || "HTX Nông nghiệp Măng Đen";
    setQueryParams({ name, company });
  }, [location]);

  if (!match || !params) return <div>Invalid URL</div>;

  const type = params.type;

  // Shared Bottom CTA
  const BottomCTA = () => (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50">
      <Link href="/contact">
        <Button className="w-full h-14 text-base shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground">
          Dùng thật cho doanh nghiệp của bạn <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </Link>
    </div>
  );

  // 1. TRACE (TT 02/2024)
  if (type === "trace") {
    return (
      <div className="min-h-[100dvh] bg-background pb-32 max-w-md mx-auto shadow-2xl relative bg-[#FAFAF8]">
        <div className="h-64 relative bg-[#1D9E75]">
          <img src="/images/hero-product.png" className="w-full h-full object-cover opacity-60 mix-blend-overlay" alt="Product" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <Link href="/demo" className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </div>
        
        <div className="px-6 -mt-16 relative z-10">
          <div className="bg-white rounded-2xl p-6 shadow-xl border">
            <div className="inline-flex items-center rounded-full bg-[#1D9E75]/10 text-[#1D9E75] px-2.5 py-0.5 text-xs font-semibold mb-3 border border-[#1D9E75]/20">
              <CheckCircle2 className="h-3 w-3 mr-1" /> Đã xác thực nguồn gốc
            </div>
            <h1 className="text-2xl font-serif font-bold text-foreground mb-1">{queryParams.name}</h1>
            <p className="text-muted-foreground text-sm">{queryParams.company}</p>
          </div>

          <div className="mt-8 space-y-6">
            <h3 className="font-serif text-xl font-bold text-[#1D9E75]">Hành trình sản phẩm</h3>
            
            <div className="relative pl-6 space-y-8 before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white bg-[#1D9E75] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute -left-[11px]">
                  <Factory className="h-3 w-3" />
                </div>
                <div className="w-[calc(100%-1rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl shadow-sm border border-border">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-bold text-foreground">Sản xuất</div>
                    <time className="text-xs font-medium text-muted-foreground">12/03/2024</time>
                  </div>
                  <div className="text-sm text-muted-foreground">Nhà máy chế biến Măng Đen, Kon Tum</div>
                </div>
              </div>
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white bg-[#1D9E75] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute -left-[11px]">
                  <Truck className="h-3 w-3" />
                </div>
                <div className="w-[calc(100%-1rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl shadow-sm border border-border">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-bold text-foreground">Vận chuyển</div>
                    <time className="text-xs font-medium text-muted-foreground">15/03/2024</time>
                  </div>
                  <div className="text-sm text-muted-foreground">Kho tổng Logistics miền Trung</div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white bg-[#1D9E75] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute -left-[11px]">
                  <MapPin className="h-3 w-3" />
                </div>
                <div className="w-[calc(100%-1rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl shadow-sm border border-border">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-bold text-foreground">Phân phối</div>
                    <time className="text-xs font-medium text-muted-foreground">18/03/2024</time>
                  </div>
                  <div className="text-sm text-muted-foreground">Siêu thị Co.opmart Quận 10, TP.HCM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BottomCTA />
      </div>
    );
  }

  // 2. ELABEL
  if (type === "elabel") {
    return (
      <div className="min-h-[100dvh] bg-[#F8FAFC] pb-32 max-w-md mx-auto shadow-2xl relative">
        <div className="bg-[#0C447C] text-white p-6 pt-12 pb-16 rounded-b-[40px] relative">
          <Link href="/demo" className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex justify-between items-center mb-6 pt-4">
            <span className="text-white/70 text-sm font-medium uppercase tracking-wider">E-Label</span>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-white/20 rounded text-xs font-bold">VN</span>
              <span className="px-2 py-1 bg-white/10 rounded text-xs text-white/50">EN</span>
            </div>
          </div>
          <h1 className="text-3xl font-serif font-bold mb-2">{queryParams.name}</h1>
          <p className="text-white/80">{queryParams.company}</p>
        </div>

        <div className="px-6 -mt-8 relative z-10 space-y-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100">
            <h3 className="font-bold text-[#0C447C] mb-4 flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2" /> Thông tin bắt buộc
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Định lượng:</span>
                <span className="font-medium">500g</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Ngày sản xuất:</span>
                <span className="font-medium">01/04/2024</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-muted-foreground">Hạn sử dụng:</span>
                <span className="font-medium">12 tháng</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100">
            <h3 className="font-bold text-[#0C447C] mb-3">Thành phần</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              100% Cà phê Robusta nguyên chất rang mộc. Không chất bảo quản, không hương liệu nhân tạo, không đậu nành rang cháy.
            </p>
          </div>

          <div className="bg-[#FEF2F2] p-6 rounded-2xl border border-red-100">
            <h3 className="font-bold text-red-800 mb-3 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" /> Cảnh báo an toàn
            </h3>
            <p className="text-sm text-red-900/80 leading-relaxed">
              Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp. Đậy kín sau khi sử dụng. Không dùng cho người mẫn cảm với caffeine.
            </p>
          </div>
        </div>
        <BottomCTA />
      </div>
    );
  }

  // 3. DPP
  if (type === "dpp") {
    return (
      <div className="min-h-[100dvh] bg-[#FAF9FE] pb-32 max-w-md mx-auto shadow-2xl relative">
        <div className="p-6 pt-12">
          <Link href="/demo" className="absolute top-4 left-4 p-2 bg-[#3C3489]/10 rounded-full text-[#3C3489]">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center justify-center mt-8 mb-6">
            <div className="p-3 bg-[#3C3489] rounded-full text-white shadow-lg shadow-[#3C3489]/30">
              <Globe className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-3xl font-serif font-bold text-center text-[#3C3489] mb-2">Digital Product Passport</h1>
          <p className="text-center text-muted-foreground mb-8">{queryParams.name}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-2xl border border-[#3C3489]/10 shadow-sm text-center">
              <Leaf className="h-6 w-6 text-[#3C3489] mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">2.4<span className="text-sm font-normal text-muted-foreground">kg</span></div>
              <div className="text-xs text-muted-foreground mt-1">CO₂e Footprint</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-[#3C3489]/10 shadow-sm text-center">
              <Recycle className="h-6 w-6 text-[#3C3489] mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">85<span className="text-sm font-normal text-muted-foreground">%</span></div>
              <div className="text-xs text-muted-foreground mt-1">Vật liệu tái chế</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-[#3C3489]/10 shadow-sm flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ShieldCheck className="h-8 w-8 text-[#3C3489]" />
                <div>
                  <div className="font-bold text-foreground">Chứng nhận Châu Âu</div>
                  <div className="text-sm text-muted-foreground">CE, RoHS, REACH</div>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            </div>
            
            <div className="bg-white p-5 rounded-2xl border border-[#3C3489]/10 shadow-sm flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Recycle className="h-8 w-8 text-[#3C3489]" />
                <div>
                  <div className="font-bold text-foreground">Hướng dẫn tái chế</div>
                  <div className="text-sm text-muted-foreground">Phân loại & Xử lý rác</div>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </div>
        <BottomCTA />
      </div>
    );
  }

  // 4. FNB
  if (type === "fnb") {
    return (
      <div className="min-h-[100dvh] bg-[#FFFBF5] pb-32 max-w-md mx-auto shadow-2xl relative border-t-8 border-[#854F0B]">
        <Link href="/demo" className="absolute top-4 left-4 p-2 bg-[#854F0B]/10 rounded-full text-[#854F0B]">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="p-6 pt-16">
          <div className="inline-block px-3 py-1 bg-[#854F0B]/10 text-[#854F0B] font-bold text-xs rounded-full uppercase tracking-wider mb-4 border border-[#854F0B]/20">
            Hồ sơ lưu mẫu Y tế
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Thịt kho trứng cút</h1>
          <p className="text-muted-foreground">Bếp ăn Trường Tiểu học Hừng Đông</p>

          <div className="mt-8 bg-white rounded-2xl border shadow-sm overflow-hidden">
            <div className="bg-[#854F0B]/5 p-4 border-b flex items-center justify-between">
              <span className="font-semibold text-[#854F0B]">Trạng thái: Hợp lệ</span>
              <CheckCircle2 className="h-5 w-5 text-[#1D9E75]" />
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm text-muted-foreground">Thời gian lấy mẫu</div>
                  <div className="font-medium text-foreground">10:30 AM — 15/04/2024</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <User className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm text-muted-foreground">Người thực hiện</div>
                  <div className="font-medium text-foreground">Nguyễn Thị Hoa (Ca trưởng)</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Thermometer className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm text-muted-foreground">Nhiệt độ bảo quản</div>
                  <div className="font-medium text-foreground">4°C (Tủ mát số 2)</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Utensils className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm text-muted-foreground">Khối lượng mẫu</div>
                  <div className="font-medium text-foreground">150g (Đạt chuẩn QĐ 1246)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BottomCTA />
      </div>
    );
  }

  // 5. TEMPHU
  if (type === "temphu") {
    return (
      <div className="min-h-[100dvh] bg-white pb-32 max-w-md mx-auto shadow-2xl relative border-x border-[#712B13]/10">
        <Link href="/demo" className="absolute top-4 left-4 p-2 bg-black/5 rounded-full text-foreground">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="p-6 pt-20">
          <h1 className="text-2xl font-bold uppercase tracking-wider text-center text-foreground mb-8 pb-4 border-b-2 border-black">
            Nhãn phụ sản phẩm
          </h1>

          <div className="space-y-6 text-sm text-foreground/90">
            <div>
              <div className="font-bold text-black uppercase mb-1">Tên sản phẩm:</div>
              <div className="text-lg font-serif">{queryParams.name}</div>
            </div>

            <div>
              <div className="font-bold text-black uppercase mb-1">Xuất xứ:</div>
              <div>Hàn Quốc (South Korea)</div>
            </div>

            <div className="bg-accent/50 p-4 rounded-xl">
              <div className="font-bold text-black uppercase mb-2 text-xs">Thương nhân nhập khẩu & chịu trách nhiệm:</div>
              <div className="font-bold">{queryParams.company}</div>
              <div className="text-muted-foreground mt-1">285 Cách Mạng Tháng 8, P.12, Q.10, TP.HCM</div>
              <div className="text-muted-foreground">SĐT: 1900 1234</div>
            </div>

            <div>
              <div className="font-bold text-black uppercase mb-1">Định lượng:</div>
              <div>50ml</div>
            </div>

            <div>
              <div className="font-bold text-black uppercase mb-1">Thành phần:</div>
              <div className="leading-relaxed">Water, Glycerin, Niacinamide, Butylene Glycol, 1,2-Hexanediol, PEG-60 Hydrogenated Castor Oil, Carbomer, Arginine, Allantoin.</div>
            </div>

            <div>
              <div className="font-bold text-black uppercase mb-1">Lô sản xuất:</div>
              <div>{params.name || "LOT2024A"}</div>
            </div>
          </div>
        </div>
        <BottomCTA />
      </div>
    );
  }

  return <div>Not found</div>;
}
