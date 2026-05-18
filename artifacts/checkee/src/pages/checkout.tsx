import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import {
  CheckCircle2, Loader2, Building2, CreditCard, FileText,
  ChevronRight, AlertCircle, Smartphone, Copy, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QRCodeCanvas } from "qrcode.react";
import { useAuth, type BusinessInfo } from "@/context/auth-context";

const BANK_INFO = {
  bank: "Vietcombank",
  account: "1234567890",
  name: "CONG TY CP CHECKEE VIETNAM",
  branch: "Chi nhánh TP. Hồ Chí Minh",
};

export default function Checkout() {
  const [, navigate] = useLocation();
  const { user, setBusinessInfo, activatePlan, businessInfo: savedBiz } = useAuth();

  const [planName, setPlanName] = useState("Tăng trưởng");
  const [planPrice, setPlanPrice] = useState("43.200.000");
  const [planPeriod, setPlanPeriod] = useState("/năm");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get("plan"); if (p) setPlanName(p);
    const pr = params.get("price"); if (pr) setPlanPrice(pr);
    const pe = params.get("period"); if (pe) setPlanPeriod(pe);
  }, []);

  const [step, setStep] = useState<"business" | "payment" | "success">("business");
  const [payMethod, setPayMethod] = useState<"card" | "transfer">("transfer");
  const [transferConfirmed, setTransferConfirmed] = useState<boolean | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const [biz, setBiz] = useState<BusinessInfo>({
    companyName: savedBiz?.companyName || "",
    taxCode: savedBiz?.taxCode || "",
    address: savedBiz?.address || "",
    representative: savedBiz?.representative || "",
    phone: savedBiz?.phone || "",
  });
  const [bizError, setBizError] = useState("");
  const [taxLookup, setTaxLookup] = useState(false);

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [payError, setPayError] = useState("");
  const [paying, setPaying] = useState(false);

  useEffect(() => { if (!user) navigate("/"); }, [user, navigate]);

  const handleTaxLookup = async () => {
    if (!biz.taxCode) return;
    setTaxLookup(true);
    await new Promise(r => setTimeout(r, 1000));
    setBiz(b => ({
      ...b,
      companyName: "Công ty TNHH " + b.taxCode.slice(-4) + " Việt Nam",
      address: "Số 1 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
    }));
    setTaxLookup(false);
  };

  const handleBizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!biz.companyName || !biz.taxCode || !biz.address || !biz.representative || !biz.phone) {
      setBizError("Vui lòng điền đầy đủ tất cả các trường bắt buộc."); return;
    }
    setBizError("");
    setBusinessInfo(biz);
    setStep("payment");
  };

  const formatCard = (v: string) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d;
  };

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (payMethod === "card") {
      if (!cardNumber || !cardName || !expiry || !cvv) { setPayError("Vui lòng điền đầy đủ thông tin thẻ."); return; }
    }
    if (!agreed) { setPayError("Vui lòng đồng ý với điều khoản sử dụng trước khi thanh toán."); return; }
    setPaying(true); setPayError("");
    await new Promise(r => setTimeout(r, 2000));
    if (payMethod === "card" && cardNumber.replace(/\s/g, "").startsWith("4000")) {
      setPaying(false);
      setPayError("Thẻ bị từ chối. Vui lòng thử thẻ khác hoặc liên hệ ngân hàng.");
      return;
    }
    activatePlan({ name: planName, price: planPrice, period: planPeriod });
    setPaying(false);
    setStep("success");
  };

  const transferContent = `CHECKEE ${planName.toUpperCase()} ${user?.name?.toUpperCase() || ""}`.slice(0, 50);
  const qrValue = `${BANK_INFO.bank}|${BANK_INFO.account}|${BANK_INFO.name}|${planPrice.replace(/\./g, "")}|${transferContent}`;

  return (
    <div className="min-h-[100dvh] bg-[#FAFBFC] pt-24 pb-16 font-sans">
      <div className="container max-w-[960px] mx-auto px-6">

        {step !== "success" && (
          <div className="mb-10">
            <h1 className="text-2xl lg:text-3xl font-bold text-[#0c964b] mb-2">Hoàn tất đăng ký</h1>
            <p className="text-[#4A5868]">Gói <strong>{planName}</strong> · <strong>{planPrice}đ</strong>{planPeriod}</p>
            <div className="flex items-center gap-3 mt-6">
              {[
                { id: "business", label: "Thông tin doanh nghiệp", icon: Building2 },
                { id: "payment", label: "Thanh toán", icon: CreditCard },
              ].map((s, i) => {
                const isDone = s.id === "business" && step === "payment";
                const isActive = s.id === step;
                return (
                  <div key={s.id} className="flex items-center gap-3">
                    {i > 0 && <ChevronRight className="w-4 h-4 text-[#7D9E94]" />}
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${isDone ? "bg-[#dcf0e6] text-[#1A6B52]" : isActive ? "bg-[#0c964b] text-white" : "bg-[#E5EAF0] text-[#7D9E94]"}`}>
                      {isDone ? <CheckCircle2 className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
                      {s.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {step === "business" && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-[#E5EAF0] p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#dcf0e6] rounded-xl flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-[#0c964b]" />
                  </div>
                  <div>
                    <h2 className="font-bold text-[#0c964b]">Thông tin doanh nghiệp</h2>
                    <p className="text-xs text-[#7D9E94]">Dùng để xuất hóa đơn VAT và ký hợp đồng</p>
                  </div>
                </div>
                <form onSubmit={handleBizSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <Label className="text-[#0c964b] font-semibold text-sm">Mã số thuế <span className="text-red-500">*</span></Label>
                    <div className="flex gap-2">
                      <Input value={biz.taxCode} onChange={e => setBiz(b => ({ ...b, taxCode: e.target.value }))} placeholder="VD: 0123456789" className="h-11 rounded-xl border-[#E5EAF0]" />
                      <button type="button" onClick={handleTaxLookup} disabled={taxLookup || !biz.taxCode}
                        className="px-4 py-2 rounded-xl bg-[#dcf0e6] text-[#0c964b] font-semibold text-sm whitespace-nowrap disabled:opacity-50 hover:bg-[#b5d9c5] transition-colors">
                        {taxLookup ? <Loader2 className="w-4 h-4 animate-spin" /> : "Tra cứu"}
                      </button>
                    </div>
                    <p className="text-xs text-[#7D9E94]">Nhập MST để tự động điền tên và địa chỉ doanh nghiệp</p>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[#0c964b] font-semibold text-sm">Tên doanh nghiệp <span className="text-red-500">*</span></Label>
                    <Input value={biz.companyName} onChange={e => setBiz(b => ({ ...b, companyName: e.target.value }))} placeholder="Tên chính thức theo đăng ký kinh doanh" className="h-11 rounded-xl border-[#E5EAF0]" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[#0c964b] font-semibold text-sm">Địa chỉ doanh nghiệp <span className="text-red-500">*</span></Label>
                    <Input value={biz.address} onChange={e => setBiz(b => ({ ...b, address: e.target.value }))} placeholder="Địa chỉ trên đăng ký kinh doanh" className="h-11 rounded-xl border-[#E5EAF0]" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-[#0c964b] font-semibold text-sm">Người đại diện <span className="text-red-500">*</span></Label>
                      <Input value={biz.representative} onChange={e => setBiz(b => ({ ...b, representative: e.target.value }))} placeholder="Họ và tên" className="h-11 rounded-xl border-[#E5EAF0]" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[#0c964b] font-semibold text-sm">Số điện thoại <span className="text-red-500">*</span></Label>
                      <Input value={biz.phone} onChange={e => setBiz(b => ({ ...b, phone: e.target.value }))} placeholder="0912 345 678" className="h-11 rounded-xl border-[#E5EAF0]" />
                    </div>
                  </div>
                  {bizError && (
                    <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 rounded-xl p-3">
                      <AlertCircle className="w-4 h-4 shrink-0" />{bizError}
                    </div>
                  )}
                  <Button type="submit" className="w-full h-12 rounded-full bg-[#0c964b] hover:bg-[#085c35] text-white font-semibold">
                    Tiếp theo — Thông tin thanh toán
                  </Button>
                </form>
              </div>
            </div>
            <OrderSummary planName={planName} planPrice={planPrice} planPeriod={planPeriod} />
          </div>
        )}

        {step === "payment" && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {/* Payment Method Toggle */}
              <div className="flex gap-2 p-1 bg-[#F4F6F8] rounded-2xl">
                <button onClick={() => setPayMethod("transfer")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${payMethod === "transfer" ? "bg-white text-[#0c964b] shadow-sm" : "text-[#7D9E94]"}`}>
                  <Smartphone className="w-4 h-4" /> Chuyển khoản ngân hàng
                </button>
                <button onClick={() => setPayMethod("card")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${payMethod === "card" ? "bg-white text-[#0c964b] shadow-sm" : "text-[#7D9E94]"}`}>
                  <CreditCard className="w-4 h-4" /> Thẻ ngân hàng / Thẻ tín dụng
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-[#E5EAF0] p-8 shadow-sm">
                {/* Bank Transfer */}
                {payMethod === "transfer" && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-[#dcf0e6] rounded-xl flex items-center justify-center">
                        <Smartphone className="w-5 h-5 text-[#0c964b]" />
                      </div>
                      <div>
                        <h2 className="font-bold text-[#0c964b]">Quét mã QR chuyển khoản</h2>
                        <p className="text-xs text-[#7D9E94]">Mở ứng dụng ngân hàng và quét mã QR bên dưới</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 items-start">
                      <div className="bg-white border-2 border-[#E5EAF0] rounded-2xl p-4 flex flex-col items-center gap-3 shrink-0">
                        <QRCodeCanvas value={qrValue} size={160} level="H" includeMargin bgColor="#ffffff" fgColor="#0c964b" />
                        <p className="text-xs text-[#7D9E94] text-center">Quét bằng ứng dụng ngân hàng bất kỳ</p>
                      </div>
                      <div className="flex-1 space-y-3">
                        {[
                          { label: "Ngân hàng", value: BANK_INFO.bank, key: "bank" },
                          { label: "Số tài khoản", value: BANK_INFO.account, key: "account" },
                          { label: "Chủ tài khoản", value: BANK_INFO.name, key: "name" },
                          { label: "Số tiền", value: `${planPrice}đ`, key: "amount" },
                          { label: "Nội dung CK", value: transferContent, key: "content" },
                        ].map(item => (
                          <div key={item.key} className="flex items-center justify-between py-2 border-b border-[#F4F6F8]">
                            <div>
                              <p className="text-xs text-[#7D9E94]">{item.label}</p>
                              <p className="text-sm font-semibold text-[#0F1B2D] mt-0.5">{item.value}</p>
                            </div>
                            <button onClick={() => copyText(item.value, item.key)}
                              className="ml-3 w-8 h-8 rounded-lg bg-[#F4F6F8] flex items-center justify-center text-[#7D9E94] hover:bg-[#dcf0e6] hover:text-[#0c964b] transition-colors">
                              {copied === item.key ? <Check className="w-4 h-4 text-[#1A6B52]" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#fef3e2] border border-[#fdba74]/30 rounded-xl p-4">
                      <p className="text-sm font-semibold text-[#ed8302] mb-1">⚠️ Lưu ý quan trọng</p>
                      <p className="text-xs text-[#4A5868]">Vui lòng nhập đúng nội dung chuyển khoản để hệ thống tự động kích hoạt gói. Sau khi chuyển khoản, nhấn xác nhận bên dưới.</p>
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-[#0F1B2D]">Bạn đã hoàn tất chuyển khoản chưa?</p>
                      <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => setTransferConfirmed(true)}
                          className={`py-3 rounded-xl text-sm font-semibold border-2 transition-all ${transferConfirmed === true ? "border-[#1A6B52] bg-[#dcf0e6] text-[#1A6B52]" : "border-[#E5EAF0] text-[#4A5868] hover:border-[#0c964b]"}`}>
                          <CheckCircle2 className="w-4 h-4 inline mr-1.5" /> Tôi đã chuyển khoản
                        </button>
                        <button onClick={() => setTransferConfirmed(false)}
                          className={`py-3 rounded-xl text-sm font-semibold border-2 transition-all ${transferConfirmed === false ? "border-[#ed8302] bg-[#fef3e2] text-[#ed8302]" : "border-[#E5EAF0] text-[#4A5868] hover:border-[#ed8302]"}`}>
                          Chưa chuyển khoản
                        </button>
                      </div>
                      {transferConfirmed === false && (
                        <p className="text-xs text-[#7D9E94]">Gói sẽ được kích hoạt ngay sau khi chúng tôi nhận được thanh toán. Thường trong vòng 5–15 phút.</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Card Payment */}
                {payMethod === "card" && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-[#dcf0e6] rounded-xl flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-[#0c964b]" />
                      </div>
                      <div>
                        <h2 className="font-bold text-[#0c964b]">Thông tin thẻ thanh toán</h2>
                        <p className="text-xs text-[#7D9E94]">Visa, Mastercard hoặc thẻ ATM nội địa</p>
                      </div>
                    </div>
                    <div className="space-y-5">
                      <div className="space-y-1.5">
                        <Label className="text-[#0c964b] font-semibold text-sm">Số thẻ <span className="text-red-500">*</span></Label>
                        <Input value={cardNumber} onChange={e => setCardNumber(formatCard(e.target.value))} placeholder="1234 5678 9012 3456" className="h-11 rounded-xl border-[#E5EAF0] font-mono tracking-widest" maxLength={19} />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[#0c964b] font-semibold text-sm">Tên chủ thẻ <span className="text-red-500">*</span></Label>
                        <Input value={cardName} onChange={e => setCardName(e.target.value.toUpperCase())} placeholder="NGUYEN VAN A" className="h-11 rounded-xl border-[#E5EAF0] uppercase" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label className="text-[#0c964b] font-semibold text-sm">Ngày hết hạn <span className="text-red-500">*</span></Label>
                          <Input value={expiry} onChange={e => setExpiry(formatExpiry(e.target.value))} placeholder="MM/YY" className="h-11 rounded-xl border-[#E5EAF0]" maxLength={5} />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-[#0c964b] font-semibold text-sm">CVV <span className="text-red-500">*</span></Label>
                          <Input value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="•••" type="password" className="h-11 rounded-xl border-[#E5EAF0]" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Shared bottom section */}
                <div className="mt-6 space-y-4">
                  <div className="bg-[#FAFBFC] rounded-xl p-4 border border-[#E5EAF0]">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-0.5 w-4 h-4 rounded border-[#E5EAF0] accent-[#0c964b]" />
                      <span className="text-sm text-[#4A5868] leading-relaxed">
                        <FileText className="w-4 h-4 inline mr-1 text-[#0c964b]" />
                        Tôi đã đọc và đồng ý với{" "}
                        <button type="button" className="text-[#0c964b] font-semibold underline">Điều khoản sử dụng</button>
                        {" "}và{" "}
                        <button type="button" className="text-[#0c964b] font-semibold underline">Hợp đồng dịch vụ</button>
                        {" "}của Checkee. Thông tin đồng ý được ghi nhận kèm thời điểm và địa chỉ IP.
                      </span>
                    </label>
                  </div>

                  {/* Referral Code */}
                  <div className="space-y-1.5">
                    <Label className="text-[#4A5868] font-semibold text-sm">Mã người giới thiệu <span className="text-xs font-normal text-[#7D9E94]">(Không bắt buộc)</span></Label>
                    <Input value={referralCode} onChange={e => setReferralCode(e.target.value.toUpperCase())} placeholder="VD: PARTNER2026" className="h-10 rounded-xl border-[#E5EAF0] font-mono text-sm" />
                    {referralCode && <p className="text-xs text-[#1A6B52] font-medium">✓ Mã giới thiệu hợp lệ — bạn sẽ nhận ưu đãi thêm!</p>}
                  </div>

                  {payError && (
                    <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 rounded-xl p-3">
                      <AlertCircle className="w-4 h-4 shrink-0" />{payError}
                    </div>
                  )}

                  <form onSubmit={handlePay}>
                    <Button type="submit" disabled={paying || !agreed || (payMethod === "transfer" && transferConfirmed === null)}
                      className="w-full h-12 rounded-full bg-[#ed8302] hover:bg-[#d47200] text-white font-semibold text-base disabled:opacity-50">
                      {paying
                        ? <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Đang xử lý...</span>
                        : payMethod === "transfer"
                          ? transferConfirmed ? "Xác nhận & Kích hoạt gói" : `Xác nhận thanh toán ${planPrice}đ`
                          : `Thanh toán ${planPrice}đ`}
                    </Button>
                  </form>

                  <div className="flex items-center justify-center gap-4 text-xs text-[#7D9E94]">
                    <span>🔒 Bảo mật SSL 256-bit</span>
                    <span>·</span>
                    <span>Hóa đơn VAT xuất ngay</span>
                  </div>
                </div>
              </div>

              <button onClick={() => setStep("business")} className="text-sm text-[#7D9E94] hover:text-[#0c964b] flex items-center gap-1">
                ← Quay lại thông tin doanh nghiệp
              </button>
            </div>
            <OrderSummary planName={planName} planPrice={planPrice} planPeriod={planPeriod} biz={biz} />
          </div>
        )}

        {step === "success" && (
          <div className="max-w-[560px] mx-auto text-center py-16">
            <div className="w-24 h-24 bg-[#dcf0e6] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-[#1A6B52]" />
            </div>
            <h1 className="text-3xl font-bold text-[#0c964b] mb-3">Thanh toán thành công!</h1>
            <p className="text-[#4A5868] mb-2">
              Gói <strong>{planName}</strong> đã được kích hoạt. Email xác nhận kèm hợp đồng PDF đã gửi.
            </p>
            <p className="text-sm text-[#7D9E94] mb-10">Bạn có thể quản lý gói và xem hóa đơn trong Dashboard.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => navigate("/dashboard")} className="px-8 py-3 rounded-full bg-[#0c964b] text-white font-semibold hover:bg-[#085c35] transition-colors">
                Vào Dashboard
              </button>
              <button onClick={() => navigate("/demo")} className="px-8 py-3 rounded-full border border-[#E5EAF0] text-[#0c964b] font-semibold hover:bg-[#FAFBFC] transition-colors">
                Tạo QR ngay
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function OrderSummary({ planName, planPrice, planPeriod, biz }: {
  planName: string; planPrice: string; planPeriod: string; biz?: BusinessInfo;
}) {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-[#E5EAF0] p-6 shadow-sm">
        <h3 className="font-bold text-[#0c964b] mb-4 text-sm uppercase tracking-wide">Tóm tắt đơn hàng</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-[#4A5868]">Gói Checkee Trace</span>
            <span className="font-semibold text-[#0c964b]">{planName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#4A5868]">Chu kỳ</span>
            <span className="font-semibold text-[#0c964b]">Hàng năm</span>
          </div>
          <div className="border-t border-[#E5EAF0] pt-3 flex justify-between font-bold">
            <span className="text-[#0c964b]">Tổng cộng</span>
            <span className="text-[#ed8302] text-lg">{planPrice}đ</span>
          </div>
        </div>
        <div className="mt-4 bg-[#dcf0e6] rounded-xl p-3 text-xs text-[#1A6B52] font-semibold text-center">
          Hóa đơn VAT xuất ngay sau thanh toán
        </div>
      </div>
      {biz && biz.companyName && (
        <div className="bg-white rounded-2xl border border-[#E5EAF0] p-6 shadow-sm">
          <h3 className="font-bold text-[#0c964b] mb-3 text-sm uppercase tracking-wide flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#1A6B52]" /> Doanh nghiệp
          </h3>
          <div className="text-sm text-[#4A5868] space-y-1">
            <p className="font-semibold text-[#0c964b]">{biz.companyName}</p>
            <p>MST: {biz.taxCode}</p>
            <p>{biz.address}</p>
          </div>
        </div>
      )}
    </div>
  );
}
