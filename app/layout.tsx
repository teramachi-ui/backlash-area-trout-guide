import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const title = "エリアトラウト釣り場ガイド | LURE & BOAT BACKLASH";
const description = "BACKLASHスタッフが訪れた管理釣り場を、地域と雰囲気から探せるフィールドガイド。";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title,
    description,
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.png",
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "ja_JP",
      images: [{ url: "/og.webp", width: 1733, height: 909, alt: "AREA TROUT FIELD GUIDE" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.webp"],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
