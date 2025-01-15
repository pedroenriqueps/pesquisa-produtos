import { NextRequest, NextResponse } from "next/server";
import prisma from "@/infra/lib/prisma";

export async function DELETE(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const id = Number(url.pathname.split('/').pop());

        if (!id) {
            return NextResponse.json(
                { message: "O parâmetro 'id' é obrigatório." },
                { status: 400 }
            );
        }

        const deleteProduct = await prisma.product.delete({
            where: {
                id: id
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