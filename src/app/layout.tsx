// layout.tsx
import { getLocale, getMessages } from "next-intl/server";
import ClientLayout from "./clientLayout";

// This is the main RootLayout component (Server Component)
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      suppressHydrationWarning={true}
      className="!scroll-smooth"
      lang={locale}
    >
      <head />
      <body>
        <ClientLayout messages={messages} locale={locale}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
