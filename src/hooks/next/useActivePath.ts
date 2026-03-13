import { usePathname } from "next/navigation";

export function useActivePath(path: string, matchType: 'exact' | 'startsWith' = 'exact'): boolean {
    const pathname = usePathname();

    if (!pathname) return false;

    if (matchType === 'startsWith') {
        return pathname.startsWith(path);
    }

    return pathname === path;
}