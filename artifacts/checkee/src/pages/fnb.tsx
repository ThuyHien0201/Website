import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function FNB() {
  return (
    <div className="flex flex-col w-full bg-[#060B25]">
      <section className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img src="/images/hero-rice.png" alt="F&B" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#060B25]/30 via-[#060B25]/50 to-[#060B25]" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-10 pt-20">
          <div className="text-[11px] uppercase tracking-[0.15em] text-[#83776D] mb-6">Quyết định 1246/QĐ-BYT</div>
          <h1 className="text-4xl md:text-6xl text-white font-normal leading-[1.1] mb-6">
            Nghệ thuật <span className="italic font-light text-[#F5F5F0]/80">lưu mẫu</span>
          </h1>
          <p className="text-[13px] md:text-[14px] text-[#B8B5AE] max-w-xl mx-auto leading-relaxed mb-10">
            Checkee F&B biến quy trình lưu mẫu thức ăn thủ công thành một giao thức điện tử chuẩn xác, bảo vệ danh tiếng của những căn bếp danh giá.
          </p>
          <Link href="/demo?product=fnb">
            <Button className="rounded-md bg-[#83776D] hover:bg-[#83776D]/90 text-white uppercase text-[11px] tracking-[0.15em] px-8 py-6 h-auto">
              Trải nghiệm mẫu
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-32">
        <div className="container px-6 md:px-12 max-w-[1000px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-24">
            <div className="space-y-6">
              <div className="text-[11px] uppercase tracking-[0.15em] text-[#83776D]">Mặt Y Tế</div>
              <h3 className="text-2xl font-normal text-white">QR Hộp Lưu Mẫu</h3>
              <p className="text-[#B8B5AE] text-[13px] leading-relaxed">
                Nghiêm ngặt và bảo mật. Ghi nhận chính xác thời khắc lưu mẫu, định danh người thao tác, nhiệt độ bảo quản. Đồng hồ đếm ngược 24 giờ tích hợp cảnh báo thông minh, đáp ứng hoàn hảo tiêu chuẩn thanh tra.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="text-[11px] uppercase tracking-[0.15em] text-[#83776D]">Mặt Khách Hàng</div>
              <h3 className="text-2xl font-normal text-white">QR Thực Đơn</h3>
              <p className="text-[#B8B5AE] text-[13px] leading-relaxed">
                Thanh lịch và minh bạch. Mã định danh trên khay ăn cho phép thực khách chiêm ngưỡng chứng nhận vệ sinh, nguồn gốc nguyên liệu tinh tuyển, và phong cách ẩm thực của nhà hàng.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}