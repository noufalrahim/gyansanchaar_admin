import { ReactNode } from "react";

interface AppBarProps {
    title: string;
    description?: string;
    children?: ReactNode;
}

export default function AppBar({ title, description, children }: AppBarProps) {
    return (
        <div className="flex justify-between items-center py-5 pb-10">
            <div>
                <h1 className="text-2xl font-semibold">{title}</h1>
                {description && (
                    <p className="text-gray-500 italic text-md">{description}</p>
                )}
            </div>
            <div className="flex gap-2">{children}</div>
        </div>
    );
};
