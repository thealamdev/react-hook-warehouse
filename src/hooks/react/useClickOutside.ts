import { useEffect } from "react";

interface PageProps {
    ref: React.RefObject<HTMLDivElement | null>;
    callback: () => void;
}

export function useClickOutside({
    ref,
    callback
}: PageProps) {
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                callback();
            }
        }
        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        }
    }, [ref, callback])
}