import { Sidebar } from "@/components/sidebar";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground antialiased">
        <div className="flex">
          <Sidebar />
          <main className="flex-1 h-screen overflow-y-auto bg-black">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}