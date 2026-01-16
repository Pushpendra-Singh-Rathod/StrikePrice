import { Header } from "@/components/ui/headerr";

/**
 * Layout component that renders a full-page container with a header and a children region.
 *
 * @param children - Content to be rendered inside the layout's main container
 * @returns The root JSX element wrapping the Header and the provided `children`
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen text-gray-400">
      <Header />

      <div className="container py-10">{children}</div>
    </main>
  );
}