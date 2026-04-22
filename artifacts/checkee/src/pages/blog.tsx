import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function Blog() {
  const articles = [
    {
      title: "Thông tư 02/2024 — Giải mã 10 trường thông tin định danh hàng hoá",
      date: "12 Tháng 3, 2024",
      category: "Trace",
    },
    {
      title: "Kỷ nguyên nhãn số: Khi bao bì trút bỏ gánh nặng văn bản (NĐ 37/2026)",
      date: "28 Tháng 2, 2024",
      category: "E-label",
    },
    {
      title: "Digital Product Passport — Tấm thẻ bài cho sản phẩm thượng lưu tiến vào Châu Âu",
      date: "15 Tháng 2, 2024",
      category: "DPP",
    },
    {
      title: "Nghệ thuật quản trị rủi ro ẩm thực với hệ thống lưu mẫu chuẩn QĐ 1246",
      date: "05 Tháng 2, 2024",
      category: "F&B",
    },
    {
      title: "Tem phụ điện tử — Giải pháp thanh lịch cho các xa xỉ phẩm nhập khẩu",
      date: "20 Tháng 1, 2024",
      category: "Tem Phụ",
    }
  ];

  return (
    <div className="flex flex-col w-full">
      <section className="pt-32 pb-24 bg-background">
        <div className="container px-6 md:px-12 max-w-5xl mx-auto space-y-8">
          <div className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground text-center">
            Tạp chí Pháp lý & Thiết kế
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-primary leading-[0.95] text-center">
            Góc nhìn<br/>chuyên sâu.
          </h1>
        </div>
      </section>

      <section className="pb-32 bg-background">
        <div className="container px-6 md:px-12 max-w-4xl mx-auto">
          <div className="border-t border-border/40">
            {articles.map((article, i) => (
              <article key={i} className="group border-b border-border/40 py-12 transition-all duration-500 hover:bg-secondary/5">
                <div className="grid md:grid-cols-4 gap-6 items-baseline px-4">
                  <div className="md:col-span-1 text-xs tracking-widest uppercase text-muted-foreground font-medium">
                    {article.date}
                  </div>
                  <div className="md:col-span-3 space-y-4">
                    <span className="text-[10px] tracking-[0.2em] uppercase border border-border/60 px-3 py-1 rounded-full text-muted-foreground">
                      {article.category}
                    </span>
                    <h2 className="text-2xl font-serif text-primary group-hover:text-secondary transition-colors duration-500 leading-snug">
                      <Link href="#" className="focus:outline-none">{article.title}</Link>
                    </h2>
                    <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <Link href="#" className="inline-flex items-center text-xs tracking-widest uppercase font-medium text-secondary">
                        Khám phá <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
