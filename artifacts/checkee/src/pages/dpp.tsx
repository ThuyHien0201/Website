import { TrialButton } from "@/components/ui/trial-button";
import { ProductHero } from "@/components/layout/product-hero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileCheck, Globe, Database, Leaf, Shield, CheckCircle2 } from "lucide-react";

export default function DPP() {
  return (
    <div className="flex flex-col w-full bg-white">
      <ProductHero
        eyebrow="DPP"
        title="Hộ chiếu số xuất khẩu Châu Âu"
        description="Tấm vé thông hành đưa sản phẩm Việt Nam vào EU. Tuân thủ hoàn toàn Quy định ESPR (EU Regulation 2024/1781) — minh bạch và phát triển bền vững cao nhất."
        image="/images/hero-lacquer.png"
        imageAlt="Digital Product Passport"
        badge={{ icon: Globe, label: "Sẵn sàng cho thị trường EU 2027" }}
        stats={[
          { value: "ESPR", label: "EU 2024/1781" },
          { value: "2027", label: "Lộ trình bắt buộc" },
          { value: "27", label: "Quốc gia EU" },
        ]}
      />

      {/* Compliance Callout */}
      <section className="py-12 bg-white">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="bg-[#D9EEF5] rounded-3xl p-8 lg:p-12 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shrink-0">
              <FileCheck className="w-8 h-8 text-[#0B4F6C]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#0B4F6C] mb-3">Đáp ứng quy định ESPR EU 2024/1781</h3>
              <p className="text-[#0B4F6C]/80 text-base leading-relaxed">
                Lộ trình bắt buộc: Pin (2027), Dệt may (2030), và tiếp theo là Điện tử, Hóa chất, Đồ chơi. Chuẩn bị nền tảng dữ liệu ngay hôm nay để không mất quyền tiếp cận thị trường chung Châu Âu.
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
            <h2 className="text-3xl lg:text-5xl font-bold text-[#0B4F6C] leading-tight">Sẵn sàng vươn tầm toàn cầu</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Globe, title: "Bắt buộc xuất EU", desc: "Điều kiện tiên quyết để lưu thông hàng hóa tại EU theo lộ trình ESPR. Tránh nguy cơ bị từ chối thông quan." },
              { icon: Database, title: "Minh bạch chuỗi giá trị", desc: "Chứng minh nguồn gốc, tỷ lệ vật liệu tái chế, dấu chân carbon trên một nền tảng dữ liệu đồng nhất." },
              { icon: Leaf, title: "ESG Reporting", desc: "Cung cấp dữ liệu lõi cho báo cáo phát triển bền vững (ESG), thu hút nhà đầu tư và đối tác xanh." },
              { icon: Shield, title: "Vòng đời sản phẩm", desc: "Cung cấp thông tin sửa chữa, bảo trì, tái chế cho người tiêu dùng, thúc đẩy nền kinh tế tuần hoàn." }
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

      {/* Ngành hàng */}
      <section className="py-24 bg-white">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#C45B17] uppercase tracking-widest text-xs font-semibold block mb-4">LỘ TRÌNH TRIỂN KHAI</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#0B4F6C] leading-tight">Các ngành công nghiệp ưu tiên</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Pin và Ắc quy (2027)",
              "Dệt may và Thời trang (2030)",
              "Đồ điện tử và CNTT",
              "Sắt, thép, nhôm",
              "Hóa chất và Nhựa",
              "Đồ nội thất"
            ].map((nganh, i) => (
              <div key={i} className="flex items-center gap-4 p-6 bg-[#FAFBFC] border border-[#E5EAF0] rounded-xl">
                <CheckCircle2 className="w-6 h-6 text-[#1A6B52]" />
                <span className="font-bold text-[#0F1B2D] text-lg">{nganh}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-24 bg-[#0B4F6C] text-white text-center">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">Khởi tạo Hộ chiếu số</h2>
          <p className="text-lg text-[#D9EEF5]/80 max-w-2xl mx-auto">
            Sẵn sàng cho thị trường xuất khẩu khó tính nhất thế giới.
          </p>
          <div className="pt-4 flex flex-col items-center gap-4">
            <TrialButton size="large" />
          </div>
        </div>
      </section>
    </div>
  );
}