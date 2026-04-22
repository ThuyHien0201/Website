import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function Trace() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 bg-[#1D9E75]/5">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-[#1D9E75]/10 text-[#1D9E75] border-[#1D9E75]/20">
                Thông tư 02/2024/TT-BKHCN
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-foreground">
                Checkee Trace
              </h1>
              <p className="text-xl text-muted-foreground">
                Giải pháp truy xuất nguồn gốc toàn diện, đáp ứng 10 thông tin bắt buộc theo quy định pháp luật mới nhất.
              </p>
              <div className="flex gap-4 pt-4">
                <Link href="/demo?product=trace">
                  <Button size="lg" className="h-12 px-6 bg-[#1D9E75] hover:bg-[#1D9E75]/90 text-white">
                    Demo thử ngay
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border">
                <img src="/images/factory-floor.png" alt="Truy xuất nguồn gốc" className="object-cover w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature / Legal */}
      <section className="py-20 bg-white border-t">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-4">Đáp ứng 10 thông tin bắt buộc</h2>
            <p className="text-muted-foreground text-lg">Theo TT 02/2024/TT-BKHCN, từ 01/06/2024 mọi sản phẩm cần có mã QR truy xuất đầy đủ các thông tin sau:</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Tên sản phẩm, hàng hoá",
              "Hình ảnh sản phẩm",
              "Tên, địa chỉ đơn vị sản xuất",
              "Tên, địa chỉ đơn vị phân phối",
              "Thời gian sản xuất",
              "Thời hạn sử dụng",
              "Tiêu chuẩn chất lượng",
              "Quy trình sản xuất",
              "Nguyên vật liệu đầu vào",
              "Lịch sử vận chuyển"
            ].map((item, i) => (
              <div key={i} className="flex items-start space-x-3 p-4 bg-accent/30 rounded-xl border border-border/50">
                <CheckCircle2 className="h-5 w-5 text-[#1D9E75] shrink-0 mt-0.5" />
                <span className="font-medium text-foreground/80">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upsell to DPP */}
      <section className="py-16 bg-[#3C3489]/5 border-t border-[#3C3489]/10">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto text-center space-y-6">
          <h2 className="text-2xl font-serif font-bold text-[#3C3489]">Xuất khẩu sang EU?</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Dữ liệu từ Checkee Trace là nền tảng hoàn hảo để nâng cấp lên Digital Product Passport (DPP) đáp ứng tiêu chuẩn ESPR của Châu Âu.
          </p>
          <Link href="/dpp">
            <Button variant="outline" className="border-[#3C3489] text-[#3C3489] hover:bg-[#3C3489]/10">
              Tìm hiểu về Checkee DPP
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Pricing (Lite version of the full table for product page) */}
      <section className="py-20 bg-white border-t">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto text-center space-y-12">
          <h2 className="text-3xl font-serif font-bold">Bảng giá Checkee Trace</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto text-left">
            {[
              { name: "< 5 dòng SP", price: "1.200.000đ", pop: false },
              { name: "< 20 dòng SP", price: "3.600.000đ", pop: true },
              { name: "< 50 dòng SP", price: "6.000.000đ", pop: false },
              { name: "> 50 dòng SP", price: "9.000.000đ", pop: false },
            ].map((tier, i) => (
              <div key={i} className={`relative p-6 rounded-2xl border ${tier.pop ? 'border-[#1D9E75] shadow-lg ring-1 ring-[#1D9E75]/20 bg-white z-10' : 'bg-background shadow-sm'}`}>
                {tier.pop && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#1D9E75] text-white text-xs font-bold rounded-full uppercase tracking-wider">
                    Phổ biến
                  </div>
                )}
                <div className="font-medium text-muted-foreground mb-2">{tier.name}</div>
                <div className="text-2xl font-bold mb-6">{tier.price}<span className="text-sm font-normal text-muted-foreground">/năm</span></div>
                <ul className="space-y-3 text-sm mb-8">
                  <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-[#1D9E75] mr-2" /> Tài khoản không giới hạn</li>
                  <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-[#1D9E75] mr-2" /> Kết nối Cổng QG</li>
                </ul>
                <Link href="/contact">
                  <Button className={`w-full ${tier.pop ? 'bg-[#1D9E75] hover:bg-[#1D9E75]/90 text-white' : 'variant-outline'}`} variant={tier.pop ? "default" : "outline"}>
                    Chọn gói này
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
