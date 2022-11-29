"use strict";
var vulns = [
    {
        type: 'Security Feature Bypass',
        url: 'https://msrc.microsoft.com/update-guide/vulnerability/CVE-2022-41104',
        cve: 'CVE-2022-41104',
        app: 'Excel for Windows',
        vendor: 'Microsoft',
        impact: 'P2',
        target: 'Desktop'
    },
    {
        type: 'Sensitive Information Disclosure',
        url: '',
        cve: '',
        app: 'Poshmark',
        vendor: 'Poshmark',
        impact: 'P2',
        target: 'Web, Mobile'
    },
    {
        type: 'Authentication Bypass',
        url: '',
        cve: '',
        app: 'Outlook for iOS/iPadOS',
        vendor: 'Microsoft',
        impact: 'P3',
        target: 'Mobile'
    },
    {
        type: 'Privilege Escalation',
        url: 'https://github.com/cloudflare/advisories/security/advisories/GHSA-m6w8-3pf9-p68r',
        cve: 'CVE-2022-2147',
        app: 'Cloudflare WARP for Windows',
        vendor: 'Cloudflare',
        impact: 'P3',
        target: 'Desktop'
    },
    {
        type: 'Use of Weak Hash',
        url: '',
        cve: '',
        app: 'Bitdefender Total Security',
        vendor: 'Bitdefender',
        impact: 'P4',
        target: 'Desktop'
    },
    {
        type: 'Denial-of-Service',
        url: 'https://github.com/jdgregson/Disclosures/tree/master/microsoft/wdag-dos-long-hostname',
        cve: '',
        app: 'Application Guard',
        vendor: 'Microsoft',
        impact: 'P3',
        target: 'Web, Desktop'
    },
    {
        type: 'Authenticated Reflected XSS',
        url: 'https://github.com/jdgregson/Disclosures/tree/master/xfinity/xb3-authenticated-reflected-xss',
        cve: '',
        app: 'Router Admin Interface',
        vendor: 'Cisco/Technicolor',
        impact: 'P3',
        target: 'Web'
    },
    {
        type: 'Denial-of-Service',
        url: 'https://github.com/jdgregson/Disclosures/tree/master/xfinity/xb3-dos-via-large-post-request',
        cve: '',
        app: 'Router Admin Interface',
        vendor: 'Cisco/Technicolor',
        impact: 'P3',
        target: 'Web'
    },
    {
        type: 'Authentication Bypass',
        url: '',
        cve: '',
        app: 'TaxCloud for BigCommerce',
        vendor: 'TaxCloud',
        impact: 'P1',
        target: 'Web'
    },
    {
        type: 'Authentication Bypass',
        url: '',
        cve: '',
        app: 'Bitdefender Total Security',
        vendor: 'Bitdefender',
        impact: 'P3',
        target: 'Desktop'
    },
    {
        type: 'Unrestricted File Upload',
        url: 'https://seclists.org/fulldisclosure/2020/Nov/30',
        cve: '',
        app: 'Fancy Product Designer',
        vendor: 'Fancy Product Designer',
        impact: 'P2',
        target: 'Web'
    },
    {
        type: 'Stored XSS via SVG Upload',
        url: 'https://seclists.org/fulldisclosure/2020/Nov/29',
        cve: '',
        app: 'Fancy Product Designer',
        vendor: 'Fancy Product Designer',
        impact: 'P2',
        target: 'Web'
    },
    {
        type: 'Sensitive Information Disclosure',
        url: '',
        cve: '',
        app: 'Bitdefender Total Security',
        vendor: 'Bitdefender',
        impact: 'P3',
        target: 'Web, Desktop'
    },
    {
        type: 'Authentication Bypass',
        url: '',
        cve: '',
        app: 'Malwarebytes Premium',
        vendor: 'Malwarebytes',
        impact: 'P2',
        target: 'Desktop'
    },
    {
        type: 'Authentication Bypass',
        url: '',
        cve: '',
        app: 'Bitdefender Mobile Security',
        vendor: 'Bitdefender',
        impact: 'P4',
        target: 'Mobile'
    },
    {
        type: 'Application-level DoS',
        url: '',
        cve: '',
        app: 'Bitdefender.com',
        vendor: 'Bitdefender',
        impact: 'P3',
        target: 'Web'
    },
];
var getVulnRow = function (item) {
    var tr = document.createElement('tr');
    tr.classList.add('vuln-list-row');
    if (item.url) {
        tr.innerHTML += "<td><a href=\"".concat(item.url, "\">").concat(item.type, "</a></td>");
    }
    else {
        tr.innerHTML += "<td>".concat(item.type, "</td>");
    }
    tr.innerHTML += "\n      <td>".concat(item.cve, "</td>\n      <td>").concat(item.app, "</td>\n      <td>").concat(item.vendor, "</td>\n      <td>").concat(item.impact, "</td>\n      <td>").concat(item.target, "</td>\n    ");
    return tr;
};
var initApp = function () {
    // Register a service worker to enable app installation as a PWA
    navigator.serviceWorker.register('sw.js');
    // Populate the vulnerabilities table
    var vulnTable = document.getElementById('vuln-table');
    if (vulnTable) {
        vulns.forEach(function (item) {
            vulnTable.appendChild(getVulnRow(item));
        });
    }
    initStardust({
        actions: {},
        options: {}
    });
};
//# sourceMappingURL=app.js.map