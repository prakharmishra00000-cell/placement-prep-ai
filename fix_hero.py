import sys

with open('templates/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

logo_html = '''
                    <div style="text-align: center; margin-bottom: 2rem;">
                        <img src="/static/premium_50_logo_gold.jpg" alt="50 Premium AI Tools" style="width: 300px; border-radius: 12px; box-shadow: 0 0 20px rgba(255,215,0,0.5); border: 2px solid #FFD700;">
                    </div>
'''

target_string = '<span style="font-size: 0.8rem; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: var(--neon-cyan); text-shadow: 0 0 8px rgba(123, 44, 191, 0.3);">Enterprise-Grade Career OS</span>'

if logo_html.strip() not in html and target_string in html:
    html = html.replace(target_string, logo_html + '                    ' + target_string)
    with open('templates/index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Fixed hero section: Injected Golden Logo.")
else:
    print("Logo already exists or target string not found.")
