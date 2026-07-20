import sys

with open('templates/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the text badge with the actual image badge logo
logo_html = '''<div style="text-align: center; margin-bottom: 2rem;">
                            <img src="/static/premium_50_logo.jpg" alt="50 Premium AI Tools" style="width: 300px; border-radius: 12px; box-shadow: 0 0 20px rgba(0,255,170,0.4); border: 2px solid var(--neon-cyan);">
                       </div>'''

if 'premium_50_logo.jpg' not in html:
    html = html.replace('<div style="background: rgba(0, 255, 170, 0.1); color: var(--neon-cyan); padding: 0.5rem 1rem; border-radius: 20px; font-weight: 600; display: inline-block; margin-bottom: 1rem; border: 1px solid var(--neon-cyan); box-shadow: 0 0 10px rgba(0,255,170,0.2);"><i class="fa-solid fa-bolt"></i> 50 Premium Tools Available</div>', logo_html)
    with open('templates/index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Injected 50 tools logo into index.html")
else:
    print("Logo already injected.")
