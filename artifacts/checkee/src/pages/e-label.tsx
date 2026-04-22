import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function ELabel() {
  return (
    <div className="flex flex-col w-full">
      <section className="pt-32 pb-32 md:pt-48 md:pb-40 bg-background border-b border-border/40">
        <div className="container px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 items-start">
            <div className="lg:col-span-6 space-y-12">
              <div className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
                NĐ 37/2026 Điều 42 Khoản 1
              </div>
              <h1 className="text-5xl md:text-7xl font-serif text-primary leading-[0.95]">
                Không gian <br/>vô tận.
              </h1>
              <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-md">
                Checkee E-label giải phóng bao bì khỏi những khối văn bản dày đặc. Đưa thông tin thành phần, cảnh báo, và đa ngôn ngữ lên không gian số thanh lịch.
              </p>
              <div className="flex gap-6 pt-4">
                <Link href="/demo?product=e-label">
                  <Button size="lg" className="h-14 px-10 text-xs tracking-widest uppercase rounded-none bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-500">
                    Trải nghiệm mẫu
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="aspect-[3/4] w-full overflow-hidden">
                <img src="/images/fish-sauce-editorial.png" alt="Nước mắm cao cấp nhãn điện tử" className="object-cover w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-background border-b border-border/40">
        <div className="container px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16 md:gap-12">
            {[
              {
                num: "I",
                title: "Thẩm mỹ thiết kế",
                desc: "Bao bì sản phẩm được trả lại vẻ đẹp nguyên bản, tối giản và sang trọng. Mọi văn bản pháp lý khô khan được chuyển đổi mượt mà sang giao diện điện thoại."
              },
              {
                num: "II",
                title: "Linh hoạt tuyệt đối",
                desc: "Hiệu chỉnh thành phần, cập nhật cảnh báo an toàn tức thì. Không cần phải tiêu huỷ và in lại hàng vạn nhãn mác vật lý khi có thay đổi."
              },
              {
                num: "III",
                title: "Thấu hiểu khách hàng",
                desc: "Mỗi lượt quét mở ra một điểm mù dữ liệu. Nắm bắt được thời điểm, địa điểm và sở thích của giới tinh hoa tiêu dùng."
              }
            ].map((feat, i) => (
              <div key={i} className="space-y-6">
                <div className="text-sm font-serif italic text-muted-foreground">{feat.num}.</div>
                <h3 className="text-2xl font-serif text-primary">{feat.title}</h3>
                <p className="text-muted-foreground font-light leading-relaxed text-sm">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
