import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type User = {
  email: string;
  name: string;
  avatar?: string;
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

type AuthContextType = {
  user: User | null;
  demoQuota: number;
  pendingProduct: string | null;
  businessInfo: BusinessInfo | null;
  activePlan: PlanInfo | null;
  demoQRLog: { product: string; createdAt: Date }[];

  showLoginModal: boolean;
  showPricingModal: boolean;

  openLoginModal: (product?: string) => void;
  closeLoginModal: () => void;
  openPricingModal: () => void;
  closePricingModal: () => void;

  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;

  consumeDemoQuota: (product: string) => boolean;
  setBusinessInfo: (info: BusinessInfo) => void;
  activatePlan: (plan: PlanInfo) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [demoQuota, setDemoQuota] = useState(1);
  const [pendingProduct, setPendingProduct] = useState<string | null>(null);
  const [businessInfo, setBusinessInfoState] = useState<BusinessInfo | null>(null);
  const [activePlan, setActivePlanState] = useState<PlanInfo | null>(null);
  const [demoQRLog, setDemoQRLog] = useState<{ product: string; createdAt: Date }[]>([]);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);

  const openLoginModal = useCallback((product?: string) => {
    if (product) setPendingProduct(product);
    setShowLoginModal(true);
  }, []);

  const closeLoginModal = useCallback(() => {
    setShowLoginModal(false);
  }, []);

  const openPricingModal = useCallback(() => {
    setShowPricingModal(true);
  }, []);

  const closePricingModal = useCallback(() => {
    setShowPricingModal(false);
  }, []);

  const login = useCallback(async (email: string, _password: string) => {
    await new Promise(r => setTimeout(r, 800));
    const name = email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    setUser({ email, name });
  }, []);

  const register = useCallback(async (name: string, email: string, _password: string) => {
    await new Promise(r => setTimeout(r, 800));
    setUser({ email, name });
    setDemoQuota(1);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setDemoQuota(1);
    setActivePlanState(null);
    setBusinessInfoState(null);
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
  }, []);

  return (
    <AuthContext.Provider value={{
      user, demoQuota, pendingProduct, businessInfo, activePlan, demoQRLog,
      showLoginModal, showPricingModal,
      openLoginModal, closeLoginModal,
      openPricingModal, closePricingModal,
      login, register, logout,
      consumeDemoQuota, setBusinessInfo, activatePlan,
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
