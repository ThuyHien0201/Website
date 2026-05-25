import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type User = {
  email: string;
  phone?: string;
  name: string;
  avatar?: string;
};

export type UserCert = {
  id: string;
  name: string;
  fileName: string;
  status: "pending" | "valid" | "rejected";
  uploadedAt: Date;
};

export type BusinessInfo = {
  companyName: string;
  taxCode: string;
  address: string;
  representative: string;
  phone: string;
};

export type PlanInfo = {
  name: string;
  price: string;
  period: string;
};

export type AdminCert = {
  id: string;
  name: string;
  fileName: string;
  status: "pending" | "valid" | "rejected";
};

export type AdminCustomer = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  plan: string;
  planExpiry: string;
  productsCount: number;
  qrActivated: number;
  contractStart: string;
  status: "active" | "expired" | "trial";
  certs: AdminCert[];
};

const INITIAL_ADMIN_CUSTOMERS: AdminCustomer[] = [
  {
    id: "c1", name: "Nguyễn Văn Hùng", company: "Công ty TNHH Nông sản Tây Nguyên",
    email: "hung@nongsan.vn", phone: "0901234567", plan: "Tăng trưởng",
    planExpiry: "10/05/2027", productsCount: 24, qrActivated: 312,
    contractStart: "10/05/2026", status: "active",
    certs: [
      { id: "cc1", name: "VietGAP", fileName: "vietgap_cert.pdf", status: "valid" },
      { id: "cc2", name: "HACCP", fileName: "haccp_2026.pdf", status: "pending" },
    ],
  },
  {
    id: "c2", name: "Trần Thị Lan", company: "Công ty CP Xuất khẩu Đồng Tháp",
    email: "lan@dongthap.com", phone: "0912345678", plan: "Chuyên nghiệp",
    planExpiry: "15/03/2027", productsCount: 58, qrActivated: 1240,
    contractStart: "15/03/2026", status: "active",
    certs: [
      { id: "cc3", name: "GlobalGAP", fileName: "globalgap.pdf", status: "valid" },
      { id: "cc4", name: "ISO 22000", fileName: "iso22000.pdf", status: "valid" },
      { id: "cc5", name: "EU Organic", fileName: "eu_organic.pdf", status: "pending" },
    ],
  },
  {
    id: "c3", name: "Lê Minh Tuấn", company: "Hộ kinh doanh Mật ong Tuấn",
    email: "tuan@matong.com", phone: "0923456789", plan: "Khởi đầu",
    planExpiry: "05/04/2026", productsCount: 4, qrActivated: 48,
    contractStart: "05/04/2025", status: "expired", certs: [],
  },
  {
    id: "c4", name: "Phạm Quốc Anh", company: "Công ty TNHH Thực phẩm Việt Xanh",
    email: "anh@vietxanh.vn", phone: "0934567890", plan: "Doanh nghiệp",
    planExpiry: "20/06/2027", productsCount: 132, qrActivated: 5480,
    contractStart: "20/06/2026", status: "active",
    certs: [{ id: "cc6", name: "USDA Organic", fileName: "usda_cert.pdf", status: "valid" }],
  },
];

type AuthContextType = {
  user: User | null;
  demoQuota: number;
  pendingProduct: string | null;
  loginRedirect: string | null;
  businessInfo: BusinessInfo | null;
  activePlan: PlanInfo | null;
  planExpiryDate: Date | null;
  demoQRLog: { product: string; createdAt: Date }[];
  userCerts: UserCert[];
  adminCustomers: AdminCustomer[];

  showLoginModal: boolean;
  showPricingModal: boolean;

  openLoginModal: (opts?: { product?: string; redirect?: string }) => void;
  closeLoginModal: () => void;
  openPricingModal: () => void;
  closePricingModal: () => void;

  login: (emailOrPhone: string, password: string) => Promise<void>;
  register: (name: string, emailOrPhone: string, password: string) => Promise<void>;
  logout: () => void;

  consumeDemoQuota: (product: string) => boolean;
  setBusinessInfo: (info: BusinessInfo) => void;
  activatePlan: (plan: PlanInfo) => void;

  addUserCert: (name: string, fileName: string) => void;
  removeUserCert: (id: string) => void;
  adminVerifyCert: (certId: string, status: "valid" | "rejected") => void;
  adminVerifyCustomerCert: (customerId: string, certId: string, status: "valid" | "rejected") => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [demoQuota, setDemoQuota] = useState(1);
  const [pendingProduct, setPendingProduct] = useState<string | null>(null);
  const [loginRedirect, setLoginRedirect] = useState<string | null>(null);
  const [businessInfo, setBusinessInfoState] = useState<BusinessInfo | null>(null);
  const [activePlan, setActivePlanState] = useState<PlanInfo | null>(null);
  const [planExpiryDate, setPlanExpiryDate] = useState<Date | null>(null);
  const [demoQRLog, setDemoQRLog] = useState<{ product: string; createdAt: Date }[]>([]);
  const [userCerts, setUserCerts] = useState<UserCert[]>([]);
  const [adminCustomers, setAdminCustomers] = useState<AdminCustomer[]>(INITIAL_ADMIN_CUSTOMERS);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);

  const openLoginModal = useCallback((opts?: { product?: string; redirect?: string }) => {
    if (opts?.product) setPendingProduct(opts.product);
    if (opts?.redirect) setLoginRedirect(opts.redirect);
    setShowLoginModal(true);
  }, []);

  const closeLoginModal = useCallback(() => setShowLoginModal(false), []);
  const openPricingModal = useCallback(() => setShowPricingModal(true), []);
  const closePricingModal = useCallback(() => setShowPricingModal(false), []);

  const isPhone = (val: string) => /^(0|\+84)[0-9]{8,10}$/.test(val.replace(/\s/g, ""));

  const login = useCallback(async (emailOrPhone: string, _password: string) => {
    await new Promise(r => setTimeout(r, 800));
    const phone = isPhone(emailOrPhone) ? emailOrPhone : undefined;
    const email = !phone ? emailOrPhone : `${emailOrPhone}@phone.local`;
    const name = phone
      ? `Người dùng ${emailOrPhone.slice(-4)}`
      : emailOrPhone.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    setUser({ email, phone, name });
  }, []);

  const register = useCallback(async (name: string, emailOrPhone: string, _password: string) => {
    await new Promise(r => setTimeout(r, 800));
    const phone = isPhone(emailOrPhone) ? emailOrPhone : undefined;
    const email = !phone ? emailOrPhone : `${emailOrPhone}@phone.local`;
    setUser({ email, phone, name });
    setDemoQuota(1);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setDemoQuota(1);
    setActivePlanState(null);
    setPlanExpiryDate(null);
    setBusinessInfoState(null);
    setLoginRedirect(null);
    setPendingProduct(null);
    setUserCerts([]);
  }, []);

  const consumeDemoQuota = useCallback((product: string) => {
    if (demoQuota <= 0) return false;
    setDemoQuota(q => q - 1);
    setDemoQRLog(log => [...log, { product, createdAt: new Date() }]);
    return true;
  }, [demoQuota]);

  const setBusinessInfo = useCallback((info: BusinessInfo) => {
    setBusinessInfoState(info);
  }, []);

  const activatePlan = useCallback((plan: PlanInfo) => {
    setActivePlanState(plan);
    setDemoQuota(9999);
    const expiry = new Date();
    expiry.setFullYear(expiry.getFullYear() + 1);
    setPlanExpiryDate(expiry);
  }, []);

  const addUserCert = useCallback((name: string, fileName: string) => {
    const cert: UserCert = {
      id: `cert-${Date.now()}`,
      name,
      fileName,
      status: "pending",
      uploadedAt: new Date(),
    };
    setUserCerts(prev => [...prev, cert]);
  }, []);

  const removeUserCert = useCallback((id: string) => {
    setUserCerts(prev => prev.filter(c => c.id !== id));
  }, []);

  const adminVerifyCert = useCallback((certId: string, status: "valid" | "rejected") => {
    setUserCerts(prev => prev.map(c => c.id === certId ? { ...c, status } : c));
  }, []);

  const adminVerifyCustomerCert = useCallback((customerId: string, certId: string, status: "valid" | "rejected") => {
    setAdminCustomers(prev => prev.map(cust =>
      cust.id === customerId
        ? { ...cust, certs: cust.certs.map(c => c.id === certId ? { ...c, status } : c) }
        : cust
    ));
  }, []);

  return (
    <AuthContext.Provider value={{
      user, demoQuota, pendingProduct, loginRedirect, businessInfo, activePlan,
      planExpiryDate, demoQRLog, userCerts, adminCustomers,
      showLoginModal, showPricingModal,
      openLoginModal, closeLoginModal,
      openPricingModal, closePricingModal,
      login, register, logout,
      consumeDemoQuota, setBusinessInfo, activatePlan,
      addUserCert, removeUserCert, adminVerifyCert, adminVerifyCustomerCert,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
