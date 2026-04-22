import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function DPP() {
  return (
    <div className="flex flex-col w-full">
      <section className="pt-32 pb-32 md:pt-48 md:pb-40 bg-background border-b border-border/40">
        <div className="container px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 items-start">
            <div className="lg:col-span-6 space-y-12">
              <div className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
                ESPR Regulation (EU) 2024/1781
              </div>
              <h1 className="text-5xl md:text-7xl font-serif text-primary leading-[0.95]">
                Hộ chiếu <br/>số hoá.
              </h1>
              <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-md">
                Digital Product Passport. Tấm vé thượng lưu đưa sản phẩm Việt Nam vào thị trường Châu Âu với chuẩn mực bền vững và minh bạch cao nhất.
              </p>
              <div className="flex gap-6 pt-4">
                <Link href="/demo?product=dpp">
                  <Button size="lg" className="h-14 px-10 text-xs tracking-widest uppercase rounded-none bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-500">
                    Trải nghiệm mẫu
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[3/4] w-full overflow-hidden col-span-2">
                  <img src="/images/lacquer-box-editorial.png" alt="Sản phẩm sơn mài Việt Nam cao cấp" className="object-cover w-full h-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-background border-b border-border/40">
        <div className="container px-6 md:px-12 max-w-7xl mx-auto">
          <div className="max-w-3xl mb-24">
            <div className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-8">
              Cấu trúc dữ liệu
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-primary leading-tight">
              Tuyên ngôn <br/>của sự bền vững.
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-x-12 gap-y-16 border-t border-border/40 pt-16">
            {[
              { title: "Carbon Footprint", desc: "Dấu chân carbon trên mỗi đơn vị, thể hiện trách nhiệm sinh thái." },
              { title: "Vật liệu tái chế", desc: "Minh bạch tỷ lệ nguyên liệu tuần hoàn trong chuỗi chế tác." },
              { title: "Độ bền & Sửa chữa", desc: "Chỉ số Repairability Score và cẩm nang bảo dưỡng chuyên sâu." },
              { title: "Chứng nhận EU", desc: "Tích hợp nguyên vẹn CE, RoHS, REACH, ISO, EPD." }
            ].map((item, i) => (
              <div key={i} className="space-y-4">
                <h3 className="text-xl font-serif text-primary">{item.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
