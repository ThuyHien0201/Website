import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Utensils, ClipboardCheck, Clock, AlertTriangle } from "lucide-react";

export default function FNB() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 bg-[#854F0B]/5">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-[#854F0B]/10 text-[#854F0B] border-[#854F0B]/20">
                Quyết định 1246/QĐ-BYT
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-foreground">
                Checkee F&B
              </h1>
              <p className="text-xl text-muted-foreground">
                Hệ thống lưu mẫu thức ăn số hoá dành cho bếp ăn công nghiệp và nhà hàng. Minh bạch, chính xác, xoá bỏ giấy tờ thủ công.
              </p>
              <div className="flex gap-4 pt-4">
                <Link href="/demo?product=fnb">
                  <Button size="lg" className="h-12 px-6 bg-[#854F0B] hover:bg-[#854F0B]/90 text-white">
                    Demo thử ngay
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border">
                <img src="/images/chef-logging.png" alt="Đầu bếp lưu mẫu thức ăn" className="object-cover w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 QR System */}
      <section className="py-20 bg-white border-t">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-4">Một Template — Hai Loại QR</h2>
            <p className="text-muted-foreground text-lg">Tạo mẫu món ăn 1 lần, hệ thống tự động sinh 2 loại mã QR chuyên biệt cho 2 mục đích khác nhau.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-accent/30 rounded-2xl p-8 border">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-[#854F0B] text-white rounded-full flex items-center justify-center">
                  <ClipboardCheck className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold">QR Hộp Lưu Mẫu</h3>
              </div>
              <p className="text-muted-foreground mb-6">Dành cho cơ quan kiểm tra y tế. Đáp ứng nghiêm ngặt QĐ 1246/QĐ-BYT.</p>
              <ul className="space-y-3">
                <li className="flex items-start text-sm"><CheckCircle2 className="h-5 w-5 text-[#854F0B] shrink-0 mr-2" /> Đầy đủ thông tin nguyên liệu, nhà cung cấp</li>
                <li className="flex items-start text-sm"><CheckCircle2 className="h-5 w-5 text-[#854F0B] shrink-0 mr-2" /> Ghi nhận người lấy mẫu, nhiệt độ bảo quản</li>
                <li className="flex items-start text-sm"><CheckCircle2 className="h-5 w-5 text-[#854F0B] shrink-0 mr-2" /> Đếm ngược thời gian lưu mẫu (≥ 24 giờ)</li>
              </ul>
            </div>
            
            <div className="bg-accent/30 rounded-2xl p-8 border">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-[#854F0B] text-white rounded-full flex items-center justify-center">
                  <Utensils className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold">QR Menu / Khay Ăn</h3>
              </div>
              <p className="text-muted-foreground mb-6">Dành cho khách hàng, phụ huynh học sinh. Xây dựng niềm tin và sự minh bạch.</p>
              <ul className="space-y-3">
                <li className="flex items-start text-sm"><CheckCircle2 className="h-5 w-5 text-[#854F0B] shrink-0 mr-2" /> Tên món ăn, giờ chế biến, ca bếp thực hiện</li>
                <li className="flex items-start text-sm"><CheckCircle2 className="h-5 w-5 text-[#854F0B] shrink-0 mr-2" /> Chứng nhận ATTP của cơ sở</li>
                <li className="flex items-start text-sm"><CheckCircle2 className="h-5 w-5 text-[#854F0B] shrink-0 mr-2" /> Giao diện đẹp, thân thiện với người dùng</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Showcase */}
      <section className="py-16 bg-[#854F0B] text-white">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6">Bảo vệ danh tiếng cơ sở của bạn</h2>
              <div className="space-y-6">
                <div className="flex">
                  <AlertTriangle className="h-6 w-6 mr-4 shrink-0 mt-1 opacity-80" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">Cảnh báo tự động</h4>
                    <p className="text-white/70">Hệ thống tự động phát cảnh báo khi thời gian lưu mẫu chưa đủ 24h hoặc khối lượng dưới ngưỡng quy định.</p>
                  </div>
                </div>
                <div className="flex">
                  <Clock className="h-6 w-6 mr-4 shrink-0 mt-1 opacity-80" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">Lưu trữ dài hạn</h4>
                    <p className="text-white/70">Hồ sơ được lưu trữ an toàn trên đám mây từ 6 tháng đến 5 năm, sẵn sàng xuất báo cáo bất cứ lúc nào cơ quan chức năng yêu cầu.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/20">
              <h3 className="font-bold text-xl mb-4">Ứng dụng thực tế</h3>
              <div className="space-y-4">
                <div className="bg-white text-foreground p-4 rounded-xl">
                  <div className="font-bold">Bếp ăn Trường học</div>
                  <div className="text-sm text-muted-foreground mt-1">Phụ huynh quét QR trên khay để biết con ăn gì, do ai nấu, nguyên liệu từ đâu.</div>
                </div>
                <div className="bg-white text-foreground p-4 rounded-xl">
                  <div className="font-bold">Nhà hàng & Khách sạn</div>
                  <div className="text-sm text-muted-foreground mt-1">Chuẩn hoá quy trình lưu mẫu hàng ngày, loại bỏ hoàn toàn rủi ro mất mát sổ sách.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing (Lite version) */}
      <section className="py-20 bg-white border-t">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto text-center space-y-12">
          <h2 className="text-3xl font-serif font-bold">Bảng giá Checkee F&B</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto text-left">
            {[
              { name: "Bếp nhỏ", price: "1.200.000đ", limit: "20 template món", pop: false },
              { name: "Nhà hàng", price: "3.600.000đ", limit: "100 template món", pop: true },
              { name: "Chuỗi", price: "7.200.000đ", limit: "500 template món", pop: false },
              { name: "Bếp công nghiệp", price: "Liên hệ", limit: "Không giới hạn", pop: false },
            ].map((tier, i) => (
              <div key={i} className={`relative p-6 rounded-2xl border ${tier.pop ? 'border-[#854F0B] shadow-lg ring-1 ring-[#854F0B]/20 bg-white z-10' : 'bg-background shadow-sm'}`}>
                {tier.pop && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#854F0B] text-white text-xs font-bold rounded-full uppercase tracking-wider">
                    Phổ biến
                  </div>
                )}
                <div className="font-bold text-lg mb-1 text-foreground/90">{tier.name}</div>
                <div className="text-sm text-muted-foreground mb-4">{tier.limit}</div>
                <div className="text-2xl font-bold mb-6">{tier.price}{tier.price !== "Liên hệ" && <span className="text-sm font-normal text-muted-foreground">/năm</span>}</div>
                <Link href="/contact">
                  <Button className={`w-full ${tier.pop ? 'bg-[#854F0B] hover:bg-[#854F0B]/90 text-white' : 'variant-outline'}`} variant={tier.pop ? "default" : "outline"}>
                    Chọn gói này
                  </Button>
                </Link>
              </div>
            ))}
          </div>
          <div className="pt-8">
            <Link href="/pricing" className="text-[#854F0B] font-medium hover:underline inline-flex items-center">
              Xem chi tiết bảng giá đầy đủ <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
