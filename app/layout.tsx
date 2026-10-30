import type { Metadata } from "next";
import { Big_Shoulders, Barlow } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import SmoothScroll from "./components/SmoothScroll";
import JsonLd from "./components/JsonLd";
import { siteSchema } from "../lib/structuredData";
import { siteUrl } from "../lib/seoMeta";
import { googleAnalyticsId } from "../lib/analytics";
import "./globals.css";

// NOTE: next/font/google in this Next.js version no longer exports
// `Big_Shoulders_Display` as a separate family — Google consolidated
// Big Shoulders Display/Text/Inline/Stencil into one variable `Big_Shoulders`
// family with an optical-size (opsz) axis. Using `Big_Shoulders` here to keep
// the build compiling; same weights/variable name/usage as before.
// `adjustFontFallback` scales the local fallback face so it takes up the same
// space as the webfont. Headings then swap in without the line shifting.
// `fallback` names what to draw in that first moment; both are condensed, so
// the shape is close too.
const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
  adjustFontFallback: true,
  fallback: ["Arial Narrow", "Helvetica Neue", "Impact", "sans-serif"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  adjustFontFallback: true,
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | Ariba Jahan",
    default: "Ariba Jahan",
  },
  description:
    "I help organizations figure out how to be unmissable and what to build when technology, customer behavior, and expectations are all changing at once.",
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bigShoulders.variable} ${barlow.variable} antialiased`}
    >
      <body>
        <JsonLd data={siteSchema} />
        <SmoothScroll />
        {children}
      </body>
      <GoogleAnalytics gaId={googleAnalyticsId} />
    </html>
  );
}
