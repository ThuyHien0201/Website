import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <div className="flex flex-col w-full bg-[#0A1340]">
      <section className="relative min-h-[600px] w-full overflow-hidden pt-40 pb-32">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-30">
          <img src="/images/hero-saigon.png" alt="Contact" className="w-full h-full object-cover mask-image-linear-gradient" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black)' }} />
        </div>

        <div className="container px-6 md:px-12 max-w-[1200px] mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-16">
              <div className="space-y-6">
                <div className="text-[11px] uppercase tracking-[0.15em] text-[#FF6B47]">Phòng Quan hệ Đối tác</div>
                <h1 className="text-4xl md:text-6xl text-white font-normal leading-[1.1]">
                  Thiết lập <br/><span className="italic font-light text-[#C8D0E8]">tiêu chuẩn</span>
                </h1>
              </div>

              <div className="space-y-10">
                <div className="space-y-2">
                  <h3 className="text-[11px] uppercase tracking-[0.15em] text-[#FF6B47]">Đường dây trực tiếp</h3>
                  <p className="text-xl font-normal text-white">1900 1234</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-[11px] uppercase tracking-[0.15em] text-[#FF6B47]">Thư điện tử</h3>
                  <p className="text-xl font-normal text-white">hello@checkee.vn</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-[11px] uppercase tracking-[0.15em] text-[#FF6B47]">Văn phòng đại diện</h3>
                  <p className="text-[13px] text-[#C8D0E8] leading-relaxed">
                    Tháp văn phòng Viettel, Tầng 12<br/>
                    285 Cách Mạng Tháng Tám, Quận 10, TP.HCM
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#16205A] p-10 md:p-12 rounded-md border border-white/10 shadow-2xl">
              <div className="mb-10">
                <h2 className="text-2xl font-normal text-white mb-3">Lịch hẹn tư vấn</h2>
                <p className="text-[#C8D0E8] text-[13px]">Chuyên viên sẽ liên hệ thiết kế giải pháp pháp lý dành riêng cho thương hiệu của bạn.</p>
              </div>

              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.15em] text-[#FF6B47]">Đại diện liên hệ</label>
                  <Input className="h-12 rounded-none border-t-0 border-x-0 border-b border-white/20 bg-transparent px-0 text-white focus-visible:ring-0 focus-visible:border-[#FF6B47] transition-colors shadow-none text-[14px]" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.15em] text-[#FF6B47]">Thương hiệu</label>
                  <Input className="h-12 rounded-none border-t-0 border-x-0 border-b border-white/20 bg-transparent px-0 text-white focus-visible:ring-0 focus-visible:border-[#FF6B47] transition-colors shadow-none text-[14px]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.15em] text-[#FF6B47]">Điện thoại</label>
                    <Input className="h-12 rounded-none border-t-0 border-x-0 border-b border-white/20 bg-transparent px-0 text-white focus-visible:ring-0 focus-visible:border-[#FF6B47] transition-colors shadow-none text-[14px]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.15em] text-[#FF6B47]">Sản phẩm quan tâm</label>
                    <select className="w-full h-12 rounded-none border-t-0 border-x-0 border-b border-white/20 bg-transparent px-0 text-white focus-visible:ring-0 focus-visible:border-[#FF6B47] transition-colors outline-none cursor-pointer text-[14px] appearance-none">
                      <option className="bg-[#16205A]">Trace (Nguồn gốc)</option>
                      <option className="bg-[#16205A]">E-label (Nhãn số)</option>
                      <option className="bg-[#16205A]">DPP (Xuất khẩu)</option>
                      <option className="bg-[#16205A]">Tem phụ nhập khẩu</option>
                    </select>
                  </div>
                </div>

                <div className="pt-6">
                  <Button type="submit" className="w-full h-12 rounded-md bg-[#FF6B47] text-white tracking-[0.15em] uppercase text-[11px] hover:bg-[#FF6B47]/90 transition-all duration-300">
                    Gửi yêu cầu
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}