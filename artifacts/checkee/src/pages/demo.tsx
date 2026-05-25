import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2, QrCode as QrCodeIcon, Download, Plus, Trash2,
  Lock, Upload, ImageIcon, X, Printer, Building2, Package, MapPin, Phone as PhoneIcon
} from "lucide-react";
import { CtaButton } from "@/components/ui/cta-button";
import { QRCodeCanvas } from "qrcode.react";
import logoPng from "@/assets/logo.png";
import { useAuth } from "@/context/auth-context";

type Role = "manufacturer" | "farm" | "distributor";
type ProcessStep = { name: string; date: string; materials: string; desc: string };
type CertImage = { certName: string; preview: string };

const emptyStep = (name = "", desc = ""): ProcessStep => ({ name, date: "", materials: "", desc });

const ROLE_LABELS: Record<Role, string> = {
  manufacturer: "Nhà sản xuất",
  farm: "Nông hộ",
  distributor: "Nhà phân phối",
};

const ROLE_ICONS: Record<Role, string> = {
  manufacturer: "🏭",
  farm: "🌾",
  distributor: "🚚",
};

export default function Demo() {
  const { user, openLoginModal, openPricingModal, trackJourney, activePlan } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPrintPricingHint, setShowPrintPricingHint] = useState(false);
  const [qrReady, setQrReady] = useState(false);

  // Step 1: Business info
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [roles, setRoles] = useState<Role[]>([]);
  const [bizCerts, setBizCerts] = useState<CertImage[]>([]);
  const bizCertRef = useRef<HTMLInputElement>(null);

  // Step 2: Product info
  const [productName, setProductName] = useState("");
  const [gtin, setGtin] = useState("");
  const [batch, setBatch] = useState("");
  const [productionDate, setProductionDate] = useState("");
  const [productExpiry, setProductExpiry] = useState("");
  const [spec, setSpec] = useState("");
  const [unit, setUnit] = useState("kg");
  const [weight, setWeight] = useState("");
  const [description, setDescription] = useState("");
  const [productImageName, setProductImageName] = useState("");
  const [productImagePreview, setProductImagePreview] = useState<string | null>(null);
  const [certName, setCertName] = useState("");
  const productImageRef = useRef<HTMLInputElement>(null);

  // Step 3: Journey - Process steps (manufacturer / farm)
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([]);

  // Step 3: Journey - Distributor
  const [supplierName, setSupplierName] = useState("");
  const [supplierPhone, setSupplierPhone] = useState("");
  const [supplierAddress, setSupplierAddress] = useState("");
  const [importDate, setImportDate] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [buyerAddress, setBuyerAddress] = useState("");
  const [saleDate, setSaleDate] = useState("");

  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    trackJourney("clicked_trial", "Bấm Dùng thử / mở trang Demo", 0);
  }, []);

  useEffect(() => {
    if (roles.includes("manufacturer")) {
      setProcessSteps([
        emptyStep("Tiếp nhận nguyên liệu", "Kiểm tra chất lượng đầu vào"),
        emptyStep("Chế biến", "Xử lý theo quy trình kỹ thuật"),
        emptyStep("Đóng gói", "Đóng gói và dán nhãn"),
      ]);
    } else if (roles.includes("farm")) {
      setProcessSteps([
        emptyStep("Gieo trồng", "Chuẩn bị đất, gieo hạt"),
        emptyStep("Chăm sóc", "Tưới nước, bón phân, phòng trừ sâu bệnh"),
        emptyStep("Thu hoạch", "Thu hoạch theo tiêu chuẩn"),
      ]);
    }
  }, [roles]);

  const toggleRole = (role: Role) => {
    setRoles(prev =>
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    );
  };

  const handleBizCertUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        setBizCerts(prev => [...prev, { certName: file.name, preview: ev.target?.result as string }]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const handleProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProductImageName(file.name);
    const reader = new FileReader();
    reader.onload = ev => setProductImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const updateStep = (i: number, field: keyof ProcessStep, val: string) => {
    setProcessSteps(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: val } : s));
  };

  const previewUrl = `${window.location.origin}/demo-preview?name=${encodeURIComponent(productName)}`;

  const handleNext = () => {
    if (currentStep === 1) {
      trackJourney("completed_step1", "Hoàn tất bước 1 - Thông tin doanh nghiệp", 1, { roles: roles.join(",") });
    } else if (currentStep === 2) {
      trackJourney("completed_step2", "Hoàn tất bước 2 - Thông tin sản phẩm", 2);
    } else if (currentStep === 3) {
      trackJourney("completed_step3", "Hoàn tất bước 3 - Hành trình sản phẩm", 3);
      if (!user) {
        openLoginModal({ redirect: "/demo" });
        return;
      }
      setCurrentStep(4);
      setQrReady(true);
      trackJourney("generated_qr", "Tạo mã QR thành công", 4);
      return;
    }
    setCurrentStep(s => s + 1);
  };

  const handleDownloadOrPrint = (action: "download" | "print") => {
    trackJourney(action === "download" ? "clicked_download_qr" : "clicked_print_qr", `Bấm ${action === "download" ? "Tải" : "In"} mã QR`, 4);
    if (!activePlan) {
      openPricingModal("download_qr");
      setShowPrintPricingHint(true);
      return;
    }
    doDownload();
  };

  const doDownload = () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current.querySelector("canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `QR-${productName || "Checkee"}.png`;
    a.click();
  };

  const steps = [
    { id: 1, label: "Doanh nghiệp" },
    { id: 2, label: "Sản phẩm" },
    { id: 3, label: "Hành trình" },
    { id: 4, label: "Mã QR" },
  ];

  const showsDistributor = roles.includes("distributor") && !roles.includes("manufacturer") && !roles.includes("farm");
  const showsProcess = roles.includes("manufacturer") || roles.includes("farm");
  const step3Label = roles.includes("farm") ? "Quy trình chăm sóc" : roles.includes("manufacturer") ? "Quy trình chế biến" : "Thông tin mua – bán";

  return (
    <div className="min-h-[100dvh] bg-white flex flex-col font-sans">
      <section className="py-14 bg-gradient-to-b from-[#EFF5FF] to-white border-b border-[#E5EAF0]">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-5xl font-bold text-[#1557B0] mb-4">Tự tay tạo trang truy xuất chỉ trong 2 phút</h1>
          <p className="text-[#4A5868] text-lg max-w-2xl mx-auto">Nhập thông tin doanh nghiệp, sản phẩm và xem mã QR được tạo tự động. Hoàn toàn miễn phí.</p>
          {user && !activePlan && (
            <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full text-sm font-semibold bg-[#fef3e2] text-[#ed8302]">
              <QrCodeIcon className="w-4 h-4" /> Bạn đang dùng bản thử — <button onClick={() => openPricingModal()} className="underline font-bold">Nâng cấp để tạo không giới hạn</button>
            </div>
          )}
        </div>
      </section>

      <section className="py-12 flex-1">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">

            {/* LEFT: Form */}
            <div className="lg:col-span-7">
              {/* Step Progress */}
              {currentStep <= 4 && (
                <div className="flex items-center justify-between mb-10 relative">
                  <div className="absolute left-0 top-5 w-full h-[2px] bg-[#E5EAF0] -z-10" />
                  {steps.map(step => {
                    const active = currentStep === step.id;
                    const completed = currentStep > step.id;
                    return (
                      <div key={step.id} className="flex flex-col items-center gap-2 bg-white px-2 relative">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${active ? "bg-[#1557B0] text-white" : completed ? "bg-[#0B2D8A] text-white" : "bg-[#E5EAF0] text-[#7D9E94]"}`}>
                          {completed ? <CheckCircle2 className="w-5 h-5" /> : step.id}
                        </div>
                        <div className={`text-xs font-semibold ${active || completed ? "text-[#1557B0]" : "text-[#7D9E94]"}`}>{step.label}</div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-8 shadow-sm">
                <AnimatePresence mode="wait">
                  <motion.div key={currentStep} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>

                    {/* STEP 1: Business Info */}
                    {currentStep === 1 && (
                      <div className="space-y-5">
                        <div>
                          <h3 className="text-lg font-bold text-[#1557B0]">Thông tin doanh nghiệp</h3>
                          <p className="text-sm text-[#7D9E94] mt-0.5">Cho chúng tôi biết về tổ chức của bạn</p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="sm:col-span-2 space-y-1.5">
                            <Label className="text-[#1557B0] font-semibold flex items-center gap-1.5"><Building2 className="w-4 h-4" /> Tên doanh nghiệp <span className="text-red-500">*</span></Label>
                            <Input value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="VD: Công ty TNHH Nông sản Xanh" className="h-10 rounded-xl border-[#E5EAF0]" />
                          </div>
                          <div className="sm:col-span-2 space-y-1.5">
                            <Label className="text-[#1557B0] font-semibold flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Địa chỉ</Label>
                            <Input value={companyAddress} onChange={e => setCompanyAddress(e.target.value)} placeholder="VD: 123 Nguyễn Huệ, Q.1, TP.HCM" className="h-10 rounded-xl border-[#E5EAF0]" />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-[#1557B0] font-semibold flex items-center gap-1.5"><PhoneIcon className="w-4 h-4" /> Số điện thoại</Label>
                            <Input value={companyPhone} onChange={e => setCompanyPhone(e.target.value)} placeholder="VD: 0901234567" className="h-10 rounded-xl border-[#E5EAF0]" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-[#1557B0] font-semibold">Vai trò của bạn <span className="text-xs text-[#7D9E94] font-normal">(chọn được nhiều)</span></Label>
                          <div className="grid grid-cols-3 gap-3">
                            {(["manufacturer", "farm", "distributor"] as Role[]).map(role => (
                              <button
                                key={role}
                                type="button"
                                onClick={() => toggleRole(role)}
                                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-sm font-semibold ${
                                  roles.includes(role)
                                    ? "border-[#1557B0] bg-[#EFF5FF] text-[#1557B0]"
                                    : "border-[#E5EAF0] text-[#4A5868] hover:border-[#1557B0]/40"
                                }`}
                              >
                                <span className="text-2xl">{ROLE_ICONS[role]}</span>
                                <span>{ROLE_LABELS[role]}</span>
                                {roles.includes(role) && <CheckCircle2 className="w-4 h-4 text-[#1557B0]" />}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-[#1557B0] font-semibold">Upload chứng chỉ / giấy phép doanh nghiệp</Label>
                          <input ref={bizCertRef} type="file" accept="image/*,application/pdf" multiple className="hidden" onChange={handleBizCertUpload} />
                          <button type="button" onClick={() => bizCertRef.current?.click()}
                            className="w-full h-24 border-2 border-dashed border-[#E5EAF0] rounded-xl flex flex-col items-center justify-center gap-2 hover:border-[#1557B0] hover:bg-[#EFF5FF] transition-colors text-[#7D9E94] cursor-pointer">
                            <Upload className="w-6 h-6" />
                            <span className="text-sm">Chọn file (PNG, JPG, PDF)</span>
                          </button>
                          {bizCerts.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {bizCerts.map((c, i) => (
                                <div key={i} className="flex items-center gap-2 bg-[#EFF5FF] text-[#1557B0] px-3 py-1.5 rounded-full text-xs font-semibold">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  {c.certName}
                                  <button onClick={() => setBizCerts(prev => prev.filter((_, idx) => idx !== i))}><X className="w-3 h-3 hover:text-red-500" /></button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* STEP 2: Product Info */}
                    {currentStep === 2 && (
                      <div className="space-y-5">
                        <div>
                          <h3 className="text-lg font-bold text-[#1557B0]">Thông tin sản phẩm</h3>
                          <p className="text-sm text-[#7D9E94] mt-0.5">Điền thông tin để hiển thị trên trang truy xuất</p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="sm:col-span-2 space-y-1.5">
                            <Label className="text-[#1557B0] font-semibold">Tên sản phẩm <span className="text-red-500">*</span></Label>
                            <Input value={productName} onChange={e => setProductName(e.target.value)} placeholder="VD: Cà phê Robusta Đà Lạt" />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-[#1557B0] font-semibold">Mã GTIN / Barcode</Label>
                            <Input value={gtin} onChange={e => setGtin(e.target.value)} placeholder="VD: 8934563012345" />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-[#1557B0] font-semibold">Lô / Mẻ sản xuất</Label>
                            <Input value={batch} onChange={e => setBatch(e.target.value)} placeholder="VD: BATCH-2026-05" />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-[#1557B0] font-semibold">Ngày sản xuất</Label>
                            <Input type="date" value={productionDate} onChange={e => setProductionDate(e.target.value)} />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-[#1557B0] font-semibold">Hạn sử dụng</Label>
                            <Input type="date" value={productExpiry} onChange={e => setProductExpiry(e.target.value)} />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-[#1557B0] font-semibold">Quy cách đóng gói</Label>
                            <Input value={spec} onChange={e => setSpec(e.target.value)} placeholder="VD: Hộp 12 gói x 20g" />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-[#1557B0] font-semibold">Đơn vị tính</Label>
                            <select className="flex h-9 w-full rounded-md border border-[#E5EAF0] bg-transparent px-3 py-1 text-sm text-[#0F1B2D]" value={unit} onChange={e => setUnit(e.target.value)}>
                              {["kg","g","lít","ml","hộp","gói","thùng","cái","bộ"].map(u => <option key={u}>{u}</option>)}
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-[#1557B0] font-semibold">Khối lượng / Dung tích</Label>
                            <Input value={weight} onChange={e => setWeight(e.target.value)} placeholder="VD: 250" />
                          </div>
                          <div className="sm:col-span-2 space-y-1.5">
                            <Label className="text-[#1557B0] font-semibold">Tên chứng nhận sản phẩm</Label>
                            <Input value={certName} onChange={e => setCertName(e.target.value)} placeholder="VD: VietGAP, GlobalGAP, OCOP 4 sao..." />
                          </div>
                          <div className="sm:col-span-2 space-y-1.5">
                            <Label className="text-[#1557B0] font-semibold">Mô tả sản phẩm</Label>
                            <Textarea rows={3} value={description} onChange={e => setDescription(e.target.value)} placeholder="Giới thiệu về sản phẩm..." />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-[#1557B0] font-semibold">Hình ảnh sản phẩm</Label>
                          <input ref={productImageRef} type="file" accept="image/*" className="hidden" onChange={handleProductImageUpload} />
                          <button type="button" onClick={() => productImageRef.current?.click()}
                            className="w-full h-28 border-2 border-dashed border-[#E5EAF0] rounded-xl flex flex-col items-center justify-center gap-2 hover:border-[#1557B0] hover:bg-[#EFF5FF] transition-colors text-[#7D9E94] overflow-hidden relative cursor-pointer">
                            {productImagePreview ? (
                              <img src={productImagePreview} alt="preview" className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-80" />
                            ) : (
                              <><ImageIcon className="w-7 h-7" /><span className="text-sm">Nhấn để tải lên hình ảnh</span></>
                            )}
                            {productImageName && (
                              <span className="relative z-10 bg-white/90 text-[#1557B0] text-xs font-medium px-2 py-0.5 rounded-full">{productImageName}</span>
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 3: Journey */}
                    {currentStep === 3 && (
                      <div className="space-y-5">
                        <div>
                          <h3 className="text-lg font-bold text-[#1557B0]">
                            Hành trình sản phẩm
                            {roles.length > 0 && <span className="ml-2 text-sm font-normal text-[#7D9E94]">— {roles.map(r => ROLE_LABELS[r]).join(", ")}</span>}
                          </h3>
                          <p className="text-sm text-[#7D9E94] mt-0.5">
                            {roles.length === 0 ? "Bạn chưa chọn vai trò ở bước 1 — quay lại để chọn." : step3Label}
                          </p>
                        </div>

                        {/* Manufacturer or Farm: process steps */}
                        {showsProcess && (
                          <div className="space-y-3">
                            <div className="space-y-3">
                              {processSteps.map((step, i) => (
                                <div key={i} className="p-4 border border-[#E5EAF0] rounded-xl bg-[#FAFBFC] relative group">
                                  <button onClick={() => setProcessSteps(prev => prev.filter((_, idx) => idx !== i))}
                                    className="absolute top-2 right-2 text-[#7D9E94] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                  <div className="flex items-center gap-2 mb-3">
                                    <div className="w-6 h-6 rounded-full bg-[#1557B0] text-white text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</div>
                                    <span className="text-xs font-bold text-[#1557B0] uppercase tracking-wide">Bước {i + 1}</span>
                                  </div>
                                  <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                      <Label className="text-xs text-[#4A5868]">Tên bước</Label>
                                      <Input value={step.name} onChange={e => updateStep(i, "name", e.target.value)} className="h-9" />
                                    </div>
                                    <div className="space-y-1">
                                      <Label className="text-xs text-[#4A5868]">Ngày giờ thực hiện</Label>
                                      <Input type="datetime-local" value={step.date} onChange={e => updateStep(i, "date", e.target.value)} className="h-9" />
                                    </div>
                                    <div className="space-y-1">
                                      <Label className="text-xs text-[#4A5868]">Vật tư sử dụng</Label>
                                      <Input value={step.materials} onChange={e => updateStep(i, "materials", e.target.value)} placeholder="VD: Phân bón, thuốc BVTV..." className="h-9" />
                                    </div>
                                    <div className="space-y-1">
                                      <Label className="text-xs text-[#4A5868]">Mô tả</Label>
                                      <Input value={step.desc} onChange={e => updateStep(i, "desc", e.target.value)} className="h-9" />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <Button variant="outline" onClick={() => setProcessSteps(prev => [...prev, emptyStep()])}
                              className="w-full border-dashed border-2 text-[#1557B0] hover:bg-[#EFF5FF]">
                              <Plus className="w-4 h-4 mr-2" /> Thêm bước
                            </Button>
                          </div>
                        )}

                        {/* Distributor: supplier + buyer */}
                        {showsDistributor && (
                          <div className="space-y-4">
                            <div className="border border-[#E5EAF0] rounded-xl overflow-hidden">
                              <div className="flex items-center gap-2 px-4 py-3 bg-[#EFF5FF]">
                                <div className="w-7 h-7 bg-[#1557B0] rounded-lg flex items-center justify-center"><span className="text-white text-xs font-bold">NCC</span></div>
                                <span className="font-semibold text-[#1557B0] text-sm">Nhà cung cấp</span>
                              </div>
                              <div className="px-4 pb-4 pt-3 grid sm:grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                  <Label className="text-xs text-[#4A5868]">Tên nhà cung cấp</Label>
                                  <Input value={supplierName} onChange={e => setSupplierName(e.target.value)} placeholder="VD: Công ty TNHH ABC" className="h-9" />
                                </div>
                                <div className="space-y-1.5">
                                  <Label className="text-xs text-[#4A5868]">Số điện thoại</Label>
                                  <Input value={supplierPhone} onChange={e => setSupplierPhone(e.target.value)} placeholder="0901234567" className="h-9" />
                                </div>
                                <div className="sm:col-span-2 space-y-1.5">
                                  <Label className="text-xs text-[#4A5868]">Địa chỉ</Label>
                                  <Input value={supplierAddress} onChange={e => setSupplierAddress(e.target.value)} placeholder="VD: 456 Lê Lợi, Q.1, TP.HCM" className="h-9" />
                                </div>
                                <div className="space-y-1.5">
                                  <Label className="text-xs text-[#4A5868]">Ngày nhập hàng</Label>
                                  <Input type="date" value={importDate} onChange={e => setImportDate(e.target.value)} className="h-9" />
                                </div>
                              </div>
                            </div>

                            <div className="border border-[#E5EAF0] rounded-xl overflow-hidden">
                              <div className="flex items-center gap-2 px-4 py-3 bg-[#fef3e2]">
                                <div className="w-7 h-7 bg-[#ed8302] rounded-lg flex items-center justify-center"><span className="text-white text-xs font-bold">NM</span></div>
                                <span className="font-semibold text-[#ed8302] text-sm">Người mua</span>
                              </div>
                              <div className="px-4 pb-4 pt-3 grid sm:grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                  <Label className="text-xs text-[#4A5868]">Tên người mua</Label>
                                  <Input value={buyerName} onChange={e => setBuyerName(e.target.value)} placeholder="VD: Siêu thị XYZ" className="h-9" />
                                </div>
                                <div className="space-y-1.5">
                                  <Label className="text-xs text-[#4A5868]">Số điện thoại</Label>
                                  <Input value={buyerPhone} onChange={e => setBuyerPhone(e.target.value)} placeholder="0901234567" className="h-9" />
                                </div>
                                <div className="sm:col-span-2 space-y-1.5">
                                  <Label className="text-xs text-[#4A5868]">Địa chỉ</Label>
                                  <Input value={buyerAddress} onChange={e => setBuyerAddress(e.target.value)} placeholder="VD: 789 Trần Hưng Đạo, Q.5" className="h-9" />
                                </div>
                                <div className="space-y-1.5">
                                  <Label className="text-xs text-[#4A5868]">Ngày bán</Label>
                                  <Input type="date" value={saleDate} onChange={e => setSaleDate(e.target.value)} className="h-9" />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {roles.length === 0 && (
                          <div className="bg-[#fef3e2] border border-[#fdba74]/40 rounded-xl p-4 flex items-start gap-3">
                            <span className="text-2xl">⚠️</span>
                            <div>
                              <p className="text-sm font-semibold text-[#ed8302]">Chưa chọn vai trò</p>
                              <p className="text-xs text-[#4A5868] mt-0.5">Quay lại bước 1 để chọn ít nhất một vai trò.</p>
                            </div>
                          </div>
                        )}

                        {!user && (
                          <div className="bg-[#EFF5FF] border border-[#DCEEFF] rounded-xl p-4 flex items-start gap-3">
                            <Lock className="w-5 h-5 text-[#1557B0] shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-semibold text-[#1557B0]">Đăng ký để tạo mã QR</p>
                              <p className="text-xs text-[#4A5868] mt-0.5">Nhấn "Tạo mã QR" bên dưới để đăng ký miễn phí và nhận 1 lượt tạo QR ngay.</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* STEP 4: QR Code */}
                    {currentStep === 4 && (
                      <div className="space-y-6">
                        <div className="text-center space-y-2">
                          <div className="w-16 h-16 bg-[#EFF5FF] rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle2 className="w-8 h-8 text-[#1557B0]" />
                          </div>
                          <h3 className="text-xl font-bold text-[#1557B0]">Mã QR đã sẵn sàng!</h3>
                          <p className="text-sm text-[#4A5868]">Quét mã QR bên phải để xem trang truy xuất. In hoặc tải về để gắn lên sản phẩm.</p>
                        </div>

                        {!activePlan && (
                          <div className="bg-gradient-to-r from-[#EFF5FF] to-[#DCEEFF] border border-[#DCEEFF] rounded-xl p-4">
                            <div className="flex items-center justify-between gap-4">
                              <div>
                                <p className="text-sm font-bold text-[#1557B0]">Nâng cấp để in nhiều mã QR</p>
                                <p className="text-xs text-[#4A5868] mt-0.5">Bản thử chỉ cho in 1 mã. Gói trả phí: in không giới hạn, quản lý nhiều SKU.</p>
                              </div>
                              <Button onClick={() => openPricingModal("download_qr")} className="shrink-0 bg-[#1557B0] hover:bg-[#0D3F8A] text-white rounded-full text-xs px-4 h-9">
                                Xem gói
                              </Button>
                            </div>
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Button
                            onClick={() => handleDownloadOrPrint("download")}
                            className="flex-1 sm:flex-none bg-[#1557B0] hover:bg-[#0D3F8A] text-white rounded-full h-11 px-6 font-semibold flex items-center justify-center gap-2"
                          >
                            <Download className="w-4 h-4" /> Tải mã QR
                          </Button>
                          <Button
                            onClick={() => handleDownloadOrPrint("print")}
                            variant="outline"
                            className="flex-1 sm:flex-none border-[#1557B0] text-[#1557B0] hover:bg-[#EFF5FF] rounded-full h-11 px-6 font-semibold flex items-center justify-center gap-2"
                          >
                            <Printer className="w-4 h-4" /> In mã QR
                          </Button>
                        </div>

                        {showPrintPricingHint && !activePlan && (
                          <div className="bg-[#fef3e2] border border-[#fdba74]/40 rounded-xl p-4 text-center">
                            <p className="text-sm text-[#ed8302] font-semibold">Chọn gói để in nhiều mã, hoặc bỏ qua để in 1 mã miễn phí.</p>
                            <button onClick={doDownload} className="text-xs text-[#4A5868] underline mt-2 hover:text-[#0F1B2D]">Tải 1 mã QR ngay</button>
                          </div>
                        )}

                        <div className="border-t border-[#E5EAF0] pt-4 text-center">
                          <p className="text-xs text-[#7D9E94]">Muốn quản lý nhiều sản phẩm và phân quyền nhân viên?</p>
                          <button onClick={() => openPricingModal()} className="text-xs text-[#1557B0] font-semibold underline underline-offset-2 mt-1">Xem các gói nâng cấp →</button>
                        </div>
                      </div>
                    )}

                  </motion.div>
                </AnimatePresence>

                {currentStep <= 3 && (
                  <div className="flex justify-between items-center mt-10 pt-6 border-t border-[#E5EAF0]">
                    {currentStep > 1
                      ? <Button variant="outline" onClick={() => setCurrentStep(s => s - 1)} className="text-[#4A5868] border-[#E5EAF0]">Quay lại</Button>
                      : <div />}
                    <CtaButton onClick={handleNext}>
                      {currentStep === 3
                        ? (!user ? "Đăng ký & Tạo mã QR" : "Tạo mã QR")
                        : "Tiếp tục"}
                    </CtaButton>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: Phone Preview */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 h-fit">
              <div className="w-[300px] mx-auto h-[620px] rounded-[44px] bg-gradient-to-b from-[#4A8FE0] to-[#0B2D8A] p-3 shadow-2xl shadow-[#1557B0]/30 relative">
                <div className="bg-white rounded-[36px] overflow-hidden h-full overflow-y-auto relative custom-scrollbar flex flex-col">
                  <div className="h-7 bg-[#0F1B2D] w-full shrink-0 flex justify-center items-center">
                    <div className="w-1/3 h-4 bg-black rounded-full absolute top-1.5" />
                  </div>
                  <div className="flex-1 pb-10">
                    <div className="px-4 py-3 border-b border-[#E5EAF0] flex items-center justify-between bg-white sticky top-0 z-20">
                      <div className="flex items-center gap-2">
                        <img src={logoPng} className="h-5" alt="logo" />
                        <span className="text-sm font-bold text-[#1557B0]">Checkee</span>
                      </div>
                      <div className="bg-[#EFF5FF] text-[#1557B0] px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Truy xuất
                      </div>
                    </div>

                    {productImagePreview && (
                      <div className="w-full h-32 overflow-hidden">
                        <img src={productImagePreview} alt="product" className="w-full h-full object-cover" />
                      </div>
                    )}

                    <div className="px-4 py-4 bg-white">
                      <h2 className="text-lg font-bold text-[#0F1B2D] mb-0.5">{productName || "Tên sản phẩm"}</h2>
                      {companyName && <p className="text-[10px] text-[#7D9E94]">{companyName}</p>}
                      <div className="flex items-center gap-2 flex-wrap mt-1">
                        {gtin && <span className="text-[10px] text-[#7D9E94] font-mono">GTIN: {gtin}</span>}
                        {batch && <span className="text-[10px] text-[#7D9E94]">Lô: {batch}</span>}
                      </div>
                      <div className="mt-2 flex gap-1.5 flex-wrap">
                        {roles.map(r => (
                          <span key={r} className="inline-block bg-[#EFF5FF] text-[#1557B0] px-2 py-0.5 rounded-full text-[10px] font-semibold">{ROLE_LABELS[r]}</span>
                        ))}
                        {weight && unit && <span className="inline-block bg-[#F4F6F8] text-[#4A5868] px-2 py-0.5 rounded-full text-[10px] font-semibold">{weight} {unit}</span>}
                        {certName && <span className="inline-block bg-[#fef3e2] text-[#ed8302] px-2 py-0.5 rounded-full text-[10px] font-semibold">{certName}</span>}
                      </div>
                    </div>

                    {(productionDate || productExpiry || spec) && (
                      <div className="px-4 py-3 bg-[#FAFBFC] border-y border-[#E5EAF0]">
                        <div className="grid grid-cols-2 gap-2">
                          {productionDate && <div><div className="text-[9px] text-[#7D9E94] uppercase mb-0.5">Ngày SX</div><div className="text-xs text-[#0F1B2D] font-semibold">{productionDate}</div></div>}
                          {productExpiry && <div><div className="text-[9px] text-[#7D9E94] uppercase mb-0.5">HSD</div><div className="text-xs text-[#0F1B2D] font-semibold">{productExpiry}</div></div>}
                          {spec && <div className="col-span-2"><div className="text-[9px] text-[#7D9E94] uppercase mb-0.5">Quy cách</div><div className="text-xs text-[#0F1B2D] font-semibold">{spec}</div></div>}
                        </div>
                      </div>
                    )}

                    {companyAddress && (
                      <div className="px-4 py-3 bg-white border-b border-[#E5EAF0]">
                        <div className="uppercase text-[9px] text-[#7D9E94] font-bold mb-1">ĐỊA CHỈ DN</div>
                        <div className="text-xs text-[#0F1B2D]">{companyAddress}</div>
                      </div>
                    )}

                    {showsProcess && processSteps.some(s => s.name) && (
                      <div className="px-4 py-3 bg-[#FAFBFC] border-b border-[#E5EAF0]">
                        <div className="uppercase text-[9px] text-[#7D9E94] font-bold mb-2">{step3Label.toUpperCase()}</div>
                        <div className="space-y-2">
                          {processSteps.filter(s => s.name).map((step, i) => (
                            <div key={i} className="flex gap-2">
                              <div className="w-4 h-4 rounded-full bg-[#1557B0] text-white text-[8px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
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

                    {showsDistributor && (supplierName || buyerName) && (
                      <div className="px-4 py-3 bg-[#FAFBFC] border-b border-[#E5EAF0]">
                        {supplierName && (
                          <div className="mb-2">
                            <div className="text-[9px] text-[#7D9E94] uppercase font-bold mb-1">NHÀ CUNG CẤP</div>
                            <div className="text-xs font-semibold text-[#0F1B2D]">{supplierName}</div>
                            {supplierAddress && <div className="text-[9px] text-[#7D9E94]">{supplierAddress}</div>}
                          </div>
                        )}
                        {buyerName && (
                          <div>
                            <div className="text-[9px] text-[#7D9E94] uppercase font-bold mb-1">NGƯỜI MUA</div>
                            <div className="text-xs font-semibold text-[#0F1B2D]">{buyerName}</div>
                            {buyerAddress && <div className="text-[9px] text-[#7D9E94]">{buyerAddress}</div>}
                          </div>
                        )}
                      </div>
                    )}

                    {qrReady && (
                      <div className="px-4 py-6 flex flex-col items-center gap-4" ref={qrRef}>
                        <QRCodeCanvas value={previewUrl} size={110} level="H" includeMargin />
                        <p className="text-[10px] text-[#7D9E94] text-center">Quét mã QR để xem thông tin sản phẩm</p>
                      </div>
                    )}

                    {!qrReady && (
                      <div className="px-4 py-6 flex flex-col items-center gap-3 opacity-30">
                        <div className="w-[110px] h-[110px] border-2 border-dashed border-[#7D9E94] rounded-xl flex items-center justify-center">
                          <QrCodeIcon className="w-10 h-10 text-[#7D9E94]" />
                        </div>
                        <p className="text-[10px] text-[#7D9E94] text-center">Mã QR xuất hiện ở bước cuối</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Upsell nudge below phone */}
              {!activePlan && (
                <div className="mt-6 w-[300px] mx-auto bg-gradient-to-r from-[#EFF5FF] to-[#DCEEFF] border border-[#DCEEFF] rounded-2xl p-4 text-center">
                  <p className="text-sm font-bold text-[#1557B0] mb-1">Quản lý nhiều sản phẩm?</p>
                  <p className="text-xs text-[#4A5868] mb-3">Nâng cấp để tạo QR không giới hạn, quản lý SKU và phân quyền nhân viên.</p>
                  <button
                    onClick={() => openPricingModal()}
                    className="w-full py-2 rounded-full bg-[#1557B0] text-white text-xs font-semibold hover:bg-[#0D3F8A] transition-colors"
                  >
                    Xem gói nâng cấp →
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
