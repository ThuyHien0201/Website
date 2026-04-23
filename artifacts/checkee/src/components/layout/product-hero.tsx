import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CtaButton } from "@/components/ui/cta-button";
import { ChevronRight, type LucideIcon } from "lucide-react";

export interface ProductHeroStat {
  value: string;
  label: string;
}

export interface ProductHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  badge?: { icon: LucideIcon; label: string };
  stats?: ProductHeroStat[];
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
}

export function ProductHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  badge,
  stats,
  primaryCta = { href: "/demo", label: "Dùng thử miễn phí" },
  secondaryCta = { href: "/pricing", label: "Xem bảng giá" },
}: ProductHeroProps) {
  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden bg-[#FAFBFC]">
      {/* Decorative grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#0B4F6C 1px, transparent 1px), linear-gradient(90deg, #0B4F6C 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-[#D9EEF5] blur-3xl opacity-60 pointer-events-none" />

      <div className="container max-w-[1280px] mx-auto px-6 lg:px-8 relative">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#7D9E94] mb-6">
          <Link href="/" className="hover:text-[#1A7EA4] transition-colors">
            Trang chủ
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#7D9E94]">Giải pháp</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#0B4F6C] font-semibold">{eyebrow}</span>
        </nav>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left content */}
          <div className="lg:col-span-6 space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 bg-white border border-[#E5EAF0] text-[#0B4F6C] px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C45B17]"></span>
              {eyebrow}
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold text-[#0B4F6C] leading-[1.15]">
              {title}
            </h1>
            <p className="text-[#4A5868] text-base lg:text-lg max-w-xl leading-relaxed">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <CtaButton href={primaryCta.href}>{primaryCta.label}</CtaButton>
              <Link href={secondaryCta.href}>
                <Button
                  variant="outline"
                  className="rounded-full border-2 border-[#0B4F6C] text-[#0B4F6C] hover:bg-[#0B4F6C] hover:text-white px-6 py-3 h-auto font-semibold"
                >
                  {secondaryCta.label}
                </Button>
              </Link>
            </div>

            {stats && stats.length > 0 && (
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#E5EAF0]">
                {stats.map((s, i) => (
                  <div key={i}>
                    <div className="text-2xl lg:text-3xl font-bold text-[#0B4F6C]">
                      {s.value}
                    </div>
                    <div className="text-xs text-[#7D9E94] mt-1 leading-tight">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right image — distinct treatment */}
          <div className="lg:col-span-6 relative">
            <div className="relative">
              {/* Frame card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[5/4] border-8 border-white">
                <img
                  src={image}
                  alt={imageAlt ?? title}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Accent block behind image */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 lg:w-40 lg:h-40 bg-[#C45B17] rounded-3xl -z-10" />
              <div className="absolute -top-4 -left-4 w-24 h-24 lg:w-32 lg:h-32 bg-[#0B4F6C] rounded-3xl -z-10" />

              {/* Floating badge */}
              {badge && (
                <div className="absolute -bottom-6 left-6 lg:left-12 bg-white p-4 rounded-2xl shadow-xl border border-[#E5EAF0] flex items-center gap-3 max-w-[260px]">
                  <div className="bg-[#D4EDE6] text-[#1A6B52] p-2.5 rounded-xl shrink-0">
                    <badge.icon className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-semibold text-[#0B4F6C] leading-snug">
                    {badge.label}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
