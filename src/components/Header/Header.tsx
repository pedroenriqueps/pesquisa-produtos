"use client";
import Link from "next/link";
import { useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { RiMenu5Line } from "react-icons/ri";

export function Header() {
    const [menuActive, setMenuActive] = useState<boolean>(false);

    return (
        <header className="my-5 text-white">
            <div className="flex justify-between items-center px-5 py-3">
                <Link href="/">
                    <h1 className="text-3xl text-green-700">Souza Construções</h1>
                </Link>
                <button
                    type="button"
                    onClick={() => setMenuActive(!menuActive)}
                    className="text-black"
                >
                    <RiMenu5Line size={25} />
                </button>
            </div>
            <div
                className={`fixed z-50 top-0 left-0 h-full bg-gray-800 text-gray-300 shadow-lg transform ${menuActive ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 w-64`}
            >
                <button
                    type="button"
                    onClick={() => setMenuActive(false)}
                    className="absolute top-4 right-4 text-white hover:text-green-400"
                >
                    <FaRegWindowClose size={25} />
                </button>
                <nav className="mt-10">
                    <ul className="flex flex-col p-4 space-y-3">
                        <li>
                            <Link
                                href="/"
                                className="hover:text-green-400 transition-colors"
                            >
                                Homepage
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/products/list-products"
                                className="hover:text-green-400 transition-colors"
                            >
                                Lista de produtos
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/products/edit-products"
                                className="hover:text-green-400 transition-colors"
                            >
                                Editar produtos
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
