import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Trace() {
  return (
    <div className="flex flex-col w-full bg-[#060B25]">
      {/* Cinematic Hero */}
      <section className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img src="/images/hero-tea.png" alt="Trace" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#060B25]/30 via-[#060B25]/50 to-[#060B25]" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-10 pt-20">
          <div className="text-[11px] uppercase tracking-[0.15em] text-[#83776D] mb-6">Thông tư 02/2024/TT-BKHCN</div>
          <h1 className="text-4xl md:text-6xl text-white font-normal leading-[1.1] mb-6">
            Sự minh bạch <span className="italic font-light text-[#F5F5F0]/80">tuyệt đối</span>
          </h1>
          <p className="text-[13px] md:text-[14px] text-[#B8B5AE] max-w-xl mx-auto leading-relaxed mb-10">
            Checkee Trace cung cấp giải pháp truy xuất nguồn gốc chuẩn mực, đáp ứng trọn vẹn 10 trường thông tin bắt buộc, phơi bày vẻ đẹp của chuỗi cung ứng.
          </p>
          <Link href="/demo?product=trace">
            <Button className="rounded-md bg-[#83776D] hover:bg-[#83776D]/90 text-white uppercase text-[11px] tracking-[0.15em] px-8 py-6 h-auto">
              Trải nghiệm mẫu
            </Button>
          </Link>
        </div>
      </section>

      {/* Editorial Content */}
      <section className="py-32">
        <div className="container px-6 md:px-12 max-w-[1000px] mx-auto">
          <div className="mb-20">
            <div className="text-[11px] uppercase tracking-[0.15em] text-[#83776D] mb-4">10 Trường thông tin</div>
            <h2 className="text-3xl font-normal text-white">
              Chuẩn mực pháp lý. <span className="italic font-light text-[#B8B5AE]">Thiết kế nghệ thuật.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            {[
              "01. Tên sản phẩm, hàng hoá",
              "02. Hình ảnh sản phẩm",
              "03. Tên, địa chỉ đơn vị sản xuất",
              "04. Tên, địa chỉ đơn vị phân phối",
              "05. Thời gian sản xuất",
              "06. Thời hạn sử dụng",
              "07. Tiêu chuẩn chất lượng",
              "08. Quy trình sản xuất",
              "09. Nguyên vật liệu đầu vào",
              "10. Lịch sử vận chuyển"
            ].map((item, i) => (
              <div key={i} className="hairline-b pb-6">
                <span className="text-[14px] text-white font-normal">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Up-sell Section */}
      <section className="py-32 bg-[#040613] text-center border-t border-white/5">
        <div className="container px-6 max-w-2xl mx-auto space-y-8">
          <h2 className="text-3xl font-normal text-white">Vươn ra <span className="italic font-light text-[#83776D]">thế giới</span></h2>
          <p className="text-[13px] text-[#B8B5AE] leading-relaxed">
            Dữ liệu từ Checkee Trace là nền tảng hoàn mỹ để thăng hạng lên Digital Product Passport (DPP), mở cánh cửa tiến vào thị trường Châu Âu khắt khe nhất.
          </p>
          <div className="pt-6">
            <Link href="/dpp" className="inline-flex items-center text-[13px] text-white uppercase tracking-wide link-hover pb-1">
              Khám phá DPP <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}