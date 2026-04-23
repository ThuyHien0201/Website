import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CtaButton } from "@/components/ui/cta-button";
import { ShieldCheck, HeartHandshake, Lightbulb, Users } from "lucide-react";

export default function About() {
  return (
    <div className="flex flex-col w-full bg-white font-sans">
      {/* Hero */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-b from-[#FAFBFC] to-white border-b border-[#E5EAF0]">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8 text-center max-w-4xl">
          <div className="inline-block bg-[#D9EEF5] text-[#0B4F6C] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-6">
            SỨ MỆNH CỦA CHÚNG TÔI
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-[#0B4F6C] leading-tight mb-8">
            Minh bạch hóa chuỗi giá trị toàn cầu
          </h1>
          <p className="text-[#4A5868] text-lg leading-relaxed">
            Checkee ra đời với niềm tin rằng sự minh bạch không chỉ là trách nhiệm pháp lý, mà là một lợi thế cạnh tranh thiết yếu. Chúng tôi giúp các thương hiệu kể câu chuyện sản phẩm chân thực nhất đến người tiêu dùng.
          </p>
        </div>
      </section>

      {/* Sứ mệnh body */}
      <section className="py-24 bg-white">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
              <img src="/images/hero-coffee.png" className="w-full h-full object-cover" alt="Sứ mệnh" />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0B4F6C]">Xây dựng cầu nối niềm tin</h2>
              <p className="text-[#4A5868] text-base leading-relaxed">
                Trong một thế giới đầy biến động về chuỗi cung ứng, người tiêu dùng ngày càng quan tâm đến nguồn gốc xuất xứ của những gì họ tiêu dùng hàng ngày. Họ cần biết sản phẩm đến từ đâu, được tạo ra như thế nào, và tác động của nó đến môi trường.
              </p>
              <p className="text-[#4A5868] text-base leading-relaxed">
                Nhiệm vụ của Checkee là số hóa quá trình đó một cách đơn giản, đáng tin cậy và tuân thủ các tiêu chuẩn quốc tế khắc khe nhất.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Giá trị cốt lõi */}
      <section className="py-24 bg-[#FAFBFC]">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-[#0B4F6C]">Giá trị cốt lõi</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: "Minh bạch", desc: "Cam kết cung cấp dữ liệu rõ ràng, có thể kiểm chứng được ở mọi khâu của quy trình." },
              { icon: HeartHandshake, title: "Tin cậy", desc: "Xây dựng sự an tâm tuyệt đối cho doanh nghiệp, đối tác và người tiêu dùng." },
              { icon: Lightbulb, title: "Đổi mới", desc: "Không ngừng áp dụng công nghệ mới để giải quyết các bài toán phức tạp của chuỗi cung ứng." },
              { icon: Users, title: "Đồng hành", desc: "Luôn sát cánh cùng doanh nghiệp trên hành trình chuyển đổi số và nâng tầm thương hiệu." }
            ].map((val, i) => (
              <div key={i} className="bg-white border border-[#E5EAF0] p-8 rounded-2xl text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-[#D9EEF5] text-[#0B4F6C] rounded-full flex items-center justify-center mx-auto mb-6">
                  <val.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#0B4F6C] mb-3">{val.title}</h3>
                <p className="text-[#4A5868] text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-[#0B4F6C]">Câu chuyện thương hiệu</h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-12">
            {[
              { year: "2020", title: "Khởi nguồn ý tưởng", desc: "Nhận thấy khoảng trống trong việc ứng dụng công nghệ để giải quyết vấn nạn hàng giả, đội ngũ sáng lập bắt đầu phác thảo mô hình truy xuất nguồn gốc đầu tiên." },
              { year: "2022", title: "Ra mắt phiên bản 1.0", desc: "Phiên bản Checkee đầu tiên ra mắt, phục vụ cho ngành nông sản với các tiêu chuẩn cơ bản của VietGAP." },
              { year: "2024", title: "Tuân thủ chuẩn quốc tế", desc: "Nâng cấp toàn diện kiến trúc hệ thống để tuân thủ Thông tư 02/2024 và chuẩn bị nền tảng cho DPP xuất khẩu Châu Âu." },
              { year: "2026", title: "Tầm nhìn tương lai", desc: "Trở thành nền tảng định danh số hàng hóa hàng đầu khu vực, ứng dụng blockchain vào toàn chuỗi cung ứng." }
            ].map((milestone, i) => (
              <div key={i} className="flex gap-6">
                <div className="w-24 shrink-0 text-right font-bold text-[#C45B17] text-xl pt-1">{milestone.year}</div>
                <div className="relative border-l-2 border-[#E5EAF0] pl-8 pb-12 last:pb-0">
                  <div className="absolute w-4 h-4 rounded-full bg-[#1A6B52] -left-[9px] top-2" />
                  <h3 className="text-xl font-bold text-[#0B4F6C] mb-2">{milestone.title}</h3>
                  <p className="text-[#4A5868] text-base leading-relaxed">{milestone.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#0B4F6C] text-white text-center">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">Cùng chúng tôi tạo nên thay đổi</h2>
          <p className="text-lg text-[#D9EEF5]/80 max-w-2xl mx-auto">
            Liên hệ để trao đổi về cơ hội hợp tác và phát triển.
          </p>
          <div className="pt-4 flex flex-col items-center gap-4">
            <CtaButton href="/contact" size="large">Trở thành đối tác</CtaButton>
          </div>
        </div>
      </section>
    </div>
  );
}