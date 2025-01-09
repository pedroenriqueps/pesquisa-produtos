import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()

        if (!data || !data.productName || !data.productValue) {
            return NextResponse.json(
                {
                    message: "Erro: Alguns campos obrigatórios estão ausentes.",
                    status: 400,
                    data: [],
                },
                { status: 400 }
            );
        }

        const responseData = await prisma.product.create({
            data: {
                productName: data.productName,
                productUrlImage: data.productUrlImage || null,
                cloudinaryPublicId: data.cloudinaryPublicId || null,
                productValue: parseInt(data.productValue),
                productCode: data.productCode || null
            }
        })

        return NextResponse.json(
            {
                message: "Novo produto criado.",
                data: responseData
            }, { status: 201 })

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ message: "Houve um erro ao criar produto." }, { status: 500 })
        }
        throw new Error("Houve um erro ao criar produto (Erro desconhecido).")
    }
}