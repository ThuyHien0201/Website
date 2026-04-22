import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="flex flex-col w-full bg-[#0A1340]">
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img src="/images/hero-saigon.png" alt="About Checkee" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-[#0A1340]/70" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-10 pt-20 max-w-3xl mx-auto">
          <div className="text-[11px] uppercase tracking-[0.15em] text-[#FF6B47] mb-6">Câu chuyện thương hiệu</div>
          <h1 className="text-4xl md:text-6xl text-white font-normal leading-[1.1] mb-6">
            Nghệ thuật <span className="italic font-light text-[#FFFFFF]/80">của sự thật</span>
          </h1>
          <p className="text-[15px] text-[#C8D0E8] leading-relaxed font-light italic">
            "Chúng tôi không xây dựng một phần mềm tuân thủ. Chúng tôi thiết kế một lăng kính để phơi bày vẻ đẹp của những thương hiệu chân chính."
          </p>
        </div>
      </section>

      <section className="py-32">
        <div className="container px-6 md:px-12 max-w-2xl mx-auto space-y-24">
          
          <div className="space-y-6">
            <h2 className="text-2xl font-normal text-white">Tái định nghĩa sự tuân thủ</h2>
            <p className="text-[13px] text-[#C8D0E8] leading-relaxed">
              Các quy định như Thông tư 02 hay Nghị định 37 thường được nhìn nhận như những gánh nặng hành chính. Một mã QR vuông vức, khô khan, trỏ về một trang web của cơ quan nhà nước với thiết kế từ thập kỷ trước.
            </p>
            <p className="text-[13px] text-[#C8D0E8] leading-relaxed">
              Tại Checkee, chúng tôi từ chối sự tầm thường đó. Chúng tôi tin rằng minh bạch là lợi thế cạnh tranh xa xỉ nhất. Khi một khách hàng nhấc điện thoại lên để truy xuất nguồn gốc, đó là khoảnh khắc vàng để thương hiệu kể câu chuyện của mình — một câu chuyện về sự tận tâm, chuẩn xác và thanh lịch.
            </p>
          </div>

          <div className="border-l-2 border-[#FF6B47] pl-8 py-2">
            <p className="text-xl font-normal text-white italic leading-relaxed">
              Mã QR trên bao bì không nên là một con tem vô hồn. Nó phải là cánh cửa mở ra một không gian triển lãm.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-normal text-white">Thiết kế cho giới tinh hoa</h2>
            <p className="text-[13px] text-[#C8D0E8] leading-relaxed">
              Checkee được tạo hình với ngôn ngữ thiết kế của các tạp chí kiến trúc và thời trang cao cấp. Chúng tôi lược bỏ những biểu tượng sặc sỡ, những màu sắc cảnh báo chói lọi, để nhường chỗ cho không gian trắng, nghệ thuật typography sắc nét, và những gam màu trầm mặc.
            </p>
            <p className="text-[13px] text-[#C8D0E8] leading-relaxed">
              Sản phẩm của Việt Nam đang ngày càng vươn lên phân khúc cao cấp. Nền tảng hiển thị thông tin của chúng cũng phải xứng tầm với chất lượng đó.
            </p>
          </div>

          <div className="hairline-t pt-16 text-center">
            <div className="text-[11px] uppercase tracking-[0.15em] text-[#FF6B47] mb-6">Tham gia cùng chúng tôi</div>
            <Link href="/contact">
              <Button className="h-12 px-10 rounded-md bg-[#FF6B47] text-white tracking-[0.15em] uppercase text-[11px] hover:bg-[#FF6B47]/90 transition-all duration-300">
                Trở thành đối tác
              </Button>
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}