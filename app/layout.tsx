import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "MatStruct Lab | آموزش تخصصی MATLAB برای عمران", description: "مسیر تعاملی یادگیری متلب برای مهندسی سازه؛ از مبانی تا تحلیل دینامیکی و المان محدود." };

export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="fa" dir="rtl"><body>{children}</body></html>; }
