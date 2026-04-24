import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function Blog() {
  const categories = ["Tất cả", "Trace", "E-label", "DPP", "F&B", "Tem Phụ"];
  
  const articles = [
    {
      title: "Thông tư 02/2024 — 11 nhóm sản phẩm bắt buộc truy xuất",
      date: "12 Tháng 3, 2024",
      category: "Trace",
      excerpt: "Nắm bắt chi tiết quy định mới nhất về 10 trường thông tin bắt buộc trong truy xuất nguồn gốc sản phẩm.",
      img: "/images/hero-tea.png",
      author: "Hoàng Nam"
    },
    {
      title: "ESPR EU 2024 — Lộ trình triển khai DPP",
      date: "28 Tháng 2, 2024",
      category: "DPP",
      excerpt: "Khám phá quy định thiết kế sinh thái mới của Châu Âu và tại sao Hộ chiếu số sản phẩm (DPP) lại là tấm vé sống còn.",
      img: "/images/hero-lacquer.png",
      author: "Minh Anh"
    },
    {
      title: "Hướng dẫn áp dụng NĐ 43/2017 cho hàng nhập khẩu",
      date: "15 Tháng 2, 2024",
      category: "Tem Phụ",
      excerpt: "Cách tối ưu không gian bao bì cho hàng nhập khẩu xa xỉ thông qua giải pháp tem phụ điện tử.",
      img: "/images/hero-silk.png",
      author: "Lê Thảo"
    },
    {
      title: "Case study: Cà phê Mê Trang xuất khẩu EU nhờ Checkee",
      date: "05 Tháng 2, 2024",
      category: "Trace",
      excerpt: "Câu chuyện thành công trong việc minh bạch chuỗi cung ứng, chinh phục thị trường khó tính nhất thế giới.",
      img: "/images/hero-coffee.png",
      author: "Hoàng Nam"
    },
    {
      title: "5 sai lầm thường gặp khi triển khai QR truy xuất",
      date: "20 Tháng 1, 2024",
      category: "Trace",
      excerpt: "Tránh những lỗi phổ biến khiến mã QR trở thành điểm nghẽn trải nghiệm thay vì công cụ marketing hiệu quả.",
      img: "/images/hero-factory.png",
      author: "Tuấn Trần"
    },
    {
      title: "Số hoá nhãn sản phẩm — Giải pháp cho nhà nhập khẩu",
      date: "10 Tháng 1, 2024",
      category: "E-label",
      excerpt: "Khắc phục triệt để vấn đề in sai nhãn, thiếu thông tin và ảnh hưởng thiết kế gốc của sản phẩm phân phối.",
      img: "/images/hero-rice.png",
      author: "Minh Anh"
    }
  ];

  return (
    <div className="flex flex-col w-full bg-white font-sans min-h-[100dvh]">
      <section className="pt-32 pb-24 bg-[#FAFBFC] border-b border-[#E5EAF0]">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-[#0B4F6C] mb-6">Tin tức & Tài nguyên</h1>
          <p className="text-lg text-[#4A5868] max-w-2xl mx-auto mb-10">
            Cập nhật kiến thức pháp lý, xu hướng công nghệ và kinh nghiệm triển khai số hóa chuỗi cung ứng.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat, i) => (
              <button key={i} className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${i === 0 ? 'bg-[#0B4F6C] text-white' : 'bg-white border border-[#E5EAF0] text-[#4A5868] hover:bg-[#E5EAF0]'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, i) => (
              <article key={i} className="group bg-white rounded-2xl overflow-hidden border border-[#E5EAF0] shadow-sm hover:shadow-xl transition-all">
                <div className="aspect-video relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur text-[#0B4F6C] px-3 py-1 rounded-full text-xs font-semibold uppercase">
                    {article.category}
                  </div>
                  <img src={article.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={article.title} />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0B4F6C] mb-3 group-hover:text-[#1A7EA4] transition-colors leading-snug line-clamp-2">
                    <Link href="#">{article.title}</Link>
                  </h3>
                  <p className="text-[#4A5868] text-sm mb-6 line-clamp-2">{article.excerpt}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-[#E5EAF0]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#D9EEF5] text-[#0B4F6C] flex items-center justify-center text-xs font-bold">
                        {article.author.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#0F1B2D]">{article.author}</div>
                        <div className="text-xs text-[#7D9E94]">{article.date}</div>
                      </div>
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