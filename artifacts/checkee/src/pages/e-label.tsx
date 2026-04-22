import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function ELabel() {
  return (
    <div className="flex flex-col w-full bg-[#060B25]">
      <section className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img src="/images/hero-factory.png" alt="E-label" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#060B25]/30 via-[#060B25]/50 to-[#060B25]" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-10 pt-20">
          <div className="text-[11px] uppercase tracking-[0.15em] text-[#83776D] mb-6">NĐ 37/2026 Điều 42 Khoản 1</div>
          <h1 className="text-4xl md:text-6xl text-white font-normal leading-[1.1] mb-6">
            Không gian <span className="italic font-light text-[#F5F5F0]/80">vô tận</span>
          </h1>
          <p className="text-[13px] md:text-[14px] text-[#B8B5AE] max-w-xl mx-auto leading-relaxed mb-10">
            Checkee E-label giải phóng bao bì khỏi những khối văn bản dày đặc. Đưa thông tin thành phần, cảnh báo, và đa ngôn ngữ lên không gian số thanh lịch.
          </p>
          <Link href="/demo?product=e-label">
            <Button className="rounded-md bg-[#83776D] hover:bg-[#83776D]/90 text-white uppercase text-[11px] tracking-[0.15em] px-8 py-6 h-auto">
              Trải nghiệm mẫu
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-32">
        <div className="container px-6 md:px-12 max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-3 gap-16 md:gap-12">
            {[
              {
                num: "I.",
                title: "Thẩm mỹ thiết kế",
                desc: "Bao bì sản phẩm được trả lại vẻ đẹp nguyên bản, tối giản và sang trọng. Mọi văn bản pháp lý khô khan được chuyển đổi mượt mà sang giao diện điện thoại."
              },
              {
                num: "II.",
                title: "Linh hoạt tuyệt đối",
                desc: "Hiệu chỉnh thành phần, cập nhật cảnh báo an toàn tức thì. Không cần phải tiêu huỷ và in lại hàng vạn nhãn mác vật lý khi có thay đổi."
              },
              {
                num: "III.",
                title: "Thấu hiểu khách hàng",
                desc: "Mỗi lượt quét mở ra một điểm mù dữ liệu. Nắm bắt được thời điểm, địa điểm và sở thích của giới tinh hoa tiêu dùng."
              }
            ].map((feat, i) => (
              <div key={i} className="space-y-6">
                <div className="text-[13px] text-[#83776D]">{feat.num}</div>
                <h3 className="text-xl font-normal text-white">{feat.title}</h3>
                <p className="text-[#B8B5AE] font-normal leading-relaxed text-[13px]">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}