import { useState } from "react";
import { useLocation } from "wouter";
import {
  QrCode, LayoutGrid, Users, FileText, RefreshCw, Download, Plus,
  Search, ChevronRight, TrendingUp, Package, Clock, ShieldCheck,
  LogOut, Building2, Bell, Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";
import logoPng from "@/assets/logo.png";

type Tab = "qr" | "sku" | "staff" | "contracts" | "upgrade";

const MOCK_QRS = [
  { id: "QR-001", product: "Cà phê Robusta", sku: "CF-001", batch: "BATCH-2026-05", date: "10/05/2026", scans: 142 },
  { id: "QR-002", product: "Trà Oolong", sku: "TEA-002", batch: "BATCH-2026-04", date: "02/04/2026", scans: 87 },
  { id: "QR-003", product: "Mật ong rừng", sku: "HON-003", batch: "BATCH-2026-03", date: "15/03/2026", scans: 310 },
];

const MOCK_SKUS = [
  { code: "CF-001", name: "Cà phê Robusta", category: "Đồ uống", qrCount: 8, active: true },
  { code: "TEA-002", name: "Trà Oolong", category: "Đồ uống", qrCount: 3, active: true },
  { code: "HON-003", name: "Mật ong rừng", category: "Thực phẩm", qrCount: 5, active: true },
];

const MOCK_STAFF = [
  { name: "Nguyễn Văn Hùng", email: "hung@cty.com", role: "Nhập liệu", status: "Hoạt động" },
  { name: "Trần Thị Lan", email: "lan@cty.com", role: "Xem báo cáo", status: "Hoạt động" },
  { name: "Lê Minh Tuấn", email: "tuan@cty.com", role: "Quản trị", status: "Chờ duyệt" },
];

export default function Dashboard() {
  const [, navigate] = useLocation();
  const { user, activePlan, businessInfo, logout, demoQRLog } = useAuth();
  const [tab, setTab] = useState<Tab>("qr");
  const [search, setSearch] = useState("");

  if (!user) {
    navigate("/");
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const initials = user.name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();

  const sideItems: { id: Tab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: "qr", label: "Quản lý QR", icon: QrCode },
    { id: "sku", label: "Quản lý SKU", icon: Package },
    { id: "staff", label: "Phân quyền nhân viên", icon: Users },
    { id: "contracts", label: "Hợp đồng & Hóa đơn", icon: FileText },
    { id: "upgrade", label: "Nâng cấp & Gia hạn", icon: RefreshCw },
  ];

  const allQRs = [
    ...MOCK_QRS,
    ...demoQRLog.map((l, i) => ({
      id: `DEMO-${i + 1}`,
      product: l.product || "Sản phẩm demo",
      sku: "DEMO",
      batch: "DEMO",
      date: l.createdAt.toLocaleDateString("vi-VN"),
      scans: 0,
    })),
  ];

  const filteredQRs = allQRs.filter(q =>
    q.product.toLowerCase().includes(search.toLowerCase()) ||
    q.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-[100dvh] bg-[#F4F6F8] font-sans flex flex-col">
      <header className="h-16 bg-white border-b border-[#E5EAF0] flex items-center px-6 gap-4 sticky top-0 z-40 shadow-sm">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 shrink-0">
          <img src={logoPng} alt="Checkee" className="h-7" />
        </button>
        <div className="flex-1" />
        <button className="w-9 h-9 rounded-full flex items-center justify-center text-[#7D9E94] hover:bg-[#FAFBFC]">
          <Bell className="w-5 h-5" />
        </button>
        <button className="w-9 h-9 rounded-full flex items-center justify-center text-[#7D9E94] hover:bg-[#FAFBFC]">
          <Settings className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3 pl-3 border-l border-[#E5EAF0]">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-[#0F1B2D]">{user.name}</p>
            <p className="text-xs text-[#7D9E94]">{user.email}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#0B4F6C] text-white flex items-center justify-center text-sm font-bold">
            {initials}
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-[#7D9E94] hover:text-red-500 transition-colors px-2"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Đăng xuất</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 shrink-0 bg-white border-r border-[#E5EAF0] hidden md:flex flex-col">
          {activePlan && (
            <div className="m-4 p-4 bg-[#D9EEF5] rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-4 h-4 text-[#0B4F6C]" />
                <span className="text-xs font-bold text-[#0B4F6C] uppercase tracking-wide">Gói hiện tại</span>
              </div>
              <p className="font-bold text-[#0B4F6C]">{activePlan.name}</p>
              <p className="text-xs text-[#4A5868]">Checkee Trace · Hàng năm</p>
            </div>
          )}
          {!activePlan && (
            <div className="m-4 p-4 bg-[#FFF3E8] rounded-xl border border-[#F2A65A]/30">
              <p className="text-xs font-bold text-[#C45B17] uppercase tracking-wide mb-1">Demo</p>
              <p className="text-sm text-[#4A5868]">Tài khoản dùng thử</p>
            </div>
          )}

          <nav className="flex-1 px-3 py-2">
            {sideItems.map(item => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold mb-1 transition-all ${
                  tab === item.id
                    ? "bg-[#0B4F6C] text-white"
                    : "text-[#4A5868] hover:bg-[#FAFBFC] hover:text-[#0B4F6C]"
                }`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {item.label}
              </button>
            ))}
          </nav>

          {businessInfo && (
            <div className="m-4 p-3 bg-[#FAFBFC] border border-[#E5EAF0] rounded-xl text-xs text-[#4A5868]">
              <Building2 className="w-3.5 h-3.5 inline mr-1 text-[#7D9E94]" />
              <span className="font-semibold text-[#0B4F6C]">{businessInfo.companyName}</span>
            </div>
          )}
        </aside>

        <main className="flex-1 overflow-y-auto p-6">
          {tab === "qr" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Tổng mã QR", value: allQRs.length.toString(), icon: QrCode, color: "bg-[#D9EEF5] text-[#0B4F6C]" },
                  { label: "Lượt quét hôm nay", value: "42", icon: TrendingUp, color: "bg-[#D4EDE6] text-[#1A6B52]" },
                  { label: "Sản phẩm đang hoạt động", value: MOCK_SKUS.length.toString(), icon: Package, color: "bg-[#FFF3E8] text-[#C45B17]" },
                  { label: "Lần tạo gần nhất", value: "Hôm nay", icon: Clock, color: "bg-[#F0F4FF] text-[#1B4FA0]" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-[#E5EAF0] p-5 shadow-sm">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <p className="text-2xl font-bold text-[#0F1B2D]">{stat.value}</p>
                    <p className="text-xs text-[#7D9E94] mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl border border-[#E5EAF0] shadow-sm">
                <div className="flex items-center gap-3 p-5 border-b border-[#E5EAF0]">
                  <h2 className="font-bold text-[#0B4F6C] flex-1">Lịch sử mã QR</h2>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7D9E94]" />
                    <Input
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      placeholder="Tìm kiếm..."
                      className="h-9 pl-9 rounded-xl border-[#E5EAF0] w-48 text-sm"
                    />
                  </div>
                  <Button
                    onClick={() => navigate("/demo")}
                    className="h-9 rounded-full bg-[#C45B17] hover:bg-[#D6711A] text-white text-sm font-semibold px-4"
                  >
                    <Plus className="w-4 h-4 mr-1" /> Tạo mới
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#FAFBFC] text-[#7D9E94] text-xs uppercase tracking-wide">
                        <th className="text-left px-5 py-3 font-semibold">Mã QR</th>
                        <th className="text-left px-5 py-3 font-semibold">Sản phẩm</th>
                        <th className="text-left px-5 py-3 font-semibold hidden lg:table-cell">SKU</th>
                        <th className="text-left px-5 py-3 font-semibold hidden lg:table-cell">Lô hàng</th>
                        <th className="text-left px-5 py-3 font-semibold">Ngày tạo</th>
                        <th className="text-right px-5 py-3 font-semibold">Lượt quét</th>
                        <th className="px-5 py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredQRs.map((qr, i) => (
                        <tr key={i} className="border-t border-[#F4F6F8] hover:bg-[#FAFBFC] transition-colors">
                          <td className="px-5 py-3.5 font-mono text-xs text-[#0B4F6C] font-semibold">{qr.id}</td>
                          <td className="px-5 py-3.5 font-semibold text-[#0F1B2D]">{qr.product}</td>
                          <td className="px-5 py-3.5 text-[#4A5868] hidden lg:table-cell">{qr.sku}</td>
                          <td className="px-5 py-3.5 text-[#4A5868] hidden lg:table-cell">{qr.batch}</td>
                          <td className="px-5 py-3.5 text-[#4A5868]">{qr.date}</td>
                          <td className="px-5 py-3.5 text-right font-semibold text-[#0B4F6C]">{qr.scans}</td>
                          <td className="px-5 py-3.5">
                            <button className="text-[#7D9E94] hover:text-[#0B4F6C] transition-colors">
                              <Download className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredQRs.length === 0 && (
                    <div className="py-12 text-center text-[#7D9E94] text-sm">Không tìm thấy mã QR nào.</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {tab === "sku" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#0B4F6C]">Quản lý SKU sản phẩm</h2>
                <Button className="h-9 rounded-full bg-[#0B4F6C] hover:bg-[#0A3F5A] text-white text-sm px-4">
                  <Plus className="w-4 h-4 mr-1" /> Thêm SKU
                </Button>
              </div>
              <div className="bg-white rounded-2xl border border-[#E5EAF0] shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#FAFBFC] text-[#7D9E94] text-xs uppercase tracking-wide">
                      <th className="text-left px-5 py-3 font-semibold">Mã SKU</th>
                      <th className="text-left px-5 py-3 font-semibold">Tên sản phẩm</th>
                      <th className="text-left px-5 py-3 font-semibold">Ngành hàng</th>
                      <th className="text-right px-5 py-3 font-semibold">Số QR</th>
                      <th className="text-center px-5 py-3 font-semibold">Trạng thái</th>
                      <th className="px-5 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_SKUS.map((sku, i) => (
                      <tr key={i} className="border-t border-[#F4F6F8] hover:bg-[#FAFBFC] transition-colors">
                        <td className="px-5 py-3.5 font-mono text-xs text-[#0B4F6C] font-semibold">{sku.code}</td>
                        <td className="px-5 py-3.5 font-semibold text-[#0F1B2D]">{sku.name}</td>
                        <td className="px-5 py-3.5 text-[#4A5868]">{sku.category}</td>
                        <td className="px-5 py-3.5 text-right text-[#0B4F6C] font-semibold">{sku.qrCount}</td>
                        <td className="px-5 py-3.5 text-center">
                          <span className="inline-flex items-center gap-1 bg-[#D4EDE6] text-[#1A6B52] text-xs font-semibold px-2.5 py-1 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1A6B52]" /> Hoạt động
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <button className="text-[#7D9E94] hover:text-[#0B4F6C]"><ChevronRight className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === "staff" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#0B4F6C]">Phân quyền nhân viên</h2>
                <Button className="h-9 rounded-full bg-[#0B4F6C] hover:bg-[#0A3F5A] text-white text-sm px-4">
                  <Plus className="w-4 h-4 mr-1" /> Thêm tài khoản
                </Button>
              </div>
              <div className="bg-white rounded-2xl border border-[#E5EAF0] shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#FAFBFC] text-[#7D9E94] text-xs uppercase tracking-wide">
                      <th className="text-left px-5 py-3 font-semibold">Họ tên</th>
                      <th className="text-left px-5 py-3 font-semibold">Email</th>
                      <th className="text-left px-5 py-3 font-semibold">Vai trò</th>
                      <th className="text-center px-5 py-3 font-semibold">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_STAFF.map((s, i) => (
                      <tr key={i} className="border-t border-[#F4F6F8] hover:bg-[#FAFBFC]">
                        <td className="px-5 py-3.5 font-semibold text-[#0F1B2D]">{s.name}</td>
                        <td className="px-5 py-3.5 text-[#4A5868]">{s.email}</td>
                        <td className="px-5 py-3.5">
                          <span className="bg-[#D9EEF5] text-[#0B4F6C] text-xs font-semibold px-2.5 py-1 rounded-full">{s.role}</span>
                        </td>
                        <td className="px-5 py-3.5 text-center">
                          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                            s.status === "Hoạt động"
                              ? "bg-[#D4EDE6] text-[#1A6B52]"
                              : "bg-[#FFF3E8] text-[#C45B17]"
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${s.status === "Hoạt động" ? "bg-[#1A6B52]" : "bg-[#C45B17]"}`} />
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === "contracts" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-[#0B4F6C]">Hợp đồng & Hóa đơn</h2>
              {activePlan ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { title: "Hợp đồng dịch vụ", date: "10/05/2026", expires: "10/05/2027", status: "Hiệu lực" },
                    { title: "Hóa đơn VAT #INV-2026-001", date: "10/05/2026", expires: "—", status: "Đã thanh toán" },
                  ].map((doc, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-[#E5EAF0] p-6 shadow-sm flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#D9EEF5] rounded-xl flex items-center justify-center shrink-0">
                        <FileText className="w-6 h-6 text-[#0B4F6C]" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-[#0B4F6C] mb-1">{doc.title}</p>
                        <p className="text-xs text-[#7D9E94]">Ngày: {doc.date}</p>
                        {doc.expires !== "—" && <p className="text-xs text-[#7D9E94]">Hết hạn: {doc.expires}</p>}
                        <span className="inline-block mt-2 bg-[#D4EDE6] text-[#1A6B52] text-xs font-semibold px-2.5 py-1 rounded-full">{doc.status}</span>
                      </div>
                      <button className="text-[#1A7EA4] hover:text-[#0B4F6C] transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-[#E5EAF0] p-12 text-center">
                  <FileText className="w-12 h-12 text-[#E5EAF0] mx-auto mb-4" />
                  <p className="text-[#7D9E94]">Chưa có hợp đồng. Nâng cấp gói để bắt đầu.</p>
                  <Button onClick={() => setTab("upgrade")} className="mt-4 rounded-full bg-[#C45B17] text-white">
                    Xem gói nâng cấp
                  </Button>
                </div>
              )}
            </div>
          )}

          {tab === "upgrade" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-[#0B4F6C]">Nâng cấp & Gia hạn</h2>
              {activePlan && (
                <div className="bg-[#D9EEF5] rounded-2xl p-5 flex items-center gap-4">
                  <ShieldCheck className="w-8 h-8 text-[#0B4F6C] shrink-0" />
                  <div>
                    <p className="font-bold text-[#0B4F6C]">Đang dùng gói {activePlan.name}</p>
                    <p className="text-sm text-[#4A5868]">Hết hạn: 10/05/2027 · Hệ thống sẽ nhắc gia hạn 30 ngày trước</p>
                  </div>
                </div>
              )}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: "Khởi đầu", price: "14.400.000", highlight: false },
                  { name: "Tăng trưởng", price: "43.200.000", highlight: true },
                  { name: "Chuyên nghiệp", price: "72.000.000", highlight: false },
                  { name: "Doanh nghiệp", price: "108.000.000", highlight: false },
                ].map((plan, i) => {
                  const isCurrent = activePlan?.name === plan.name;
                  return (
                    <div key={i} className={`bg-white rounded-2xl border p-5 shadow-sm ${plan.highlight && !isCurrent ? "border-[#C45B17] border-2" : "border-[#E5EAF0]"}`}>
                      <h3 className="font-bold text-[#0B4F6C] mb-1">{plan.name}</h3>
                      <p className="text-xl font-bold text-[#0F1B2D] mb-4">{plan.price}<span className="text-xs text-[#7D9E94] font-normal">đ/năm</span></p>
                      {isCurrent ? (
                        <Button disabled className="w-full rounded-full h-9 text-sm bg-[#D4EDE6] text-[#1A6B52] border-none">
                          <LayoutGrid className="w-3.5 h-3.5 mr-1" /> Gói hiện tại
                        </Button>
                      ) : (
                        <Button
                          onClick={() => navigate(`/checkout?plan=${encodeURIComponent(plan.name)}&price=${plan.price}&period=${encodeURIComponent("/năm")}`)}
                          className={`w-full rounded-full h-9 text-sm ${plan.highlight ? "bg-[#C45B17] hover:bg-[#D6711A] text-white" : "bg-[#FAFBFC] border border-[#E5EAF0] text-[#0B4F6C] hover:bg-[#E5EAF0]"}`}
                        >
                          {activePlan ? "Chuyển gói" : "Đăng ký"}
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
