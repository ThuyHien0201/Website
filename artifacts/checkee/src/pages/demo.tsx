import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, QrCode as QrCodeIcon, Download, Plus, Trash2, Lock, Upload, ImageIcon } from "lucide-react";
import { CtaButton } from "@/components/ui/cta-button";
import { QRCodeCanvas } from "qrcode.react";
import logoPng from "@/assets/logo.png";
import { useAuth } from "@/context/auth-context";

const CERT_OPTIONS = ["VietGAP", "GlobalGAP", "ISO 22000", "HACCP", "USDA Organic", "EU Organic", "FDA", "Halal"];

export default function Demo() {
  const { user, demoQuota, consumeDemoQuota, openLoginModal, openPricingModal, pendingProduct } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "", gtin: "", batch: "", imageName: "", description: "",
    category: "Thực phẩm", spec: "", unit: "kg", weight: "", productExpiry: "",
    region: "", productionDate: "",
    certs: [] as string[], certFiles: [] as { certName: string; fileName: string }[],
    journey: [
      { name: "Thu hoạch", location: "Lâm Đồng", date: "", desc: "Hái thủ công khi quả chín đỏ" },
      { name: "Sản xuất", location: "TP HCM", date: "", desc: "Rang tay theo công thức truyền thống" },
      { name: "Vận chuyển", location: "", date: "", desc: "Đóng gói chân không, vận chuyển lạnh" },
    ],
  });

  const imageInputRef = useRef<HTMLInputElement>(null);
  const certFileInputRef = useRef<HTMLInputElement>(null);
  const [pendingCertName, setPendingCertName] = useState("");
  const [customCertName, setCustomCertName] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pendingProduct) setFormData(f => ({ ...f, name: pendingProduct }));
  }, [pendingProduct]);

  const handleDownload = () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current.querySelector("canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `QR-${formData.name || "Checkee"}.png`;
    a.click();
  };

  const steps = [
    { id: 1, label: "Sản phẩm" },
    { id: 2, label: "Nguồn gốc" },
    { id: 3, label: "Hành trình" },
  ];

  const previewUrl = `${window.location.origin}/demo-preview?name=${encodeURIComponent(formData.name)}&company=${encodeURIComponent(formData.gtin)}`;

  const handleNext = () => {
    if (currentStep === 3) {
      if (!user) {
        openLoginModal({ redirect: "/demo" });
        return;
      }
      if (demoQuota <= 0) {
        openPricingModal();
        return;
      }
      const ok = consumeDemoQuota(formData.name || "Sản phẩm demo");
      if (!ok) {
        openPricingModal();
        return;
      }
    }
    setCurrentStep(s => Math.min(s + 1, 4));
  };

  const toggleCert = (cert: string) => {
    setFormData(f => ({
      ...f,
      certs: f.certs.includes(cert) ? f.certs.filter(c => c !== cert) : [...f.certs, cert],
    }));
  };

  const handleCertFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const certName = pendingCertName || customCertName || "Chứng nhận";
    setFormData(f => ({
      ...f,
      certFiles: [...f.certFiles, { certName, fileName: file.name }],
    }));
    setPendingCertName("");
    setCustomCertName("");
    e.target.value = "";
  };

  const removeCertFile = (idx: number) => {
    setFormData(f => ({ ...f, certFiles: f.certFiles.filter((_, i) => i !== idx) }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFormData(f => ({ ...f, imageName: file.name }));
  };

  return (
    <div className="min-h-[100dvh] bg-white flex flex-col font-sans">
      <section className="py-14 bg-gradient-to-b from-[#FAFBFC] to-white border-b border-[#E5EAF0]">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-5xl font-bold text-[#0B4F6C] mb-4">Tự tay tạo trang truy xuất chỉ trong 2 phút</h1>
          <p className="text-[#4A5868] text-lg max-w-2xl mx-auto">Nhập thông tin sản phẩm và xem giao diện hiển thị ngay. Mã QR được tạo tự động.</p>
          {user && (
            <div className={`inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full text-sm font-semibold ${demoQuota > 0 ? "bg-[#D4EDE6] text-[#1A6B52]" : "bg-[#FFF3E8] text-[#C45B17]"}`}>
              {demoQuota > 0
                ? <><QrCodeIcon className="w-4 h-4" /> Còn {demoQuota > 100 ? "không giới hạn" : demoQuota} lượt tạo QR miễn phí</>
                : <><Lock className="w-4 h-4" /> Đã hết lượt — Vui lòng nâng cấp gói</>}
            </div>
          )}
        </div>
      </section>

      <section className="py-12 flex-1">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">

            {/* LEFT: Form */}
            <div className="lg:col-span-7">
              {/* Stepper — only show for steps 1-3 */}
              {currentStep <= 3 && (
                <div className="flex items-center justify-between mb-10 relative">
                  <div className="absolute left-0 top-5 w-full h-[2px] bg-[#E5EAF0] -z-10" />
                  {steps.map(step => {
                    const active = currentStep === step.id;
                    const completed = currentStep > step.id;
                    return (
                      <div key={step.id} className="flex flex-col items-center gap-2 bg-white px-2 relative">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${active ? "bg-[#0B4F6C] text-white" : completed ? "bg-[#1A6B52] text-white" : "bg-[#E5EAF0] text-[#7D9E94]"}`}>
                          {completed ? <CheckCircle2 className="w-5 h-5" /> : step.id}
                        </div>
                        <div className={`text-xs font-semibold ${active || completed ? "text-[#0B4F6C]" : "text-[#7D9E94]"}`}>{step.label}</div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-8 shadow-sm">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >

                    {/* STEP 1: Product Info */}
                    {currentStep === 1 && (
                      <div className="space-y-5">
                        <h3 className="text-lg font-bold text-[#0B4F6C] mb-1">Thông tin sản phẩm</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="sm:col-span-2 space-y-1.5">
                            <Label className="text-[#0B4F6C] font-semibold">Tên sản phẩm <span className="text-red-500">*</span></Label>
                            <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="VD: Cà phê Robusta Đà Lạt" />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-[#0B4F6C] font-semibold">Mã GTIN / Barcode</Label>
                            <Input value={formData.gtin} onChange={e => setFormData({...formData, gtin: e.target.value})} placeholder="VD: 8934563012345" />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-[#0B4F6C] font-semibold">Lô / Mẻ sản xuất</Label>
                            <Input value={formData.batch} onChange={e => setFormData({...formData, batch: e.target.value})} placeholder="VD: BATCH-2026-05" />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-[#0B4F6C] font-semibold">Ngành hàng</Label>
                            <select className="flex h-9 w-full rounded-md border border-[#E5EAF0] bg-transparent px-3 py-1 text-sm text-[#0F1B2D] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1A7EA4]" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                              {["Thực phẩm","Đồ uống","Mỹ phẩm","Dệt may","Điện tử","Nông sản","Khác"].map(c => <option key={c}>{c}</option>)}
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-[#0B4F6C] font-semibold">Quy cách đóng gói</Label>
                            <Input value={formData.spec} onChange={e => setFormData({...formData, spec: e.target.value})} placeholder="VD: Hộp 12 gói x 20g" />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-[#0B4F6C] font-semibold">Đơn vị tính</Label>
                            <select className="flex h-9 w-full rounded-md border border-[#E5EAF0] bg-transparent px-3 py-1 text-sm text-[#0F1B2D] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1A7EA4]" value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})}>
                              {["kg","g","lít","ml","hộp","gói","thùng","cái","bộ"].map(u => <option key={u}>{u}</option>)}
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-[#0B4F6C] font-semibold">Khối lượng / Dung tích</Label>
                            <Input value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} placeholder="VD: 250" />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-[#0B4F6C] font-semibold">Hạn sử dụng</Label>
                            <Input type="date" value={formData.productExpiry} onChange={e => setFormData({...formData, productExpiry: e.target.value})} />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-[#0B4F6C] font-semibold">Mô tả sản phẩm</Label>
                          <Textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Giới thiệu về sản phẩm..." />
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-[#0B4F6C] font-semibold">Hình ảnh sản phẩm</Label>
                          <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                          <button
                            type="button"
                            onClick={() => imageInputRef.current?.click()}
                            className="w-full h-24 border-2 border-dashed border-[#E5EAF0] rounded-xl flex flex-col items-center justify-center gap-2 hover:border-[#1A7EA4] hover:bg-[#F0F9FF] transition-colors text-[#7D9E94]"
                          >
                            {formData.imageName ? (
                              <><ImageIcon className="w-6 h-6 text-[#1A7EA4]" /><span className="text-sm text-[#0B4F6C] font-medium">{formData.imageName}</span></>
                            ) : (
                              <><Upload className="w-6 h-6" /><span className="text-sm">Nhấn để tải lên hình ảnh</span></>
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: Origin + Certs */}
                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <h3 className="text-lg font-bold text-[#0B4F6C] mb-1">Nguồn gốc & Chứng nhận</h3>

                        <div className="space-y-4">
                          <div className="space-y-1.5">
                            <Label className="text-[#0B4F6C] font-semibold">Vùng / Địa chỉ sản xuất</Label>
                            <Input value={formData.region} onChange={e => setFormData({...formData, region: e.target.value})} placeholder="VD: Lâm Đồng, Việt Nam" />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-[#0B4F6C] font-semibold">Ngày sản xuất</Label>
                            <Input type="date" value={formData.productionDate} onChange={e => setFormData({...formData, productionDate: e.target.value})} />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-[#0B4F6C] font-semibold block">Chứng nhận sản phẩm đã đạt</Label>
                          <div className="grid grid-cols-2 gap-3">
                            {CERT_OPTIONS.map(cert => {
                              const checked = formData.certs.includes(cert);
                              return (
                                <div
                                  key={cert}
                                  onClick={() => toggleCert(cert)}
                                  className={`border rounded-xl p-3 cursor-pointer flex items-center gap-2.5 transition-colors ${checked ? "border-[#1A6B52] bg-[#D4EDE6]" : "border-[#E5EAF0] hover:border-[#1A6B52]"}`}
                                >
                                  <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${checked ? "bg-[#1A6B52] border-[#1A6B52]" : "border-[#7D9E94]"}`}>
                                    {checked && <CheckCircle2 className="w-3 h-3 text-white" />}
                                  </div>
                                  <span className={`text-sm font-medium ${checked ? "text-[#1A6B52]" : "text-[#4A5868]"}`}>{cert}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-[#0B4F6C] font-semibold block">Upload file chứng nhận</Label>
                          <input ref={certFileInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleCertFileUpload} />
                          <div className="flex gap-2">
                            <Input
                              value={customCertName}
                              onChange={e => setCustomCertName(e.target.value)}
                              placeholder="Tên chứng nhận (VD: VietGAP, ISO...)"
                              className="h-9 rounded-xl border-[#E5EAF0] text-sm"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                if (!customCertName.trim()) return;
                                setPendingCertName(customCertName);
                                certFileInputRef.current?.click();
                              }}
                              className="h-9 rounded-xl border-[#E5EAF0] text-[#1A7EA4] text-sm shrink-0"
                            >
                              <Upload className="w-4 h-4 mr-1" /> Upload
                            </Button>
                          </div>
                          {formData.certFiles.length > 0 && (
                            <div className="space-y-2">
                              {formData.certFiles.map((cf, i) => (
                                <div key={i} className="flex items-center gap-3 p-2.5 border border-[#E5EAF0] rounded-xl bg-[#FAFBFC]">
                                  <div className="w-7 h-7 bg-[#D9EEF5] rounded-lg flex items-center justify-center shrink-0">
                                    <CheckCircle2 className="w-4 h-4 text-[#0B4F6C]" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-[#0F1B2D] truncate">{cf.certName}</p>
                                    <p className="text-xs text-[#7D9E94] truncate">{cf.fileName}</p>
                                  </div>
                                  <button onClick={() => removeCertFile(i)} className="text-[#7D9E94] hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* STEP 3: Journey */}
                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <h3 className="text-lg font-bold text-[#0B4F6C] mb-1">Hành trình sản phẩm</h3>
                        <div className="space-y-4">
                          {formData.journey.map((step, i) => (
                            <div key={i} className="p-4 border border-[#E5EAF0] rounded-xl bg-[#FAFBFC] relative group">
                              <button onClick={() => {
                                const nj = [...formData.journey]; nj.splice(i, 1);
                                setFormData({...formData, journey: nj});
                              }} className="absolute top-2 right-2 text-[#7D9E94] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <div className="grid grid-cols-2 gap-4 mb-3">
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
                        <Button variant="outline" onClick={() => setFormData({...formData, journey: [...formData.journey, {name:"",location:"",date:"",desc:""}]})} className="w-full border-dashed border-2 text-[#1A7EA4] hover:bg-[#F0F9FF]">
                          <Plus className="w-4 h-4 mr-2" /> Thêm bước
                        </Button>

                        {!user && (
                          <div className="bg-[#FFF3E8] border border-[#F2A65A]/40 rounded-xl p-4 flex items-start gap-3">
                            <Lock className="w-5 h-5 text-[#C45B17] shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-semibold text-[#C45B17]">Đăng nhập để tạo QR</p>
                              <p className="text-xs text-[#4A5868] mt-0.5">Nhấn "Hoàn tất" để đăng nhập và nhận 1 lượt tạo QR miễn phí.</p>
                            </div>
                          </div>
                        )}
                        {user && demoQuota <= 0 && (
                          <div className="bg-[#FFF3E8] border border-[#F2A65A]/40 rounded-xl p-4 flex items-start gap-3">
                            <Lock className="w-5 h-5 text-[#C45B17] shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-semibold text-[#C45B17]">Đã hết lượt dùng thử</p>
                              <p className="text-xs text-[#4A5868] mt-0.5">Nâng cấp gói để tạo QR không giới hạn.</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* STEP 4: Completion */}
                    {currentStep === 4 && (
                      <div className="text-center space-y-6 py-8">
                        <div className="w-20 h-20 bg-[#D4EDE6] text-[#1A6B52] rounded-full flex items-center justify-center mx-auto mb-6">
                          <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#0B4F6C]">Hoàn tất! Trang xác thực đã sẵn sàng</h2>
                        <p className="text-[#4A5868] text-sm max-w-sm mx-auto">Mã QR và liên kết đã được tạo. Tải QR và in lên bao bì sản phẩm của bạn.</p>
                        <div className="flex flex-col gap-3 max-w-xs mx-auto pt-6">
                          <CtaButton className="w-full justify-center" onClick={handleDownload}>
                            <Download className="w-4 h-4 mr-1" /> Tải mã QR
                          </CtaButton>
                          <Button variant="outline" onClick={() => window.open(previewUrl, "_blank")} className="w-full border-[#0B4F6C] text-[#0B4F6C] hover:bg-[#FAFBFC]">
                            Xem trang công khai
                          </Button>
                          <Link href="/dashboard">
                            <Button variant="outline" className="w-full border-[#E5EAF0] text-[#4A5868] hover:bg-[#FAFBFC]">
                              Vào Dashboard
                            </Button>
                          </Link>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {currentStep <= 3 && (
                  <div className="flex justify-between items-center mt-10 pt-6 border-t border-[#E5EAF0]">
                    {currentStep > 1 ? (
                      <Button variant="outline" onClick={() => setCurrentStep(s => s - 1)} className="text-[#4A5868] border-[#E5EAF0]">Quay lại</Button>
                    ) : <div />}
                    <CtaButton onClick={handleNext}>
                      {currentStep === 3
                        ? (!user ? "Đăng nhập & Tạo QR" : "Hoàn tất & Tạo QR")
                        : "Tiếp tục"}
                    </CtaButton>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: Phone Preview */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 h-fit">
              <div className="w-[320px] mx-auto h-[640px] rounded-[44px] bg-[#0B4F6C] p-3 shadow-2xl shadow-[#0B4F6C]/30 relative">
                <div className="bg-white rounded-[36px] overflow-hidden h-full overflow-y-auto relative custom-scrollbar flex flex-col">
                  <div className="h-7 bg-[#0F1B2D] w-full shrink-0 flex justify-center items-center">
                    <div className="w-1/3 h-4 bg-black rounded-full absolute top-1.5" />
                  </div>
                  <div className="flex-1 pb-10">
                    <div className="px-4 py-3 border-b border-[#E5EAF0] flex items-center justify-between bg-white sticky top-0 z-20">
                      <div className="flex items-center gap-2">
                        <img src={logoPng} className="h-5" alt="logo" />
                        <span className="text-sm font-bold text-[#0B4F6C]">Checkee</span>
                      </div>
                      {(formData.certs.length > 0 || formData.certFiles.length > 0) && (
                        <div className="bg-[#D4EDE6] text-[#1A6B52] px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Đã xác thực
                        </div>
                      )}
                    </div>
                    <div className="px-4 py-4 bg-white">
                      <h2 className="text-lg font-bold text-[#0F1B2D] mb-0.5">{formData.name || "Tên sản phẩm"}</h2>
                      <div className="flex items-center gap-2 flex-wrap mt-1">
                        {formData.gtin && <span className="text-[10px] text-[#7D9E94] font-mono">GTIN: {formData.gtin}</span>}
                        {formData.batch && <span className="text-[10px] text-[#7D9E94]">Lô: {formData.batch}</span>}
                      </div>
                      <div className="mt-2 flex gap-1.5 flex-wrap">
                        <span className="inline-block bg-[#D9EEF5] text-[#0B4F6C] px-2 py-0.5 rounded-full text-[10px] font-semibold">{formData.category}</span>
                        {formData.unit && formData.weight && <span className="inline-block bg-[#F4F6F8] text-[#4A5868] px-2 py-0.5 rounded-full text-[10px] font-semibold">{formData.weight} {formData.unit}</span>}
                      </div>
                    </div>
                    {formData.description && (
                      <div className="px-4 py-3 bg-white border-t border-[#E5EAF0]">
                        <p className="text-xs text-[#4A5868] leading-relaxed">{formData.description}</p>
                      </div>
                    )}
                    {(formData.region || formData.productionDate || formData.productExpiry) && (
                      <div className="px-4 py-3 bg-[#FAFBFC] border-y border-[#E5EAF0] mt-1">
                        <div className="uppercase text-[9px] text-[#7D9E94] font-bold mb-2">NGUỒN GỐC</div>
                        <div className="grid grid-cols-2 gap-2">
                          {formData.region && <div><div className="text-[9px] text-[#7D9E94] uppercase mb-0.5">Vùng SX</div><div className="text-xs text-[#0F1B2D] font-semibold">{formData.region}</div></div>}
                          {formData.productionDate && <div><div className="text-[9px] text-[#7D9E94] uppercase mb-0.5">Ngày SX</div><div className="text-xs text-[#0F1B2D] font-semibold">{formData.productionDate}</div></div>}
                          {formData.productExpiry && <div><div className="text-[9px] text-[#7D9E94] uppercase mb-0.5">HSD</div><div className="text-xs text-[#0F1B2D] font-semibold">{formData.productExpiry}</div></div>}
                          {formData.spec && <div><div className="text-[9px] text-[#7D9E94] uppercase mb-0.5">Quy cách</div><div className="text-xs text-[#0F1B2D] font-semibold">{formData.spec}</div></div>}
                        </div>
                      </div>
                    )}
                    {(formData.certs.length > 0 || formData.certFiles.length > 0) && (
                      <div className="px-4 py-3 bg-white border-b border-[#E5EAF0]">
                        <div className="uppercase text-[9px] text-[#7D9E94] font-bold mb-2">CHỨNG NHẬN</div>
                        <div className="flex flex-wrap gap-1.5">
                          {formData.certs.map(cert => (
                            <div key={cert} className="bg-[#1A6B52] text-white px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-2.5 h-2.5" /> {cert}
                            </div>
                          ))}
                          {formData.certFiles.map((cf, i) => (
                            <div key={i} className="bg-[#0B4F6C] text-white px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-2.5 h-2.5" /> {cf.certName}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {formData.journey.some(j => j.name) && (
                      <div className="px-4 py-3 bg-[#FAFBFC] border-b border-[#E5EAF0]">
                        <div className="uppercase text-[9px] text-[#7D9E94] font-bold mb-3">HÀNH TRÌNH</div>
                        <div className="space-y-3">
                          {formData.journey.filter(j => j.name).map((step, i) => (
                            <div key={i} className="flex gap-2.5">
                              <div className="w-5 h-5 rounded-full bg-[#1A6B52] text-white text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                              <div>
                                <div className="text-xs font-bold text-[#0F1B2D]">{step.name}</div>
                                {step.location && <div className="text-[10px] text-[#7D9E94]">{step.location}</div>}
                                {step.desc && <div className="text-[10px] text-[#4A5868]">{step.desc}</div>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {currentStep === 4 && (
                      <div className="px-4 py-6 flex flex-col items-center gap-4" ref={qrRef}>
                        <QRCodeCanvas value={previewUrl} size={120} level="H" includeMargin />
                        <p className="text-[10px] text-[#7D9E94] text-center">Quét mã QR để xem thông tin sản phẩm</p>
                      </div>
                    )}
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
