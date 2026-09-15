import "./globals.css";

export const metadata = {
  title: "Cetrix | Cyber Risk Quantified",
  description: "AI-Powered Continuous Cyber Risk Quantification and Investment Optimization Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
