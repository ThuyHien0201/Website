import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t bg-white pt-16 pb-8">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="font-serif text-2xl font-bold text-primary">Check<span className="text-foreground">ee</span></div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Giải pháp QR thông minh cho mọi sản phẩm Việt. Vì người tiêu dùng Việt.
            </p>
            <div className="text-sm font-medium">Hotline: 1900 1234</div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-base">Sản phẩm</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/trace" className="hover:text-primary">Checkee Trace</Link></li>
              <li><Link href="/e-label" className="hover:text-primary">Checkee E-label</Link></li>
              <li><Link href="/dpp" className="hover:text-primary">Checkee DPP</Link></li>
              <li><Link href="/fnb" className="hover:text-primary">Checkee F&B</Link></li>
              <li><Link href="/tem-phu" className="hover:text-primary">Checkee Tem phụ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-base">Công ty</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary">Về chúng tôi</Link></li>
              <li><Link href="/blog" className="hover:text-primary">Blog & Pháp lý</Link></li>
              <li><Link href="/pricing" className="hover:text-primary">Bảng giá</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Liên hệ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-base">Pháp lý</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary">Điều khoản sử dụng</Link></li>
              <li><Link href="#" className="hover:text-primary">Bảo mật thông tin</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Checkee. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
