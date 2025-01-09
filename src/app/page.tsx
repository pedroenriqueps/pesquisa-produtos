import { FormCreateProduct } from "@/components/Create-product/Create-product";
import { Header } from "@/components/Header/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <FormCreateProduct />
      </main>
    </>
  );
}
