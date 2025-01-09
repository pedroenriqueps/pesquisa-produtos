import type { Metadata } from "next";
import { ProductProvider } from "@/context/products"

export const metadata: Metadata = {
    title: "Produtos | SZ",
    description: "Veja e filtre seus produtos.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <ProductProvider>
                {children}
            </ProductProvider>
        </>
    );
}
