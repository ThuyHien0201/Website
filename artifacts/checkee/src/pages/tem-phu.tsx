import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function TemPhu() {
  return (
    <div className="flex flex-col w-full">
      <section className="pt-32 pb-32 md:pt-48 md:pb-40 bg-background border-b border-border/40">
        <div className="container px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 items-start">
            <div className="lg:col-span-6 space-y-12">
              <div className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
                NĐ 37/2026 Khoản 2
              </div>
              <h1 className="text-5xl md:text-7xl font-serif text-primary leading-[0.95]">
                Tôn vinh <br/>bản gốc.
              </h1>
              <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-md">
                Tem phụ điện tử thanh tẩy bao bì nhập khẩu khỏi những miếng dán giấy nham nhở. Trả lại sự sang trọng nguyên bản cho các xa xỉ phẩm.
              </p>
              <div className="flex gap-6 pt-4">
                <Link href="/demo?product=tem-phu">
                  <Button size="lg" className="h-14 px-10 text-xs tracking-widest uppercase rounded-none bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-500">
                    Trải nghiệm mẫu
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="aspect-[3/4] w-full overflow-hidden">
                <img src="/images/coffee-package-editorial.png" alt="Sản phẩm nhập khẩu cao cấp" className="object-cover w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-background border-b border-border/40">
        <div className="container px-6 md:px-12 max-w-7xl mx-auto">
          <div className="max-w-3xl mb-24">
            <div className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-8">
              Nghệ thuật phân phối
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-primary leading-tight">
              Dấu ấn tinh tế,<br/>thông tin trọn vẹn.
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 pt-12 border-t border-border/40">
            <div className="space-y-6 opacity-40">
              <h3 className="text-sm font-serif italic text-muted-foreground">Tem phụ giấy truyền thống</h3>
              <p className="font-light leading-relaxed text-sm">
                Xâm phạm thiết kế gốc của nhà mốt. Phông chữ siêu nhỏ thách thức thị giác. Sai sót chính tả buộc phải hủy cả lô in ấn đắt đỏ.
              </p>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-sm font-serif italic text-primary">QR Tem phụ Checkee</h3>
              <p className="font-light leading-relaxed text-sm text-foreground">
                Dấu ấn QR siêu nhỏ (1.5cm) nép mình khiêm nhường trên góc bao bì. Mở ra trang thông tin tiếng Việt trang nhã, phông chữ lớn, tuỳ biến tức thời mọi sai sót mà không tốn một trang giấy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
