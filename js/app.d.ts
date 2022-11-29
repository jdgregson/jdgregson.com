interface VulnListItem {
    type: string;
    url: string;
    cve: string;
    app: string;
    vendor: string;
    impact: string;
    target: string;
}
declare const vulns: VulnListItem[];
declare const getVulnRow: (item: VulnListItem) => HTMLTableRowElement;
declare const initApp: () => void;
