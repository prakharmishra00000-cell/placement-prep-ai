import sys

with open('static/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

js_addition = '''
// ==========================================
// 6 FINAL PREMIUM AI TOOLS LOGIC
// ==========================================

// 1. Certificate Verifier
const certBtn = document.getElementById('cert-btn');
if (certBtn) {
    certBtn.addEventListener('click', async () => {
        const text = document.getElementById('cert-input').value.trim();
        if (!text) return;
        
        certBtn.disabled = true;
        document.getElementById('cert-loading').style.display = 'block';
        document.getElementById('cert-result').style.display = 'none';
        
        try {
            const res = await fetch('/api/career/certificate-parser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text })
            });
            const data = await res.json();
            document.getElementById('cert-content').innerHTML = marked.parse(data.result);
        } catch (e) {
            document.getElementById('cert-content').innerHTML = `<p style="color:var(--neon-pink)">Error: ${e.message}</p>`;
        } finally {
            certBtn.disabled = false;
            document.getElementById('cert-loading').style.display = 'none';
            document.getElementById('cert-result').style.display = 'block';
        }
    });
}

// 2. Project Scope Scaler
const scalerBtn = document.getElementById('scaler-btn');
if (scalerBtn) {
    scalerBtn.addEventListener('click', async () => {
        const project = document.getElementById('scaler-input').value.trim();
        if (!project) return;
        
        scalerBtn.disabled = true;
        document.getElementById('scaler-loading').style.display = 'block';
        document.getElementById('scaler-result').style.display = 'none';
        
        try {
            const res = await fetch('/api/career/project-scaler', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ project })
            });
            const data = await res.json();
            document.getElementById('scaler-content').innerHTML = marked.parse(data.result);
        } catch (e) {
            document.getElementById('scaler-content').innerHTML = `<p style="color:var(--neon-pink)">Error: ${e.message}</p>`;
        } finally {
            scalerBtn.disabled = false;
            document.getElementById('scaler-loading').style.display = 'none';
            document.getElementById('scaler-result').style.display = 'block';
        }
    });
}

// 3. Reverse Interview
const riBtn = document.getElementById('ri-btn');
if (riBtn) {
    riBtn.addEventListener('click', async () => {
        const round = document.getElementById('ri-round').value;
        if (!round) return;
        
        riBtn.disabled = true;
        document.getElementById('ri-loading').style.display = 'block';
        document.getElementById('ri-result').style.display = 'none';
        
        try {
            const res = await fetch('/api/career/reverse-interview', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ round })
            });
            const data = await res.json();
            document.getElementById('ri-content').innerHTML = marked.parse(data.result);
        } catch (e) {
            document.getElementById('ri-content').innerHTML = `<p style="color:var(--neon-pink)">Error: ${e.message}</p>`;
        } finally {
            riBtn.disabled = false;
            document.getElementById('ri-loading').style.display = 'none';
            document.getElementById('ri-result').style.display = 'block';
        }
    });
}

// 4. Tech Acronym Decoder
const acronymBtn = document.getElementById('acronym-btn');
if (acronymBtn) {
    acronymBtn.addEventListener('click', async () => {
        const jargon = document.getElementById('acronym-input').value.trim();
        if (!jargon) return;
        
        acronymBtn.disabled = true;
        document.getElementById('acronym-loading').style.display = 'block';
        document.getElementById('acronym-result').style.display = 'none';
        
        try {
            const res = await fetch('/api/career/acronym-decoder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jargon })
            });
            const data = await res.json();
            document.getElementById('acronym-content').innerHTML = marked.parse(data.result);
        } catch (e) {
            document.getElementById('acronym-content').innerHTML = `<p style="color:var(--neon-pink)">Error: ${e.message}</p>`;
        } finally {
            acronymBtn.disabled = false;
            document.getElementById('acronym-loading').style.display = 'none';
            document.getElementById('acronym-result').style.display = 'block';
        }
    });
}

// 5. Hackathon Pitch
const hackBtn = document.getElementById('hack-btn');
if (hackBtn) {
    hackBtn.addEventListener('click', async () => {
        const problem = document.getElementById('hack-prob').value.trim();
        const solution = document.getElementById('hack-sol').value.trim();
        const impact = document.getElementById('hack-imp').value.trim();
        if (!problem || !solution) return;
        
        hackBtn.disabled = true;
        document.getElementById('hack-loading').style.display = 'block';
        document.getElementById('hack-result').style.display = 'none';
        
        try {
            const res = await fetch('/api/career/hackathon-pitch', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ problem, solution, impact })
            });
            const data = await res.json();
            document.getElementById('hack-content').innerHTML = marked.parse(data.result);
        } catch (e) {
            document.getElementById('hack-content').innerHTML = `<p style="color:var(--neon-pink)">Error: ${e.message}</p>`;
        } finally {
            hackBtn.disabled = false;
            document.getElementById('hack-loading').style.display = 'none';
            document.getElementById('hack-result').style.display = 'block';
        }
    });
}

// 6. Imposter Reframer
const imposterBtn = document.getElementById('imposter-btn');
if (imposterBtn) {
    imposterBtn.addEventListener('click', async () => {
        const doubt = document.getElementById('imposter-input').value.trim();
        if (!doubt) return;
        
        imposterBtn.disabled = true;
        document.getElementById('imposter-loading').style.display = 'block';
        document.getElementById('imposter-result').style.display = 'none';
        
        try {
            const res = await fetch('/api/career/imposter-reframe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ doubt })
            });
            const data = await res.json();
            document.getElementById('imposter-content').innerHTML = marked.parse(data.result);
        } catch (e) {
            document.getElementById('imposter-content').innerHTML = `<p style="color:var(--neon-pink)">Error: ${e.message}</p>`;
        } finally {
            imposterBtn.disabled = false;
            document.getElementById('imposter-loading').style.display = 'none';
            document.getElementById('imposter-result').style.display = 'block';
        }
    });
}
'''

if '// 6 FINAL PREMIUM AI TOOLS LOGIC' not in js:
    with open('static/app.js', 'a', encoding='utf-8') as f:
        f.write('\n' + js_addition)
    print("Injected JS for 6 new tools into app.js")
else:
    print("JS logic already exists.")
