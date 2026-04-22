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
    <div className="flex flex-col w-full bg-[#060B25]">
      <section className="pt-40 pb-20">
        <div className="container px-6 md:px-12 max-w-[800px] mx-auto space-y-6">
          <div className="text-[11px] uppercase tracking-[0.15em] text-[#83776D] mb-4">Tạp chí Pháp lý & Thiết kế</div>
          <h1 className="text-4xl md:text-5xl font-normal text-white leading-tight">
            Góc nhìn <span className="italic font-light text-[#B8B5AE]">chuyên sâu.</span>
          </h1>
        </div>
      </section>

      <section className="pb-32">
        <div className="container px-6 md:px-12 max-w-[800px] mx-auto">
          <div className="hairline-t">
            {articles.map((article, i) => (
              <article key={i} className="group hairline-b py-10 transition-colors duration-500 hover:bg-white/5">
                <div className="grid md:grid-cols-4 gap-4 px-4">
                  <div className="md:col-span-1 text-[11px] uppercase tracking-wider text-[#83776D] pt-1">
                    {article.date}
                  </div>
                  <div className="md:col-span-3 space-y-3">
                    <span className="text-[10px] tracking-[0.1em] uppercase border border-white/20 px-2 py-1 rounded-sm text-[#B8B5AE]">
                      {article.category}
                    </span>
                    <h2 className="text-xl font-normal text-white group-hover:text-[#B8B5AE] transition-colors duration-300 leading-snug">
                      <Link href="#" className="focus:outline-none">{article.title}</Link>
                    </h2>
                    <div className="pt-4 overflow-hidden h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Link href="#" className="inline-flex items-center text-[11px] tracking-[0.15em] uppercase text-white">
                        Đọc tiếp <ArrowRight className="ml-2 h-3 w-3" />
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