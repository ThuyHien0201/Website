import { ProductHero } from "@/components/layout/product-hero";
import { CtaButton } from "@/components/ui/cta-button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileCheck, Globe, Clock, PackageCheck, QrCode, Languages, RefreshCw, Sparkles, Printer, Smartphone, Layers, ArrowRight } from "lucide-react";

export default function TemPhu() {
  return (
    <div className="flex flex-col w-full bg-white">
      <ProductHero
        eyebrow="Tem phụ"
        title="Tem phụ thanh lịch cho hàng nhập khẩu cao cấp"
        description="Thay những khối văn bản giấy cồng kềnh bằng tem QR nhỏ gọn. Tôn vinh thiết kế nguyên bản — vẫn đáp ứng đầy đủ Nghị định 43/2017/NĐ-CP về nhãn hàng hóa nhập khẩu."
        image="/images/hero-silk.png"
        imageAlt="Tem phụ Checkee"
        badge={{ icon: PackageCheck, label: "In nhãn phụ chỉ trong 5 phút" }}
        stats={[
          { value: "5 phút", label: "In tem phụ mới" },
          { value: "8", label: "Ngôn ngữ hỗ trợ" },
          { value: "100%", label: "Tuân thủ NĐ 43" },
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

      {/* Tính năng */}
      <section className="py-24 bg-white">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#C45B17] uppercase tracking-widest text-xs font-semibold block mb-4">TÍNH NĂNG</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#0B4F6C] leading-tight">Vượt xa một chiếc tem nhỏ</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: QrCode, title: "QR động", desc: "Cập nhật nội dung nhãn phụ bất cứ lúc nào mà không cần in lại tem dán." },
              { icon: Languages, title: "8 ngôn ngữ", desc: "Tự động hiển thị tiếng Việt, Anh, Pháp, Đức, Nhật, Hàn, Trung, Thái theo thiết bị." },
              { icon: Printer, title: "Xuất PDF in ấn", desc: "Mẫu tem chuẩn kích thước 30×20mm hoặc tùy chỉnh, sẵn sàng in trực tiếp." },
              { icon: RefreshCw, title: "Sửa lỗi không cần in lại", desc: "Phát hiện sai sót thông tin? Chỉnh sửa trên app, mã QR cũ vẫn hiển thị đúng." },
              { icon: Smartphone, title: "Quét bằng camera thường", desc: "Người tiêu dùng không cần cài app — mở camera điện thoại là đọc được." },
              { icon: Layers, title: "Lưu trữ CO/CQ", desc: "Đính kèm chứng từ xuất xứ, tờ khai hải quan, COA dạng PDF có thể tải về." },
            ].map((feat, i) => (
              <div key={i} className="space-y-3">
                <feat.icon className="w-8 h-8 text-[#1A7EA4]" />
                <h4 className="text-[#0F1B2D] font-bold text-lg">{feat.title}</h4>
                <p className="text-[#4A5868] text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* So sánh */}
      <section className="py-24 bg-[#FAFBFC]">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#C45B17] uppercase tracking-widest text-xs font-semibold block mb-4">SO SÁNH</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#0B4F6C] leading-tight">Tem giấy truyền thống vs. Tem QR Checkee</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-white border border-[#E5EAF0] rounded-2xl p-8">
              <div className="text-xs uppercase tracking-widest font-semibold text-[#7D9E94] mb-4">Tem giấy truyền thống</div>
              <ul className="space-y-3 text-[#4A5868] text-sm">
                <li className="flex gap-3"><span className="text-[#C45B17]">✕</span><span>Khối văn bản dày đặc che mất thiết kế bao bì</span></li>
                <li className="flex gap-3"><span className="text-[#C45B17]">✕</span><span>Sai một chữ phải in lại toàn bộ lô tem</span></li>
                <li className="flex gap-3"><span className="text-[#C45B17]">✕</span><span>Chỉ một ngôn ngữ duy nhất</span></li>
                <li className="flex gap-3"><span className="text-[#C45B17]">✕</span><span>Không có dữ liệu lượt xem</span></li>
              </ul>
            </div>
            <div className="bg-[#0B4F6C] text-white rounded-2xl p-8 shadow-xl">
              <div className="text-xs uppercase tracking-widest font-semibold text-[#D9EEF5] mb-4 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" /> Tem QR Checkee
              </div>
              <ul className="space-y-3 text-[#D9EEF5]/90 text-sm">
                <li className="flex gap-3"><span className="text-[#C45B17]">✓</span><span>Tem nhỏ gọn 30×20mm, tôn vinh thiết kế gốc</span></li>
                <li className="flex gap-3"><span className="text-[#C45B17]">✓</span><span>Sửa thông tin online, không cần in lại</span></li>
                <li className="flex gap-3"><span className="text-[#C45B17]">✓</span><span>8 ngôn ngữ tự động</span></li>
                <li className="flex gap-3"><span className="text-[#C45B17]">✓</span><span>Dashboard phân tích lượt quét</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#C45B17] uppercase tracking-widest text-xs font-semibold block mb-4">CÂU HỎI THƯỜNG GẶP</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#0B4F6C] leading-tight">Giải đáp thắc mắc</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {[
                { q: "Tem QR có thay thế hoàn toàn nhãn giấy không?", a: "Có. Theo Nghị định 43/2017/NĐ-CP, các thông tin bắt buộc có thể hiển thị qua mã QR truy xuất, miễn là người tiêu dùng có thể tiếp cận đầy đủ nội dung. Checkee cung cấp giao diện chuẩn để đáp ứng yêu cầu này." },
                { q: "Cơ quan quản lý thị trường có chấp nhận không?", a: "Có. Tem QR Checkee hiển thị đầy đủ các trường thông tin theo luật định, có thể truy cập ngay khi quét bằng camera thường, đáp ứng tiêu chí 'người tiêu dùng dễ dàng tiếp cận'." },
                { q: "Chi phí in tem QR như thế nào?", a: "Tem QR có kích thước nhỏ (chỉ 30×20mm), nên chi phí in ấn rẻ hơn 60-80% so với nhãn phụ giấy đầy đủ thông tin." },
                { q: "Sản phẩm đã dán tem rồi mà cần sửa thông tin thì sao?", a: "Đây là điểm mạnh của Checkee. Bạn chỉ cần đăng nhập, sửa nội dung trên dashboard — mã QR cũ vẫn hoạt động và hiển thị thông tin mới ngay lập tức." },
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-lg font-semibold text-[#0B4F6C]">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-[#4A5868] text-base leading-relaxed">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-24 bg-[#0B4F6C] text-white text-center">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">Tôn vinh sản phẩm nguyên bản</h2>
          <p className="text-lg text-[#D9EEF5]/80 max-w-2xl mx-auto">
            Số hóa nhãn phụ ngay hôm nay — vừa đẹp vừa đúng luật.
          </p>
          <div className="pt-4 flex flex-col items-center gap-4">
            <CtaButton href="/demo" size="large">Dùng thử miễn phí</CtaButton>
            <a href="/contact" className="text-sm text-[#D9EEF5]/70 hover:text-white inline-flex items-center gap-1 mt-2">
              Hoặc liên hệ tư vấn riêng <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
