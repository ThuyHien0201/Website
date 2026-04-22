import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, MessageSquare } from "lucide-react";

export default function Contact() {
  return (
    <div className="flex flex-col w-full">
      <section className="pt-20 pb-16 md:pt-24 md:pb-24 bg-background">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            
            <div className="space-y-12">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
                  Liên hệ với Checkee
                </h1>
                <p className="text-lg text-muted-foreground">
                  Chúng tôi ở đây để giúp doanh nghiệp của bạn đáp ứng các tiêu chuẩn pháp lý mới nhất và nâng tầm thương hiệu.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary mt-1">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Hotline / Zalo</h3>
                    <p className="text-muted-foreground mb-1">Hỗ trợ nhanh chóng trong giờ hành chính</p>
                    <p className="font-medium text-foreground text-lg">1900 1234 — 0987 654 321</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary mt-1">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Email</h3>
                    <p className="text-muted-foreground mb-1">Gửi yêu cầu báo giá hoặc hợp tác</p>
                    <p className="font-medium text-foreground text-lg">hello@checkee.vn</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary mt-1">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Văn phòng</h3>
                    <p className="text-muted-foreground">Tầng 12, Tòa nhà Viettel, 285 Cách Mạng Tháng Tám, Phường 12, Quận 10, TP.HCM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border shadow-xl">
              <h2 className="text-2xl font-serif font-bold mb-6 flex items-center">
                <MessageSquare className="mr-3 h-6 w-6 text-primary" /> Đặt lịch tư vấn 1-1
              </h2>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <Label htmlFor="name">Họ và tên *</Label>
                  <Input id="name" placeholder="Nguyễn Văn A" className="h-12" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Tên doanh nghiệp *</Label>
                  <Input id="company" placeholder="Công ty TNHH..." className="h-12" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại *</Label>
                    <Input id="phone" placeholder="090..." className="h-12" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email@company.com" className="h-12" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interest">Sản phẩm quan tâm</Label>
                  <select id="interest" className="flex h-12 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="trace">Checkee Trace</option>
                    <option value="elabel">Checkee E-label</option>
                    <option value="dpp">Checkee DPP</option>
                    <option value="fnb">Checkee F&B</option>
                    <option value="tem">Checkee Tem Phụ</option>
                    <option value="other">Tư vấn tổng thể</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Ghi chú thêm</Label>
                  <Textarea id="message" placeholder="Mô tả ngắn gọn về quy mô hoặc vấn đề của bạn..." className="min-h-[100px]" />
                </div>

                <Button type="submit" className="w-full h-14 text-base">Gửi yêu cầu tư vấn</Button>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Bằng việc gửi form, bạn đồng ý với Điều khoản bảo mật của Checkee.
                </p>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
