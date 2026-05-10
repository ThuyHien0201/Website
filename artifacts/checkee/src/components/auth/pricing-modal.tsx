import { X, CheckCircle2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { useLocation } from "wouter";

const PLANS = [
  {
    name: "Khởi đầu",
    subtitle: "Dưới 5 dòng SP",
    price: "14.400.000",
    priceNum: 14400000,
    period: "/năm",
    codes: "10.000 mã QR",
    accounts: "Dưới 5 TK",
    highlight: false,
  },
  {
    name: "Tăng trưởng",
    subtitle: "Dưới 20 dòng SP",
    price: "43.200.000",
    priceNum: 43200000,
    period: "/năm",
    codes: "20.000 mã QR",
    accounts: "Dưới 5 TK",
    highlight: true,
  },
  {
    name: "Chuyên nghiệp",
    subtitle: "Dưới 50 dòng SP",
    price: "72.000.000",
    priceNum: 72000000,
    period: "/năm",
    codes: "50.000 mã QR",
    accounts: "Dưới 5 TK",
    highlight: false,
  },
  {
    name: "Doanh nghiệp",
    subtitle: "Trên 50 dòng SP",
    price: "108.000.000",
    priceNum: 108000000,
    period: "/năm",
    codes: "100.000 mã QR",
    accounts: "Dưới 5 TK",
    highlight: false,
  },
];

export function PricingModal() {
  const { showPricingModal, closePricingModal } = useAuth();
  const [, navigate] = useLocation();

  if (!showPricingModal) return null;

  const handleSelect = (plan: typeof PLANS[0]) => {
    closePricingModal();
    navigate(`/checkout?plan=${encodeURIComponent(plan.name)}&price=${plan.price}&period=${encodeURIComponent(plan.period)}`);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closePricingModal} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-[900px] overflow-hidden max-h-[90vh] overflow-y-auto">
        <button
          onClick={closePricingModal}
          className="absolute top-5 right-5 z-10 w-8 h-8 rounded-full bg-[#E5EAF0] hover:bg-[#D0D7E0] flex items-center justify-center text-[#4A5868] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="bg-gradient-to-br from-[#0B4F6C] to-[#1A7EA4] p-8 text-white text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            <Zap className="w-4 h-4 text-[#F2A65A]" />
            Nâng cấp để tiếp tục tạo QR
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold mb-2">Bạn đã dùng hết lượt thử miễn phí</h2>
          <p className="text-[#D9EEF5]/80 text-sm max-w-lg mx-auto">
            Chọn gói phù hợp để tạo QR không giới hạn, quản lý SKU và phân quyền nhân viên.
          </p>
        </div>

        <div className="p-6 lg:p-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PLANS.map((plan, i) => (
              <div
                key={i}
                className={`flex flex-col rounded-2xl border p-6 relative transition-all hover:-translate-y-1 hover:shadow-xl ${
                  plan.highlight
                    ? "border-[#C45B17] border-2 shadow-lg"
                    : "border-[#E5EAF0]"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C45B17] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    PHỔ BIẾN
                  </div>
                )}
                <h3 className="text-lg font-bold text-[#0B4F6C] mb-0.5">{plan.name}</h3>
                <p className="text-xs text-[#7D9E94] mb-4">{plan.subtitle}</p>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-[#0B4F6C]">{plan.price}</span>
                  <span className="text-xs text-[#7D9E94] ml-1">đ{plan.period}</span>
                </div>
                <div className="space-y-2 text-xs text-[#4A5868] flex-1 mb-5">
                  {[plan.codes, "Tài khoản NVL vô hạn", `Phân phối ${plan.accounts}`, "Kết nối Cổng QG"].map((f, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1A6B52] shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => handleSelect(plan)}
                  className={`w-full rounded-full h-10 text-sm font-semibold ${
                    plan.highlight
                      ? "bg-[#C45B17] hover:bg-[#D6711A] text-white"
                      : "bg-[#FAFBFC] border border-[#E5EAF0] text-[#0B4F6C] hover:bg-[#E5EAF0]"
                  }`}
                >
                  Chọn gói này
                </Button>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-[#7D9E94] mt-6">
            Thanh toán hàng năm · Hóa đơn VAT · Hợp đồng điện tử
          </p>
        </div>
      </div>
    </div>
  );
}
