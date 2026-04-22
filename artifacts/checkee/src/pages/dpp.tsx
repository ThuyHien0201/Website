import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Leaf, Recycle, PenTool, ShieldCheck, Factory, MapPin, Award } from "lucide-react";

export default function DPP() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 bg-[#3C3489]/5">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-[#3C3489]/10 text-[#3C3489] border-[#3C3489]/20">
                ESPR Regulation (EU) 2024/1781
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-foreground">
                Checkee DPP
              </h1>
              <p className="text-xl text-muted-foreground">
                Hộ chiếu số sản phẩm (Digital Product Passport). Tiêu chuẩn bắt buộc để xuất khẩu vào thị trường Châu Âu từ 2027.
              </p>
              <div className="flex gap-4 pt-4">
                <Link href="/demo?product=dpp">
                  <Button size="lg" className="h-12 px-6 bg-[#3C3489] hover:bg-[#3C3489]/90 text-white">
                    Demo thử ngay
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-8">
                <div className="bg-white p-4 rounded-xl shadow-sm border">
                  <Leaf className="h-8 w-8 text-[#3C3489] mb-2" />
                  <h3 className="font-bold">Carbon Footprint</h3>
                  <p className="text-sm text-muted-foreground">Theo dõi và báo cáo dấu chân carbon</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border">
                  <Recycle className="h-8 w-8 text-[#3C3489] mb-2" />
                  <h3 className="font-bold">Vật liệu tái chế</h3>
                  <p className="text-sm text-muted-foreground">Minh bạch tỷ lệ vật liệu tái chế đầu vào</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border">
                  <PenTool className="h-8 w-8 text-[#3C3489] mb-2" />
                  <h3 className="font-bold">Tuổi thọ & Sửa chữa</h3>
                  <p className="text-sm text-muted-foreground">Chỉ số Repairability Score</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border">
                  <Award className="h-8 w-8 text-[#3C3489] mb-2" />
                  <h3 className="font-bold">Chứng nhận</h3>
                  <p className="text-sm text-muted-foreground">CE, RoHS, REACH, ISO 14001</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Groups */}
      <section className="py-20 bg-white border-t">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-4">Dữ liệu toàn diện</h2>
            <p className="text-muted-foreground text-lg">Hệ thống của chúng tôi cho phép tích hợp đầy đủ 8 nhóm thông tin cốt lõi theo quy chuẩn ESPR EU.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Thông tin chung", desc: "Định danh GTIN, mô tả sản phẩm" },
              { title: "Carbon Footprint", desc: "kg CO₂e trên mỗi đơn vị SP" },
              { title: "Vật liệu", desc: "Tỷ lệ vật liệu tái chế (%)" },
              { title: "Độ bền", desc: "Repairability Score 0-10" },
              { title: "Sửa chữa", desc: "Hướng dẫn tháo rời, bảo trì" },
              { title: "Cuối vòng đời", desc: "Hướng dẫn tái chế, phân loại rác" },
              { title: "Chứng nhận", desc: "CE, RoHS, REACH, ISO, EPD" },
              { title: "Tuân thủ", desc: "Declaration of Conformity" }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-background rounded-2xl border flex flex-col justify-center items-center text-center hover:border-[#3C3489]/50 transition-colors">
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Kế thừa từ Trace */}
      <section className="py-16 bg-[#1D9E75]/5 border-t border-[#1D9E75]/10">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border shadow-lg overflow-hidden flex flex-col md:flex-row">
            <div className="p-8 md:w-1/2 flex flex-col justify-center">
              <h2 className="text-2xl font-serif font-bold mb-4 text-[#1D9E75]">Kế thừa hoàn toàn từ Trace</h2>
              <p className="text-muted-foreground mb-6">
                Bạn đã sử dụng Checkee Trace? Việc nâng cấp lên DPP trở nên vô cùng đơn giản. Toàn bộ dữ liệu về chuỗi cung ứng được đồng bộ tự động.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center text-muted-foreground"><CheckCircle2 className="h-4 w-4 text-[#1D9E75] mr-2" /> Dữ liệu sản xuất tự động điền</li>
                <li className="flex items-center text-muted-foreground"><CheckCircle2 className="h-4 w-4 text-[#1D9E75] mr-2" /> Kế thừa thông tin nguyên vật liệu</li>
                <li className="flex items-center text-muted-foreground"><CheckCircle2 className="h-4 w-4 text-[#1D9E75] mr-2" /> Chỉ cần bổ sung các chỉ số môi trường</li>
              </ul>
            </div>
            <div className="bg-[#1D9E75] p-8 md:w-1/2 text-white flex flex-col justify-center items-center text-center">
              <div className="text-5xl font-serif mb-4">-15%</div>
              <p className="text-white/80 font-medium">Giảm ngay 15% tổng giá trị khi mua combo Checkee Trace + Checkee DPP</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing (Lite version) */}
      <section className="py-20 bg-white border-t">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto text-center space-y-12">
          <h2 className="text-3xl font-serif font-bold">Bảng giá Checkee DPP</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto text-left">
            {[
              { name: "DPP Pin/Ắc quy", price: "4.800.000đ", limit: "5 sản phẩm", pop: false },
              { name: "DPP Dệt may", price: "7.200.000đ", limit: "20 sản phẩm", pop: false },
              { name: "DPP Điện tử", price: "9.600.000đ", limit: "50 sản phẩm", pop: true },
              { name: "DPP Nội thất", price: "Liên hệ", limit: "Không giới hạn", pop: false },
            ].map((tier, i) => (
              <div key={i} className={`relative p-6 rounded-2xl border ${tier.pop ? 'border-[#3C3489] shadow-lg ring-1 ring-[#3C3489]/20 bg-white z-10' : 'bg-background shadow-sm'}`}>
                {tier.pop && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#3C3489] text-white text-xs font-bold rounded-full uppercase tracking-wider">
                    Phổ biến
                  </div>
                )}
                <div className="font-bold text-lg mb-1 text-foreground/90">{tier.name}</div>
                <div className="text-sm text-muted-foreground mb-4">{tier.limit}</div>
                <div className="text-2xl font-bold mb-6">{tier.price}{tier.price !== "Liên hệ" && <span className="text-sm font-normal text-muted-foreground">/năm</span>}</div>
                <Link href="/contact">
                  <Button className={`w-full ${tier.pop ? 'bg-[#3C3489] hover:bg-[#3C3489]/90 text-white' : 'variant-outline'}`} variant={tier.pop ? "default" : "outline"}>
                    Chọn gói này
                  </Button>
                </Link>
              </div>
            ))}
          </div>
          <div className="pt-8">
            <Link href="/pricing" className="text-[#3C3489] font-medium hover:underline inline-flex items-center">
              Xem chi tiết bảng giá đầy đủ <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
