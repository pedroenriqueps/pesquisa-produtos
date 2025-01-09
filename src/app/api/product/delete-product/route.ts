import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get("id")

        if (!id) {
            return NextResponse.json(
                { message: "O parâmetro 'id' é obrigatório." },
                { status: 400 }
            );
        }

        const deleteProduct = await prisma.product.delete({
            where: {
                id: parseInt(id)
            }
        })

        return NextResponse.json({ message: "Produto deletado.", deleteProduct }, { status: 200 })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ message: "Houve um erro ao deletar produto." }, { status: 500 })
        }
        throw new Error("Houve um erro ao deletar produto (Erro desconhecido).")
    }
}