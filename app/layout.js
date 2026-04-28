export const metadata = {
  title: "Jianpu Pro",
  description: "Jianpu with chord editor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  );
}
