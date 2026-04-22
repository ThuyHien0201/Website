import { Link } from "wouter";

export default function About() {
  return (
    <div className="flex flex-col w-full">
      <section className="pt-20 pb-16 bg-background">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto space-y-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
            Câu chuyện thương hiệu
          </h1>
          <p className="text-xl text-muted-foreground font-medium italic">
            "Vì người tiêu dùng Việt"
          </p>
        </div>
      </section>

      <section className="pb-24 bg-background">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto space-y-12">
          <div className="prose prose-lg max-w-none text-foreground/80">
            <p>
              Được thành lập với sứ mệnh minh bạch hoá thị trường hàng hoá tại Việt Nam, Checkee không chỉ là một công ty phần mềm, mà là một nỗ lực để xây dựng lại niềm tin giữa doanh nghiệp và người tiêu dùng.
            </p>
            
            <h3 className="font-serif text-2xl font-bold mt-12 mb-4 text-foreground">Bài toán pháp lý và Cơ hội thương hiệu</h3>
            <p>
              Các quy định pháp luật như Thông tư 02/2024, Nghị định 37/2026, hay xa hơn là ESPR của Liên minh Châu Âu đang đặt ra những yêu cầu khắt khe về minh bạch thông tin sản phẩm. 
            </p>
            <p>
              Tuy nhiên, chúng tôi không nhìn nhận đây là những "gánh nặng tuân thủ" (compliance burden). Tại Checkee, chúng tôi tin rằng minh bạch là <strong>lợi thế cạnh tranh lớn nhất</strong> trong kỷ nguyên số. Mã QR trên bao bì không nên chỉ là một ô vuông đen trắng nhàm chán trỏ về một trang web của cơ quan quản lý. Nó phải là một điểm chạm thương hiệu sang trọng, trực quan và thuyết phục.
            </p>

            <h3 className="font-serif text-2xl font-bold mt-12 mb-4 text-foreground">Thiết kế cho người Việt</h3>
            <p>
              Giao diện của Checkee được thiết kế với sự tỉ mỉ mang âm hưởng của nghệ thuật thủ công cao cấp Việt Nam. Chúng tôi chối bỏ sự khô khan của các phần mềm quản lý nhà nước thông thường. Checkee mang đến sự mượt mà, đẳng cấp và đáng tin cậy.
            </p>
            
            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-xl my-8">
              <p className="m-0 italic text-foreground/90 font-medium">
                "Chúng tôi muốn mỗi khi người tiêu dùng nhấc điện thoại lên quét một mã Checkee QR tại siêu thị, họ lập tức cảm thấy: Sản phẩm này được làm ra bởi một doanh nghiệp tử tế."
              </p>
            </div>

            <h3 className="font-serif text-2xl font-bold mt-12 mb-4 text-foreground">Tầm nhìn 2030</h3>
            <p>
              Checkee đặt mục tiêu trở thành tiêu chuẩn vàng về số hoá thông tin sản phẩm tại Đông Nam Á, hỗ trợ 10.000 doanh nghiệp Việt xuất khẩu thành công sang các thị trường khó tính nhất nhờ việc đáp ứng trước các rào cản kỹ thuật số.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
