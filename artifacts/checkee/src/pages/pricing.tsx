import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Pricing() {
  const [activeTab, setActiveTab] = useState("trace");

  const tabs = [
    { id: "trace", label: "Trace" },
    { id: "elabel", label: "E-label" },
    { id: "dpp", label: "DPP" },
    { id: "fnb", label: "F&B" },
    { id: "tem", label: "Tem phụ" }
  ];

  return (
    <div className="flex flex-col w-full bg-[#060B25] min-h-screen">
      <section className="pt-40 pb-32">
        <div className="container px-6 md:px-12 max-w-[1200px] mx-auto space-y-16">
          <div className="space-y-6 max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.15em] text-[#83776D]">Đầu tư cho thương hiệu</div>
            <h1 className="text-4xl md:text-5xl font-normal text-white leading-tight">
              Giá trị <span className="italic font-light text-[#B8B5AE]">đích thực</span>
            </h1>
            <p className="text-[13px] text-[#B8B5AE] leading-relaxed">
              Chi phí được thiết kế minh bạch cho mọi quy mô doanh nghiệp. Sự sang trọng không nằm ở giá cao, mà ở giá trị bạn nhận được.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 hairline-b pb-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-[11px] font-normal tracking-[0.15em] uppercase pb-4 border-b transition-all duration-300 relative top-[1px] ${
                  activeTab === tab.id 
                    ? "border-white text-white" 
                    : "border-transparent text-[#B8B5AE] hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="pt-8 animate-in fade-in duration-700">
            {activeTab === "trace" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: "< 5 dòng SP", price: "1.200.000", codes: "10.000", acc: "Dưới 5 TK" },
                  { name: "< 20 dòng SP", price: "3.600.000", codes: "20.000", acc: "Dưới 5 TK", highlight: true },
                  { name: "< 50 dòng SP", price: "6.000.000", codes: "50.000", acc: "Dưới 5 TK" },
                  { name: "> 50 dòng SP", price: "9.000.000", codes: "100.000", acc: "Dưới 5 TK" },
                ].map((tier, i) => (
                  <div key={i} className={`flex flex-col bg-[#0A1130] p-8 rounded-md border ${tier.highlight ? "border-[#83776D] shadow-[0_0_20px_rgba(131,119,109,0.1)]" : "border-white/10"} relative`}>
                    {tier.highlight && (
                      <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#83776D] text-white text-[10px] uppercase tracking-[0.1em] px-3 py-1 rounded-full">
                        Phổ biến
                      </div>
                    )}
                    <h3 className="text-[13px] text-[#B8B5AE] mb-6">{tier.name}</h3>
                    <div className="text-2xl font-light text-white mb-8">{tier.price} <span className="text-[10px] text-[#B8B5AE] uppercase tracking-widest ml-1">VNĐ/năm</span></div>
                    
                    <div className="space-y-4 text-[13px] text-white hairline-t pt-8 flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-[#B8B5AE]">Mã QR</span>
                        <span>{tier.codes}</span>
                      </div>
                      <div className="flex justify-between items-center hairline-t pt-4">
                        <span className="text-[#B8B5AE]">Tài khoản NVL</span>
                        <span>Vô hạn</span>
                      </div>
                      <div className="flex justify-between items-center hairline-t pt-4">
                        <span className="text-[#B8B5AE]">Phân phối</span>
                        <span>{tier.acc}</span>
                      </div>
                      <div className="flex justify-between items-center hairline-t pt-4">
                        <span className="text-[#B8B5AE]">Cổng QG</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#83776D]"></span>
                      </div>
                    </div>
                    
                    <Link href="/contact" className="mt-10 block">
                      <Button className={`w-full rounded-md tracking-[0.15em] uppercase text-[11px] h-12 ${tier.highlight ? "bg-[#83776D] hover:bg-[#83776D]/90 text-white" : "bg-transparent border border-white/20 text-white hover:bg-white hover:text-[#060B25]"}`}>
                        Lựa chọn
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "elabel" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: "Starter", price: "1.800.000", labels: "10 nhãn", scans: "5.000/th", lang: "Tiếng Việt" },
                  { name: "Growth", price: "4.800.000", labels: "50 nhãn", scans: "50.000/th", lang: "Việt + Anh", highlight: true },
                  { name: "Pro", price: "9.600.000", labels: "200 nhãn", scans: "500.000/th", lang: "Đa ngôn ngữ" },
                  { name: "Enterprise", price: "Liên hệ", labels: "Vô hạn", scans: "Vô hạn", lang: "Vô hạn" },
                ].map((tier, i) => (
                  <div key={i} className={`flex flex-col bg-[#0A1130] p-8 rounded-md border ${tier.highlight ? "border-[#83776D] shadow-[0_0_20px_rgba(131,119,109,0.1)]" : "border-white/10"} relative`}>
                    {tier.highlight && (
                      <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#83776D] text-white text-[10px] uppercase tracking-[0.1em] px-3 py-1 rounded-full">
                        Phổ biến
                      </div>
                    )}
                    <h3 className="text-[13px] text-[#B8B5AE] mb-6">{tier.name}</h3>
                    <div className="text-2xl font-light text-white mb-8">{tier.price} {tier.price !== "Liên hệ" && <span className="text-[10px] text-[#B8B5AE] uppercase tracking-widest ml-1">VNĐ/năm</span>}</div>
                    
                    <div className="space-y-4 text-[13px] text-white hairline-t pt-8 flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-[#B8B5AE]">Số nhãn</span>
                        <span>{tier.labels}</span>
                      </div>
                      <div className="flex justify-between items-center hairline-t pt-4">
                        <span className="text-[#B8B5AE]">Lượt quét</span>
                        <span>{tier.scans}</span>
                      </div>
                      <div className="flex justify-between items-center hairline-t pt-4">
                        <span className="text-[#B8B5AE]">Ngôn ngữ</span>
                        <span>{tier.lang}</span>
                      </div>
                      <div className="flex justify-between items-center hairline-t pt-4">
                        <span className="text-[#B8B5AE]">Cập nhật</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#83776D]"></span>
                      </div>
                    </div>
                    
                    <Link href="/contact" className="mt-10 block">
                      <Button className={`w-full rounded-md tracking-[0.15em] uppercase text-[11px] h-12 ${tier.highlight ? "bg-[#83776D] hover:bg-[#83776D]/90 text-white" : "bg-transparent border border-white/20 text-white hover:bg-white hover:text-[#060B25]"}`}>
                        Lựa chọn
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {(activeTab === "dpp" || activeTab === "fnb" || activeTab === "tem") && (
               <div className="py-24 text-center bg-[#0A1130] rounded-md border border-white/10">
                 <p className="text-[#B8B5AE] text-[13px] mb-8">Bảng giá chuyên sâu đang được biên soạn. Vui lòng liên hệ tư vấn viên.</p>
                 <Link href="/contact">
                    <Button className="h-12 px-8 rounded-md bg-[#83776D] hover:bg-[#83776D]/90 text-white tracking-[0.15em] uppercase text-[11px]">
                      Liên hệ trực tiếp
                    </Button>
                 </Link>
               </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}