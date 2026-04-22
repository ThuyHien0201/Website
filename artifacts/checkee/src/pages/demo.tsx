import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeft, ArrowRight, Download, Eye, QrCode } from "lucide-react";

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
    <div className="min-h-screen bg-accent/20 flex flex-col py-12 md:py-24">
      <div className="container px-4 md:px-6 max-w-4xl mx-auto flex-1 flex flex-col">
        
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-border -z-10" />
            {[1, 2, 3].map((num) => (
              <div key={num} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 bg-white transition-colors duration-300 ${
                step >= num ? 'border-primary text-primary' : 'border-muted-foreground/30 text-muted-foreground'
              }`}>
                {num}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-sm font-medium text-muted-foreground">
            <span className={step >= 1 ? "text-primary" : ""}>Điền thông tin</span>
            <span className={step >= 2 ? "text-primary" : ""}>Chọn loại QR</span>
            <span className={step >= 3 ? "text-primary" : ""}>Tạo & Quét</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-2xl border shadow-xl flex-1 p-6 md:p-12 overflow-hidden relative">
          <AnimatePresence mode="wait">
            
            {/* STEP 1 */}
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center space-y-2 mb-8">
                  <h2 className="text-2xl font-serif font-bold">Thông tin sản phẩm</h2>
                  <p className="text-muted-foreground">Nhập vài thông tin cơ bản để tạo trang demo</p>
                </div>

                <div className="space-y-4 max-w-md mx-auto">
                  <div className="space-y-2">
                    <Label htmlFor="productName">Tên sản phẩm / Món ăn</Label>
                    <Input 
                      id="productName" 
                      value={formData.productName}
                      onChange={e => setFormData({...formData, productName: e.target.value})}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Tên Đơn vị / Công ty</Label>
                    <Input 
                      id="company" 
                      value={formData.company}
                      onChange={e => setFormData({...formData, company: e.target.value})}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="batchId">Mã lô / Ca sản xuất</Label>
                    <Input 
                      id="batchId" 
                      value={formData.batchId}
                      onChange={e => setFormData({...formData, batchId: e.target.value})}
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="flex justify-end max-w-md mx-auto pt-8">
                  <Button onClick={handleNext} className="w-full md:w-auto h-12 px-8">
                    Tiếp tục <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center space-y-2 mb-8">
                  <h2 className="text-2xl font-serif font-bold">Chọn sản phẩm cần tạo</h2>
                  <p className="text-muted-foreground">Mỗi sản phẩm sẽ sinh ra một dạng QR và trang hiển thị khác nhau</p>
                </div>

                <RadioGroup 
                  value={formData.qrType} 
                  onValueChange={(val) => setFormData({...formData, qrType: val})}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto"
                >
                  {[
                    { id: "trace", label: "Trace (TT 02/2024)", color: "#1D9E75" },
                    { id: "elabel", label: "E-label (NĐ 37/2026)", color: "#0C447C" },
                    { id: "dpp", label: "DPP (EU ESPR)", color: "#3C3489" },
                    { id: "fnb", label: "F&B (QĐ 1246)", color: "#854F0B" },
                    { id: "temphu", label: "Tem phụ (NĐ 37)", color: "#712B13" },
                  ].map((type) => (
                    <div key={type.id}>
                      <RadioGroupItem value={type.id} id={type.id} className="peer sr-only" />
                      <Label
                        htmlFor={type.id}
                        className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                        style={{ '--tw-ring-color': type.color } as any}
                      >
                        <QrCode className="mb-3 h-6 w-6" style={{ color: type.color }} />
                        <span className="font-semibold">{type.label}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="flex justify-between max-w-2xl mx-auto pt-8">
                  <Button variant="ghost" onClick={handleBack} className="h-12 px-6">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại
                  </Button>
                  <Button onClick={handleNext} className="h-12 px-8 bg-primary">
                    Tạo QR ngay <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                <div className="text-center space-y-2 mb-8">
                  <h2 className="text-2xl font-serif font-bold text-primary">Tạo QR Thành công!</h2>
                  <p className="text-muted-foreground">Sử dụng điện thoại để quét mã bên dưới và xem trang hiển thị thực tế</p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-3xl mx-auto">
                  <div className="bg-white p-6 rounded-2xl shadow-lg border flex flex-col items-center space-y-4">
                    <div className="bg-white p-4 border rounded-xl">
                      <QRCodeSVG 
                        value={demoUrl} 
                        size={200}
                        bgColor={"#ffffff"}
                        fgColor={"#1A1A18"}
                        level={"H"}
                        includeMargin={false}
                      />
                    </div>
                    <Button variant="outline" className="w-full">
                      <Download className="mr-2 h-4 w-4" /> Tải PNG
                    </Button>
                  </div>
                  
                  <div className="space-y-6 text-center md:text-left flex-1">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{formData.productName}</h3>
                      <p className="text-muted-foreground">{formData.company}</p>
                    </div>
                    <div className="p-4 bg-accent/50 rounded-xl space-y-2 text-sm border">
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Sản phẩm:</span>
                        <span className="font-semibold uppercase text-primary">{formData.qrType}</span>
                      </div>
                      <div className="flex justify-between pt-1">
                        <span className="text-muted-foreground">Mã lô/ca:</span>
                        <span className="font-medium">{formData.batchId}</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 space-y-3">
                      <Button className="w-full h-12" variant="default">
                        <Eye className="mr-2 h-4 w-4" /> Xem trực tiếp trên máy tính
                      </Button>
                      <Button variant="ghost" onClick={() => setStep(1)} className="w-full">
                        Tạo mã mới
                      </Button>
                    </div>
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
