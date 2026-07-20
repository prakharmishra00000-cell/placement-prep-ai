import sys

with open('static/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

js_addition = '''
// ==========================================
// 7 NEW PREMIUM AI TOOLS LOGIC
// ==========================================

// 1. AI Skill-Mesh Optimizer
const meshBtn = document.getElementById('mesh-btn');
if (meshBtn) {
    meshBtn.addEventListener('click', async () => {
        const jd = document.getElementById('mesh-jd').value.trim();
        const stack = document.getElementById('mesh-stack').value.trim();
        if (!jd || !stack) { alert("Please provide both the JD and your Stack."); return; }
        
        meshBtn.disabled = true;
        document.getElementById('mesh-loading').style.display = 'block';
        document.getElementById('mesh-result').style.display = 'none';
        
        try {
            const res = await fetch('/api/career/skill-mesh', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jd, stack })
            });
            const data = await res.json();
            document.getElementById('mesh-content').innerHTML = marked.parse(data.result);
        } catch (e) {
            document.getElementById('mesh-content').innerHTML = `<p style="color:var(--neon-pink)">Error: ${e.message}</p>`;
        } finally {
            meshBtn.disabled = false;
            document.getElementById('mesh-loading').style.display = 'none';
            document.getElementById('mesh-result').style.display = 'block';
        }
    });
}

// 2. Rejection Rehab
const rehabBtn = document.getElementById('rehab-btn');
if (rehabBtn) {
    rehabBtn.addEventListener('click', async () => {
        const email = document.getElementById('rehab-email').value.trim();
        if (!email) return;
        
        rehabBtn.disabled = true;
        document.getElementById('rehab-loading').style.display = 'block';
        document.getElementById('rehab-result').style.display = 'none';
        
        try {
            const res = await fetch('/api/career/rejection-rehab', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            document.getElementById('rehab-content').innerHTML = marked.parse(data.result);
        } catch (e) {
            document.getElementById('rehab-content').innerHTML = `<p style="color:var(--neon-pink)">Error: ${e.message}</p>`;
        } finally {
            rehabBtn.disabled = false;
            document.getElementById('rehab-loading').style.display = 'none';
            document.getElementById('rehab-result').style.display = 'block';
        }
    });
}

// 3. Recruiter Time-Zone Calc
const tzCity = document.getElementById('tz-city');
if (tzCity) {
    tzCity.addEventListener('change', () => {
        const timezone = tzCity.value;
        const now = new Date();
        
        // Calculate local time in target timezone
        const options = { timeZone: timezone, hour: '2-digit', minute: '2-digit', hour12: false };
        const localTimeStr = now.toLocaleTimeString('en-US', options);
        document.getElementById('tz-time').innerText = localTimeStr;
        
        // Extract hour for logic (0-23)
        const hour = parseInt(localTimeStr.split(':')[0], 10);
        
        const badge = document.getElementById('tz-badge');
        const status = document.getElementById('tz-status');
        
        if (hour >= 9 && hour <= 11) {
            badge.innerText = "PERFECT: Send Now";
            badge.style.background = "var(--neon-cyan)";
            badge.style.color = "#000";
            status.innerText = "Morning Inbox Peak";
        } else if (hour >= 13 && hour <= 16) {
            badge.innerText = "GOOD: Afternoon Window";
            badge.style.background = "var(--neon-yellow)";
            badge.style.color = "#000";
            status.innerText = "Standard Work Hours";
        } else {
            badge.innerText = "WAIT: Out of Office / Night";
            badge.style.background = "var(--neon-pink)";
            badge.style.color = "#fff";
            status.innerText = "Do not send email now";
        }
    });
    // Trigger on load
    tzCity.dispatchEvent(new Event('change'));
}

// 4. Peer Referral Tracker
let refLogs = JSON.parse(localStorage.getItem('peerReferralLogs')) || [];

function renderRefLogs() {
    const tbody = document.getElementById('ref-table-body');
    const emptyState = document.getElementById('ref-empty');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (refLogs.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    refLogs.forEach((log, index) => {
        const tr = document.createElement('tr');
        tr.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        
        // Calculate status badge
        const contactDate = new Date(log.date);
        const diffTime = Math.abs(new Date() - contactDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        
        let statusBadge = `<span class="badge" style="background:var(--neon-cyan);color:#000;">Fresh</span>`;
        if (diffDays >= 7) {
            statusBadge = `<span class="badge" style="background:var(--neon-yellow);color:#000;">Follow-Up Ready</span>`;
        }
        if (diffDays >= 30) {
            statusBadge = `<span class="badge" style="background:var(--neon-pink);color:#fff;">Archived</span>`;
        }
        
        tr.innerHTML = `
            <td style="padding: 0.75rem;">${log.name}</td>
            <td style="padding: 0.75rem;">${log.company}</td>
            <td style="padding: 0.75rem;">${log.date}</td>
            <td style="padding: 0.75rem;">${statusBadge}</td>
            <td style="padding: 0.75rem;">
                <button class="btn btn-sm" onclick="deleteRefLog(${index})" style="background:transparent; color:var(--neon-pink);"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function deleteRefLog(index) {
    refLogs.splice(index, 1);
    localStorage.setItem('peerReferralLogs', JSON.stringify(refLogs));
    renderRefLogs();
}

const refAddBtn = document.getElementById('ref-add-btn');
if (refAddBtn) {
    refAddBtn.addEventListener('click', () => {
        const name = document.getElementById('ref-name').value;
        const company = document.getElementById('ref-company').value;
        const date = document.getElementById('ref-date').value;
        if (!name || !date) return alert("Name and Date required.");
        
        refLogs.push({ name, company, date });
        localStorage.setItem('peerReferralLogs', JSON.stringify(refLogs));
        renderRefLogs();
        
        document.getElementById('ref-name').value = '';
        document.getElementById('ref-company').value = '';
        document.getElementById('ref-date').value = '';
    });
}

document.addEventListener('DOMContentLoaded', () => { setTimeout(renderRefLogs, 500); });

// 5. GD Key Phrase Generator
const gdBtn = document.getElementById('gd-btn');
if (gdBtn) {
    gdBtn.addEventListener('click', async () => {
        const topic = document.getElementById('gd-topic').value.trim();
        if (!topic) return;
        
        gdBtn.disabled = true;
        document.getElementById('gd-loading').style.display = 'block';
        document.getElementById('gd-result').style.display = 'none';
        
        try {
            const res = await fetch('/api/career/gd-generator', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic })
            });
            const data = await res.json();
            document.getElementById('gd-content').innerHTML = marked.parse(data.result);
        } catch (e) {
            document.getElementById('gd-content').innerHTML = `<p style="color:var(--neon-pink)">Error: ${e.message}</p>`;
        } finally {
            gdBtn.disabled = false;
            document.getElementById('gd-loading').style.display = 'none';
            document.getElementById('gd-result').style.display = 'block';
        }
    });
}

// 6. Thank-You Note Sculptor
const tyBtn = document.getElementById('ty-btn');
if (tyBtn) {
    tyBtn.addEventListener('click', async () => {
        const name = document.getElementById('ty-name').value;
        const topic = document.getElementById('ty-topic').value;
        const takeaway = document.getElementById('ty-takeaway').value;
        if (!name || !topic) return;
        
        tyBtn.disabled = true;
        document.getElementById('ty-loading').style.display = 'block';
        document.getElementById('ty-result').style.display = 'none';
        
        try {
            const res = await fetch('/api/career/thank-you', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, topic, takeaway })
            });
            const data = await res.json();
            document.getElementById('ty-content').innerHTML = marked.parse(data.result);
        } catch (e) {
            document.getElementById('ty-content').innerHTML = `<p style="color:var(--neon-pink)">Error: ${e.message}</p>`;
        } finally {
            tyBtn.disabled = false;
            document.getElementById('ty-loading').style.display = 'none';
            document.getElementById('ty-result').style.display = 'block';
        }
    });
}

// 7. Resume Bullet Polish
const bulletBtn = document.getElementById('bullet-btn');
if (bulletBtn) {
    bulletBtn.addEventListener('click', async () => {
        const bullet = document.getElementById('bullet-input').value;
        if (!bullet) return;
        
        bulletBtn.disabled = true;
        document.getElementById('bullet-loading').style.display = 'block';
        document.getElementById('bullet-result').style.display = 'none';
        
        try {
            const res = await fetch('/api/career/bullet-polish', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bullet })
            });
            const data = await res.json();
            document.getElementById('bullet-content').innerHTML = marked.parse(data.result);
        } catch (e) {
            document.getElementById('bullet-content').innerHTML = `<p style="color:var(--neon-pink)">Error: ${e.message}</p>`;
        } finally {
            bulletBtn.disabled = false;
            document.getElementById('bullet-loading').style.display = 'none';
            document.getElementById('bullet-result').style.display = 'block';
        }
    });
}
'''

if '// 7 NEW PREMIUM AI TOOLS LOGIC' not in js:
    with open('static/app.js', 'a', encoding='utf-8') as f:
        f.write('\n' + js_addition)
    print("Injected JS for 7 new tools into app.js")
else:
    print("JS logic already exists.")
