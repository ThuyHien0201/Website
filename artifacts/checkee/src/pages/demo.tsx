import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeft, ArrowRight, Download, Eye } from "lucide-react";

export default function Demo() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    productName: "Cà phê Robusta Măng Đen",
    company: "HTX Nông nghiệp Măng Đen",
    qrType: "trace",
    batchId: "B-2026-04"
  });

  const handleNext = () => setStep(s => Math.min(s + 1, 3));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));
  
  const demoUrl = `${window.location.origin}/demo/preview/${formData.qrType}?name=${encodeURIComponent(formData.productName)}&company=${encodeURIComponent(formData.company)}`;

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col py-32 border-b border-border/40">
      <div className="container px-6 md:px-12 max-w-3xl mx-auto flex-1 flex flex-col">
        
        {/* Progress */}
        <div className="mb-24 flex items-center justify-between text-xs tracking-[0.2em] uppercase font-medium">
          <div className={`transition-colors duration-500 ${step >= 1 ? "text-primary" : "text-muted-foreground/30"}`}>
            01. Thông tin
          </div>
          <div className="flex-1 h-px bg-border/40 mx-4" />
          <div className={`transition-colors duration-500 ${step >= 2 ? "text-primary" : "text-muted-foreground/30"}`}>
            02. Phân loại
          </div>
          <div className="flex-1 h-px bg-border/40 mx-4" />
          <div className={`transition-colors duration-500 ${step >= 3 ? "text-primary" : "text-muted-foreground/30"}`}>
            03. Khởi tạo
          </div>
        </div>

        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            
            {/* STEP 1 */}
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="space-y-16"
              >
                <div className="space-y-6 text-center">
                  <h2 className="text-4xl md:text-5xl font-serif text-primary">Định danh sản phẩm</h2>
                  <p className="text-muted-foreground font-light text-lg">Thiết lập các trường thông tin cơ sở cho định danh điện tử.</p>
                </div>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <Label htmlFor="productName" className="text-xs uppercase tracking-widest text-muted-foreground">Danh xưng sản phẩm</Label>
                    <Input 
                      id="productName" 
                      value={formData.productName}
                      onChange={e => setFormData({...formData, productName: e.target.value})}
                      className="h-14 rounded-none border-t-0 border-x-0 border-b border-border/60 bg-transparent px-0 text-xl focus-visible:ring-0 focus-visible:border-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="company" className="text-xs uppercase tracking-widest text-muted-foreground">Nhà chế tác / Phân phối</Label>
                    <Input 
                      id="company" 
                      value={formData.company}
                      onChange={e => setFormData({...formData, company: e.target.value})}
                      className="h-14 rounded-none border-t-0 border-x-0 border-b border-border/60 bg-transparent px-0 text-xl focus-visible:ring-0 focus-visible:border-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="batchId" className="text-xs uppercase tracking-widest text-muted-foreground">Mã định danh lô</Label>
                    <Input 
                      id="batchId" 
                      value={formData.batchId}
                      onChange={e => setFormData({...formData, batchId: e.target.value})}
                      className="h-14 rounded-none border-t-0 border-x-0 border-b border-border/60 bg-transparent px-0 text-xl focus-visible:ring-0 focus-visible:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-12 text-center">
                  <Button onClick={handleNext} className="h-14 px-12 rounded-none bg-primary text-primary-foreground tracking-widest uppercase text-xs hover:bg-primary/90 transition-all duration-500">
                    Tiếp bước <ArrowRight className="ml-3 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="space-y-16"
              >
                <div className="space-y-6 text-center">
                  <h2 className="text-4xl md:text-5xl font-serif text-primary">Hình thái định danh</h2>
                  <p className="text-muted-foreground font-light text-lg">Lựa chọn giao thức hiển thị tương ứng với mục đích pháp lý.</p>
                </div>

                <RadioGroup 
                  value={formData.qrType} 
                  onValueChange={(val) => setFormData({...formData, qrType: val})}
                  className="space-y-0 border-y border-border/40"
                >
                  {[
                    { id: "trace", label: "Trace", desc: "Truy xuất nguồn gốc (TT 02/2024)" },
                    { id: "elabel", label: "E-label", desc: "Nhãn điện tử (NĐ 37/2026)" },
                    { id: "dpp", label: "DPP", desc: "Hộ chiếu số (EU ESPR)" },
                    { id: "fnb", label: "F&B", desc: "Lưu mẫu ẩm thực (QĐ 1246)" },
                    { id: "temphu", label: "Tem phụ", desc: "Hàng nhập khẩu (NĐ 37)" },
                  ].map((type) => (
                    <div key={type.id} className="relative">
                      <RadioGroupItem value={type.id} id={type.id} className="peer sr-only" />
                      <Label
                        htmlFor={type.id}
                        className="flex items-baseline justify-between py-6 cursor-pointer group"
                      >
                        <div className="flex items-baseline gap-6">
                          <div className={`w-3 h-3 rounded-full border border-primary transition-colors ${formData.qrType === type.id ? 'bg-primary' : 'bg-transparent group-hover:border-primary/50'}`} />
                          <span className={`text-2xl font-serif transition-colors ${formData.qrType === type.id ? 'text-primary' : 'text-muted-foreground group-hover:text-primary/70'}`}>
                            {type.label}
                          </span>
                        </div>
                        <span className={`text-sm font-light italic transition-colors ${formData.qrType === type.id ? 'text-primary' : 'text-muted-foreground'}`}>
                          {type.desc}
                        </span>
                      </Label>
                      <div className="absolute bottom-0 left-0 w-full h-px bg-border/40" />
                    </div>
                  ))}
                </RadioGroup>

                <div className="flex justify-between pt-12">
                  <Button variant="ghost" onClick={handleBack} className="h-14 px-0 hover:bg-transparent text-muted-foreground hover:text-primary tracking-widest uppercase text-xs transition-colors">
                    <ArrowLeft className="mr-3 h-4 w-4" /> Trở lại
                  </Button>
                  <Button onClick={handleNext} className="h-14 px-12 rounded-none bg-primary text-primary-foreground tracking-widest uppercase text-xs hover:bg-primary/90 transition-all duration-500">
                    Khởi tạo <ArrowRight className="ml-3 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-16"
              >
                <div className="space-y-6 text-center">
                  <div className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">Khởi tạo hoàn tất</div>
                  <h2 className="text-4xl md:text-5xl font-serif text-primary">Dấu ấn điện tử</h2>
                  <p className="text-muted-foreground font-light text-lg">Quét mã dưới đây bằng thiết bị di động để chiêm ngưỡng tác phẩm.</p>
                </div>

                <div className="flex justify-center">
                  <div className="p-8 bg-white border border-border/40 shadow-2xl relative">
                    <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary -translate-x-1 -translate-y-1" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary translate-x-1 -translate-y-1" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary -translate-x-1 translate-y-1" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary translate-x-1 translate-y-1" />
                    <QRCodeSVG 
                      value={demoUrl} 
                      size={240}
                      bgColor={"#ffffff"}
                      fgColor={"#0E1217"}
                      level={"H"}
                      includeMargin={false}
                    />
                  </div>
                </div>
                
                <div className="max-w-md mx-auto text-center space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif text-primary">{formData.productName}</h3>
                    <p className="text-muted-foreground font-light">{formData.company}</p>
                  </div>
                  
                  <div className="flex flex-col gap-4 pt-8 border-t border-border/40">
                    <Button variant="outline" className="w-full h-14 rounded-none border-foreground/20 text-foreground tracking-widest uppercase text-xs hover:bg-foreground hover:text-background transition-all duration-500">
                      <Download className="mr-3 h-4 w-4" /> Tải mã định danh
                    </Button>
                    <Button variant="ghost" onClick={() => setStep(1)} className="w-full h-14 rounded-none text-muted-foreground tracking-widest uppercase text-xs hover:text-primary transition-colors">
                      Khởi tạo mã mới
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
