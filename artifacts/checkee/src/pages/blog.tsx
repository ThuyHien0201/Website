import { Link } from "wouter";
import { ArrowRight, Calendar, BookOpen } from "lucide-react";

export default function Blog() {
  const articles = [
    {
      title: "TT 02/2024 — 10 trường thông tin bắt buộc doanh nghiệp cần biết",
      date: "12 Tháng 3, 2024",
      category: "Trace",
      desc: "Phân tích chi tiết Thông tư 02/2024/TT-BKHCN về truy xuất nguồn gốc. Các bước chuẩn bị để doanh nghiệp không bị phạt từ 01/06.",
      color: "text-[#1D9E75]"
    },
    {
      title: "NĐ 37/2026 chính thức hiệu lực: Doanh nghiệp nhập khẩu cần làm gì?",
      date: "28 Tháng 2, 2024",
      category: "E-label & Tem Phụ",
      desc: "Nhãn điện tử và tem phụ số sẽ định hình lại cách chúng ta phân phối hàng hoá. Hãy cùng tìm hiểu lộ trình chuyển đổi.",
      color: "text-[#0C447C]"
    },
    {
      title: "EU ESPR và Hộ chiếu số sản phẩm — Cơ hội xuất khẩu 2027",
      date: "15 Tháng 2, 2024",
      category: "DPP",
      desc: "Châu Âu áp dụng Digital Product Passport. Doanh nghiệp dệt may, điện tử Việt Nam cần chuẩn bị những dữ liệu gì từ bây giờ?",
      color: "text-[#3C3489]"
    },
    {
      title: "QĐ 1246 và bài học từ các vụ ngộ độc bếp ăn trường học",
      date: "05 Tháng 2, 2024",
      category: "F&B",
      desc: "Lưu mẫu thức ăn đúng chuẩn không chỉ là chống đối cơ quan kiểm tra, mà là tự bảo vệ doanh nghiệp và sức khoẻ học sinh.",
      color: "text-[#854F0B]"
    },
    {
      title: "So sánh toàn diện: Tem giấy dán đè vs QR Tem phụ điện tử",
      date: "20 Tháng 1, 2024",
      category: "Tem Phụ",
      desc: "Bài toán chi phí in ấn, thẩm mỹ bao bì gốc và sự tiện lợi khi thay đổi thông tin nhà phân phối.",
      color: "text-[#712B13]"
    }
  ];

  return (
    <div className="flex flex-col w-full">
      <section className="pt-20 pb-16 bg-background">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto space-y-6 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
            Blog & Cập nhật Pháp lý
          </h1>
          <p className="text-xl text-muted-foreground">
            Tổng hợp tin tức, diễn giải nghị định và hướng dẫn áp dụng công nghệ vào quản lý thông tin sản phẩm.
          </p>
        </div>
      </section>

      <section className="pb-24 bg-background">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          <div className="grid gap-8">
            {articles.map((article, i) => (
              <article key={i} className="group bg-white rounded-2xl border p-6 md:p-8 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-4 mb-4 text-sm font-medium">
                  <span className={article.color}>{article.category}</span>
                  <span className="text-muted-foreground flex items-center">
                    <Calendar className="h-4 w-4 mr-1" /> {article.date}
                  </span>
                </div>
                <h2 className="text-2xl font-serif font-bold mb-3 group-hover:text-primary transition-colors">
                  <Link href="#" className="focus:outline-none">{article.title}</Link>
                </h2>
                <p className="text-muted-foreground mb-6 text-lg">
                  {article.desc}
                </p>
                <Link href="#" className="inline-flex items-center text-primary font-medium hover:underline">
                  Đọc tiếp <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
