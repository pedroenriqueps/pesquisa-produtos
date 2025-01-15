import { CiEdit } from "react-icons/ci";

interface EditButtonProps {
    onClick: () => void;
}

export function EditButton({ onClick }: EditButtonProps) {
    return (
        <button
            type="button"
            className="absolute right-1 bottom-1 text-red-600"
            onClick={onClick}
        >
            <CiEdit size={24} />
        </button>
    );
}
