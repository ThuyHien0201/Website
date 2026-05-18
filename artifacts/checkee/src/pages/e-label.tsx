import { TrialButton } from "@/components/ui/trial-button";
import { ProductHero } from "@/components/layout/product-hero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileCheck, RefreshCw, Languages, Smartphone, ShieldCheck, QrCode, Globe, BarChart3 } from "lucide-react";

export default function ELabel() {
  return (
    <div className="flex flex-col w-full bg-white">
      <ProductHero
        eyebrow="E-label"
        title="Không gian số hóa cho bao bì thông minh"
        description="Giải phóng bao bì khỏi những khối văn bản dày đặc. Thành phần, cảnh báo, đa ngôn ngữ — tất cả lên không gian số theo NĐ 43/2017/NĐ-CP và EU Reg 2021/2117."
        image="/images/hero-factory.png"
        imageAlt="Nhãn điện tử E-label"
        badge={{ icon: Smartphone, label: "Trải nghiệm tương tác đa ngôn ngữ" }}
        stats={[
          { value: "8", label: "Ngôn ngữ tự động" },
          { value: "0đ", label: "Chi phí in lại nhãn" },
          { value: "EU 2021", label: "Sẵn sàng xuất khẩu" },
        ]}
      />

      {/* Compliance Callout */}
      <section className="py-12 bg-white">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="bg-[#dcf0e6] rounded-3xl p-8 lg:p-12 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shrink-0">
              <FileCheck className="w-8 h-8 text-[#0c964b]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#0c964b] mb-3">Tuân thủ đầy đủ quy định pháp lý</h3>
              <p className="text-[#0c964b]/80 text-base leading-relaxed">
                Đáp ứng Nghị định 43/2017/NĐ-CP, Nghị định 111/2021/NĐ-CP về nhãn hàng hóa và quy định EU Reg 2021/2117 về nhãn điện tử cho rượu vang và đồ uống có cồn.
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
            <h2 className="text-3xl lg:text-5xl font-bold text-[#0c964b] leading-tight">Tối ưu hóa quy trình in ấn</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: RefreshCw, title: "Cập nhật tức thì", desc: "Thay đổi thông tin thành phần, HDSD, cảnh báo mà không cần hủy bỏ bao bì cũ, tiết kiệm chi phí in ấn khổng lồ." },
              { icon: Languages, title: "Đa ngôn ngữ tự động", desc: "Tự động hiển thị ngôn ngữ phù hợp với thiết bị của người dùng, sẵn sàng cho xuất khẩu." },
              { icon: Smartphone, title: "Trải nghiệm tương tác", desc: "Nhãn dinh dưỡng động, video hướng dẫn, gợi ý kết hợp sản phẩm tạo ra trải nghiệm mua sắm mới." },
              { icon: ShieldCheck, title: "Thẩm mỹ thiết kế", desc: "Giữ bao bì vật lý sạch sẽ, tối giản. Dịch chuyển các thông tin bắt buộc cồng kềnh lên không gian số." }
            ].map((item, i) => (
              <div key={i} className="bg-white border border-[#E5EAF0] rounded-2xl p-7 hover:shadow-xl transition-shadow">
                <div className="bg-[#D4EDE6] text-[#1A6B52] w-12 h-12 flex items-center justify-center rounded-xl mb-5">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[#0c964b] text-lg mb-3">{item.title}</h3>
                <p className="text-[#4A5868] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tính năng */}
      <section className="py-24 bg-white">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#ed8302] uppercase tracking-widest text-xs font-semibold block mb-4">TÍNH NĂNG</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#0c964b] leading-tight">Vượt xa một chiếc nhãn</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: QrCode, title: "Dynamic QR", desc: "Mã QR động có thể chỉnh sửa đích đến bất kỳ lúc nào." },
              { icon: Globe, title: "Địa phương hóa", desc: "Hiển thị nội dung theo khu vực địa lý quét mã." },
              { icon: FileCheck, title: "Bảng dinh dưỡng số", desc: "Hiển thị bảng giá trị dinh dưỡng, calo chuẩn FDA/EU." },
              { icon: Languages, title: "Quản lý ngôn ngữ", desc: "Biên dịch và quản lý song song nhiều phiên bản ngôn ngữ." },
              { icon: BarChart3, title: "Customer Insights", desc: "Đo lường thời gian xem nhãn, nội dung được quan tâm nhất." },
              { icon: ShieldCheck, title: "Cảnh báo dị ứng", desc: "Làm nổi bật các thành phần gây dị ứng an toàn cho người dùng." }
            ].map((feat, i) => (
              <div key={i} className="space-y-4">
                <feat.icon className="w-8 h-8 text-[#0c964b]" />
                <h4 className="text-[#0F1B2D] font-bold text-xl">{feat.title}</h4>
                <p className="text-[#4A5868] text-base leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-24 bg-[#0c964b] text-white text-center">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">Nâng cấp bao bì ngay hôm nay</h2>
          <p className="text-lg text-[#dcf0e6]/80 max-w-2xl mx-auto">
            Số hóa thông tin sản phẩm bằng Checkee E-label.
          </p>
          <div className="pt-4 flex flex-col items-center gap-4">
            <TrialButton size="large" />
          </div>
        </div>
      </section>
    </div>
  );
}