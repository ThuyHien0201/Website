import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function TemPhu() {
  return (
    <div className="flex flex-col w-full bg-[#060B25]">
      <section className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img src="/images/hero-silk.png" alt="Tem phụ" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#060B25]/30 via-[#060B25]/50 to-[#060B25]" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-10 pt-20">
          <div className="text-[11px] uppercase tracking-[0.15em] text-[#83776D] mb-6">NĐ 37/2026 Khoản 2</div>
          <h1 className="text-4xl md:text-6xl text-white font-normal leading-[1.1] mb-6">
            Tôn vinh <span className="italic font-light text-[#F5F5F0]/80">bản gốc</span>
          </h1>
          <p className="text-[13px] md:text-[14px] text-[#B8B5AE] max-w-xl mx-auto leading-relaxed mb-10">
            Tem phụ điện tử thanh tẩy bao bì nhập khẩu khỏi những miếng dán giấy nham nhở. Trả lại sự sang trọng nguyên bản cho các xa xỉ phẩm.
          </p>
          <Link href="/demo?product=tem-phu">
            <Button className="rounded-md bg-[#83776D] hover:bg-[#83776D]/90 text-white uppercase text-[11px] tracking-[0.15em] px-8 py-6 h-auto">
              Trải nghiệm mẫu
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-32">
        <div className="container px-6 md:px-12 max-w-[1000px] mx-auto">
          <div className="mb-20">
            <div className="text-[11px] uppercase tracking-[0.15em] text-[#83776D] mb-4">Nghệ thuật phân phối</div>
            <h2 className="text-3xl font-normal text-white">
              Dấu ấn tinh tế. <span className="italic font-light text-[#B8B5AE]">Thông tin trọn vẹn.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 pt-12 hairline-t">
            <div className="space-y-6 opacity-50">
              <h3 className="text-[13px] text-[#B8B5AE] uppercase tracking-wide">Tem phụ giấy truyền thống</h3>
              <p className="font-normal leading-relaxed text-[13px] text-[#B8B5AE]">
                Xâm phạm thiết kế gốc của nhà mốt. Phông chữ siêu nhỏ thách thức thị giác. Sai sót chính tả buộc phải hủy cả lô in ấn đắt đỏ.
              </p>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-[13px] text-white uppercase tracking-wide">QR Tem phụ Checkee</h3>
              <p className="font-normal leading-relaxed text-[13px] text-white">
                Dấu ấn QR siêu nhỏ (1.5cm) nép mình khiêm nhường trên góc bao bì. Mở ra trang thông tin tiếng Việt trang nhã, phông chữ lớn, tuỳ biến tức thời mọi sai sót mà không tốn một trang giấy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}