import "./globals.css";

export const metadata = {
  title: "Mitozen — Peptide Analyzer",
  description: "AI-powered peptide recommendations and cycle tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0a0a0f" />
      </head>
      <body>{children}</body>
    </html>
  );
}
