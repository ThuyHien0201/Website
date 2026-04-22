import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function DPP() {
  return (
    <div className="flex flex-col w-full bg-[#0A1340]">
      <section className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img src="/images/hero-lacquer.png" alt="DPP" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1340]/30 via-[#0A1340]/50 to-[#0A1340]" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-10 pt-20">
          <div className="text-[11px] uppercase tracking-[0.15em] text-[#FF6B47] mb-6">ESPR Regulation (EU) 2024/1781</div>
          <h1 className="text-4xl md:text-6xl text-white font-normal leading-[1.1] mb-6">
            Hộ chiếu <span className="italic font-light text-[#FFFFFF]/80">số hoá</span>
          </h1>
          <p className="text-[13px] md:text-[14px] text-[#C8D0E8] max-w-xl mx-auto leading-relaxed mb-10">
            Digital Product Passport. Tấm vé thượng lưu đưa sản phẩm Việt Nam vào thị trường Châu Âu với chuẩn mực bền vững và minh bạch cao nhất.
          </p>
          <Link href="/demo?product=dpp">
            <Button className="rounded-md bg-[#FF6B47] hover:bg-[#FF6B47]/90 text-white uppercase text-[11px] tracking-[0.15em] px-8 py-6 h-auto">
              Trải nghiệm mẫu
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-32 border-t border-white/5">
        <div className="container px-6 md:px-12 max-w-[1200px] mx-auto">
          <div className="max-w-2xl mb-20">
            <div className="text-[11px] uppercase tracking-[0.15em] text-[#FF6B47] mb-4">Cấu trúc dữ liệu</div>
            <h2 className="text-3xl font-normal text-white">
              Tuyên ngôn <span className="italic font-light text-[#C8D0E8]">của sự bền vững.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 hairline-t pt-16">
            {[
              { title: "Carbon Footprint", desc: "Dấu chân carbon trên mỗi đơn vị, thể hiện trách nhiệm sinh thái." },
              { title: "Vật liệu tái chế", desc: "Minh bạch tỷ lệ nguyên liệu tuần hoàn trong chuỗi chế tác." },
              { title: "Độ bền & Sửa chữa", desc: "Chỉ số Repairability Score và cẩm nang bảo dưỡng chuyên sâu." },
              { title: "Chứng nhận EU", desc: "Tích hợp nguyên vẹn CE, RoHS, REACH, ISO, EPD." }
            ].map((item, i) => (
              <div key={i} className="space-y-4">
                <h3 className="text-lg font-normal text-white">{item.title}</h3>
                <p className="text-[13px] text-[#C8D0E8] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}