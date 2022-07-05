interface VulnListItem {
  type: string;
  url: string;
  app: string;
  vendor: string;
  impact: string;
  class: string;
  fixed: string;
}

const vulns: VulnListItem[] = [
  {
    type: 'Sensitive Information Disclosure',
    url: '',
    app: 'Poshmark',
    vendor: 'Poshmark',
    impact: 'P2',
    class: 'Web, Mobile',
    fixed: 'NO',
  },
  {
    type: 'Authentication Bypass',
    url: '',
    app: 'Outlook for iOS/iPadOS',
    vendor: 'Microsoft',
    impact: 'P3',
    class: 'Mobile',
    fixed: 'YES',
  },
  {
    type: 'Privilege Escalation',
    url: 'https://github.com/cloudflare/advisories/security/advisories/GHSA-m6w8-3pf9-p68r',
    app: 'Cloudflare WARP for Windows',
    vendor: 'Cloudflare',
    impact: 'P3',
    class: 'Desktop',
    fixed: 'YES',
  },
  {
    type: 'Use of Weak Hash',
    url: '',
    app: 'Bitdefender Total Security',
    vendor: 'Bitdefender',
    impact: 'P4',
    class: 'Desktop',
    fixed: 'NO',
  },
  {
    type: 'Denial-of-Service',
    url: 'https://github.com/jdgregson/Disclosures/tree/master/microsoft/wdag-dos-long-hostname',
    app: 'Application Guard',
    vendor: 'Microsoft',
    impact: 'P3',
    class: 'Web, Desktop',
    fixed: 'NO',
  },
  {
    type: 'Authenticated Reflected XSS',
    url: 'https://github.com/jdgregson/Disclosures/tree/master/xfinity/xb3-authenticated-reflected-xss',
    app: 'Router Admin Interface',
    vendor: 'Cisco/Technicolor',
    impact: 'P3',
    class: 'Web',
    fixed: 'NO',
  },
  {
    type: 'Denial-of-Service',
    url: 'https://github.com/jdgregson/Disclosures/tree/master/xfinity/xb3-dos-via-large-post-request',
    app: 'Router Admin Interface',
    vendor: 'Cisco/Technicolor',
    impact: 'P3',
    class: 'Web',
    fixed: 'NO',
  },
  {
    type: 'Authentication Bypass',
    url: '',
    app: 'TaxCloud for BigCommerce',
    vendor: 'TaxCloud',
    impact: 'P1',
    class: 'Web',
    fixed: 'YES',
  },
  {
    type: 'Authentication Bypass',
    url: '',
    app: 'Bitdefender Total Security',
    vendor: 'Bitdefender',
    impact: 'P3',
    class: 'Desktop',
    fixed: 'NO',
  },
  {
    type: 'Unrestricted File Upload',
    url: 'https://seclists.org/fulldisclosure/2020/Nov/30',
    app: 'Fancy Product Designer',
    vendor: 'Fancy Product Designer',
    impact: 'P2',
    class: 'Web',
    fixed: 'NO',
  },
  {
    type: 'Stored XSS via SVG Upload',
    url: 'https://seclists.org/fulldisclosure/2020/Nov/29',
    app: 'Fancy Product Designer',
    vendor: 'Fancy Product Designer',
    impact: 'P2',
    class: 'Web',
    fixed: 'YES',
  },
  {
    type: 'Sensitive Information Disclosure',
    url: '',
    app: 'Bitdefender Total Security',
    vendor: 'Bitdefender',
    impact: 'P3',
    class: 'Web, Desktop',
    fixed: 'YES',
  },
  {
    type: 'Authentication Bypass',
    url: '',
    app: 'Malwarebytes Premium',
    vendor: 'Malwarebytes',
    impact: 'P2',
    class: 'Desktop',
    fixed: 'YES',
  },
  {
    type: 'Authentication Bypass',
    url: '',
    app: 'Bitdefender Mobile Security',
    vendor: 'Bitdefender',
    impact: 'P4',
    class: 'Mobile',
    fixed: 'YES',
  },
  {
    type: 'Application-level DoS',
    url: '',
    app: 'Bitdefender.com',
    vendor: 'Bitdefender',
    impact: 'P3',
    class: 'Web',
    fixed: 'YES',
  },
];

const getVulnRow = (item: VulnListItem): HTMLTableRowElement => {
  const tr = document.createElement('tr');
  if (item.url) {
    tr.innerHTML += `<td><a href="${item.url}">${item.type}</a></td>`;
  } else {
    tr.innerHTML += `<td>${item.type}</td>`;
  }
  tr.innerHTML += `
      <td>${item.app}</td>
      <td>${item.vendor}</td>
      <td>${item.impact}</td>
      <td>${item.class}</td>
      <td>${item.fixed}</td>
    `;
  return tr;
};

const initApp = () => {
  // Register a service worker to enable app installation as a PWA
  navigator.serviceWorker.register('sw.js');

  // Populate the vulnerabilities table
  const vulnTable = document.getElementById('vuln-table');
  if (vulnTable) {
    vulns.forEach((item) => {
      vulnTable.appendChild(getVulnRow(item));
    });
  }

  initStardust({
    actions: {},
    options: {},
  });
};
