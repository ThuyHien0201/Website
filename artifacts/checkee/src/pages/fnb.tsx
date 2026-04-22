import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function FNB() {
  return (
    <div className="flex flex-col w-full">
      <section className="pt-32 pb-32 md:pt-48 md:pb-40 bg-background border-b border-border/40">
        <div className="container px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 items-start">
            <div className="lg:col-span-6 space-y-12">
              <div className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
                Quyết định 1246/QĐ-BYT
              </div>
              <h1 className="text-5xl md:text-7xl font-serif text-primary leading-[0.95]">
                Nghệ thuật <br/>lưu mẫu.
              </h1>
              <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-md">
                Checkee F&B biến quy trình lưu mẫu thức ăn thủ công thành một giao thức điện tử chuẩn xác, bảo vệ danh tiếng của những căn bếp danh giá.
              </p>
              <div className="flex gap-6 pt-4">
                <Link href="/demo?product=fnb">
                  <Button size="lg" className="h-14 px-10 text-xs tracking-widest uppercase rounded-none bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-500">
                    Trải nghiệm mẫu
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="aspect-[4/3] w-full overflow-hidden mt-12 lg:mt-0 bg-primary p-12 flex items-center justify-center">
                 <div className="text-accent font-serif italic text-4xl text-center leading-relaxed">
                   "Chữ ký số<br/>của bếp trưởng."
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-background border-b border-border/40">
        <div className="container px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24">
            <div className="space-y-8">
              <div className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
                Mặt Y Tế
              </div>
              <h3 className="text-3xl font-serif text-primary">QR Hộp Lưu Mẫu</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                Nghiêm ngặt và bảo mật. Ghi nhận chính xác thời khắc lưu mẫu, định danh người thao tác, nhiệt độ bảo quản. Đồng hồ đếm ngược 24 giờ tích hợp cảnh báo thông minh, đáp ứng hoàn hảo tiêu chuẩn thanh tra.
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
                Mặt Khách Hàng
              </div>
              <h3 className="text-3xl font-serif text-primary">QR Thực Đơn</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                Thanh lịch và minh bạch. Mã định danh trên khay ăn cho phép thực khách chiêm ngưỡng chứng nhận vệ sinh, nguồn gốc nguyên liệu tinh tuyển, và phong cách ẩm thực của nhà hàng.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
