import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "./site-shell";

export const metadata: Metadata = {
  title: "NexInnovator — World-Class Robotics Education Platform",
  description: "Learn robotics from Zero to Advanced. Free for everyone. English & Bangla. 25+ robot manuals with full code, components, and AI tutor.",
  keywords: "robotics, arduino, bangladesh, bangla, ai, education, free, coding, engineering",
  openGraph: {
    title: "NexInnovator Robotics Platform",
    description: "Learn robotics for free — anywhere in the world.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤖</text></svg>" />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
