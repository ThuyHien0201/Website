import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, XCircle } from "lucide-react";

export default function TemPhu() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 bg-[#712B13]/5">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-[#712B13]/10 text-[#712B13] border-[#712B13]/20">
                NĐ 37/2026 Khoản 2
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-foreground">
                Checkee Tem Phụ
              </h1>
              <p className="text-xl text-muted-foreground">
                Tem phụ điện tử thông minh cho hàng hóa nhập khẩu. Giữ trọn vẻ đẹp bao bì gốc, tuân thủ tuyệt đối quy định nhãn tiếng Việt.
              </p>
              <div className="flex gap-4 pt-4">
                <Link href="/demo?product=tem-phu">
                  <Button size="lg" className="h-12 px-6 bg-[#712B13] hover:bg-[#712B13]/90 text-white">
                    Demo thử ngay
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[3/4] md:aspect-square lg:aspect-[3/4] max-w-md mx-auto rounded-2xl overflow-hidden shadow-xl border">
                <img src="/images/luxury-cosmetic.png" alt="Mỹ phẩm nhập khẩu với mã QR" className="object-cover w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 bg-white border-t">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-4">So sánh Tem giấy vs QR Tem phụ</h2>
            <p className="text-muted-foreground text-lg">Khắc phục hoàn toàn những nhược điểm của việc dán tem phụ giấy truyền thống.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-accent/30 rounded-2xl p-8 border">
              <h3 className="text-xl font-bold mb-6 text-foreground/70 flex items-center">
                <XCircle className="h-5 w-5 mr-2 text-muted-foreground" /> Tem phụ giấy
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start text-muted-foreground"><XCircle className="h-5 w-5 shrink-0 mr-3 mt-0.5" /> Dán đè làm xấu bao bì gốc của sản phẩm</li>
                <li className="flex items-start text-muted-foreground"><XCircle className="h-5 w-5 shrink-0 mr-3 mt-0.5" /> Không gian nhỏ, chữ quá bé khó đọc</li>
                <li className="flex items-start text-muted-foreground"><XCircle className="h-5 w-5 shrink-0 mr-3 mt-0.5" /> In sai một chữ phải huỷ toàn bộ lô tem</li>
                <li className="flex items-start text-muted-foreground"><XCircle className="h-5 w-5 shrink-0 mr-3 mt-0.5" /> Chi phí in ấn lớn, tốn công dán dập</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-8 border ring-1 ring-[#712B13]/20 shadow-lg">
              <h3 className="text-xl font-bold mb-6 text-[#712B13] flex items-center">
                <CheckCircle2 className="h-5 w-5 mr-2" /> QR Tem phụ điện tử
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start text-foreground"><CheckCircle2 className="h-5 w-5 text-[#712B13] shrink-0 mr-3 mt-0.5" /> QR nhỏ gọn 1.5x1.5cm, giữ nguyên thiết kế gốc</li>
                <li className="flex items-start text-foreground"><CheckCircle2 className="h-5 w-5 text-[#712B13] shrink-0 mr-3 mt-0.5" /> Landing page hiển thị chữ to rõ, đầy đủ thông tin</li>
                <li className="flex items-start text-foreground"><CheckCircle2 className="h-5 w-5 text-[#712B13] shrink-0 mr-3 mt-0.5" /> Chỉnh sửa thông tin tức thì không cần in lại</li>
                <li className="flex items-start text-foreground"><CheckCircle2 className="h-5 w-5 text-[#712B13] shrink-0 mr-3 mt-0.5" /> Hệ thống form thông minh tạo mẫu tự động</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing (Lite version) */}
      <section className="py-20 bg-accent/30 border-t">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto text-center space-y-12">
          <h2 className="text-3xl font-serif font-bold">Bảng giá Checkee Tem Phụ</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto text-left">
            {[
              { name: "Mini", price: "900.000đ", limit: "1.000 mã tem", pop: false },
              { name: "Standard", price: "2.400.000đ", limit: "10.000 mã tem", pop: true },
              { name: "Pro", price: "4.800.000đ", limit: "50.000 mã tem", pop: false },
              { name: "Enterprise", price: "Liên hệ", limit: "Không giới hạn", pop: false },
            ].map((tier, i) => (
              <div key={i} className={`relative p-6 rounded-2xl border ${tier.pop ? 'border-[#712B13] shadow-lg ring-1 ring-[#712B13]/20 bg-white z-10' : 'bg-background shadow-sm'}`}>
                {tier.pop && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#712B13] text-white text-xs font-bold rounded-full uppercase tracking-wider">
                    Phổ biến
                  </div>
                )}
                <div className="font-bold text-lg mb-1 text-foreground/90">{tier.name}</div>
                <div className="text-sm text-muted-foreground mb-4">{tier.limit}</div>
                <div className="text-2xl font-bold mb-6">{tier.price}{tier.price !== "Liên hệ" && <span className="text-sm font-normal text-muted-foreground">/năm</span>}</div>
                <Link href="/contact">
                  <Button className={`w-full ${tier.pop ? 'bg-[#712B13] hover:bg-[#712B13]/90 text-white' : 'variant-outline'}`} variant={tier.pop ? "default" : "outline"}>
                    Chọn gói này
                  </Button>
                </Link>
              </div>
            ))}
          </div>
          <div className="pt-8">
            <Link href="/pricing" className="text-[#712B13] font-medium hover:underline inline-flex items-center">
              Xem chi tiết bảng giá đầy đủ <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
