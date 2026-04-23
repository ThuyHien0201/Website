import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CtaButton } from "@/components/ui/cta-button";
import { FileCheck, Globe, Clock, PackageCheck } from "lucide-react";

export default function TemPhu() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-b from-white to-[#FAFBFC]">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-7 space-y-8 relative z-10">
              <div className="inline-block bg-[#D9EEF5] text-[#0B4F6C] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                TEM PHỤ NHẬP KHẨU
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-[#0B4F6C] leading-tight">
                Giải pháp nhãn phụ thanh lịch
              </h1>
              <p className="text-[#4A5868] text-lg max-w-xl leading-relaxed">
                Tôn vinh thiết kế nguyên bản của các sản phẩm nhập khẩu cao cấp. Đáp ứng Nghị định 43/2017/NĐ-CP bằng tem QR nhỏ gọn thay vì những khối văn bản giấy khổng lồ.
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
                <img src="/images/hero-silk.png" alt="Tem phụ" className="w-full h-full object-cover" />
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
              <h3 className="text-2xl font-bold text-[#0B4F6C] mb-3">Tuân thủ pháp luật nhập khẩu</h3>
              <p className="text-[#0B4F6C]/80 text-base leading-relaxed">
                Đáp ứng đầy đủ yêu cầu của Nghị định 43/2017/NĐ-CP về nhãn hàng hóa bắt buộc đối với hàng hóa nhập khẩu phân phối tại thị trường Việt Nam.
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
            <h2 className="text-3xl lg:text-5xl font-bold text-[#0B4F6C] leading-tight">Nghệ thuật phân phối</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Clock, title: "In nhãn phụ trong 5 phút", desc: "Không cần thiết kế layout phức tạp, hệ thống tự động xuất PDF chứa mã QR sẵn sàng in ấn ngay lập tức." },
              { icon: FileCheck, title: "Đầy đủ thông tin luật định", desc: "Không giới hạn độ dài văn bản. Hiển thị đầy đủ nhà sản xuất, nhà nhập khẩu, HDSD, cảnh báo bằng phông chữ dễ đọc." },
              { icon: Globe, title: "Truy xuất nguồn xuất xứ", desc: "Tích hợp bằng chứng CO/CQ, tờ khai hải quan ngay trên giao diện nhãn phụ số, tăng độ tin cậy tuyệt đối." },
              { icon: PackageCheck, title: "Hỗ trợ thông quan", desc: "Dễ dàng giải trình với cơ quan quản lý thị trường. Nếu có sai sót đánh máy, sửa trực tiếp trên app không cần in lại nhãn." }
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
          <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">Tôn vinh sản phẩm nguyên bản</h2>
          <p className="text-lg text-[#D9EEF5]/80 max-w-2xl mx-auto">
            Số hóa nhãn phụ ngay hôm nay.
          </p>
          <div className="pt-4 flex flex-col items-center gap-4">
            <CtaButton href="/demo" size="large">Dùng thử miễn phí</CtaButton>
          </div>
        </div>
      </section>
    </div>
  );
}