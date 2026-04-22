import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Info } from "lucide-react";

export default function Pricing() {
  return (
    <div className="flex flex-col w-full">
      <section className="pt-20 pb-16 bg-background">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-serif text-foreground">Bảng giá 5 sản phẩm</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Mỗi sản phẩm có gói riêng theo quy mô doanh nghiệp — từ startup nhỏ đến doanh nghiệp xuất khẩu lớn.
          </p>
        </div>
      </section>

      <section className="pb-24 bg-background border-b">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <Tabs defaultValue="trace" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-accent/50 p-1 rounded-full overflow-x-auto flex-nowrap hide-scrollbar flex w-full max-w-2xl justify-start md:justify-center">
                <TabsTrigger value="trace" className="rounded-full px-6 whitespace-nowrap data-[state=active]:bg-[#1D9E75] data-[state=active]:text-white">Trace</TabsTrigger>
                <TabsTrigger value="elabel" className="rounded-full px-6 whitespace-nowrap data-[state=active]:bg-[#0C447C] data-[state=active]:text-white">E-label</TabsTrigger>
                <TabsTrigger value="dpp" className="rounded-full px-6 whitespace-nowrap data-[state=active]:bg-[#3C3489] data-[state=active]:text-white">DPP</TabsTrigger>
                <TabsTrigger value="fnb" className="rounded-full px-6 whitespace-nowrap data-[state=active]:bg-[#854F0B] data-[state=active]:text-white">F&B</TabsTrigger>
                <TabsTrigger value="tem" className="rounded-full px-6 whitespace-nowrap data-[state=active]:bg-[#712B13] data-[state=active]:text-white">Tem phụ</TabsTrigger>
              </TabsList>
            </div>

            {/* TRACE */}
            <TabsContent value="trace" className="space-y-8 animate-in fade-in-50">
              <div className="bg-[#1D9E75] rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Checkee Trace</h2>
                  <p className="text-white/80">Truy xuất nguồn gốc sản phẩm — đáp ứng 10 thông tin bắt buộc theo Thông tư 02/2024/TT-BKHCN</p>
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap backdrop-blur-sm">
                  Hiệu lực 01/06/2024
                </div>
              </div>

              <div className="border rounded-2xl overflow-hidden bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-accent/50">
                        <th className="p-4 font-semibold border-b">Tính năng</th>
                        <th className="p-4 font-semibold border-b border-l text-center">&lt; 5 dòng SP</th>
                        <th className="p-4 font-semibold border-b border-l text-center bg-[#1D9E75]/10 text-[#1D9E75]">
                          &lt; 20 dòng SP
                          <span className="block text-xs font-normal mt-1 uppercase tracking-wide">Phổ biến</span>
                        </th>
                        <th className="p-4 font-semibold border-b border-l text-center">&lt; 50 dòng SP</th>
                        <th className="p-4 font-semibold border-b border-l text-center">&gt; 50 dòng SP</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-sm">
                      <tr>
                        <td className="p-4 font-medium text-muted-foreground bg-accent/20">Giá hàng năm</td>
                        <td className="p-4 text-center font-bold border-l">1.200.000đ</td>
                        <td className="p-4 text-center font-bold border-l bg-[#1D9E75]/5 text-[#1D9E75]">3.600.000đ</td>
                        <td className="p-4 text-center font-bold border-l">6.000.000đ</td>
                        <td className="p-4 text-center font-bold border-l">9.000.000đ</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-muted-foreground">Mã TXNG kèm theo</td>
                        <td className="p-4 text-center border-l">10.000</td>
                        <td className="p-4 text-center border-l bg-[#1D9E75]/5">20.000</td>
                        <td className="p-4 text-center border-l">50.000</td>
                        <td className="p-4 text-center border-l">100.000</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-muted-foreground">Tài khoản NVL đầu vào</td>
                        <td className="p-4 text-center border-l font-medium">∞ Không giới hạn</td>
                        <td className="p-4 text-center border-l bg-[#1D9E75]/5 font-medium text-[#1D9E75]">∞ Không giới hạn</td>
                        <td className="p-4 text-center border-l font-medium">∞ Không giới hạn</td>
                        <td className="p-4 text-center border-l font-medium">∞ Không giới hạn</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-muted-foreground">Tài khoản vận chuyển</td>
                        <td className="p-4 text-center border-l font-medium">∞ Không giới hạn</td>
                        <td className="p-4 text-center border-l bg-[#1D9E75]/5 font-medium text-[#1D9E75]">∞ Không giới hạn</td>
                        <td className="p-4 text-center border-l font-medium">∞ Không giới hạn</td>
                        <td className="p-4 text-center border-l font-medium">∞ Không giới hạn</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-muted-foreground flex flex-col gap-1">
                          Tài khoản HT phân phối
                          <span className="text-xs text-muted-foreground/70 italic">* Phát sinh thêm: 1tr/TK</span>
                        </td>
                        <td className="p-4 text-center border-l">Dưới 5 TK</td>
                        <td className="p-4 text-center border-l bg-[#1D9E75]/5 text-[#1D9E75] font-medium">Dưới 5 TK</td>
                        <td className="p-4 text-center border-l">Dưới 5 TK</td>
                        <td className="p-4 text-center border-l">Dưới 5 TK</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-muted-foreground">Kết nối Cổng TXNG Quốc gia</td>
                        <td className="p-4 text-center border-l">Theo số lượng mã</td>
                        <td className="p-4 text-center border-l bg-[#1D9E75]/5">Theo số lượng mã</td>
                        <td className="p-4 text-center border-l">Theo số lượng mã</td>
                        <td className="p-4 text-center border-l">Theo số lượng mã</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* E-LABEL */}
            <TabsContent value="elabel" className="space-y-8 animate-in fade-in-50">
              <div className="bg-[#0C447C] rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Checkee E-label</h2>
                  <p className="text-white/80">Nhãn điện tử — cập nhật không cần in lại, đa ngôn ngữ, đáp ứng NĐ 37/2026</p>
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap backdrop-blur-sm">
                  Hiệu lực 23/01/2026
                </div>
              </div>

              <div className="border rounded-2xl overflow-hidden bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-accent/50">
                        <th className="p-4 font-semibold border-b">Tính năng</th>
                        <th className="p-4 font-semibold border-b border-l text-center">Starter</th>
                        <th className="p-4 font-semibold border-b border-l text-center bg-[#0C447C]/10 text-[#0C447C]">
                          Growth
                          <span className="block text-xs font-normal mt-1 uppercase tracking-wide">Phổ biến</span>
                        </th>
                        <th className="p-4 font-semibold border-b border-l text-center">Pro</th>
                        <th className="p-4 font-semibold border-b border-l text-center">Enterprise</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-sm">
                      <tr>
                        <td className="p-4 font-medium text-muted-foreground bg-accent/20">Giá hàng năm</td>
                        <td className="p-4 text-center font-bold border-l">1.800.000đ</td>
                        <td className="p-4 text-center font-bold border-l bg-[#0C447C]/5 text-[#0C447C]">4.800.000đ</td>
                        <td className="p-4 text-center font-bold border-l">9.600.000đ</td>
                        <td className="p-4 text-center font-bold border-l">Liên hệ</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-muted-foreground">Số nhãn điện tử</td>
                        <td className="p-4 text-center border-l">10 nhãn</td>
                        <td className="p-4 text-center border-l bg-[#0C447C]/5 font-medium text-[#0C447C]">50 nhãn</td>
                        <td className="p-4 text-center border-l">200 nhãn</td>
                        <td className="p-4 text-center border-l font-medium">∞ Không giới hạn</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-muted-foreground">Số lần quét QR/tháng</td>
                        <td className="p-4 text-center border-l">5.000</td>
                        <td className="p-4 text-center border-l bg-[#0C447C]/5">50.000</td>
                        <td className="p-4 text-center border-l">500.000</td>
                        <td className="p-4 text-center border-l">∞ Không giới hạn</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-muted-foreground">Cập nhật nội dung</td>
                        <td className="p-4 text-center border-l"><Check className="mx-auto h-4 w-4 text-[#0C447C]"/></td>
                        <td className="p-4 text-center border-l bg-[#0C447C]/5"><Check className="mx-auto h-4 w-4 text-[#0C447C]"/></td>
                        <td className="p-4 text-center border-l"><Check className="mx-auto h-4 w-4 text-[#0C447C]"/></td>
                        <td className="p-4 text-center border-l"><Check className="mx-auto h-4 w-4 text-[#0C447C]"/></td>
                      </tr>
                      <tr>
                        <td className="p-4 text-muted-foreground">Ngôn ngữ</td>
                        <td className="p-4 text-center border-l">Tiếng Việt</td>
                        <td className="p-4 text-center border-l bg-[#0C447C]/5">Việt + English</td>
                        <td className="p-4 text-center border-l">Việt + 3 ngôn ngữ</td>
                        <td className="p-4 text-center border-l">∞ Không giới hạn</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-muted-foreground">Nhóm hàng Phụ lục I</td>
                        <td className="p-4 text-center border-l">2 nhóm</td>
                        <td className="p-4 text-center border-l bg-[#0C447C]/5">6 nhóm đầy đủ</td>
                        <td className="p-4 text-center border-l">6 nhóm + tuỳ chỉnh</td>
                        <td className="p-4 text-center border-l">Tuỳ chỉnh toàn phần</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-muted-foreground">Tài khoản quản lý</td>
                        <td className="p-4 text-center border-l">1</td>
                        <td className="p-4 text-center border-l bg-[#0C447C]/5">3</td>
                        <td className="p-4 text-center border-l">10</td>
                        <td className="p-4 text-center border-l">∞ Không giới hạn</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-muted-foreground">Xuất PDF tem 80x120mm</td>
                        <td className="p-4 text-center border-l"><Check className="mx-auto h-4 w-4 text-[#0C447C]"/></td>
                        <td className="p-4 text-center border-l bg-[#0C447C]/5"><Check className="mx-auto h-4 w-4 text-[#0C447C]"/></td>
                        <td className="p-4 text-center border-l">✓ + tuỳ kích thước</td>
                        <td className="p-4 text-center border-l">✓ + white-label</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-muted-foreground">Analytics</td>
                        <td className="p-4 text-center border-l text-muted-foreground/30">—</td>
                        <td className="p-4 text-center border-l bg-[#0C447C]/5">Cơ bản</td>
                        <td className="p-4 text-center border-l">Nâng cao</td>
                        <td className="p-4 text-center border-l">Đầy đủ + API</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* DPP */}
            <TabsContent value="dpp" className="space-y-8 animate-in fade-in-50">
              <div className="bg-[#3C3489] rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Checkee DPP</h2>
                  <p className="text-white/80">Hộ chiếu số sản phẩm — đáp ứng tiêu chuẩn ESPR Regulation (EU) 2024/1781</p>
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap backdrop-blur-sm">
                  Bắt buộc từ 2027
                </div>
              </div>

              <div className="border rounded-2xl overflow-hidden bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-accent/50">
                        <th className="p-4 font-semibold border-b">Tính năng</th>
                        <th className="p-4 font-semibold border-b border-l text-center">DPP Pin/Ắc quy</th>
                        <th className="p-4 font-semibold border-b border-l text-center">DPP Dệt may</th>
                        <th className="p-4 font-semibold border-b border-l text-center bg-[#3C3489]/10 text-[#3C3489]">
                          DPP Điện tử
                          <span className="block text-xs font-normal mt-1 uppercase tracking-wide">Phổ biến</span>
                        </th>
                        <th className="p-4 font-semibold border-b border-l text-center">DPP Nội thất</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-sm">
                      <tr>
                        <td className="p-4 font-medium text-muted-foreground bg-accent/20">Giá hàng năm</td>
                        <td className="p-4 text-center font-bold border-l">4.800.000đ</td>
                        <td className="p-4 text-center font-bold border-l">7.200.000đ</td>
                        <td className="p-4 text-center font-bold border-l bg-[#3C3489]/5 text-[#3C3489]">9.600.000đ</td>
                        <td className="p-4 text-center font-bold border-l">Liên hệ</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-muted-foreground">Số sản phẩm</td>
                        <td className="p-4 text-center border-l">5</td>
                        <td className="p-4 text-center border-l">20</td>
                        <td className="p-4 text-center border-l bg-[#3C3489]/5 font-bold text-[#3C3489]">50</td>
                        <td className="p-4 text-center border-l">∞</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-muted-foreground">Chứng nhận (CE/RoHS)</td>
                        <td className="p-4 text-center border-l">3</td>
                        <td className="p-4 text-center border-l">6</td>
                        <td className="p-4 text-center border-l bg-[#3C3489]/5 text-[#3C3489]">Tất cả</td>
                        <td className="p-4 text-center border-l">Tất cả + Tuỳ chỉnh</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-muted-foreground">Multi-language EU</td>
                        <td className="p-4 text-center border-l">5 ngôn ngữ</td>
                        <td className="p-4 text-center border-l">15 ngôn ngữ</td>
                        <td className="p-4 text-center border-l bg-[#3C3489]/5 text-[#3C3489]">24 ngôn ngữ</td>
                        <td className="p-4 text-center border-l">24 ngôn ngữ</td>
                      </tr>
                      <tr className="bg-muted/30">
                        <td colSpan={5} className="p-4 text-center text-sm text-muted-foreground italic">
                          <Info className="inline-block h-4 w-4 mr-1 mb-0.5" />
                          Kế thừa toàn bộ dữ liệu từ Checkee Trace. Người dùng chỉ bổ sung Carbon Footprint, Tỷ lệ tái chế, Repairability, Cuối vòng đời.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* F&B */}
            <TabsContent value="fnb" className="space-y-8 animate-in fade-in-50">
              <div className="bg-[#854F0B] rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Checkee F&B</h2>
                  <p className="text-white/80">Lưu mẫu thức ăn điện tử — đồng thời sinh QR cho bếp và QR cho khách hàng</p>
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap backdrop-blur-sm">
                  QĐ 1246/QĐ-BYT
                </div>
              </div>

              <div className="border rounded-2xl overflow-hidden bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-accent/50">
                        <th className="p-4 font-semibold border-b">Tính năng</th>
                        <th className="p-4 font-semibold border-b border-l text-center">Bếp nhỏ</th>
                        <th className="p-4 font-semibold border-b border-l text-center bg-[#854F0B]/10 text-[#854F0B]">
                          Nhà hàng
                          <span className="block text-xs font-normal mt-1 uppercase tracking-wide">Phổ biến</span>
                        </th>
                        <th className="p-4 font-semibold border-b border-l text-center">Chuỗi</th>
                        <th className="p-4 font-semibold border-b border-l text-center">Bếp công nghiệp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-sm">
                      <tr>
                        <td className="p-4 font-medium text-muted-foreground bg-accent/20">Giá hàng năm</td>
                        <td className="p-4 text-center font-bold border-l">1.200.000đ</td>
                        <td className="p-4 text-center font-bold border-l bg-[#854F0B]/5 text-[#854F0B]">3.600.000đ</td>
                        <td className="p-4 text-center font-bold border-l">7.200.000đ</td>
                        <td className="p-4 text-center font-bold border-l">Liên hệ</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-muted-foreground">Số template món ăn</td>
                        <td className="p-4 text-center border-l">20</td>
                        <td className="p-4 text-center border-l bg-[#854F0B]/5 font-medium text-[#854F0B]">100</td>
                        <td className="p-4 text-center border-l">500</td>
                        <td className="p-4 text-center border-l font-medium">∞</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-muted-foreground">Số ca bếp / tháng</td>
                        <td className="p-4 text-center border-l">60</td>
                        <td className="p-4 text-center border-l bg-[#854F0B]/5 font-medium text-[#854F0B]">300</td>
                        <td className="p-4 text-center border-l">1.500</td>
                        <td className="p-4 text-center border-l font-medium">∞</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-muted-foreground">QR hộp lưu mẫu (Y tế)</td>
                        <td className="p-4 text-center border-l"><Check className="mx-auto h-4 w-4 text-[#854F0B]"/></td>
                        <td className="p-4 text-center border-l bg-[#854F0B]/5"><Check className="mx-auto h-4 w-4 text-[#854F0B]"/></td>
                        <td className="p-4 text-center border-l"><Check className="mx-auto h-4 w-4 text-[#854F0B]"/></td>
                        <td className="p-4 text-center border-l"><Check className="mx-auto h-4 w-4 text-[#854F0B]"/></td>
                      </tr>
                      <tr>
                        <td className="p-4 text-muted-foreground">QR menu / khay (Khách)</td>
                        <td className="p-4 text-center border-l"><Check className="mx-auto h-4 w-4 text-[#854F0B]"/></td>
                        <td className="p-4 text-center border-l bg-[#854F0B]/5"><Check className="mx-auto h-4 w-4 text-[#854F0B]"/></td>
                        <td className="p-4 text-center border-l"><Check className="mx-auto h-4 w-4 text-[#854F0B]"/></td>
                        <td className="p-4 text-center border-l"><Check className="mx-auto h-4 w-4 text-[#854F0B]"/></td>
                      </tr>
                      <tr>
                        <td className="p-4 text-muted-foreground">Thời gian lưu trữ hồ sơ</td>
                        <td className="p-4 text-center border-l">6 tháng</td>
                        <td className="p-4 text-center border-l bg-[#854F0B]/5">2 năm</td>
                        <td className="p-4 text-center border-l">5 năm</td>
                        <td className="p-4 text-center border-l">Tuỳ chỉnh</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-muted-foreground">Tài khoản</td>
                        <td className="p-4 text-center border-l">2</td>
                        <td className="p-4 text-center border-l bg-[#854F0B]/5">5</td>
                        <td className="p-4 text-center border-l">20</td>
                        <td className="p-4 text-center border-l">∞</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* TEM PHU */}
            <TabsContent value="tem" className="space-y-8 animate-in fade-in-50">
              <div className="bg-[#712B13] rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Checkee Tem Phụ</h2>
                  <p className="text-white/80">Nhãn phụ hàng nhập khẩu — QR nhỏ gọn giữ nguyên thiết kế bao bì gốc</p>
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap backdrop-blur-sm">
                  NĐ 37/2026 Khoản 2
                </div>
              </div>

              <div className="border rounded-2xl overflow-hidden bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-accent/50">
                        <th className="p-4 font-semibold border-b">Tính năng</th>
                        <th className="p-4 font-semibold border-b border-l text-center">Mini</th>
                        <th className="p-4 font-semibold border-b border-l text-center bg-[#712B13]/10 text-[#712B13]">
                          Standard
                          <span className="block text-xs font-normal mt-1 uppercase tracking-wide">Phổ biến</span>
                        </th>
                        <th className="p-4 font-semibold border-b border-l text-center">Pro</th>
                        <th className="p-4 font-semibold border-b border-l text-center">Enterprise</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-sm">
                      <tr>
                        <td className="p-4 font-medium text-muted-foreground bg-accent/20">Giá hàng năm</td>
                        <td className="p-4 text-center font-bold border-l">900.000đ</td>
                        <td className="p-4 text-center font-bold border-l bg-[#712B13]/5 text-[#712B13]">2.400.000đ</td>
                        <td className="p-4 text-center font-bold border-l">4.800.000đ</td>
                        <td className="p-4 text-center font-bold border-l">Liên hệ</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-muted-foreground">Số mã tem</td>
                        <td className="p-4 text-center border-l">1.000</td>
                        <td className="p-4 text-center border-l bg-[#712B13]/5 font-medium text-[#712B13]">10.000</td>
                        <td className="p-4 text-center border-l">50.000</td>
                        <td className="p-4 text-center border-l font-medium">∞</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-muted-foreground">6 nhóm hàng Phụ lục I</td>
                        <td className="p-4 text-center border-l"><Check className="mx-auto h-4 w-4 text-[#712B13]"/></td>
                        <td className="p-4 text-center border-l bg-[#712B13]/5"><Check className="mx-auto h-4 w-4 text-[#712B13]"/></td>
                        <td className="p-4 text-center border-l"><Check className="mx-auto h-4 w-4 text-[#712B13]"/></td>
                        <td className="p-4 text-center border-l"><Check className="mx-auto h-4 w-4 text-[#712B13]"/></td>
                      </tr>
                      <tr>
                        <td className="p-4 text-muted-foreground">Tùy chỉnh layout tem</td>
                        <td className="p-4 text-center border-l text-muted-foreground/30">—</td>
                        <td className="p-4 text-center border-l bg-[#712B13]/5"><Check className="mx-auto h-4 w-4 text-[#712B13]"/></td>
                        <td className="p-4 text-center border-l">✓ + logo</td>
                        <td className="p-4 text-center border-l">✓ + white-label</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-muted-foreground">Xuất PDF in tem</td>
                        <td className="p-4 text-center border-l">A4</td>
                        <td className="p-4 text-center border-l bg-[#712B13]/5">A4 + A3</td>
                        <td className="p-4 text-center border-l">Đa kích thước</td>
                        <td className="p-4 text-center border-l">Custom</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-muted-foreground">Tài khoản</td>
                        <td className="p-4 text-center border-l">1</td>
                        <td className="p-4 text-center border-l bg-[#712B13]/5">3</td>
                        <td className="p-4 text-center border-l">10</td>
                        <td className="p-4 text-center border-l">∞</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

          </Tabs>
        </div>
      </section>

      {/* Compare & Combo */}
      <section className="py-24 bg-accent/30 border-t">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl font-serif font-bold">So sánh tổng quan & Gợi ý combo</h2>
            <p className="text-muted-foreground">Tìm đúng giải pháp cho mô hình kinh doanh của bạn.</p>
          </div>

          <div className="bg-white rounded-2xl border shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-foreground text-background">
                  <th className="p-4 font-semibold w-1/4">Tiêu chí</th>
                  <th className="p-4 font-semibold text-center border-l border-white/10">Trace</th>
                  <th className="p-4 font-semibold text-center border-l border-white/10">E-label</th>
                  <th className="p-4 font-semibold text-center border-l border-white/10">DPP</th>
                  <th className="p-4 font-semibold text-center border-l border-white/10">F&B</th>
                  <th className="p-4 font-semibold text-center border-l border-white/10">Tem phụ</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-4 text-muted-foreground font-medium">Cơ sở pháp lý VN</td>
                  <td className="p-4 text-center font-medium">TT 02/2024</td>
                  <td className="p-4 text-center font-medium">NĐ 37/2026</td>
                  <td className="p-4 text-center text-muted-foreground/30">—</td>
                  <td className="p-4 text-center font-medium">QĐ 1246</td>
                  <td className="p-4 text-center font-medium">NĐ 37/2026</td>
                </tr>
                <tr>
                  <td className="p-4 text-muted-foreground font-medium">Phù hợp xuất khẩu EU</td>
                  <td className="p-4 text-center">Nền tảng</td>
                  <td className="p-4 text-center text-muted-foreground/30">—</td>
                  <td className="p-4 text-center font-bold text-[#3C3489]">Bắt buộc</td>
                  <td className="p-4 text-center text-muted-foreground/30">—</td>
                  <td className="p-4 text-center text-muted-foreground/30">—</td>
                </tr>
                <tr>
                  <td className="p-4 text-muted-foreground font-medium">Phù hợp hàng nhập khẩu VN</td>
                  <td className="p-4 text-center text-muted-foreground/30">—</td>
                  <td className="p-4 text-center"><Check className="mx-auto h-4 w-4"/></td>
                  <td className="p-4 text-center text-muted-foreground/30">—</td>
                  <td className="p-4 text-center text-muted-foreground/30">—</td>
                  <td className="p-4 text-center font-bold text-[#712B13]">Chuyên biệt</td>
                </tr>
                <tr>
                  <td className="p-4 text-muted-foreground font-medium">Kế thừa dữ liệu</td>
                  <td className="p-4 text-center text-muted-foreground/30">—</td>
                  <td className="p-4 text-center text-muted-foreground/30">—</td>
                  <td className="p-4 text-center text-[#3C3489] font-medium">Từ Trace</td>
                  <td className="p-4 text-center text-muted-foreground/30">—</td>
                  <td className="p-4 text-center text-muted-foreground/30">—</td>
                </tr>
                <tr className="bg-accent/20">
                  <td className="p-4 text-muted-foreground font-medium">Ưu đãi mua kèm</td>
                  <td className="p-4 text-center text-muted-foreground/30">—</td>
                  <td className="p-4 text-center font-medium">-10% kèm Tem phụ</td>
                  <td className="p-4 text-center font-medium text-[#3C3489]">-15% kèm Trace</td>
                  <td className="p-4 text-center text-muted-foreground/30">—</td>
                  <td className="p-4 text-center font-medium">-10% kèm Trace</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white p-6 rounded-2xl border shadow-sm">
              <h3 className="font-bold text-lg mb-2">Cho Doanh nghiệp xuất khẩu</h3>
              <p className="text-muted-foreground mb-4">Mô hình sản xuất, nông trại hoặc nhà máy gia công muốn đưa hàng vào EU.</p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-[#1D9E75]/10 text-[#1D9E75] font-semibold rounded-md text-sm">Trace</span>
                <span className="text-muted-foreground mt-1">+</span>
                <span className="px-3 py-1 bg-[#3C3489]/10 text-[#3C3489] font-semibold rounded-md text-sm">DPP</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border shadow-sm">
              <h3 className="font-bold text-lg mb-2">Cho Doanh nghiệp nhập khẩu bán lẻ</h3>
              <p className="text-muted-foreground mb-4">Đưa hàng nước ngoài về phân phối tại VN, đáp ứng tem phụ và nhãn điện tử.</p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-[#712B13]/10 text-[#712B13] font-semibold rounded-md text-sm">Tem phụ</span>
                <span className="text-muted-foreground mt-1">+</span>
                <span className="px-3 py-1 bg-[#0C447C]/10 text-[#0C447C] font-semibold rounded-md text-sm">E-label</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container px-4 max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-5xl font-serif">Sẵn sàng số hoá sản phẩm?</h2>
          <p className="text-lg opacity-90">Để lại thông tin, đội ngũ chuyên gia của chúng tôi sẽ tư vấn gói giải pháp tối ưu nhất cho riêng doanh nghiệp của bạn.</p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="h-14 px-8 text-base text-primary">Liên hệ tư vấn ngay</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
