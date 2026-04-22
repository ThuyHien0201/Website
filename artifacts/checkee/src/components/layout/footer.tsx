import { Link } from "wouter";
import logoPng from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-background pt-32 pb-16 border-t border-border/40">
      <div className="container px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-24">
          <div className="md:col-span-4 space-y-8">
            <img src={logoPng} alt="Checkee Logo" className="h-10 object-contain" />
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs font-light">
              Giải pháp QR thông minh nâng tầm thương hiệu Việt. Sự minh bạch đích thực là sự sang trọng cao nhất.
            </p>
            <div className="text-sm font-medium tracking-widest uppercase text-foreground">
              Hotline: 1900 1234
            </div>
          </div>
          
          <div className="md:col-span-2 md:col-start-7">
            <h3 className="font-serif italic text-lg mb-6 text-foreground/80">Sản phẩm</h3>
            <ul className="space-y-4 text-sm text-muted-foreground font-light">
              <li><Link href="/trace" className="hover:text-accent transition-colors">Trace</Link></li>
              <li><Link href="/e-label" className="hover:text-accent transition-colors">E-label</Link></li>
              <li><Link href="/dpp" className="hover:text-accent transition-colors">DPP</Link></li>
              <li><Link href="/fnb" className="hover:text-accent transition-colors">F&B</Link></li>
              <li><Link href="/tem-phu" className="hover:text-accent transition-colors">Tem phụ</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="font-serif italic text-lg mb-6 text-foreground/80">Công ty</h3>
            <ul className="space-y-4 text-sm text-muted-foreground font-light">
              <li><Link href="/about" className="hover:text-accent transition-colors">Câu chuyện</Link></li>
              <li><Link href="/blog" className="hover:text-accent transition-colors">Tạp chí</Link></li>
              <li><Link href="/pricing" className="hover:text-accent transition-colors">Bảng giá</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Liên hệ</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="font-serif italic text-lg mb-6 text-foreground/80">Pháp lý</h3>
            <ul className="space-y-4 text-sm text-muted-foreground font-light">
              <li><Link href="#" className="hover:text-accent transition-colors">Điều khoản</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Bảo mật</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground tracking-widest uppercase">
          <div>&copy; {new Date().getFullYear()} Checkee.</div>
          <div>Thiết kế cho người Việt.</div>
        </div>
      </div>
    </footer>
  );
}
