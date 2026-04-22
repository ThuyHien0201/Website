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
    <div className="flex flex-col w-full">
      <section className="pt-32 pb-24 bg-background">
        <div className="container px-6 md:px-12 max-w-7xl mx-auto space-y-16">
          <div className="space-y-6 max-w-3xl">
            <div className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
              Đầu tư cho thương hiệu
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-primary leading-[0.95]">
              Giá trị <br/>đích thực.
            </h1>
            <p className="text-xl text-muted-foreground font-light leading-relaxed">
              Chi phí được thiết kế minh bạch cho mọi quy mô doanh nghiệp. Sự sang trọng không nằm ở giá cao, mà ở giá trị bạn nhận được.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 border-b border-border/40 pb-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-sm font-medium tracking-[0.1em] uppercase pb-2 border-b-2 transition-all duration-500 ${
                  activeTab === tab.id 
                    ? "border-primary text-primary" 
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="pt-8 animate-in fade-in duration-700">
            {activeTab === "trace" && (
              <div className="grid md:grid-cols-4 gap-x-8 gap-y-16">
                {[
                  { name: "< 5 dòng SP", price: "1.200.000", codes: "10.000", acc: "Dưới 5 TK" },
                  { name: "< 20 dòng SP", price: "3.600.000", codes: "20.000", acc: "Dưới 5 TK", highlight: true },
                  { name: "< 50 dòng SP", price: "6.000.000", codes: "50.000", acc: "Dưới 5 TK" },
                  { name: "> 50 dòng SP", price: "9.000.000", codes: "100.000", acc: "Dưới 5 TK" },
                ].map((tier, i) => (
                  <div key={i} className="flex flex-col">
                    <h3 className="text-sm font-serif italic text-muted-foreground mb-4">{tier.name}</h3>
                    <div className="text-3xl font-serif text-primary mb-8">{tier.price} <span className="text-xs font-sans text-muted-foreground uppercase tracking-widest">VNĐ/năm</span></div>
                    
                    <div className="space-y-4 text-sm font-light text-foreground border-t border-border/40 pt-8 flex-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Mã QR</span>
                        <span>{tier.codes}</span>
                      </div>
                      <div className="flex justify-between border-t border-border/20 pt-4">
                        <span className="text-muted-foreground">Tài khoản NVL</span>
                        <span>Vô hạn</span>
                      </div>
                      <div className="flex justify-between border-t border-border/20 pt-4">
                        <span className="text-muted-foreground">Hệ thống phân phối</span>
                        <span>{tier.acc}</span>
                      </div>
                      <div className="flex justify-between border-t border-border/20 pt-4">
                        <span className="text-muted-foreground">Cổng QG</span>
                        <span>Đã kết nối</span>
                      </div>
                    </div>
                    
                    <Link href="/contact" className="mt-12 block">
                      <Button variant={tier.highlight ? "default" : "outline"} className={`w-full h-12 rounded-none tracking-widest uppercase text-xs ${tier.highlight ? "bg-primary text-primary-foreground" : "border-foreground/20 text-foreground"}`}>
                        Lựa chọn
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "elabel" && (
              <div className="grid md:grid-cols-4 gap-x-8 gap-y-16">
                {[
                  { name: "Starter", price: "1.800.000", labels: "10 nhãn", scans: "5.000/tháng", lang: "Tiếng Việt" },
                  { name: "Growth", price: "4.800.000", labels: "50 nhãn", scans: "50.000/tháng", lang: "Việt + Anh", highlight: true },
                  { name: "Pro", price: "9.600.000", labels: "200 nhãn", scans: "500.000/tháng", lang: "Đa ngôn ngữ" },
                  { name: "Enterprise", price: "Liên hệ", labels: "Vô hạn", scans: "Vô hạn", lang: "Vô hạn" },
                ].map((tier, i) => (
                  <div key={i} className="flex flex-col">
                    <h3 className="text-sm font-serif italic text-muted-foreground mb-4">{tier.name}</h3>
                    <div className="text-3xl font-serif text-primary mb-8">{tier.price} {tier.price !== "Liên hệ" && <span className="text-xs font-sans text-muted-foreground uppercase tracking-widest">VNĐ/năm</span>}</div>
                    
                    <div className="space-y-4 text-sm font-light text-foreground border-t border-border/40 pt-8 flex-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Số nhãn</span>
                        <span>{tier.labels}</span>
                      </div>
                      <div className="flex justify-between border-t border-border/20 pt-4">
                        <span className="text-muted-foreground">Lượt quét</span>
                        <span>{tier.scans}</span>
                      </div>
                      <div className="flex justify-between border-t border-border/20 pt-4">
                        <span className="text-muted-foreground">Ngôn ngữ</span>
                        <span>{tier.lang}</span>
                      </div>
                      <div className="flex justify-between border-t border-border/20 pt-4">
                        <span className="text-muted-foreground">Cập nhật</span>
                        <span>Không giới hạn</span>
                      </div>
                    </div>
                    
                    <Link href="/contact" className="mt-12 block">
                      <Button variant={tier.highlight ? "default" : "outline"} className={`w-full h-12 rounded-none tracking-widest uppercase text-xs ${tier.highlight ? "bg-primary text-primary-foreground" : "border-foreground/20 text-foreground"}`}>
                        Lựa chọn
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {/* Other tabs follow the exact same editorial structure */}
            {(activeTab === "dpp" || activeTab === "fnb" || activeTab === "tem") && (
               <div className="py-24 text-center">
                 <p className="text-muted-foreground font-serif italic text-lg">Bảng giá chuyên sâu đang được biên soạn. Vui lòng liên hệ tư vấn viên.</p>
                 <Link href="/contact" className="mt-8 inline-block">
                    <Button className="h-12 px-8 rounded-none bg-primary text-primary-foreground tracking-widest uppercase text-xs">
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
