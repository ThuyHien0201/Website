import { Link } from "wouter";
import logoPng from "@/assets/logo.png";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0c964b] pt-24 pb-12 border-t border-[#E5EAF0]/10">
      <div className="container px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20">
          <div className="md:col-span-4 space-y-8">
            <Link href="/" className="inline-block">
              <img src={logoPng} alt="Checkee Logo" className="h-9 object-contain brightness-0 invert" />
            </Link>
            <p className="text-[#dcf0e6] text-[14px] leading-relaxed max-w-sm font-normal">
              Giải pháp số hoá sản phẩm toàn diện. Vượt qua rào cản pháp lý khắt khe nhất bằng trải nghiệm thương hiệu hoàn mỹ và sự minh bạch tuyệt đối.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-[#dcf0e6] text-[14px]">
                <Phone className="w-5 h-5 text-[#0c964b]" />
                <span className="font-semibold text-white">Hotline: 1900 1234</span>
              </div>
              <div className="flex items-center gap-3 text-[#dcf0e6] text-[14px]">
                <Mail className="w-5 h-5 text-[#0c964b]" />
                <span>hello@checkee.vn</span>
              </div>
              <div className="flex items-start gap-3 text-[#dcf0e6] text-[14px]">
                <MapPin className="w-5 h-5 text-[#0c964b] shrink-0 mt-0.5" />
                <span>Tầng 12, Tòa nhà Viettel, 285 Cách Mạng Tháng Tám, Quận 10, TP.HCM</span>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2 md:col-start-7">
            <h3 className="font-bold text-[14px] text-white mb-6">Sản phẩm</h3>
            <ul className="space-y-4 text-[14px] text-[#dcf0e6]">
              <li><Link href="/trace" className="hover:text-white transition-colors">Checkee Trace</Link></li>
              <li><Link href="/e-label" className="hover:text-white transition-colors">Checkee E-label</Link></li>
              <li><Link href="/dpp" className="hover:text-white transition-colors">Checkee DPP</Link></li>
              <li><Link href="/fnb" className="hover:text-white transition-colors">Checkee F&B</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="font-bold text-[14px] text-white mb-6">Công ty</h3>
            <ul className="space-y-4 text-[14px] text-[#dcf0e6]">
              <li><Link href="/about" className="hover:text-white transition-colors">Về chúng tôi</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Bảng giá</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Liên hệ</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="font-bold text-[14px] text-white mb-6">Tài nguyên</h3>
            <ul className="space-y-4 text-[14px] text-[#dcf0e6]">
              <li><Link href="/blog" className="hover:text-white transition-colors">Tin tức & Cập nhật</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Tài liệu pháp lý</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Điều khoản dịch vụ</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Chính sách bảo mật</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-[#dcf0e6]/20 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-[#dcf0e6]">
          <div>&copy; {new Date().getFullYear()} Checkee Vietnam. Bảo lưu mọi quyền.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}