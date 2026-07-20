import sys

with open('static/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

js_addition = '''
// ==========================================
// 50-FEATURE MILESTONE: FINAL 6 TOOLS LOGIC
// ==========================================

// 1. Take-Home Planner
const takehomeBtn = document.getElementById('takehome-btn');
if (takehomeBtn) {
    takehomeBtn.addEventListener('click', async () => {
        const prompt = document.getElementById('takehome-input').value.trim();
        if (!prompt) return;
        
        takehomeBtn.disabled = true;
        document.getElementById('takehome-loading').style.display = 'block';
        document.getElementById('takehome-result').style.display = 'none';
        
        try {
            const res = await fetch('/api/career/take-home-blueprint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt })
            });
            const data = await res.json();
            document.getElementById('takehome-content').innerHTML = marked.parse(data.result);
        } catch (e) {
            document.getElementById('takehome-content').innerHTML = `<p style="color:var(--neon-pink)">Error: ${e.message}</p>`;
        } finally {
            takehomeBtn.disabled = false;
            document.getElementById('takehome-loading').style.display = 'none';
            document.getElementById('takehome-result').style.display = 'block';
        }
    });
}

// 2. Aptitude Vault
const aptitudeBtn = document.getElementById('aptitude-btn');
if (aptitudeBtn) {
    aptitudeBtn.addEventListener('click', async () => {
        const topic = document.getElementById('aptitude-input').value.trim();
        if (!topic) return;
        
        aptitudeBtn.disabled = true;
        document.getElementById('aptitude-loading').style.display = 'block';
        document.getElementById('aptitude-result').style.display = 'none';
        
        try {
            const res = await fetch('/api/career/aptitude-vault', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic })
            });
            const data = await res.json();
            document.getElementById('aptitude-content').innerHTML = marked.parse(data.result);
        } catch (e) {
            document.getElementById('aptitude-content').innerHTML = `<p style="color:var(--neon-pink)">Error: ${e.message}</p>`;
        } finally {
            aptitudeBtn.disabled = false;
            document.getElementById('aptitude-loading').style.display = 'none';
            document.getElementById('aptitude-result').style.display = 'block';
        }
    });
}

// 3. Company Intel
const companyBtn = document.getElementById('company-btn');
if (companyBtn) {
    companyBtn.addEventListener('click', async () => {
        const company = document.getElementById('company-input').value.trim();
        if (!company) return;
        
        companyBtn.disabled = true;
        document.getElementById('company-loading').style.display = 'block';
        document.getElementById('company-result').style.display = 'none';
        
        try {
            const res = await fetch('/api/career/company-intel', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ company })
            });
            const data = await res.json();
            document.getElementById('company-content').innerHTML = marked.parse(data.result);
        } catch (e) {
            document.getElementById('company-content').innerHTML = `<p style="color:var(--neon-pink)">Error: ${e.message}</p>`;
        } finally {
            companyBtn.disabled = false;
            document.getElementById('company-loading').style.display = 'none';
            document.getElementById('company-result').style.display = 'block';
        }
    });
}

// 4. Soft Skill STAR Translator
const starBtn = document.getElementById('star-btn');
if (starBtn) {
    starBtn.addEventListener('click', async () => {
        const anecdote = document.getElementById('star-input').value.trim();
        if (!anecdote) return;
        
        starBtn.disabled = true;
        document.getElementById('star-loading').style.display = 'block';
        document.getElementById('star-result').style.display = 'none';
        
        try {
            const res = await fetch('/api/career/soft-skill-translator', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ anecdote })
            });
            const data = await res.json();
            document.getElementById('star-content').innerHTML = marked.parse(data.result);
        } catch (e) {
            document.getElementById('star-content').innerHTML = `<p style="color:var(--neon-pink)">Error: ${e.message}</p>`;
        } finally {
            starBtn.disabled = false;
            document.getElementById('star-loading').style.display = 'none';
            document.getElementById('star-result').style.display = 'block';
        }
    });
}

// 5. Notice Period Calculator (Pure JS)
const npBtn = document.getElementById('np-btn');
if (npBtn) {
    npBtn.addEventListener('click', () => {
        const dateInput = document.getElementById('np-date').value;
        const daysInput = parseInt(document.getElementById('np-days').value, 10);
        
        if (!dateInput || isNaN(daysInput)) return alert("Please enter valid dates.");
        
        const resDate = new Date(dateInput);
        
        // Calculate Last Working Day
        const lwdDate = new Date(resDate);
        lwdDate.setDate(lwdDate.getDate() + daysInput);
        
        // Calculate Handover (last 14 days)
        const handoverDate = new Date(lwdDate);
        handoverDate.setDate(handoverDate.getDate() - 14);
        
        // Calculate Earliest Joining (Day after LWD)
        const joinDate = new Date(lwdDate);
        joinDate.setDate(joinDate.getDate() + 1);
        
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        
        document.getElementById('np-lwd').innerText = lwdDate.toLocaleDateString('en-US', options);
        document.getElementById('np-handover').innerText = handoverDate.toLocaleDateString('en-US', options);
        document.getElementById('np-join').innerText = joinDate.toLocaleDateString('en-US', options);
        
        document.getElementById('np-result').style.display = 'block';
    });
}

// 6. GD Counter-Shield
const gdShieldBtn = document.getElementById('gd-shield-btn');
if (gdShieldBtn) {
    gdShieldBtn.addEventListener('click', async () => {
        const stance = document.getElementById('gd-shield-input').value.trim();
        if (!stance) return;
        
        gdShieldBtn.disabled = true;
        document.getElementById('gd-shield-loading').style.display = 'block';
        document.getElementById('gd-shield-result').style.display = 'none';
        
        try {
            const res = await fetch('/api/career/gd-counter-shield', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ stance })
            });
            const data = await res.json();
            document.getElementById('gd-shield-content').innerHTML = marked.parse(data.result);
        } catch (e) {
            document.getElementById('gd-shield-content').innerHTML = `<p style="color:var(--neon-pink)">Error: ${e.message}</p>`;
        } finally {
            gdShieldBtn.disabled = false;
            document.getElementById('gd-shield-loading').style.display = 'none';
            document.getElementById('gd-shield-result').style.display = 'block';
        }
    });
}
'''

if '// 50-FEATURE MILESTONE: FINAL 6 TOOLS LOGIC' not in js:
    with open('static/app.js', 'a', encoding='utf-8') as f:
        f.write('\n' + js_addition)
    print("Injected JS for final 6 tools into app.js")
else:
    print("JS logic already exists.")
