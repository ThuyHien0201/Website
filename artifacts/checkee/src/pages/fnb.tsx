import { TrialButton } from "@/components/ui/trial-button";
import { ProductHero } from "@/components/layout/product-hero";
import { FileCheck, ClipboardList, ShieldCheck, Clock } from "lucide-react";

export default function FNB() {
  return (
    <div className="flex flex-col w-full bg-white">
      <ProductHero
        eyebrow="F&B"
        title="Số hóa nhật ký lưu mẫu nhà hàng"
        description="Biến quy trình lưu mẫu thức ăn thủ công thành giao thức điện tử chuẩn xác. Tuân thủ NĐ 15/2018/NĐ-CP và QĐ 1246/QĐ-BYT về an toàn thực phẩm."
        image="/images/hero-rice.png"
        imageAlt="Lưu mẫu thực phẩm"
        badge={{ icon: ShieldCheck, label: "Truy xuất sự cố trong 3 giây" }}
        stats={[
          { value: "3 giây", label: "Truy xuất hồ sơ mẫu" },
          { value: "24/7", label: "Giám sát chuỗi nhà hàng" },
          { value: "QĐ 1246", label: "Tuân thủ Bộ Y tế" },
        ]}
      />

      {/* Compliance Callout */}
      <section className="py-12 bg-white">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="bg-[#EFF5FF] rounded-3xl p-8 lg:p-12 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shrink-0">
              <FileCheck className="w-8 h-8 text-[#1557B0]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#1557B0] mb-3">Đáp ứng quy định An toàn thực phẩm</h3>
              <p className="text-[#1557B0]/80 text-base leading-relaxed">
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
            <span className="text-[#ed8302] uppercase tracking-widest text-xs font-semibold block mb-4">LỢI ÍCH</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#1557B0] leading-tight">Quản trị rủi ro ẩm thực</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ClipboardList, title: "Ghi nhật ký số hóa", desc: "Thay thế sổ sách giấy tờ dễ thất lạc. Ghi nhận thời gian, nhân viên thực hiện, nhiệt độ lưu mẫu bằng mã QR." },
              { icon: ShieldCheck, title: "Truy xuất nhanh sự cố", desc: "Khi có sự cố ngộ độc, chỉ mất 3 giây quét mã để truy xuất hồ sơ lưu mẫu của toàn bộ nguyên liệu liên quan." },
              { icon: FileCheck, title: "Tuân thủ thanh tra y tế", desc: "Dữ liệu được lưu trữ an toàn, xuất báo cáo chuẩn xác bất cứ lúc nào khi có đoàn kiểm tra y tế." },
              { icon: Clock, title: "Tiết kiệm thời gian quản lý", desc: "Giám sát từ xa việc lưu mẫu của chuỗi nhà hàng. Cảnh báo tự động khi mẫu sắp hết hạn lưu trữ (24h)." }
            ].map((item, i) => (
              <div key={i} className="bg-white border border-[#E5EAF0] rounded-2xl p-7 hover:shadow-xl transition-shadow">
                <div className="bg-[#EFF5FF] text-[#1557B0] w-12 h-12 flex items-center justify-center rounded-xl mb-5">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[#1557B0] text-lg mb-3">{item.title}</h3>
                <p className="text-[#4A5868] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-24 bg-[#1557B0] text-white text-center">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">Chuẩn hóa bếp ăn của bạn</h2>
          <p className="text-lg text-[#EFF5FF]/80 max-w-2xl mx-auto">
            Số hóa hoàn toàn quy trình lưu mẫu thực phẩm ngay hôm nay.
          </p>
          <div className="pt-4 flex flex-col items-center gap-4">
            <TrialButton size="large" />
          </div>
        </div>
      </section>
    </div>
  );
}