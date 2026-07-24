import "./globals.css";

export const metadata = {
  title: "David Journal",
  description: "le petit blog",
};

export default function RootLayout({children}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-white text-neutral-900 antialiased">
      <div className= "max-w-3xl mx-auto px-5">{children}</div>
      </body>
    </html>
  );
}