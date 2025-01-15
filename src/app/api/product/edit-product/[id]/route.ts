import { NextRequest, NextResponse } from "next/server";
import prisma from "@/infra/lib/prisma";

export async function PUT(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const id = Number(url.pathname.split('/').pop());

        if (isNaN(id)) {
            return NextResponse.json(
                { message: "ID inválido." },
                { status: 400 }
            );
        }

        const data = await request.json();
        const { productName, productValue, productCode } = data;

        const existingProduct = await prisma.product.findUnique({
            where: { id },
        });

        if (!existingProduct) {
            return NextResponse.json(
                { message: "Produto não encontrado." },
                { status: 404 }
            );
        }

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: { productName, productValue, productCode },
        });

        return NextResponse.json(
            { message: "Produto atualizado com sucesso.", product: updatedProduct },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: "Erro interno do servidor." },
            { status: 500 }
        );
    }
}
