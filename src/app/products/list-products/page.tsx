import { Header } from "@/components/Header/Header";
import { ListProducts } from "@/components/List-products/List-products";

export default function Page() {
    return (
        <>
            <Header />
            <main>
                <ListProducts />
            </main>
        </>
    )
}