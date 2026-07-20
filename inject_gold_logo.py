import sys

with open('templates/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the cyan logo with the golden logo and adjust border color
html = html.replace('src="/static/premium_50_logo.jpg"', 'src="/static/premium_50_logo_gold.jpg"')
html = html.replace('border: 2px solid var(--neon-cyan);', 'border: 2px solid #FFD700;')
html = html.replace('box-shadow: 0 0 20px rgba(0,255,170,0.4);', 'box-shadow: 0 0 20px rgba(255,215,0,0.5);')

with open('templates/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Injected Golden 50 Logo into index.html")
