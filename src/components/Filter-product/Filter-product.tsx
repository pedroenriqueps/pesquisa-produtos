import React from "react";

interface FilterInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export function FilterInput({ value, onChange, placeholder = "Digite para filtrar" }: FilterInputProps) {
    return (
        <input
            type="text"
            className="w-full outline-none border border-black rounded-md shadow-sm focus:border-2 h-10 pl-2"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}

        />
    );
}











