"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { fetchProducts } from "@/service/product/list-products-service";

export interface FormProductInterface {
    productName: string;
    productUrlImage?: string;
    cloudinaryPublicId?: string
    productValue: number;
    productCode?: string;
    id?: number;
}

interface ProductsContext {
    allProducts: FormProductInterface[];
    setAllProducts: React.Dispatch<React.SetStateAction<FormProductInterface[]>>;
    addProduct: (product: FormProductInterface) => void;
    loading: boolean
}

const ProductContext = createContext<ProductsContext | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [allProducts, setAllProducts] = useState<FormProductInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true)
            try {
                const products = await fetchProducts();
                setAllProducts(products);
            } catch (error) {
                console.error("Erro ao carregar os produtos:", error);
            } finally {
                setLoading(false)
            }
        };
        loadProducts();
    }, []);

    const addProduct = async (product: FormProductInterface) => {
        try {
            setAllProducts((prev) => [...prev, product]);

            const products = await fetchProducts();
            setAllProducts((prev) => {
                const productIds = new Set(prev.map((p) => p.id));
                return [...prev, ...products.filter((p: FormProductInterface) => !productIds.has(p.id))];
            });
        } catch (error) {
            console.error("Erro ao adicionar o produto:", error);
        }
    };


    return (
        <ProductContext.Provider value={{ allProducts, setAllProducts, addProduct, loading }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = (): ProductsContext => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("O contexto deve ser usado dentro de um provedor");
    }
    return context;
};
