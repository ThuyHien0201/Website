import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, QrCode as QrCodeIcon, Download, Plus, Trash2 } from "lucide-react";
import { CtaButton } from "@/components/ui/cta-button";
import { QRCodeCanvas } from "qrcode.react";
import logoPng from "@/assets/logo.png";

export default function Demo() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "", brand: "", category: "Thực phẩm", description: "",
    region: "", productionDate: "", expiryDate: "", batch: "",
    certs: [] as string[],
    gtin: "",
    journey: [
      { name: "Thu hoạch", location: "Lâm Đồng", date: "", desc: "Hái thủ công khi quả chín đỏ" },
      { name: "Sản xuất", location: "TP HCM", date: "", desc: "Rang tay theo công thức truyền thống" },
      { name: "Vận chuyển", location: "", date: "", desc: "Đóng gói chân không, vận chuyển lạnh" },
    ]
  });

  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current.querySelector('canvas');
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `QR-${formData.name || 'Checkee'}.png`;
    a.click();
  };

  const steps = [
    { id: 1, label: "Sản phẩm" },
    { id: 2, label: "Nguồn gốc" },
    { id: 3, label: "Chứng nhận" },
    { id: 4, label: "Hành trình" },
    { id: 5, label: "Hoàn tất" }
  ];

  const previewParams = new URLSearchParams({
    name: formData.name,
    company: formData.brand,
  }).toString();
  
  const previewUrl = `${window.location.origin}/demo-preview?${previewParams}`;

  return (
    <div className="min-h-[100dvh] bg-white flex flex-col font-sans">
      {/* Top header section */}
      <section className="py-16 bg-gradient-to-b from-[#FAFBFC] to-white border-b border-[#E5EAF0]">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-5xl font-bold text-[#0B4F6C] mb-4">Tự tay tạo trang truy xuất chỉ trong 2 phút</h1>
          <p className="text-[#4A5868] text-lg max-w-2xl mx-auto">
            Nhập thông tin sản phẩm và xem giao diện hiển thị ngay lập tức. Mã QR sẽ được tự động khởi tạo.
          </p>
        </div>
      </section>

      {/* Main 2-column section */}
      <section className="py-12 flex-1">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* LEFT (Form) */}
            <div className="lg:col-span-7">
              {/* Stepper */}
              <div className="flex items-center justify-between mb-10 relative">
                <div className="absolute left-0 top-5 w-full h-[2px] bg-[#E5EAF0] -z-10"></div>
                {steps.map((step) => {
                  const active = currentStep === step.id;
                  const completed = currentStep > step.id;
                  return (
                    <div key={step.id} className="flex flex-col items-center gap-2 bg-white px-2 relative">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                        active ? "bg-[#0B4F6C] text-white" : 
                        completed ? "bg-[#1A6B52] text-white" : "bg-[#E5EAF0] text-[#7D9E94]"
                      }`}>
                        {completed ? <CheckCircle2 className="w-5 h-5" /> : step.id}
                      </div>
                      <div className={`text-xs font-semibold ${active || completed ? "text-[#0B4F6C]" : "text-[#7D9E94]"}`}>
                        {step.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Form Card */}
              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-8 shadow-sm">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label className="text-[#0B4F6C] font-semibold">Tên sản phẩm <span className="text-red-500">*</span></Label>
                          <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="VD: Cà phê Robusta" />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[#0B4F6C] font-semibold">Thương hiệu</Label>
                          <Input value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} placeholder="VD: Mê Trang" />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[#0B4F6C] font-semibold">Ngành hàng</Label>
                          <select className="flex h-9 w-full rounded-md border border-[#E5EAF0] bg-transparent px-3 py-1 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1A7EA4] md:text-sm text-[#0F1B2D]" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                            <option>Thực phẩm</option>
                            <option>Đồ uống</option>
                            <option>Mỹ phẩm</option>
                            <option>Dệt may</option>
                            <option>Điện tử</option>
                            <option>Khác</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[#0B4F6C] font-semibold">Mô tả ngắn</Label>
                          <Textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Giới thiệu về sản phẩm..." />
                        </div>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label className="text-[#0B4F6C] font-semibold">Vùng sản xuất</Label>
                          <Input value={formData.region} onChange={e => setFormData({...formData, region: e.target.value})} placeholder="VD: Lâm Đồng, Việt Nam" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-[#0B4F6C] font-semibold">Ngày sản xuất</Label>
                            <Input type="date" value={formData.productionDate} onChange={e => setFormData({...formData, productionDate: e.target.value})} />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[#0B4F6C] font-semibold">Hạn sử dụng</Label>
                            <Input type="date" value={formData.expiryDate} onChange={e => setFormData({...formData, expiryDate: e.target.value})} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[#0B4F6C] font-semibold">Lô sản xuất / Batch</Label>
                          <Input value={formData.batch} onChange={e => setFormData({...formData, batch: e.target.value})} placeholder="VD: BATCH-2024-05" />
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-8">
                        <div>
                          <Label className="text-[#0B4F6C] font-semibold block mb-4">Chọn các chứng nhận sản phẩm đã đạt</Label>
                          <div className="grid grid-cols-2 gap-4">
                            {["VietGAP", "GlobalGAP", "ISO 22000", "HACCP", "USDA Organic", "EU Organic", "FDA", "Halal"].map(cert => {
                              const checked = formData.certs.includes(cert);
                              return (
                                <div 
                                  key={cert}
                                  onClick={() => {
                                    if(checked) setFormData({...formData, certs: formData.certs.filter(c => c !== cert)});
                                    else setFormData({...formData, certs: [...formData.certs, cert]});
                                  }}
                                  className={`border rounded-lg p-3 cursor-pointer flex items-center gap-3 transition-colors ${checked ? "border-[#1A6B52] bg-[#D4EDE6]" : "border-[#E5EAF0] hover:border-[#1A6B52]"}`}
                                >
                                  <div className={`w-5 h-5 rounded border flex items-center justify-center ${checked ? "bg-[#1A6B52] border-[#1A6B52]" : "border-[#7D9E94]"}`}>
                                    {checked && <CheckCircle2 className="w-3 h-3 text-white" />}
                                  </div>
                                  <span className={`text-sm font-medium ${checked ? "text-[#1A6B52]" : "text-[#4A5868]"}`}>{cert}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[#0B4F6C] font-semibold">GTIN / Barcode (Tuỳ chọn)</Label>
                          <Input value={formData.gtin} onChange={e => setFormData({...formData, gtin: e.target.value})} placeholder="Mã vạch quốc tế" />
                        </div>
                      </div>
                    )}

                    {currentStep === 4 && (
                      <div className="space-y-6">
                        <Label className="text-[#0B4F6C] font-semibold block">Hành trình sản phẩm</Label>
                        <div className="space-y-4">
                          {formData.journey.map((step, i) => (
                            <div key={i} className="p-4 border border-[#E5EAF0] rounded-xl bg-[#FAFBFC] relative group">
                              <button onClick={() => {
                                const nj = [...formData.journey];
                                nj.splice(i, 1);
                                setFormData({...formData, journey: nj});
                              }} className="absolute top-2 right-2 text-[#7D9E94] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="space-y-1">
                                  <Label className="text-xs text-[#4A5868]">Tên bước</Label>
                                  <Input value={step.name} onChange={e => {
                                    const nj = [...formData.journey]; nj[i].name = e.target.value; setFormData({...formData, journey: nj});
                                  }} />
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-xs text-[#4A5868]">Địa điểm</Label>
                                  <Input value={step.location} onChange={e => {
                                    const nj = [...formData.journey]; nj[i].location = e.target.value; setFormData({...formData, journey: nj});
                                  }} />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <Label className="text-xs text-[#4A5868]">Ngày thực hiện</Label>
                                  <Input type="date" value={step.date} onChange={e => {
                                    const nj = [...formData.journey]; nj[i].date = e.target.value; setFormData({...formData, journey: nj});
                                  }} />
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-xs text-[#4A5868]">Mô tả</Label>
                                  <Input value={step.desc} onChange={e => {
                                    const nj = [...formData.journey]; nj[i].desc = e.target.value; setFormData({...formData, journey: nj});
                                  }} />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button variant="outline" onClick={() => {
                          setFormData({...formData, journey: [...formData.journey, {name:"", location:"", date:"", desc:""}]});
                        }} className="w-full border-dashed border-2 text-[#1A7EA4] hover:bg-[#F0F9FF]"><Plus className="w-4 h-4 mr-2" /> Thêm bước</Button>
                      </div>
                    )}

                    {currentStep === 5 && (
                      <div className="text-center space-y-6 py-8">
                        <div className="w-20 h-20 bg-[#D4EDE6] text-[#1A6B52] rounded-full flex items-center justify-center mx-auto mb-6">
                          <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#0B4F6C]">Hoàn tất! Trang xác thực sẵn sàng</h2>
                        <p className="text-[#4A5868] text-sm max-w-sm mx-auto">Mã QR và liên kết đã được tạo. Bạn có thể tải QR và in lên bao bì sản phẩm.</p>
                        
                        <div className="flex flex-col gap-3 max-w-xs mx-auto pt-6">
                          <CtaButton className="w-full justify-center" onClick={handleDownload}>Tải mã QR</CtaButton>
                          <Button variant="outline" onClick={() => window.open(previewUrl, '_blank')} className="w-full border-[#0B4F6C] text-[#0B4F6C] hover:bg-[#FAFBFC]">Xem trang công khai</Button>
                          <Link href="/contact"><Button variant="outline" className="w-full border-[#E5EAF0] text-[#4A5868] hover:bg-[#FAFBFC]">Liên hệ tư vấn</Button></Link>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="flex justify-between items-center mt-10 pt-6 border-t border-[#E5EAF0]">
                  {currentStep > 1 && currentStep < 5 ? (
                    <Button variant="outline" onClick={() => setCurrentStep(s => s - 1)} className="text-[#4A5868] border-[#E5EAF0]">Quay lại</Button>
                  ) : <div />}
                  
                  {currentStep < 5 && (
                    <CtaButton onClick={() => setCurrentStep(s => s + 1)}>Tiếp tục</CtaButton>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT (Phone Preview) */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 h-fit">
              <div className="w-[340px] mx-auto h-[680px] rounded-[44px] bg-[#0B4F6C] p-3 shadow-2xl shadow-[#0B4F6C]/30 relative">
                <div className="bg-white rounded-[36px] overflow-hidden h-full overflow-y-auto relative custom-scrollbar flex flex-col">
                  {/* Status Bar */}
                  <div className="h-7 bg-[#0F1B2D] w-full shrink-0 flex justify-center items-center">
                    <div className="w-1/3 h-4 bg-black rounded-full absolute top-1.5" />
                  </div>
                  
                  <div className="flex-1 pb-10">
                    {/* Header */}
                    <div className="px-5 py-4 border-b border-[#E5EAF0] flex items-center justify-between bg-white shrink-0 sticky top-0 z-20">
                      <div className="flex items-center gap-2">
                        <img src={logoPng} className="h-5" alt="logo" />
                        <span className="text-base font-bold text-[#0B4F6C]">Checkee</span>
                      </div>
                      {formData.certs.length > 0 && (
                        <div className="bg-[#D4EDE6] text-[#1A6B52] px-2 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Đã xác thực
                        </div>
                      )}
                    </div>

                    {/* Hero */}
                    <div className="px-5 py-5 bg-white">
                      <h2 className="text-xl font-bold text-[#0F1B2D] mb-1">{formData.name || "Tên sản phẩm"}</h2>
                      <p className="text-sm text-[#7D9E94]">{formData.brand || "Thương hiệu"}</p>
                      <div className="mt-2 inline-block bg-[#D9EEF5] text-[#0B4F6C] px-2.5 py-1 rounded-full text-[11px] font-semibold">
                        {formData.category || "Ngành hàng"}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="px-5 py-3 bg-white">
                      <p className="text-sm text-[#4A5868] leading-relaxed whitespace-pre-wrap">
                        {formData.description || "Mô tả sản phẩm sẽ hiển thị ở đây..."}
                      </p>
                    </div>

                    {/* Origin */}
                    {(formData.region || formData.productionDate || formData.expiryDate || formData.batch) && (
                      <div className="px-5 py-4 bg-[#FAFBFC] border-y border-[#E5EAF0] mt-2">
                        <div className="uppercase text-[10px] text-[#7D9E94] font-bold mb-3">NGUỒN GỐC</div>
                        <div className="grid grid-cols-2 gap-3">
                          {formData.region && (
                            <div>
                              <div className="text-[10px] text-[#7D9E94] uppercase mb-0.5">Vùng SX</div>
                              <div className="text-sm text-[#0F1B2D] font-semibold">{formData.region}</div>
                            </div>
                          )}
                          {formData.productionDate && (
                            <div>
                              <div className="text-[10px] text-[#7D9E94] uppercase mb-0.5">Ngày SX</div>
                              <div className="text-sm text-[#0F1B2D] font-semibold">{formData.productionDate}</div>
                            </div>
                          )}
                          {formData.expiryDate && (
                            <div>
                              <div className="text-[10px] text-[#7D9E94] uppercase mb-0.5">HSD</div>
                              <div className="text-sm text-[#0F1B2D] font-semibold">{formData.expiryDate}</div>
                            </div>
                          )}
                          {formData.batch && (
                            <div>
                              <div className="text-[10px] text-[#7D9E94] uppercase mb-0.5">Lô</div>
                              <div className="text-sm text-[#0F1B2D] font-semibold">{formData.batch}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Certs */}
                    {formData.certs.length > 0 && (
                      <div className="px-5 py-4 bg-white border-b border-[#E5EAF0]">
                        <div className="uppercase text-[10px] text-[#7D9E94] font-bold mb-3">CHỨNG NHẬN</div>
                        <div className="flex flex-wrap gap-2">
                          {formData.certs.map(cert => (
                            <div key={cert} className="bg-[#1A6B52] text-white px-2.5 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1.5">
                              <CheckCircle2 className="w-3 h-3" /> {cert}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Journey */}
                    {formData.journey.some(j => j.name) && (
                      <div className="px-5 py-4 bg-[#FAFBFC] border-b border-[#E5EAF0]">
                        <div className="uppercase text-[10px] text-[#7D9E94] font-bold mb-4">HÀNH TRÌNH SẢN PHẨM</div>
                        <div className="space-y-4">
                          {formData.journey.filter(j => j.name).map((step, i) => (
                            <div key={i} className="flex gap-3 relative">
                              {i !== formData.journey.length - 1 && (
                                <div className="absolute left-[11px] top-6 bottom-[-20px] w-px bg-[#E5EAF0]" />
                              )}
                              <div className="w-6 h-6 rounded-full bg-[#1A6B52] text-white text-[10px] font-bold flex items-center justify-center shrink-0 relative z-10 mt-0.5">
                                {i + 1}
                              </div>
                              <div>
                                <div className="text-sm font-bold text-[#0F1B2D]">{step.name}</div>
                                {step.location && <div className="text-xs text-[#7D9E94] mb-1">{step.location}</div>}
                                {step.desc && <div className="text-xs text-[#4A5868]">{step.desc}</div>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* QR Footer */}
                    <div className="px-5 py-6 bg-[#0B4F6C] text-white text-center mt-auto">
                      <div className="bg-white p-2.5 rounded-lg w-fit mx-auto mb-3" ref={qrRef}>
                        <QRCodeCanvas value={previewUrl} size={80} fgColor="#0F1B2D" level="H" />
                      </div>
                      <div className="text-xs text-[#D9EEF5] mb-1">Quét mã QR để kiểm tra</div>
                      <div className="text-[10px] text-[#D9EEF5]/60">Powered by Checkee</div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center text-xs text-[#7D9E94] mt-4">Trang web di động sẽ hiển thị như trên thiết bị của khách hàng</p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}