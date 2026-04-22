import { Link } from "wouter";
import logoPng from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-[#040613] pt-32 pb-16 border-t border-white/10">
      <div className="container px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-24">
          <div className="md:col-span-4 space-y-8">
            <img src={logoPng} alt="Checkee Logo" className="h-8 object-contain invert brightness-0" />
            <p className="text-[#B8B5AE] text-[13px] leading-relaxed max-w-xs font-normal">
              Giải pháp số hoá sản phẩm toàn diện. Vượt qua mọi rào cản pháp lý khắt khe nhất bằng một trải nghiệm thương hiệu hoàn mỹ.
            </p>
            <div className="text-[13px] font-medium tracking-widest uppercase text-white">
              Hotline: <span className="text-[#83776D]">1900 1234</span>
            </div>
          </div>
          
          <div className="md:col-span-2 md:col-start-7">
            <h3 className="font-normal text-[11px] uppercase tracking-[0.15em] text-[#83776D] mb-6">Sản phẩm</h3>
            <ul className="space-y-4 text-[13px] text-[#B8B5AE] font-normal">
              <li><Link href="/trace" className="hover:text-white transition-colors">Trace</Link></li>
              <li><Link href="/e-label" className="hover:text-white transition-colors">E-label</Link></li>
              <li><Link href="/dpp" className="hover:text-white transition-colors">DPP</Link></li>
              <li><Link href="/fnb" className="hover:text-white transition-colors">F&B</Link></li>
              <li><Link href="/tem-phu" className="hover:text-white transition-colors">Tem phụ</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="font-normal text-[11px] uppercase tracking-[0.15em] text-[#83776D] mb-6">Công ty</h3>
            <ul className="space-y-4 text-[13px] text-[#B8B5AE] font-normal">
              <li><Link href="/about" className="hover:text-white transition-colors">Câu chuyện</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Tạp chí</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Bảng giá</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Liên hệ</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="font-normal text-[11px] uppercase tracking-[0.15em] text-[#83776D] mb-6">Pháp lý</h3>
            <ul className="space-y-4 text-[13px] text-[#B8B5AE] font-normal">
              <li><Link href="#" className="hover:text-white transition-colors">Điều khoản</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Bảo mật</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-[#B8B5AE] tracking-[0.15em] uppercase">
          <div>&copy; {new Date().getFullYear()} Checkee.</div>
          <div>Thiết kế cho người Việt.</div>
        </div>
      </div>
    </footer>
  );
}