import Nav from './Nav';
import Footer from './Footer';

export default function PageShell({
  children,
  navVariant = 'solid',
}: {
  children: React.ReactNode;
  navVariant?: 'solid' | 'overlay';
}) {
  return (
    <>
      <Nav variant={navVariant} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
