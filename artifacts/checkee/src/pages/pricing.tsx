import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CtaButton } from "@/components/ui/cta-button";
import { TrialButton } from "@/components/ui/trial-button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2 } from "lucide-react";

export default function Pricing() {
  const [activeTab, setActiveTab] = useState("trace");

  const tabs = [
    { id: "trace", label: "Trace" },
    { id: "elabel", label: "E-label" },
    { id: "dpp", label: "DPP" },
    { id: "fnb", label: "F&B" }
  ];

  return (
    <div className="flex flex-col w-full bg-white font-sans min-h-[100dvh]">
      <section className="pt-24 pb-20 lg:pt-36 lg:pb-24 bg-[#FAFBFC] border-b border-[#E5EAF0]">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">

            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#FFF3E8] border border-[#F5D2B8] text-[11px] uppercase tracking-[0.15em] text-[#C45B17] font-semibold">
              Đầu tư cho thương hiệu
            </div>
            <h1 className="mt-5 text-4xl lg:text-5xl font-bold text-[#0B4F6C] leading-[1.15] tracking-tight">
              Bảng giá minh bạch
            </h1>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-16">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                  activeTab === tab.id 
                    ? "bg-[#0B4F6C] text-white shadow-md" 
                    : "bg-[#FAFBFC] text-[#4A5868] hover:bg-[#E5EAF0] border border-[#E5EAF0]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="animate-in fade-in duration-500">
            {activeTab === "trace" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { name: "Khởi đầu", subtitle: "< 5 dòng SP", price: "1.200.000", codes: "10.000", acc: "Dưới 5 TK", highlight: false },
                  { name: "Tăng trưởng", subtitle: "< 20 dòng SP", price: "3.600.000", codes: "20.000", acc: "Dưới 5 TK", highlight: true },
                  { name: "Chuyên nghiệp", subtitle: "< 50 dòng SP", price: "6.000.000", codes: "50.000", acc: "Dưới 5 TK", highlight: false },
                  { name: "Doanh nghiệp", subtitle: "> 50 dòng SP", price: "9.000.000", codes: "100.000", acc: "Dưới 5 TK", highlight: false },
                ].map((tier, i) => (
                  <div key={i} className={`flex flex-col bg-white p-8 rounded-2xl border ${tier.highlight ? "border-[#C45B17] border-2 shadow-xl" : "border-[#E5EAF0] shadow-sm"} relative transition-shadow hover:shadow-xl`}>
                    {tier.highlight && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C45B17] text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full">
                        PHỔ BIẾN
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-[#0B4F6C] mb-1">{tier.name}</h3>
                    <p className="text-sm text-[#7D9E94] mb-6">{tier.subtitle}</p>
                    
                    <div className="mb-8">
                      <span className="text-4xl font-bold text-[#0B4F6C]">{tier.price}</span>
                      <span className="text-sm text-[#7D9E94] ml-1">/tháng</span>
                    </div>
                    
                    <div className="space-y-4 text-sm text-[#4A5868] flex-1 mb-8">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#1A6B52] shrink-0" />
                        <span><strong>{tier.codes}</strong> mã QR</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#1A6B52] shrink-0" />
                        <span>Tài khoản NVL vô hạn</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#1A6B52] shrink-0" />
                        <span>Phân phối {tier.acc}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#1A6B52] shrink-0" />
                        <span>Kết nối Cổng QG</span>
                      </div>
                    </div>
                    
                    <Link href="/contact" className="mt-auto block">
                      <Button className={`w-full rounded-full font-semibold h-12 ${tier.highlight ? "bg-[#C45B17] hover:bg-[#D6711A] text-white" : "bg-[#FAFBFC] border border-[#E5EAF0] text-[#0B4F6C] hover:bg-[#E5EAF0]"}`}>
                        Chọn gói này
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "elabel" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { name: "Starter", price: "1.800.000", labels: "10 nhãn", scans: "5.000/th", lang: "Tiếng Việt" },
                  { name: "Growth", price: "4.800.000", labels: "50 nhãn", scans: "50.000/th", lang: "Việt + Anh", highlight: true },
                  { name: "Pro", price: "9.600.000", labels: "200 nhãn", scans: "500.000/th", lang: "Đa ngôn ngữ" },
                  { name: "Enterprise", price: "Liên hệ", labels: "Vô hạn", scans: "Vô hạn", lang: "Vô hạn" },
                ].map((tier, i) => (
                  <div key={i} className={`flex flex-col bg-white p-8 rounded-2xl border ${tier.highlight ? "border-[#C45B17] border-2 shadow-xl" : "border-[#E5EAF0] shadow-sm"} relative transition-shadow hover:shadow-xl`}>
                    {tier.highlight && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C45B17] text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full">
                        PHỔ BIẾN
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-[#0B4F6C] mb-6">{tier.name}</h3>
                    
                    <div className="mb-8">
                      <span className="text-4xl font-bold text-[#0B4F6C]">{tier.price}</span>
                      {tier.price !== "Liên hệ" && <span className="text-sm text-[#7D9E94] ml-1">/tháng</span>}
                    </div>
                    
                    <div className="space-y-4 text-sm text-[#4A5868] flex-1 mb-8">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#1A6B52] shrink-0" />
                        <span><strong>{tier.labels}</strong></span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#1A6B52] shrink-0" />
                        <span>Lượt quét <strong>{tier.scans}</strong></span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#1A6B52] shrink-0" />
                        <span>Ngôn ngữ <strong>{tier.lang}</strong></span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#1A6B52] shrink-0" />
                        <span>Cập nhật tức thời</span>
                      </div>
                    </div>
                    
                    <Link href="/contact" className="mt-auto block">
                      <Button className={`w-full rounded-full font-semibold h-12 ${tier.highlight ? "bg-[#C45B17] hover:bg-[#D6711A] text-white" : "bg-[#FAFBFC] border border-[#E5EAF0] text-[#0B4F6C] hover:bg-[#E5EAF0]"}`}>
                        Chọn gói này
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {(activeTab === "dpp" || activeTab === "fnb" || activeTab === "tem") && (
               <div className="py-24 text-center bg-[#FAFBFC] rounded-2xl border border-[#E5EAF0]">
                 <p className="text-[#4A5868] text-lg mb-8">Bảng giá chuyên sâu đang được biên soạn. Vui lòng liên hệ tư vấn viên.</p>
                 <Link href="/contact">
                    <Button className="h-12 px-8 rounded-full bg-[#0B4F6C] hover:bg-[#0B4F6C]/90 text-white font-semibold">
                      Liên hệ trực tiếp
                    </Button>
                 </Link>
               </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#FAFBFC]">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#C45B17] uppercase tracking-widest text-xs font-semibold block mb-4">CÂU HỎI THƯỜNG GẶP</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#0B4F6C] leading-tight">Giải đáp thắc mắc</h2>
          </div>
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-[#E5EAF0]">
            <Accordion type="single" collapsible className="w-full">
              {[
                { q: "Có phí khởi tạo ban đầu không?", a: "Tùy thuộc vào gói dịch vụ và mức độ tích hợp tùy chỉnh với hệ thống nội bộ của bạn (ERP/SAP). Các gói tiêu chuẩn không có phí khởi tạo." },
                { q: "Tôi có thể nâng cấp gói giữa chừng không?", a: "Có, bạn hoàn toàn có thể nâng cấp gói bất kỳ lúc nào. Chi phí sẽ được tính toán tỷ lệ theo thời gian sử dụng thực tế." },
                { q: "Dữ liệu của tôi được bảo mật như thế nào?", a: "Chúng tôi tuân thủ các tiêu chuẩn bảo mật dữ liệu nghiêm ngặt nhất. Dữ liệu được mã hóa mã hash bất biến và có tùy chọn lưu trữ lên blockchain." },
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-lg font-semibold text-[#0B4F6C]">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-[#4A5868] text-base leading-relaxed">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#0B4F6C] text-white text-center">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">Bắt đầu trải nghiệm ngay</h2>
          <p className="text-lg text-[#D9EEF5]/80 max-w-2xl mx-auto">
            Khám phá sức mạnh của việc số hóa sản phẩm.
          </p>
          <div className="pt-4 flex flex-col items-center gap-4">
            <TrialButton size="large">Dùng thử miễn phí 14 ngày</TrialButton>
          </div>
        </div>
      </section>
    </div>
  );
}