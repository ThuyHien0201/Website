import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CtaButton } from "@/components/ui/cta-button";
import { ArrowRight, FileCheck, ClipboardList, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";

export default function FNB() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-b from-white to-[#FAFBFC]">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-7 space-y-8 relative z-10">
              <div className="inline-block bg-[#D9EEF5] text-[#0B4F6C] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                LƯU MẪU THỰC PHẨM
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-[#0B4F6C] leading-tight">
                Số hóa nhật ký lưu mẫu nhà hàng
              </h1>
              <p className="text-[#4A5868] text-lg max-w-xl leading-relaxed">
                Biến quy trình lưu mẫu thức ăn thủ công thành giao thức điện tử chuẩn xác. Tuân thủ NĐ 15/2018/NĐ-CP và QĐ 1246/QĐ-BYT về an toàn thực phẩm.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <CtaButton href="/demo">Dùng thử miễn phí</CtaButton>
                <Link href="/pricing">
                  <Button variant="outline" className="rounded-full border-2 border-[#0B4F6C] text-[#0B4F6C] hover:bg-[#0B4F6C] hover:text-white px-6 py-3 h-auto font-semibold">
                    Xem bảng giá
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl shadow-xl overflow-hidden aspect-[4/5] lg:aspect-auto lg:h-[600px]">
                <img src="/images/hero-rice.png" alt="F&B" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Callout */}
      <section className="py-12 bg-white">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="bg-[#D9EEF5] rounded-3xl p-8 lg:p-12 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shrink-0">
              <FileCheck className="w-8 h-8 text-[#0B4F6C]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#0B4F6C] mb-3">Đáp ứng quy định An toàn thực phẩm</h3>
              <p className="text-[#0B4F6C]/80 text-base leading-relaxed">
                Tuân thủ Nghị định 15/2018/NĐ-CP và Quyết định 1246/QĐ-BYT về quy định lưu mẫu thực phẩm đối với cơ sở kinh doanh dịch vụ ăn uống, bếp ăn tập thể.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lợi ích */}
      <section className="py-24 bg-[#FAFBFC]">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#C45B17] uppercase tracking-widest text-xs font-semibold block mb-4">LỢI ÍCH</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#0B4F6C] leading-tight">Quản trị rủi ro ẩm thực</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ClipboardList, title: "Ghi nhật ký số hóa", desc: "Thay thế sổ sách giấy tờ dễ thất lạc. Ghi nhận thời gian, nhân viên thực hiện, nhiệt độ lưu mẫu bằng mã QR." },
              { icon: ShieldCheck, title: "Truy xuất nhanh sự cố", desc: "Khi có sự cố ngộ độc, chỉ mất 3 giây quét mã để truy xuất hồ sơ lưu mẫu của toàn bộ nguyên liệu liên quan." },
              { icon: FileCheck, title: "Tuân thủ thanh tra y tế", desc: "Dữ liệu được lưu trữ an toàn, xuất báo cáo chuẩn xác bất cứ lúc nào khi có đoàn kiểm tra y tế." },
              { icon: Clock, title: "Tiết kiệm thời gian quản lý", desc: "Giám sát từ xa việc lưu mẫu của chuỗi nhà hàng. Cảnh báo tự động khi mẫu sắp hết hạn lưu trữ (24h)." }
            ].map((item, i) => (
              <div key={i} className="bg-white border border-[#E5EAF0] rounded-2xl p-7 hover:shadow-xl transition-shadow">
                <div className="bg-[#D4EDE6] text-[#1A6B52] w-12 h-12 flex items-center justify-center rounded-xl mb-5">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[#0B4F6C] text-lg mb-3">{item.title}</h3>
                <p className="text-[#4A5868] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-24 bg-[#0B4F6C] text-white text-center">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">Chuẩn hóa bếp ăn của bạn</h2>
          <p className="text-lg text-[#D9EEF5]/80 max-w-2xl mx-auto">
            Số hóa hoàn toàn quy trình lưu mẫu thực phẩm ngay hôm nay.
          </p>
          <div className="pt-4 flex flex-col items-center gap-4">
            <CtaButton href="/demo" size="large">Dùng thử miễn phí</CtaButton>
          </div>
        </div>
      </section>
    </div>
  );
}