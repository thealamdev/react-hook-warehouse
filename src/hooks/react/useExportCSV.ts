import { useState } from "react";

interface PageProps<T = any> {
    data: T[]
    filename?: string
}

const useExportCSV = <T,>({
    data,
    filename = 'data.csv'
}: PageProps) => {
    const [pending, setPending] = useState<boolean>(false);
    const ExportToCSV = () => {
        setPending(true);
        setTimeout(() => {
            setPending(false)
            exportToCSV(data, filename);
        }, 1000)
    }

    return {
        pending,
        ExportToCSV
    }
}

function exportToCSV(data: any, fileName = "table-data.csv") {

    if (data.length === 0) {
        alert('Data not found');
        return;
    };

    const headers = Object.keys(data[0]);

    const rows = data.map((row: any) => (
        headers.map(header => {
            const value = row[header];
            return `"${String(value).replace(/"/g, '""')}"`;
        }).join(",")
    ))

    const csvString = [headers.join(","), ...rows].join("\n");

    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(url);
}

export default useExportCSV;