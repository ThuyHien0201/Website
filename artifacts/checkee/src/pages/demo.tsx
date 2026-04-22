import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";

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
    <div className="min-h-[100dvh] bg-[#060B25] flex flex-col py-32 font-sans text-white">
      <div className="container px-6 md:px-12 max-w-[800px] mx-auto flex-1 flex flex-col pt-10">
        
        {/* Progress */}
        <div className="mb-24 flex items-center justify-between text-[10px] tracking-[0.2em] uppercase font-normal">
          <div className={`transition-colors duration-500 ${step >= 1 ? "text-[#83776D]" : "text-white/20"}`}>
            01. Thông tin
          </div>
          <div className="flex-1 h-[1px] bg-white/10 mx-6" />
          <div className={`transition-colors duration-500 ${step >= 2 ? "text-[#83776D]" : "text-white/20"}`}>
            02. Phân loại
          </div>
          <div className="flex-1 h-[1px] bg-white/10 mx-6" />
          <div className={`transition-colors duration-500 ${step >= 3 ? "text-[#83776D]" : "text-white/20"}`}>
            03. Khởi tạo
          </div>
        </div>

        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="space-y-16"
              >
                <div className="space-y-4 text-center">
                  <h2 className="text-3xl font-normal text-white">Định danh <span className="italic font-light text-[#B8B5AE]">sản phẩm</span></h2>
                  <p className="text-[#B8B5AE] text-[13px]">Thiết lập các trường thông tin cơ sở.</p>
                </div>

                <div className="space-y-10 max-w-lg mx-auto bg-[#0A1130] p-10 rounded-md border border-white/5">
                  <div className="space-y-2">
                    <Label htmlFor="productName" className="text-[10px] uppercase tracking-[0.15em] text-[#83776D]">Danh xưng sản phẩm</Label>
                    <Input 
                      id="productName" 
                      value={formData.productName}
                      onChange={e => setFormData({...formData, productName: e.target.value})}
                      className="h-12 rounded-none border-t-0 border-x-0 border-b border-white/20 bg-transparent px-0 text-white focus-visible:ring-0 focus-visible:border-[#83776D] transition-colors shadow-none text-[15px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-[10px] uppercase tracking-[0.15em] text-[#83776D]">Nhà chế tác / Phân phối</Label>
                    <Input 
                      id="company" 
                      value={formData.company}
                      onChange={e => setFormData({...formData, company: e.target.value})}
                      className="h-12 rounded-none border-t-0 border-x-0 border-b border-white/20 bg-transparent px-0 text-white focus-visible:ring-0 focus-visible:border-[#83776D] transition-colors shadow-none text-[15px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="batchId" className="text-[10px] uppercase tracking-[0.15em] text-[#83776D]">Mã lô</Label>
                    <Input 
                      id="batchId" 
                      value={formData.batchId}
                      onChange={e => setFormData({...formData, batchId: e.target.value})}
                      className="h-12 rounded-none border-t-0 border-x-0 border-b border-white/20 bg-transparent px-0 text-white focus-visible:ring-0 focus-visible:border-[#83776D] transition-colors shadow-none text-[15px]"
                    />
                  </div>
                </div>

                <div className="pt-8 flex justify-center">
                  <Button onClick={handleNext} className="h-12 px-10 rounded-md bg-[#83776D] text-white tracking-[0.15em] uppercase text-[11px] hover:bg-[#83776D]/90 transition-all duration-300">
                    Tiếp bước <ArrowRight className="ml-3 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="space-y-16"
              >
                <div className="space-y-4 text-center">
                  <h2 className="text-3xl font-normal text-white">Hình thái <span className="italic font-light text-[#B8B5AE]">định danh</span></h2>
                  <p className="text-[#B8B5AE] text-[13px]">Lựa chọn giao thức hiển thị tương ứng.</p>
                </div>

                <div className="max-w-lg mx-auto space-y-3">
                  {[
                    { id: "trace", label: "Trace", desc: "Truy xuất nguồn gốc (TT 02/2024)" },
                    { id: "elabel", label: "E-label", desc: "Nhãn điện tử (NĐ 37/2026)" },
                    { id: "dpp", label: "DPP", desc: "Hộ chiếu số (EU ESPR)" },
                    { id: "fnb", label: "F&B", desc: "Lưu mẫu ẩm thực (QĐ 1246)" },
                    { id: "temphu", label: "Tem phụ", desc: "Hàng nhập khẩu (NĐ 37)" },
                  ].map((type) => (
                    <div 
                      key={type.id} 
                      onClick={() => setFormData({...formData, qrType: type.id})}
                      className={`p-6 rounded-md border cursor-pointer transition-all duration-300 flex justify-between items-center ${formData.qrType === type.id ? 'border-[#83776D] bg-[#0A1130]' : 'border-white/10 hover:border-white/30 bg-transparent'}`}
                    >
                      <div>
                        <div className={`text-[15px] font-normal mb-1 ${formData.qrType === type.id ? 'text-white' : 'text-[#B8B5AE]'}`}>{type.label}</div>
                        <div className="text-[12px] text-[#B8B5AE]/60 font-light">{type.desc}</div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.qrType === type.id ? 'border-[#83776D]' : 'border-white/20'}`}>
                        {formData.qrType === type.id && <div className="w-2 h-2 bg-[#83776D] rounded-full" />}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between max-w-lg mx-auto pt-8">
                  <Button variant="ghost" onClick={handleBack} className="h-12 px-0 hover:bg-transparent text-[#B8B5AE] hover:text-white tracking-[0.15em] uppercase text-[11px] transition-colors">
                    <ArrowLeft className="mr-3 h-4 w-4" /> Trở lại
                  </Button>
                  <Button onClick={handleNext} className="h-12 px-10 rounded-md bg-[#83776D] text-white tracking-[0.15em] uppercase text-[11px] hover:bg-[#83776D]/90 transition-all duration-300">
                    Khởi tạo <ArrowRight className="ml-3 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-16"
              >
                <div className="space-y-4 text-center">
                  <div className="text-[11px] uppercase tracking-[0.15em] text-[#83776D]">Hoàn tất</div>
                  <h2 className="text-3xl font-normal text-white">Dấu ấn <span className="italic font-light text-[#B8B5AE]">điện tử</span></h2>
                </div>

                <div className="flex justify-center">
                  <div className="p-8 bg-white rounded-sm shadow-2xl relative">
                    <QRCodeSVG 
                      value={demoUrl} 
                      size={200}
                      bgColor={"#ffffff"}
                      fgColor={"#060B25"}
                      level={"H"}
                      includeMargin={false}
                    />
                  </div>
                </div>
                
                <div className="max-w-sm mx-auto text-center space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-xl font-normal text-white">{formData.productName}</h3>
                    <p className="text-[#B8B5AE] text-[13px]">{formData.company}</p>
                  </div>
                  
                  <div className="flex flex-col gap-4 hairline-t pt-8">
                    <Button variant="outline" className="w-full h-12 rounded-md bg-transparent border-white/20 text-white hover:bg-white hover:text-[#060B25] tracking-[0.15em] uppercase text-[11px] transition-all duration-300">
                      <Download className="mr-3 h-4 w-4" /> Tải mã định danh
                    </Button>
                    <Button variant="ghost" onClick={() => setStep(1)} className="w-full h-12 rounded-md text-[#B8B5AE] hover:text-white hover:bg-transparent tracking-[0.15em] uppercase text-[11px] transition-colors">
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