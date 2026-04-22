import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function ELabel() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 bg-[#0C447C]/5">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-[#0C447C]/10 text-[#0C447C] border-[#0C447C]/20">
                NĐ 37/2026 Điều 42 Khoản 1
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-foreground">
                Checkee E-label
              </h1>
              <p className="text-xl text-muted-foreground">
                Nhãn điện tử thông minh. Thay thế nhãn giấy cồng kềnh, dễ dàng cập nhật thông tin không cần in lại, hỗ trợ đa ngôn ngữ.
              </p>
              <div className="flex gap-4 pt-4">
                <Link href="/demo?product=e-label">
                  <Button size="lg" className="h-12 px-6 bg-[#0C447C] hover:bg-[#0C447C]/90 text-white">
                    Demo thử ngay
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border">
                <img src="/images/scan-supermarket.png" alt="Quét nhãn điện tử" className="object-cover w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature */}
      <section className="py-20 bg-white border-t">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-4">Lợi ích vượt trội của Nhãn điện tử</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Cập nhật linh hoạt",
                desc: "Sửa đổi thông tin thành phần, HDSD bất cứ lúc nào mà không cần in lại bao bì, tiết kiệm chi phí in ấn khổng lồ."
              },
              {
                title: "Không giới hạn không gian",
                desc: "Thiết kế bao bì tối giản, sạch sẽ. Chuyển toàn bộ nội dung dày đặc (thành phần, cảnh báo, đa ngôn ngữ) lên môi trường số."
              },
              {
                title: "Phân tích khách hàng",
                desc: "Thống kê lượt quét, vị trí, thời gian quét để hiểu rõ hơn hành vi người tiêu dùng."
              }
            ].map((feat, i) => (
              <div key={i} className="p-8 bg-background rounded-2xl border text-center space-y-4">
                <div className="w-12 h-12 bg-[#0C447C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="h-6 w-6 text-[#0C447C]" />
                </div>
                <h3 className="text-xl font-bold">{feat.title}</h3>
                <p className="text-muted-foreground">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing (Lite version) */}
      <section className="py-20 bg-accent/30 border-t">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto text-center space-y-12">
          <h2 className="text-3xl font-serif font-bold">Bảng giá Checkee E-label</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto text-left">
            {[
              { name: "Starter", price: "1.800.000đ", limit: "10 nhãn", pop: false },
              { name: "Growth", price: "4.800.000đ", limit: "50 nhãn", pop: true },
              { name: "Pro", price: "9.600.000đ", limit: "200 nhãn", pop: false },
              { name: "Enterprise", price: "Liên hệ", limit: "Không giới hạn", pop: false },
            ].map((tier, i) => (
              <div key={i} className={`relative p-6 rounded-2xl border ${tier.pop ? 'border-[#0C447C] shadow-lg ring-1 ring-[#0C447C]/20 bg-white z-10' : 'bg-background shadow-sm'}`}>
                {tier.pop && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#0C447C] text-white text-xs font-bold rounded-full uppercase tracking-wider">
                    Phổ biến
                  </div>
                )}
                <div className="font-bold text-lg mb-1">{tier.name}</div>
                <div className="text-sm text-muted-foreground mb-4">{tier.limit}</div>
                <div className="text-2xl font-bold mb-6">{tier.price}{tier.price !== "Liên hệ" && <span className="text-sm font-normal text-muted-foreground">/năm</span>}</div>
                <Link href="/contact">
                  <Button className={`w-full ${tier.pop ? 'bg-[#0C447C] hover:bg-[#0C447C]/90 text-white' : 'variant-outline'}`} variant={tier.pop ? "default" : "outline"}>
                    Chọn gói này
                  </Button>
                </Link>
              </div>
            ))}
          </div>
          <div className="pt-8">
            <Link href="/pricing" className="text-[#0C447C] font-medium hover:underline inline-flex items-center">
              Xem bảng so sánh chi tiết các tính năng <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
