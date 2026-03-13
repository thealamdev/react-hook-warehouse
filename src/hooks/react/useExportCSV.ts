import { useState } from "react";
import { exportToCSV } from "../../utilities/exportToCSV";

interface PageProps<T = any> {
    data: T[];
    filename?: string;
}

export default function useExportCSV<T>({
    data,
    filename = 'data.csv'
}: PageProps<T>) {
    const [pending, setPending] = useState<boolean>(false);

    const ExportToCSV = () => {
        setPending(true);
        setTimeout(() => {
            setPending(false);
            exportToCSV(data, filename);
        }, 1000);
    };

    return { pending, ExportToCSV };
}