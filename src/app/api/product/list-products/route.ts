import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
export async function GET() {
    try {
        const allProducts = await prisma.product.findMany()
        if (allProducts.length === 0) {
            return NextResponse.json({ message: "A lista de produtos esta vazia.", data: [] }, { status: 200 })
        }

        return NextResponse.json({ message: "Produtos buscados com sucesso.", data: allProducts }, { status: 200 })

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ message: "Houve um erro buscar produtos." }, { status: 500 })
        }
        throw new Error("Houve um erro ao buscar produtos (Erro desconhecido).")
    }
}