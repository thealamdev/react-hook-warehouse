import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export function useActiveTab<T extends Record<string, string>>(
    tabName: string,
    defaultTab: T[keyof T]
) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const activeTab = useMemo(() => {
        const param = searchParams?.get(tabName);
        return (param as T[keyof T]) || defaultTab;
    }, [searchParams, tabName, defaultTab]);

    const [tab, setTab] = useState<T[keyof T]>(activeTab);

    useEffect(() => {
        setTab(activeTab);
    }, [activeTab]);

    useEffect(() => {
        const currentParam = searchParams?.get(tabName);
        if (tab && currentParam !== tab) {
            const url = new URLSearchParams(searchParams?.toString());
            url.set(tabName, tab);
            router.replace(`?${url.toString()}`, { scroll: false });
        }
    }, [tab, searchParams, tabName, router]);

    return { tab, setTab };
}
