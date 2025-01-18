import { NextRequest, NextResponse } from "next/server";
import prisma from "@/infra/lib/prisma";
import jwt from "jsonwebtoken";
import * as yup from "yup";
import { userschema } from "@/utils/schemas/create-user-schema";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h";
const COOKIE_MAX_AGE = 3 * 60 * 60;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validação dos dados recebidos
        try {
            await userschema.validate(body, { abortEarly: false });
        } catch (error: unknown) {
            if (error instanceof yup.ValidationError) {
                const errors = error.inner.map((err) => ({
                    field: err.path,
                    message: err.message,
                }));
                return NextResponse.json(
                    { message: "Dados inválidos.", errors },
                    { status: 400 }
                );
            }
            throw new Error("Erro ao validar os dados.");
        }

        const { code, password } = body;

        // Verifica se o usuário existe
        const user = await prisma.user.findUnique({
            where: { code },
        });

        if (!user) {
            return NextResponse.json(
                { message: "Usuário não encontrado." },
                { status: 400 }
            );
        }

        // Verifica a senha
        if (password !== user.password) {
            return NextResponse.json(
                { message: "Credenciais inválidas. Verifique o código e a senha." },
                { status: 401 }
            );
        }

        // Gera o token JWT
        if (!JWT_SECRET) {
            throw new Error("JWT não está configurado.");
        }

        const token = jwt.sign(
            { userId: user.id, code: user.code },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRATION }
        );

        // Retorna o token no cookie e uma mensagem de sucesso
        const response = NextResponse.json(
            { message: "Usuário logado com sucesso." },
            { status: 200 }
        );

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: COOKIE_MAX_AGE,
        });

        return response;
    } catch (error: unknown) {
        if (error instanceof yup.ValidationError) {
            const errors = error.inner.map((err) => ({
                field: err.path,
                message: err.message,
            }));
            return NextResponse.json(
                { message: "Dados inválidos.", errors },
                { status: 400 }
            );
        }

        if (error instanceof Error) {
            return NextResponse.json(
                { message: "Erro interno do servidor.", details: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "Erro desconhecido ocorreu." },
            { status: 500 }
        );
    }
}
