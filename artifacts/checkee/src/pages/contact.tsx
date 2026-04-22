import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <div className="flex flex-col w-full">
      <section className="pt-32 pb-32 md:pt-48 md:pb-40 bg-background border-b border-border/40">
        <div className="container px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 items-start">
            <div className="lg:col-span-5 space-y-16">
              <div className="space-y-6">
                <div className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
                  Phòng Quan hệ Đối tác
                </div>
                <h1 className="text-5xl md:text-7xl font-serif text-primary leading-[0.95]">
                  Thiết lập <br/>tiêu chuẩn.
                </h1>
              </div>

              <div className="space-y-12">
                <div className="space-y-2">
                  <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">Đường dây trực tiếp</h3>
                  <p className="text-2xl font-serif text-primary">1900 1234</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">Thư điện tử</h3>
                  <p className="text-2xl font-serif text-primary">hello@checkee.vn</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">Văn phòng đại diện</h3>
                  <p className="text-lg font-light text-foreground leading-relaxed max-w-xs">
                    Tháp văn phòng Viettel, Tầng 12<br/>
                    285 Cách Mạng Tháng Tám<br/>
                    Quận 10, Thành phố Hồ Chí Minh
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <div className="bg-white p-12 md:p-16 border border-border/40 shadow-2xl">
                <div className="mb-12">
                  <h2 className="text-3xl font-serif text-primary mb-4">Lịch hẹn tư vấn</h2>
                  <p className="text-muted-foreground font-light text-sm">Chuyên viên của chúng tôi sẽ liên hệ để thiết kế giải pháp pháp lý dành riêng cho thương hiệu của bạn.</p>
                </div>

                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground">Đại diện liên hệ</label>
                    <Input className="h-12 rounded-none border-t-0 border-x-0 border-b border-border/60 bg-transparent px-0 text-lg focus-visible:ring-0 focus-visible:border-primary transition-colors" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground">Thương hiệu / Pháp nhân</label>
                    <Input className="h-12 rounded-none border-t-0 border-x-0 border-b border-border/60 bg-transparent px-0 text-lg focus-visible:ring-0 focus-visible:border-primary transition-colors" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-muted-foreground">Điện thoại</label>
                      <Input className="h-12 rounded-none border-t-0 border-x-0 border-b border-border/60 bg-transparent px-0 text-lg focus-visible:ring-0 focus-visible:border-primary transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-muted-foreground">Giao thức (Sản phẩm)</label>
                      <select className="w-full h-12 rounded-none border-t-0 border-x-0 border-b border-border/60 bg-transparent px-0 text-lg focus-visible:ring-0 focus-visible:border-primary transition-colors outline-none cursor-pointer">
                        <option>Trace (Nguồn gốc)</option>
                        <option>E-label (Nhãn số)</option>
                        <option>DPP (Xuất khẩu)</option>
                        <option>Tem phụ nhập khẩu</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground">Yêu cầu chuyên biệt</label>
                    <Textarea className="min-h-[100px] rounded-none border-t-0 border-x-0 border-b border-border/60 bg-transparent px-0 text-lg focus-visible:ring-0 focus-visible:border-primary transition-colors resize-none" />
                  </div>

                  <div className="pt-8">
                    <Button type="submit" className="w-full h-14 rounded-none bg-primary text-primary-foreground tracking-widest uppercase text-xs hover:bg-primary/90 transition-all duration-500">
                      Gửi yêu cầu
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
