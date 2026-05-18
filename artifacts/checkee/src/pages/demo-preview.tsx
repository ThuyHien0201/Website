import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import logoPng from "@/assets/logo.png";

export default function DemoPreview() {
  const [location] = useLocation();
  const [params, setParams] = useState({
    name: "Sản phẩm Mẫu",
    company: "Thương hiệu Mẫu",
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const name = searchParams.get("name") || "Cà phê Robusta Măng Đen";
    const company = searchParams.get("company") || "HTX Nông nghiệp Măng Đen";
    setParams({ name, company });
  }, [location]);

  return (
    <div className="min-h-[100dvh] bg-white flex justify-center font-sans text-[#0F1B2D]">
      <div className="w-full max-w-[420px] bg-white shadow-2xl relative flex flex-col border-x border-[#E5EAF0]">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E5EAF0] flex items-center justify-between bg-white shrink-0 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <img src={logoPng} className="h-6" alt="logo" />
            <span className="text-lg font-bold text-[#0c964b]">Checkee</span>
          </div>
          <div className="bg-[#D4EDE6] text-[#1A6B52] px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> Đã xác thực
          </div>
        </div>

        {/* Image */}
        <div className="h-64 relative shrink-0">
          <img src="/images/hero-coffee.png" className="w-full h-full object-cover" alt="Product" />
        </div>

        {/* Hero */}
        <div className="px-6 py-6 bg-white shrink-0">
          <h2 className="text-2xl font-bold text-[#0F1B2D] mb-1">{params.name}</h2>
          <p className="text-base text-[#7D9E94]">{params.company}</p>
          <div className="mt-3 inline-block bg-[#dcf0e6] text-[#0c964b] px-3 py-1 rounded-full text-xs font-semibold">
            Thực phẩm
          </div>
        </div>

        {/* Description */}
        <div className="px-6 py-4 bg-white shrink-0">
          <p className="text-sm text-[#4A5868] leading-relaxed whitespace-pre-wrap">
            Sản phẩm được trồng và thu hoạch thủ công tại nông trại Măng Đen, với độ cao 1200m so với mực nước biển, mang đến hương vị đậm đà nguyên bản.
          </p>
        </div>

        {/* Origin */}
        <div className="px-6 py-5 bg-[#FAFBFC] border-y border-[#E5EAF0] shrink-0">
          <div className="uppercase text-xs text-[#7D9E94] font-bold mb-4 tracking-wider">NGUỒN GỐC</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-[#7D9E94] uppercase mb-1">Vùng SX</div>
              <div className="text-sm text-[#0F1B2D] font-semibold">Lâm Đồng, VN</div>
            </div>
            <div>
              <div className="text-xs text-[#7D9E94] uppercase mb-1">Ngày SX</div>
              <div className="text-sm text-[#0F1B2D] font-semibold">15/04/2024</div>
            </div>
            <div>
              <div className="text-xs text-[#7D9E94] uppercase mb-1">HSD</div>
              <div className="text-sm text-[#0F1B2D] font-semibold">15/04/2025</div>
            </div>
            <div>
              <div className="text-xs text-[#7D9E94] uppercase mb-1">Lô</div>
              <div className="text-sm text-[#0F1B2D] font-semibold">BATCH-2024-05</div>
            </div>
          </div>
        </div>

        {/* Certs */}
        <div className="px-6 py-5 bg-white border-b border-[#E5EAF0] shrink-0">
          <div className="uppercase text-xs text-[#7D9E94] font-bold mb-4 tracking-wider">CHỨNG NHẬN</div>
          <div className="flex flex-wrap gap-2">
            <div className="bg-[#1A6B52] text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> VietGAP
            </div>
            <div className="bg-[#1A6B52] text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> ISO 22000
            </div>
          </div>
        </div>

        {/* Journey */}
        <div className="px-6 py-6 bg-[#FAFBFC] border-b border-[#E5EAF0] shrink-0">
          <div className="uppercase text-xs text-[#7D9E94] font-bold mb-6 tracking-wider">HÀNH TRÌNH SẢN PHẨM</div>
          <div className="space-y-6 relative">
            <div className="absolute left-[13px] top-6 bottom-[10px] w-px bg-[#E5EAF0]" />
            <div className="flex gap-4 relative">
              <div className="w-7 h-7 rounded-full bg-[#1A6B52] text-white text-xs font-bold flex items-center justify-center shrink-0 relative z-10">
                1
              </div>
              <div>
                <div className="text-base font-bold text-[#0F1B2D] mb-1">Thu hoạch</div>
                <div className="text-sm text-[#7D9E94] mb-1.5">Lâm Đồng</div>
                <div className="text-sm text-[#4A5868]">Hái thủ công khi quả chín đỏ 100%.</div>
              </div>
            </div>
            <div className="flex gap-4 relative">
              <div className="w-7 h-7 rounded-full bg-[#1A6B52] text-white text-xs font-bold flex items-center justify-center shrink-0 relative z-10">
                2
              </div>
              <div>
                <div className="text-base font-bold text-[#0F1B2D] mb-1">Sản xuất & Chế biến</div>
                <div className="text-sm text-[#7D9E94] mb-1.5">TP HCM</div>
                <div className="text-sm text-[#4A5868]">Sơ chế Honey, rang mộc chuẩn Medium Dark.</div>
              </div>
            </div>
            <div className="flex gap-4 relative">
              <div className="w-7 h-7 rounded-full bg-[#1A6B52] text-white text-xs font-bold flex items-center justify-center shrink-0 relative z-10">
                3
              </div>
              <div>
                <div className="text-base font-bold text-[#0F1B2D] mb-1">Đóng gói</div>
                <div className="text-sm text-[#7D9E94] mb-1.5">Nhà máy Bình Dương</div>
                <div className="text-sm text-[#4A5868]">Đóng gói van 1 chiều, dán tem QR Checkee.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-10 bg-[#0c964b] text-white text-center mt-auto shrink-0">
          <div className="bg-white p-3 rounded-xl w-fit mx-auto mb-4">
            <QRCodeCanvas value={window.location.href} size={100} fgColor="#0F1B2D" level="H" />
          </div>
          <div className="text-sm font-medium text-[#dcf0e6] mb-2">Quét mã QR để kiểm tra</div>
          <div className="text-xs text-[#dcf0e6]/70 mb-4">Powered by Checkee · checkee.vn</div>
        </div>

      </div>
    </div>
  );
}