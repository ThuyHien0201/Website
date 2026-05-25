import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2, QrCode as QrCodeIcon, Download, Plus, Trash2,
  Lock, Upload, ImageIcon, ChevronDown, ChevronUp, X
} from "lucide-react";
import { CtaButton } from "@/components/ui/cta-button";
import { QRCodeCanvas } from "qrcode.react";
import logoPng from "@/assets/logo.png";
import { useAuth } from "@/context/auth-context";

type Facility = { name: string; address: string; taxCode: string; email: string; phone: string };
type ProcessStep = { name: string; date: string; materials: string; desc: string };
type CertImage = { certName: string; preview: string };

const emptyFacility = (): Facility => ({ name: "", address: "", taxCode: "", email: "", phone: "" });
const emptyStep = (name = "", desc = ""): ProcessStep => ({ name, date: "", materials: "", desc });

export default function Demo() {
  const { user, demoQuota, consumeDemoQuota, openLoginModal, openPricingModal, pendingProduct, businessInfo } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);

  const [name, setName] = useState("");
  const [gtin, setGtin] = useState("");
  const [batch, setBatch] = useState("");
  const [productionDate, setProductionDate] = useState("");
  const [productExpiry, setProductExpiry] = useState("");
  const [category, setCategory] = useState<"Nông sản" | "Tiêu dùng">("Nông sản");
  const [spec, setSpec] = useState("");
  const [unit, setUnit] = useState("kg");
  const [weight, setWeight] = useState("");
  const [description, setDescription] = useState("");
  const [imageName, setImageName] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState("");

  // Step 2 - Origin
  const [producer, setProducer] = useState<Facility>(emptyFacility());
  const [farms, setFarms] = useState<(Facility & { materials: string })[]>([]);
  const [distributor, setDistributor] = useState<Facility>(emptyFacility());
  const [showFarms, setShowFarms] = useState(false);
  const [showDistributor, setShowDistributor] = useState(false);

  // Step 3 - Process
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([]);

  // Step 4 - Certs
  const [certImages, setCertImages] = useState<CertImage[]>([]);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const certImgInputRef = useRef<HTMLInputElement>(null);
  const qrRef = useRef<HTMLDivElement>(null);

  // Auto-fill from business info
  useEffect(() => {
    if (businessInfo) {
      setProducer(p => ({
        name: p.name || businessInfo.companyName,
        address: p.address || businessInfo.address,
        taxCode: p.taxCode || businessInfo.taxCode,
        email: p.email || (businessInfo as any).email || "",
        phone: p.phone || businessInfo.phone,
      }));
    }
  }, [businessInfo]);

  // Set pending product name
  useEffect(() => {
    if (pendingProduct) setName(pendingProduct);
  }, [pendingProduct]);

  // Default process steps when category changes
  useEffect(() => {
    if (category === "Nông sản") {
      setProcessSteps([
        emptyStep("Gieo trồng", "Chuẩn bị đất, gieo hạt"),
        emptyStep("Chăm sóc", "Tưới nước, bón phân, phòng trừ sâu bệnh"),
        emptyStep("Thu hoạch", "Thu hoạch theo tiêu chuẩn"),
      ]);
    } else {
      setProcessSteps([
        emptyStep("Tiếp nhận nguyên liệu", "Kiểm tra chất lượng đầu vào"),
        emptyStep("Chế biến", "Xử lý theo quy trình kỹ thuật"),
        emptyStep("Đóng gói", "Đóng gói và dán nhãn"),
      ]);
    }
  }, [category]);

  const previewUrl = `${window.location.origin}/demo-preview?name=${encodeURIComponent(name)}`;

  const handleFinish = () => {
    if (!user) { openLoginModal({ redirect: "/demo" }); return; }
    if (demoQuota <= 0) { openPricingModal(); return; }
    const ok = consumeDemoQuota(name || "Sản phẩm demo");
    if (!ok) { openPricingModal(); return; }
    setCurrentStep(5);
  };

  const handleNext = () => {
    if (currentStep === 4) { handleFinish(); return; }
    setCurrentStep(s => Math.min(s + 1, 5));
  };

  const addIngredient = () => {
    if (!newIngredient.trim()) return;
    setIngredients(prev => [...prev, newIngredient.trim()]);
    setNewIngredient("");
  };

  const addFarm = () => setFarms(prev => [...prev, { ...emptyFacility(), materials: "" }]);
  const removeFarm = (i: number) => setFarms(prev => prev.filter((_, idx) => idx !== i));

  const updateProcessStep = (i: number, field: keyof ProcessStep, val: string) => {
    setProcessSteps(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: val } : s));
  };

  const handleCertImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        setCertImages(prev => [...prev, { certName: file.name, preview: ev.target?.result as string }]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const handleDownload = () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current.querySelector("canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a"); a.href = url;
    a.download = `QR-${name || "Checkee"}.png`; a.click();
  };

  const steps = [
    { id: 1, label: "Sản phẩm" },
    { id: 2, label: "Nguồn gốc" },
    { id: 3, label: "Quy trình" },
    { id: 4, label: "Chứng nhận" },
  ];

  const FacilityFields = ({ value, onChange, label }: { value: Facility; onChange: (f: Facility) => void; label: string }) => (
    <div className="space-y-3 pt-3">
      <p className="text-xs font-bold text-[#7D9E94] uppercase tracking-wide">{label}</p>
      <div className="grid sm:grid-cols-2 gap-3">
        {([["name", "Tên cơ sở"], ["address", "Địa chỉ"], ["taxCode", "Mã số thuế"], ["email", "Email"], ["phone", "Số điện thoại"]] as [keyof Facility, string][]).map(([field, placeholder]) => (
          <div key={field} className={field === "address" ? "sm:col-span-2" : ""}>
            <Input
              value={value[field]}
              onChange={e => onChange({ ...value, [field]: e.target.value })}
              placeholder={placeholder}
              className="h-9 rounded-xl border-[#E5EAF0] text-sm"
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-[100dvh] bg-white flex flex-col font-sans">
      <section className="py-14 bg-gradient-to-b from-[#FAFBFC] to-white border-b border-[#E5EAF0]">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-5xl font-bold text-[#0c964b] mb-4">Tự tay tạo trang truy xuất chỉ trong 2 phút</h1>
          <p className="text-[#4A5868] text-lg max-w-2xl mx-auto">Nhập thông tin sản phẩm và xem giao diện hiển thị ngay. Mã QR được tạo tự động.</p>
          {user && (
            <div className={`inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full text-sm font-semibold ${demoQuota > 0 ? "bg-[#dcf0e6] text-[#1A6B52]" : "bg-[#fef3e2] text-[#ed8302]"}`}>
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
              {currentStep <= 4 && (
                <div className="flex items-center justify-between mb-10 relative">
                  <div className="absolute left-0 top-5 w-full h-[2px] bg-[#E5EAF0] -z-10" />
                  {steps.map(step => {
                    const active = currentStep === step.id;
                    const completed = currentStep > step.id;
                    return (
                      <div key={step.id} className="flex flex-col items-center gap-2 bg-white px-2 relative">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${active ? "bg-[#0c964b] text-white" : completed ? "bg-[#1A6B52] text-white" : "bg-[#E5EAF0] text-[#7D9E94]"}`}>
                          {completed ? <CheckCircle2 className="w-5 h-5" /> : step.id}
                        </div>
                        <div className={`text-xs font-semibold ${active || completed ? "text-[#0c964b]" : "text-[#7D9E94]"}`}>{step.label}</div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-8 shadow-sm">
                <AnimatePresence mode="wait">
                  <motion.div key={currentStep} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>

                    {/* STEP 1: Product */}
                    {currentStep === 1 && (
                      <div className="space-y-5">
                        <h3 className="text-lg font-bold text-[#0c964b]">Thông tin sản phẩm</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="sm:col-span-2 space-y-1.5">
                            <Label className="text-[#0c964b] font-semibold">Tên sản phẩm <span className="text-red-500">*</span></Label>
                            <Input value={name} onChange={e => setName(e.target.value)} placeholder="VD: Cà phê Robusta Đà Lạt" />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-[#0c964b] font-semibold">Mã GTIN / Barcode</Label>
                            <Input value={gtin} onChange={e => setGtin(e.target.value)} placeholder="VD: 8934563012345" />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-[#0c964b] font-semibold">Lô / Mẻ sản xuất</Label>
                            <Input value={batch} onChange={e => setBatch(e.target.value)} placeholder="VD: BATCH-2026-05" />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-[#0c964b] font-semibold">Ngày sản xuất</Label>
                            <Input type="date" value={productionDate} onChange={e => setProductionDate(e.target.value)} />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-[#0c964b] font-semibold">Hạn sử dụng</Label>
                            <Input type="date" value={productExpiry} onChange={e => setProductExpiry(e.target.value)} />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-[#0c964b] font-semibold">Ngành hàng</Label>
                            <div className="flex gap-2">
                              {(["Nông sản", "Tiêu dùng"] as const).map(cat => (
                                <button key={cat} type="button" onClick={() => setCategory(cat)}
                                  className={`flex-1 py-2 rounded-xl text-sm font-semibold border transition-all ${category === cat ? "bg-[#0c964b] text-white border-[#0c964b]" : "border-[#E5EAF0] text-[#4A5868] hover:border-[#0c964b]"}`}>
                                  {cat}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-[#0c964b] font-semibold">Quy cách đóng gói</Label>
                            <Input value={spec} onChange={e => setSpec(e.target.value)} placeholder="VD: Hộp 12 gói x 20g" />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-[#0c964b] font-semibold">Đơn vị tính</Label>
                            <select className="flex h-9 w-full rounded-md border border-[#E5EAF0] bg-transparent px-3 py-1 text-sm text-[#0F1B2D]" value={unit} onChange={e => setUnit(e.target.value)}>
                              {["kg","g","lít","ml","hộp","gói","thùng","cái","bộ"].map(u => <option key={u}>{u}</option>)}
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-[#0c964b] font-semibold">Khối lượng / Dung tích</Label>
                            <Input value={weight} onChange={e => setWeight(e.target.value)} placeholder="VD: 250" />
                          </div>
                        </div>

                        {/* Ingredients */}
                        <div className="space-y-2">
                          <Label className="text-[#0c964b] font-semibold">Thành phần</Label>
                          <div className="flex gap-2">
                            <Input value={newIngredient} onChange={e => setNewIngredient(e.target.value)}
                              onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addIngredient())}
                              placeholder="Nhập thành phần rồi bấm Thêm" className="h-9 rounded-xl border-[#E5EAF0] text-sm" />
                            <Button type="button" onClick={addIngredient} className="h-9 rounded-xl bg-[#0c964b] hover:bg-[#085c35] text-white text-sm shrink-0 px-4">
                              <Plus className="w-4 h-4 mr-1" /> Thêm
                            </Button>
                          </div>
                          {ingredients.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-1">
                              {ingredients.map((ing, i) => (
                                <span key={i} className="inline-flex items-center gap-1.5 bg-[#dcf0e6] text-[#1A6B52] text-xs font-semibold px-3 py-1.5 rounded-full">
                                  {ing}
                                  <button onClick={() => setIngredients(prev => prev.filter((_, idx) => idx !== i))}><X className="w-3 h-3 text-[#1A6B52] hover:text-red-500" /></button>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-[#0c964b] font-semibold">Mô tả sản phẩm</Label>
                          <Textarea rows={3} value={description} onChange={e => setDescription(e.target.value)} placeholder="Giới thiệu về sản phẩm..." />
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-[#0c964b] font-semibold">Hình ảnh sản phẩm</Label>
                          <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) setImageName(f.name); }} />
                          <button type="button" onClick={() => imageInputRef.current?.click()}
                            className="w-full h-24 border-2 border-dashed border-[#E5EAF0] rounded-xl flex flex-col items-center justify-center gap-2 hover:border-[#0c964b] hover:bg-[#f0fdf4] transition-colors text-[#7D9E94]">
                            {imageName ? (<><ImageIcon className="w-6 h-6 text-[#0c964b]" /><span className="text-sm text-[#0c964b] font-medium">{imageName}</span></>) : (<><Upload className="w-6 h-6" /><span className="text-sm">Nhấn để tải lên hình ảnh</span></>)}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: Origin */}
                    {currentStep === 2 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#0c964b]">Nguồn gốc xuất xứ</h3>

                        {/* Producer - always shown */}
                        <div className="border border-[#E5EAF0] rounded-xl overflow-hidden">
                          <div className="flex items-center justify-between px-4 py-3 bg-[#f0fdf4] cursor-default">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 bg-[#0c964b] rounded-lg flex items-center justify-center"><span className="text-white text-xs font-bold">SX</span></div>
                              <span className="font-semibold text-[#0c964b] text-sm">Cơ sở sản xuất</span>
                              <span className="text-xs text-[#7D9E94]">(Bắt buộc)</span>
                            </div>
                          </div>
                          <div className="px-4 pb-4">
                            <FacilityFields value={producer} onChange={setProducer} label="Thông tin cơ sở sản xuất" />
                          </div>
                        </div>

                        {/* Farms - only for Nông sản */}
                        {category === "Nông sản" && (
                          <div className="border border-[#E5EAF0] rounded-xl overflow-hidden">
                            <button type="button" onClick={() => setShowFarms(v => !v)}
                              className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#FAFBFC] transition-colors">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 bg-[#ed8302] rounded-lg flex items-center justify-center"><span className="text-white text-xs font-bold">NT</span></div>
                                <span className="font-semibold text-[#0F1B2D] text-sm">Cơ sở nuôi trồng</span>
                                <span className="text-xs text-[#7D9E94]">(Có thể thêm nhiều)</span>
                              </div>
                              {showFarms ? <ChevronUp className="w-4 h-4 text-[#7D9E94]" /> : <Plus className="w-4 h-4 text-[#0c964b]" />}
                            </button>
                            {showFarms && (
                              <div className="px-4 pb-4 space-y-4">
                                {farms.map((farm, i) => (
                                  <div key={i} className="border border-[#E5EAF0] rounded-xl p-3 relative">
                                    <button onClick={() => removeFarm(i)} className="absolute top-2 right-2 text-[#7D9E94] hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                    <p className="text-xs font-bold text-[#7D9E94] mb-2">Cơ sở nuôi trồng #{i + 1}</p>
                                    <div className="grid sm:grid-cols-2 gap-2">
                                      {([["name", "Tên cơ sở"], ["address", "Địa chỉ"], ["taxCode", "Mã số thuế"], ["email", "Email"], ["phone", "Số điện thoại"]] as [keyof Facility, string][]).map(([field, ph]) => (
                                        <Input key={field} value={farm[field]} onChange={e => setFarms(prev => prev.map((f, idx) => idx === i ? { ...f, [field]: e.target.value } : f))}
                                          placeholder={ph} className={`h-9 rounded-xl border-[#E5EAF0] text-sm ${field === "address" ? "sm:col-span-2" : ""}`} />
                                      ))}
                                      <Input value={farm.materials} onChange={e => setFarms(prev => prev.map((f, idx) => idx === i ? { ...f, materials: e.target.value } : f))}
                                        placeholder="Nguyên liệu cung cấp" className="sm:col-span-2 h-9 rounded-xl border-[#E5EAF0] text-sm" />
                                    </div>
                                  </div>
                                ))}
                                <Button type="button" variant="outline" onClick={addFarm} className="w-full border-dashed border-2 text-[#0c964b] hover:bg-[#f0fdf4]">
                                  <Plus className="w-4 h-4 mr-2" /> Thêm cơ sở nuôi trồng
                                </Button>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Distributor */}
                        <div className="border border-[#E5EAF0] rounded-xl overflow-hidden">
                          <button type="button" onClick={() => setShowDistributor(v => !v)}
                            className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#FAFBFC] transition-colors">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 bg-[#7D9E94] rounded-lg flex items-center justify-center"><span className="text-white text-xs font-bold">PP</span></div>
                              <span className="font-semibold text-[#0F1B2D] text-sm">Cơ sở phân phối</span>
                            </div>
                            {showDistributor ? <ChevronUp className="w-4 h-4 text-[#7D9E94]" /> : <Plus className="w-4 h-4 text-[#0c964b]" />}
                          </button>
                          {showDistributor && (
                            <div className="px-4 pb-4">
                              <FacilityFields value={distributor} onChange={setDistributor} label="Thông tin cơ sở phân phối" />
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* STEP 3: Process */}
                    {currentStep === 3 && (
                      <div className="space-y-5">
                        <div>
                          <h3 className="text-lg font-bold text-[#0c964b]">
                            {category === "Nông sản" ? "Nhật ký điện tử" : "Quy trình chế biến"}
                          </h3>
                          <p className="text-sm text-[#7D9E94] mt-0.5">
                            {category === "Nông sản" ? "Ghi lại quá trình nuôi trồng từ đầu đến thu hoạch" : "Các bước chế biến và sản xuất sản phẩm"}
                          </p>
                        </div>
                        <div className="space-y-3">
                          {processSteps.map((step, i) => (
                            <div key={i} className="p-4 border border-[#E5EAF0] rounded-xl bg-[#FAFBFC] relative group">
                              <button onClick={() => setProcessSteps(prev => prev.filter((_, idx) => idx !== i))}
                                className="absolute top-2 right-2 text-[#7D9E94] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <div className="grid grid-cols-2 gap-3 mb-3">
                                <div className="space-y-1">
                                  <Label className="text-xs text-[#4A5868]">Tên bước</Label>
                                  <Input value={step.name} onChange={e => updateProcessStep(i, "name", e.target.value)} className="h-9" />
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-xs text-[#4A5868]">Ngày thực hiện</Label>
                                  <Input type="date" value={step.date} onChange={e => updateProcessStep(i, "date", e.target.value)} className="h-9" />
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-xs text-[#4A5868]">Vật tư sử dụng</Label>
                                  <Input value={step.materials} onChange={e => updateProcessStep(i, "materials", e.target.value)} placeholder="VD: Phân bón, thuốc BVTV..." className="h-9" />
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-xs text-[#4A5868]">Mô tả</Label>
                                  <Input value={step.desc} onChange={e => updateProcessStep(i, "desc", e.target.value)} className="h-9" />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button variant="outline" onClick={() => setProcessSteps(prev => [...prev, emptyStep()])}
                          className="w-full border-dashed border-2 text-[#0c964b] hover:bg-[#f0fdf4]">
                          <Plus className="w-4 h-4 mr-2" /> Thêm bước
                        </Button>
                      </div>
                    )}

                    {/* STEP 4: Certificates */}
                    {currentStep === 4 && (
                      <div className="space-y-5">
                        <div>
                          <h3 className="text-lg font-bold text-[#0c964b]">Chứng nhận sản phẩm</h3>
                          <p className="text-sm text-[#7D9E94] mt-0.5">Upload hình ảnh các chứng nhận để hiển thị trên trang truy xuất</p>
                        </div>
                        <input ref={certImgInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleCertImageUpload} />
                        <button type="button" onClick={() => certImgInputRef.current?.click()}
                          className="w-full h-28 border-2 border-dashed border-[#E5EAF0] rounded-xl flex flex-col items-center justify-center gap-2 hover:border-[#0c964b] hover:bg-[#f0fdf4] transition-colors text-[#7D9E94] cursor-pointer">
                          <Upload className="w-7 h-7" />
                          <span className="text-sm font-medium">Nhấn để chọn hình chứng nhận (chọn được nhiều ảnh)</span>
                          <span className="text-xs">PNG, JPG, JPEG — Tối đa 10MB mỗi ảnh</span>
                        </button>

                        {certImages.length > 0 && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {certImages.map((ci, i) => (
                              <div key={i} className="relative group border border-[#E5EAF0] rounded-xl overflow-hidden">
                                <img src={ci.preview} alt={ci.certName} className="w-full h-32 object-cover" />
                                <div className="p-2 bg-white">
                                  <p className="text-xs font-medium text-[#0F1B2D] truncate">{ci.certName}</p>
                                </div>
                                <button onClick={() => setCertImages(prev => prev.filter((_, idx) => idx !== i))}
                                  className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        {!user && (
                          <div className="bg-[#fef3e2] border border-[#fdba74]/40 rounded-xl p-4 flex items-start gap-3">
                            <Lock className="w-5 h-5 text-[#ed8302] shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-semibold text-[#ed8302]">Đăng nhập để tạo QR</p>
                              <p className="text-xs text-[#4A5868] mt-0.5">Nhấn "Hoàn tất & Tạo QR" để đăng nhập và nhận 1 lượt tạo QR miễn phí.</p>
                            </div>
                          </div>
                        )}
                        {user && demoQuota <= 0 && (
                          <div className="bg-[#fef3e2] border border-[#fdba74]/40 rounded-xl p-4 flex items-start gap-3">
                            <Lock className="w-5 h-5 text-[#ed8302] shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-semibold text-[#ed8302]">Đã hết lượt dùng thử</p>
                              <p className="text-xs text-[#4A5868] mt-0.5">Nâng cấp gói để tạo QR không giới hạn.</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* STEP 5: Completion */}
                    {currentStep === 5 && (
                      <div className="text-center space-y-6 py-8">
                        <div className="w-20 h-20 bg-[#dcf0e6] text-[#1A6B52] rounded-full flex items-center justify-center mx-auto mb-6">
                          <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#0c964b]">Hoàn tất! Trang xác thực đã sẵn sàng</h2>
                        <p className="text-[#4A5868] text-sm max-w-sm mx-auto">Mã QR và liên kết đã được tạo. Tải QR và in lên bao bì sản phẩm của bạn.</p>
                        <div className="flex flex-col gap-3 max-w-xs mx-auto pt-6">
                          <CtaButton className="w-full justify-center" onClick={handleDownload}>
                            <Download className="w-4 h-4 mr-1" /> Tải mã QR
                          </CtaButton>
                          
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

                {currentStep <= 4 && (
                  <div className="flex justify-between items-center mt-10 pt-6 border-t border-[#E5EAF0]">
                    {currentStep > 1
                      ? <Button variant="outline" onClick={() => setCurrentStep(s => s - 1)} className="text-[#4A5868] border-[#E5EAF0]">Quay lại</Button>
                      : <div />}
                    <CtaButton onClick={handleNext}>
                      {currentStep === 4
                        ? (!user ? "Đăng nhập & Tạo QR" : "Hoàn tất & Tạo QR")
                        : "Tiếp tục"}
                    </CtaButton>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: Phone Preview */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 h-fit">
              <div className="w-[320px] mx-auto h-[640px] rounded-[44px] bg-[#0c964b] p-3 shadow-2xl shadow-[#0c964b]/30 relative">
                <div className="bg-white rounded-[36px] overflow-hidden h-full overflow-y-auto relative custom-scrollbar flex flex-col">
                  <div className="h-7 bg-[#0F1B2D] w-full shrink-0 flex justify-center items-center">
                    <div className="w-1/3 h-4 bg-black rounded-full absolute top-1.5" />
                  </div>
                  <div className="flex-1 pb-10">
                    <div className="px-4 py-3 border-b border-[#E5EAF0] flex items-center justify-between bg-white sticky top-0 z-20">
                      <div className="flex items-center gap-2">
                        <img src={logoPng} className="h-5" alt="logo" />
                        <span className="text-sm font-bold text-[#0c964b]">Checkee</span>
                      </div>
                      {certImages.length > 0 && (
                        <div className="bg-[#dcf0e6] text-[#1A6B52] px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Đã xác thực
                        </div>
                      )}
                    </div>
                    <div className="px-4 py-4 bg-white">
                      <h2 className="text-lg font-bold text-[#0F1B2D] mb-0.5">{name || "Tên sản phẩm"}</h2>
                      <div className="flex items-center gap-2 flex-wrap mt-1">
                        {gtin && <span className="text-[10px] text-[#7D9E94] font-mono">GTIN: {gtin}</span>}
                        {batch && <span className="text-[10px] text-[#7D9E94]">Lô: {batch}</span>}
                      </div>
                      <div className="mt-2 flex gap-1.5 flex-wrap">
                        <span className="inline-block bg-[#dcf0e6] text-[#0c964b] px-2 py-0.5 rounded-full text-[10px] font-semibold">{category}</span>
                        {unit && weight && <span className="inline-block bg-[#F4F6F8] text-[#4A5868] px-2 py-0.5 rounded-full text-[10px] font-semibold">{weight} {unit}</span>}
                      </div>
                    </div>
                    {ingredients.length > 0 && (
                      <div className="px-4 py-3 bg-[#FAFBFC] border-y border-[#E5EAF0]">
                        <div className="uppercase text-[9px] text-[#7D9E94] font-bold mb-1.5">THÀNH PHẦN</div>
                        <p className="text-xs text-[#4A5868]">{ingredients.join(", ")}</p>
                      </div>
                    )}
                    {(productionDate || productExpiry || spec) && (
                      <div className="px-4 py-3 bg-white border-b border-[#E5EAF0]">
                        <div className="grid grid-cols-2 gap-2">
                          {productionDate && <div><div className="text-[9px] text-[#7D9E94] uppercase mb-0.5">Ngày SX</div><div className="text-xs text-[#0F1B2D] font-semibold">{productionDate}</div></div>}
                          {productExpiry && <div><div className="text-[9px] text-[#7D9E94] uppercase mb-0.5">HSD</div><div className="text-xs text-[#0F1B2D] font-semibold">{productExpiry}</div></div>}
                          {spec && <div className="col-span-2"><div className="text-[9px] text-[#7D9E94] uppercase mb-0.5">Quy cách</div><div className="text-xs text-[#0F1B2D] font-semibold">{spec}</div></div>}
                        </div>
                      </div>
                    )}
                    {producer.name && (
                      <div className="px-4 py-3 bg-[#FAFBFC] border-b border-[#E5EAF0]">
                        <div className="uppercase text-[9px] text-[#7D9E94] font-bold mb-1.5">NGUỒN GỐC</div>
                        <div className="text-xs font-semibold text-[#0F1B2D]">{producer.name}</div>
                        {producer.address && <div className="text-[10px] text-[#7D9E94] mt-0.5">{producer.address}</div>}
                      </div>
                    )}
                    {processSteps.some(s => s.name) && (
                      <div className="px-4 py-3 bg-white border-b border-[#E5EAF0]">
                        <div className="uppercase text-[9px] text-[#7D9E94] font-bold mb-2">{category === "Nông sản" ? "NHẬT KÝ ĐIỆN TỬ" : "QUY TRÌNH CHẾ BIẾN"}</div>
                        <div className="space-y-2">
                          {processSteps.filter(s => s.name).map((step, i) => (
                            <div key={i} className="flex gap-2">
                              <div className="w-4 h-4 rounded-full bg-[#0c964b] text-white text-[8px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                              <div>
                                <div className="text-xs font-bold text-[#0F1B2D]">{step.name}</div>
                                {step.date && <div className="text-[9px] text-[#7D9E94]">{step.date}</div>}
                                {step.desc && <div className="text-[9px] text-[#4A5868]">{step.desc}</div>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {certImages.length > 0 && (
                      <div className="px-4 py-3 bg-[#FAFBFC] border-b border-[#E5EAF0]">
                        <div className="uppercase text-[9px] text-[#7D9E94] font-bold mb-2">CHỨNG NHẬN</div>
                        <div className="grid grid-cols-3 gap-1.5">
                          {certImages.map((ci, i) => (
                            <div key={i} className="rounded-lg overflow-hidden border border-[#E5EAF0]">
                              <img src={ci.preview} alt={ci.certName} className="w-full h-16 object-cover" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {currentStep === 5 && (
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
