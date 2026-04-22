import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Trace() {
  return (
    <div className="flex flex-col w-full">
      <section className="pt-32 pb-32 md:pt-48 md:pb-40 bg-background border-b border-border/40">
        <div className="container px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 items-start">
            <div className="lg:col-span-6 space-y-12">
              <div className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
                Thông tư 02/2024/TT-BKHCN
              </div>
              <h1 className="text-5xl md:text-7xl font-serif text-primary leading-[0.95]">
                Sự minh bạch <br/>tuyệt đối.
              </h1>
              <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-md">
                Checkee Trace cung cấp giải pháp truy xuất nguồn gốc chuẩn mực, đáp ứng trọn vẹn 10 trường thông tin bắt buộc, phơi bày vẻ đẹp của chuỗi cung ứng.
              </p>
              <div className="flex gap-6 pt-4">
                <Link href="/demo?product=trace">
                  <Button size="lg" className="h-14 px-10 text-xs tracking-widest uppercase rounded-none bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-500">
                    Trải nghiệm mẫu
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="aspect-[3/4] w-full overflow-hidden">
                <img src="/images/tea-jar-editorial.png" alt="Truy xuất nguồn gốc gốm sứ" className="object-cover w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-background border-b border-border/40">
        <div className="container px-6 md:px-12 max-w-7xl mx-auto">
          <div className="max-w-3xl mb-24">
            <div className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-8">
              10 Trường thông tin
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-primary leading-tight">
              Chuẩn mực pháp lý.<br/>Thiết kế nghệ thuật.
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
              <div key={i} className="border-b border-border/40 pb-6 flex items-baseline">
                <span className="text-sm font-serif text-primary font-light">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-primary text-primary-foreground">
        <div className="container px-6 md:px-12 max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-3xl md:text-5xl font-serif font-light text-accent">Vươn ra thế giới.</h2>
          <p className="text-lg text-white/70 font-light leading-relaxed">
            Dữ liệu từ Checkee Trace là nền tảng hoàn mỹ để thăng hạng lên Digital Product Passport (DPP), mở cánh cửa tiến vào thị trường Châu Âu khắt khe nhất.
          </p>
          <div className="pt-8">
            <Link href="/dpp">
              <Button variant="outline" className="h-14 px-10 text-xs tracking-widest uppercase rounded-none border-white/20 text-white hover:bg-white hover:text-primary transition-all duration-500">
                Khám phá DPP
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
