document.addEventListener('DOMContentLoaded', function() {
    const healthCheckData = [
        {
            category: "NetScaler ADC - General",
            items: [
                "Admins have subscribed to Citrix Security Bulletins.",
                "Firmware build is patched for all recent vulnerabilities.",
                "If SAML is used, Relay State Rule is configured to prevent session hijacking.",
                "Indicator of Compromise (IoC) Scanner for CVE-2019-19781 shows no compromise.",
                "Dashboard does not show excessive outbound bandwidth (potential DTLS Amplification DDoS attack).",
                "Firmware updates are tested on a separate test ADC before production deployment.",
                "For VPX on vSphere: NICs are VMXNET3 (not E1000).",
                "For VPX on vSphere: DRS Cluster Anti-affinity is configured for HA pairs.",
                "For VPX on vSphere: CPU/Memory are reserved, or if not, Yield CPU is disabled.",
                "ADC license files in /nsconfig/license/ are not expiring soon.",
                "For Physical ADC: LOM port is connected, configured, and its password is not the default.",
                "The 'nsroot' password is not the default, is managed by a PIM tool, and not used for regular login.",
                "Policies are built with Advanced Expressions, not Classic Expressions.",
                "Management authentication uses an external server (e.g., LDAPS).",
                "LDAP is load-balanced, encrypted (LDAPS 636), and uses a dedicated service account.",
                "LDAP Search Filter restricts access to a specific AD group for ADC admins.",
                "The 'nsroot' account has external authentication disabled.",
                "No local user accounts exist on the ADC except for 'nsroot'.",
                "NTP and Time Zone are configured correctly.",
                "Syslog is configured to send logs to an external SIEM.",
                "SNMP traps for CPU and Memory thresholds are configured and sent to ADM.",
                "Customer Experience Improvement Program (CUXIP) is disabled.",
                "Recommended TCP Profile Settings are configured.",
                "'Drop Invalid HTTP requests' is enabled in global HTTP settings.",
                "'Secure Access Only' is enabled on all NSIPs and management-enabled SNIPs.",
                "The management interface certificate is valid with no errors.",
                "Networking: Unused interfaces are disabled.",
                "Networking: Each VLAN is connected to only one interface or channel.",
                "Networking: Only one default route is configured.",
                "Unused configurations (server objects, policies, etc.) have been removed.",
                "The ADC is monitored and backed up by Citrix ADM.",
                "Dashboard shows CPU, Memory, and Throughput have not exceeded appliance/license capacity.",
                "Directories /var/core and /var/crash do not have recent crash dumps."
            ]
        },
        {
            category: "NetScaler ADC - High Availability (HA) Pair",
            items: [
                "Firmware build and installed licenses are identical on both nodes.",
                "NTP and time zones are configured identically on both nodes.",
                "HA is synchronizing without error and both nodes are ENABLED.",
                "Fail-safe mode is enabled.",
                "'show ha node' command shows heartbeats across all interfaces.",
                "HA failover has been successfully tested.",
                "A Sync VLAN is configured to enable ISSU for seamless upgrades (ADC 13.0+)."
            ]
        },
        {
            category: "NetScaler ADC - SDX",
            items: [
                "LOM port is configured and its password is not the default.",
                "SDX SVM dashboard shows no hardware problems.",
                "SDX firmware is current (same or newer than VPX firmware).",
                "SDX SVM nsroot password is not the default and management uses external auth (LDAPS).",
                "HTTPS is forced for SVM management access and the certificate is valid.",
                "Channels (Link Aggregation) are created on the SDX SVM, not within VPX instances.",
                "VPX Instances have appropriate resources assigned (Platinum license, SSL Chips, Dedicated CPU for production).",
                "VLANs are specified inside VPX instances to avoid reboots for changes."
            ]
        },
        {
            category: "NetScaler ADC - Load Balancing and SSL",
            items: [
                "Load Balancing configurations are documented.",
                "Monitors perform application-level checks (e.g., specific LDAP query) and don't just ping.",
                "Rewrite policies remove web server header information (e.g., Server, X-Powered-By).",
                "All internet-facing SSL vServers score an A or A+ on the SSL Labs Server Test.",
                "Redirect vServers (HTTP to HTTPS) are UP (Responder method), not DOWN (Backup URL method).",
                "Custom, secure cipher suites are bound to every SSL vServer.",
                "SSLv3 and TLSv1.0 are disabled on every SSL vServer.",
                "SSL Renegotiation is set to NONSECURE (globally or via SSL Profiles).",
                "Root certificates are not linked to intermediate certificates in the chain.",
                "Certificates are not expired; ADM provides expiration alerts.",
                "ADM Analytics (Web Insight) is enabled for HTTP Virtual Servers.",
                "For Premium Edition: Bot Management or Web Application Firewall (WAF) is configured."
            ]
        },
        {
            category: "Citrix NetScaler ADM",
            items: [
                "ADM exists and manages all ADC appliances.",
                "ADM firmware version is current.",
                "ADM is deployed in a High Availability mode with a Floating IP.",
                "'Prompt credentials for instance login' is enabled to ensure proper audit logging.",
                "The ADM nsroot password is not the default and management uses external auth (LDAPS).",
                "Sufficient disk space, CPU, and Memory are allocated to ADM.",
                "Event Rules are configured to email admins for Critical/Major ADC alarms.",
                "ADC backups on ADM are configured to transfer to an external server.",
                "VIP licensing on ADM is correctly configured and assigned.",
                "For HDX Insight: AppFlow is enabled on Gateway vServers and linked to Director via HTTPS."
            ]
        },
        {
            category: "NetScaler Citrix Gateway (ICA Proxy)",
            items: [
                "Gateway vServer scores an A or A+ on the SSL Labs Server Test.",
                "TCP Profile is configured with Recommended TCP Profile Settings.",
                "DTLS is enabled on the vServer to support the EDT protocol.",
                "Communication to StoreFront is via HTTPS and is load-balanced.",
                "STAs on Gateway match the StoreFront configuration.",
                "Callback URL in StoreFront's Gateway settings is only configured if required for SmartAccess/FAS.",
                "For two-factor auth (RADIUS), failover has been tested from both HA nodes.",
                "For SAML auth, a 'relaystateRule' is configured to prevent session hijack.",
                "If using Native OTP, the AD attribute and nFactor login fields are encrypted."
            ]
        },
        {
            category: "NetScaler ADC - GSLB",
            items: [
                "DNS records for GSLB domains are correctly delegated to the ADC ADNS services.",
                "All ADC nodes participating in GSLB have identical GSLB configurations.",
                "Metric Exchange Protocol (MEP) communication between sites is secured and firewalled.",
                "If using Static Proximity, the database is current and custom entries exist for internal subnets.",
                "Site persistence is functioning correctly for Active/Active GSLB deployments.",
                "DNS security options are configured to prevent ADNS Denial of Service attacks."
            ]
        }
    ];

    const form = document.getElementById('healthCheckForm');
    let formHtml = '';

    healthCheckData.forEach(section => {
        formHtml += `<div class="form-section"><h2>${section.category}</h2>`;
        formHtml += '<table><thead><tr><th>Check Item</th><th>Status</th><th>Notes</th></tr></thead><tbody>';
        
        section.items.forEach(item => {
            formHtml += `
                <tr>
                    <td>${item}</td>
                    <td>
                        <select>
                            <option value="">Select Status</option>
                            <option value="OK">OK</option>
                            <option value="Action Required">Action Required</option>
                            <option value="N/A">N/A</option>
                        </select>
                    </td>
                    <td><input type="text" placeholder="Notes..."></td>
                </tr>
            `;
        });

        formHtml += '</tbody></table></div>';
    });

    // Insert after the client details section
    const clientDetails = form.querySelector('.client-details');
    clientDetails.insertAdjacentHTML('afterend', formHtml);
});

function generateReport() {
    const clientName = document.getElementById('clientName').value;
    const checkDate = document.getElementById('checkDate').value;
    const checkedBy = document.getElementById('checkedBy').value;
    const adcVersion = document.getElementById('adcVersion').value;

    let reportHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Health Check Report - ${clientName}</title>
            <style>
                body { font-family: Arial, sans-serif; }
                h1, h2 { color: #005696; }
                h1 { text-align: center; border-bottom: 2px solid #ccc; padding-bottom: 10px; }
                h2 { border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 30px;}
                table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
                .status-ok { color: green; font-weight: bold; }
                .status-issue { color: red; font-weight: bold; }
                .client-details-table { border: none; width: auto; margin-bottom: 30px; }
                .client-details-table td { border: none; padding: 5px; }
                .client-details-table td:first-child { font-weight: bold; padding-right: 15px; }
                 @media print {
                    button { display: none; }
                 }
            </style>
        </head>
        <body>
            <h1>Citrix NetScaler ADC - Health Check Report</h1>
            <table class="client-details-table">
                <tr><td>Customer Name:</td><td>${clientName}</td></tr>
                <tr><td>Date of Check:</td><td>${new Date(checkDate).toLocaleDateString('en-US')}</td></tr>
                <tr><td>Checked By:</td><td>${checkedBy}</td></tr>
                <tr><td>ADC Version:</td><td>${adcVersion}</td></tr>
            </table>
            <hr>
    `;

    const sections = document.querySelectorAll('.form-section:not(.client-details)');
    sections.forEach(section => {
        const title = section.querySelector('h2').innerText;
        reportHtml += `<h2>${title}</h2>`;
        reportHtml += '<table><thead><tr><th>Check Item</th><th>Status</th><th>Notes</th></tr></thead><tbody>';
        
        const rows = section.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const check = row.cells[0].innerText;
            const status = row.cells[1].querySelector('select').value;
            const notes = row.cells[2].querySelector('input').value;
            
            let statusClass = '';
            if (status === 'OK') statusClass = 'status-ok';
            if (status === 'Action Required') statusClass = 'status-issue';

            reportHtml += `
                <tr>
                    <td>${check}</td>
                    <td class="${statusClass}">${status}</td>
                    <td>${notes}</td>
                </tr>
            `;
        });
        reportHtml += '</tbody></table>';
    });
    
    reportHtml += `<p style="margin-top: 40px; text-align: center; color: #555;">-- End of Report --</p></body></html>`;

    const reportWindow = window.open('', '_blank');
    reportWindow.document.write(reportHtml);
    reportWindow.document.close();
    // Give browser time to render before printing
    setTimeout(() => {
        reportWindow.print();
    }, 500);
}
