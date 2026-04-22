import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="flex flex-col w-full">
      <section className="pt-32 pb-32 md:pt-48 md:pb-40 bg-background border-b border-border/40">
        <div className="container px-6 md:px-12 max-w-3xl mx-auto text-center space-y-12">
          <div className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
            Câu chuyện thương hiệu
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-primary leading-[0.95]">
            Nghệ thuật <br/>của sự thật.
          </h1>
          <p className="text-xl text-muted-foreground font-light leading-relaxed font-serif italic">
            "Chúng tôi không xây dựng một phần mềm tuân thủ. Chúng tôi thiết kế một lăng kính để phơi bày vẻ đẹp của những thương hiệu chân chính."
          </p>
        </div>
      </section>

      <section className="py-32 bg-background">
        <div className="container px-6 md:px-12 max-w-3xl mx-auto space-y-24">
          
          <div className="space-y-8">
            <h2 className="text-3xl font-serif text-primary">Tái định nghĩa sự tuân thủ</h2>
            <p className="text-lg text-foreground font-light leading-relaxed">
              Các quy định như Thông tư 02 hay Nghị định 37 thường được nhìn nhận như những gánh nặng hành chính. Một mã QR vuông vức, khô khan, trỏ về một trang web của cơ quan nhà nước với thiết kế từ thập kỷ trước.
            </p>
            <p className="text-lg text-foreground font-light leading-relaxed">
              Tại Checkee, chúng tôi từ chối sự tầm thường đó. Chúng tôi tin rằng minh bạch là lợi thế cạnh tranh xa xỉ nhất. Khi một khách hàng nhấc điện thoại lên để truy xuất nguồn gốc, đó là khoảnh khắc vàng để thương hiệu kể câu chuyện của mình — một câu chuyện về sự tận tâm, chuẩn xác và thanh lịch.
            </p>
          </div>

          <div className="border-l border-primary pl-8 py-4 my-16">
            <p className="text-2xl font-serif text-primary italic leading-relaxed">
              Mã QR trên bao bì không nên là một con tem vô hồn. Nó phải là cánh cửa mở ra một không gian triển lãm, nơi mỗi công đoạn sản xuất là một tác phẩm nghệ thuật.
            </p>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-serif text-primary">Thiết kế cho giới tinh hoa</h2>
            <p className="text-lg text-foreground font-light leading-relaxed">
              Checkee được tạo hình với ngôn ngữ thiết kế của các tạp chí kiến trúc và thời trang cao cấp. Chúng tôi lược bỏ những biểu tượng sặc sỡ, những màu sắc cảnh báo chói lọi, để nhường chỗ cho không gian trắng, nghệ thuật chữ (typography) sắc nét, và những gam màu trầm mặc.
            </p>
            <p className="text-lg text-foreground font-light leading-relaxed">
              Sản phẩm của Việt Nam đang ngày càng vươn lên phân khúc cao cấp — từ cà phê đặc sản, gốm sứ thủ công, đến thời trang bền vững. Nền tảng hiển thị thông tin của chúng cũng phải xứng tầm với chất lượng đó.
            </p>
          </div>

          <div className="border-t border-border/40 pt-16 mt-16 text-center">
            <div className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-8">
              Tham gia cùng chúng tôi
            </div>
            <Link href="/contact">
              <Button className="h-14 px-12 rounded-none bg-primary text-primary-foreground tracking-widest uppercase text-xs hover:bg-primary/90 transition-all duration-500">
                Trở thành đối tác
              </Button>
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
