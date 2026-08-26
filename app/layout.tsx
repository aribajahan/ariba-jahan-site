import type { Metadata } from "next";
import { Big_Shoulders, Barlow } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

// NOTE: next/font/google in this Next.js version no longer exports
// `Big_Shoulders_Display` as a separate family — Google consolidated
// Big Shoulders Display/Text/Inline/Stencil into one variable `Big_Shoulders`
// family with an optical-size (opsz) axis. Using `Big_Shoulders` here to keep
// the build compiling; same weights/variable name/usage as before.
const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aribajahan.com"),
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
      <body>{children}</body>
      <GoogleAnalytics gaId="G-RN3XCK2GV4" />
    </html>
  );
}
