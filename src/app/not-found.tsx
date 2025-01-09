import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl">Ops, está perdido?</h1>
            <h2 className="text-gray-600">Página não encontrada - Erro 404</h2>
            <div className="my-7">
                <Link href="/" className="rounded-md bg-green-500 p-4 shadow-md">Ir para Página inicial</Link>
            </div>
        </main>
    )
}