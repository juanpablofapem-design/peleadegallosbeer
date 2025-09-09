export const metadata = { title: "Cervecería Pelea de Gallos", description: "Cerveza artesanal con IA" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="es"><body>{children}</body></html>);
}
