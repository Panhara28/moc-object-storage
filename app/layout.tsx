import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeCustomizer } from "@/components/theme-customizer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin",
  description: "Example",
  generator: "Ministry Of Commerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* 🛠 FIX: REMOVE browser-extension injected attributes before hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const removeInjectedAttributes = () => {
                  const body = document.body;
                  if (!body) return;

                  const attrs = Array.from(body.attributes);
                  attrs.forEach(attr => {
                    // remove ALL attributes injected by extensions
                    if (
                      attr.name.startsWith("cz-") ||
                      attr.name.startsWith("data-gramm") ||
                      attr.name.startsWith("data-new-gr-c-s-check") ||
                      attr.name.startsWith("data-new-gr-c-s-loaded")
                    ) {
                      body.removeAttribute(attr.name);
                    }
                  });
                };

                // Run before React hydrates
                document.addEventListener("DOMContentLoaded", removeInjectedAttributes);
              })();
            `,
          }}
        />
      </head>

      <body suppressHydrationWarning className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
