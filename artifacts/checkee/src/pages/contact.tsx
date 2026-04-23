import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CtaButton } from "@/components/ui/cta-button";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="flex flex-col w-full bg-white font-sans">
      <section className="py-16 lg:py-24 bg-[#FAFBFC] border-b border-[#E5EAF0]">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-[#0B4F6C] mb-6">Liên hệ tư vấn</h1>
          <p className="text-lg text-[#4A5868] max-w-2xl mx-auto">
            Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ bạn thiết kế giải pháp minh bạch phù hợp nhất với quy mô doanh nghiệp.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* LEFT: Form */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-8 lg:p-10 shadow-sm">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[#0B4F6C] font-semibold">Họ và tên *</Label>
                      <Input placeholder="Nhập họ và tên..." className="bg-[#FAFBFC] border-[#E5EAF0]" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#0B4F6C] font-semibold">Email *</Label>
                      <Input type="email" placeholder="Địa chỉ email công việc..." className="bg-[#FAFBFC] border-[#E5EAF0]" />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[#0B4F6C] font-semibold">Số điện thoại *</Label>
                      <Input type="tel" placeholder="Số điện thoại liên hệ..." className="bg-[#FAFBFC] border-[#E5EAF0]" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#0B4F6C] font-semibold">Tên doanh nghiệp</Label>
                      <Input placeholder="Công ty của bạn..." className="bg-[#FAFBFC] border-[#E5EAF0]" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-[#0B4F6C] font-semibold">Sản phẩm quan tâm</Label>
                    <select className="flex h-9 w-full rounded-md border border-[#E5EAF0] bg-[#FAFBFC] px-3 py-1 text-base focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1A7EA4] md:text-sm text-[#0F1B2D]">
                      <option>Checkee Trace (Truy xuất nguồn gốc)</option>
                      <option>Checkee E-label (Nhãn điện tử)</option>
                      <option>Checkee DPP (Hộ chiếu sản phẩm)</option>
                      <option>Checkee F&B (Lưu mẫu)</option>
                      <option>Checkee Tem Phụ</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-[#0B4F6C] font-semibold">Lời nhắn</Label>
                    <Textarea rows={4} placeholder="Hãy cho chúng tôi biết nhu cầu cụ thể của bạn..." className="bg-[#FAFBFC] border-[#E5EAF0]" />
                  </div>
                  
                  <div className="pt-4">
                    <CtaButton type="submit" className="w-full justify-center">Gửi yêu cầu</CtaButton>
                  </div>
                </form>
              </div>
            </div>
            
            {/* RIGHT: Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#0B4F6C] rounded-2xl p-8 text-white shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-[#D9EEF5]" />
                  </div>
                  <div>
                    <div className="text-[#D9EEF5] text-sm uppercase tracking-wider font-semibold mb-1">Hotline tư vấn</div>
                    <div className="text-3xl font-bold">1900 1234</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-8 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#D9EEF5] flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-[#0B4F6C]" />
                </div>
                <div>
                  <div className="text-[#7D9E94] text-sm uppercase tracking-wider font-semibold mb-1">Email hỗ trợ</div>
                  <div className="text-lg font-bold text-[#0F1B2D]">hello@checkee.vn</div>
                </div>
              </div>
              
              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-8 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#D9EEF5] flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-[#0B4F6C]" />
                </div>
                <div>
                  <div className="text-[#7D9E94] text-sm uppercase tracking-wider font-semibold mb-1">Văn phòng TP.HCM</div>
                  <div className="text-base font-medium text-[#0F1B2D] leading-relaxed">
                    Tầng 12, Tòa nhà Viettel<br/>
                    285 Cách Mạng Tháng Tám, Quận 10
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-8 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#D4EDE6] flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-[#1A6B52]" />
                </div>
                <div>
                  <div className="text-[#7D9E94] text-sm uppercase tracking-wider font-semibold mb-1">Giờ làm việc</div>
                  <div className="text-base font-medium text-[#0F1B2D]">
                    Thứ Hai - Thứ Sáu<br/>
                    08:00 - 17:30
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}