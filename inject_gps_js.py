import sys

with open('static/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

if 'gpsContacts' not in js:
    gps_js = '''
// ==========================================
// Networking GPS (CRM) Logic
// ==========================================
let gpsContacts = JSON.parse(localStorage.getItem('networkingGPSContacts')) || [];

function renderGPSContacts() {
    const tbody = document.getElementById('gps-table-body');
    const emptyState = document.getElementById('gps-empty-state');
    const table = document.getElementById('gps-table');
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (gpsContacts.length === 0) {
        emptyState.style.display = 'block';
        table.style.display = 'none';
        return;
    }
    
    emptyState.style.display = 'none';
    table.style.display = 'table';
    
    gpsContacts.forEach((contact, index) => {
        const tr = document.createElement('tr');
        tr.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        
        tr.innerHTML = 
            <td style=\"padding: 0.75rem;\"></td>
            <td style=\"padding: 0.75rem;\"></td>
            <td style=\"padding: 0.75rem;\"></td>
            <td style=\"padding: 0.75rem;\"><span class=\"badge badge-primary\"></span></td>
            <td style=\"padding: 0.75rem;\"></td>
            <td style=\"padding: 0.75rem;\">
                <button class=\"btn btn-sm\" onclick=\"deleteGPSContact()\" style=\"background: transparent; color: var(--neon-pink); padding: 0.2rem 0.5rem;\"><i class=\"fa-solid fa-trash\"></i></button>
            </td>
        ;
        tbody.appendChild(tr);
    });
}

function deleteGPSContact(index) {
    gpsContacts.splice(index, 1);
    localStorage.setItem('networkingGPSContacts', JSON.stringify(gpsContacts));
    renderGPSContacts();
}

const gpsAddBtn = document.getElementById('gps-add-btn');
if (gpsAddBtn) {
    gpsAddBtn.addEventListener('click', () => {
        const name = document.getElementById('gps-name').value.trim();
        const company = document.getElementById('gps-company').value.trim();
        const role = document.getElementById('gps-role').value.trim();
        const tier = document.getElementById('gps-tier').value;
        const date = document.getElementById('gps-date').value;
        
        if (!name || !company) {
            alert('Please enter at least a Name and Company.');
            return;
        }
        
        gpsContacts.push({ name, company, role, tier, date });
        localStorage.setItem('networkingGPSContacts', JSON.stringify(gpsContacts));
        
        // Clear inputs
        document.getElementById('gps-name').value = '';
        document.getElementById('gps-company').value = '';
        document.getElementById('gps-role').value = '';
        document.getElementById('gps-date').value = '';
        
        renderGPSContacts();
    });
}

const gpsAnalyzeBtn = document.getElementById('gps-analyze-btn');
if (gpsAnalyzeBtn) {
    gpsAnalyzeBtn.addEventListener('click', async () => {
        if (gpsContacts.length === 0) {
            alert('Please add some connections to your CRM first!');
            return;
        }
        
        const loading = document.getElementById('gps-loading');
        const result = document.getElementById('gps-result');
        const content = document.getElementById('gps-strategy-content');
        const btn = document.getElementById('gps-analyze-btn');
        
        btn.disabled = true;
        loading.style.display = 'block';
        result.style.display = 'none';
        
        try {
            const res = await fetch('/api/networking/gps', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contacts: gpsContacts })
            });
            
            const data = await res.json();
            
            if (data.error) {
                content.innerHTML = <p style=\"color: var(--neon-pink)\">Error: </p>;
            } else {
                content.innerHTML = marked.parse(data.strategy);
            }
        } catch (err) {
            content.innerHTML = <p style=\"color: var(--neon-pink)\">Connection error: </p>;
        } finally {
            loading.style.display = 'none';
            result.style.display = 'block';
            btn.disabled = false;
        }
    });
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(renderGPSContacts, 500);
});
'''
    with open('static/app.js', 'a', encoding='utf-8') as f:
        f.write('\n' + gps_js)
    print("Injected Networking GPS into app.js")
