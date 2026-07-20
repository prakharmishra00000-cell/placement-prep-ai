import sys

with open('static/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Replace variables
css = css.replace('--bg-color: #0f172a;', '--bg-color: #050505;')
css = css.replace('--dark-bg: rgba(15, 23, 42, 0.7);', '--dark-bg: rgba(5, 5, 5, 0.85);')
css = css.replace('--primary-color: #3b82f6;', '--primary-color: #00e5ff;')
css = css.replace('--neon-cyan: #00ffcc;', '--neon-cyan: #00e5ff;') # Make cyan more aggressive

# Upgrade glass-card
old_glass = '''
.glass-card {
    background: rgba(30, 41, 59, 0.7);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}
'''

new_glass = '''
.glass-card {
    background: rgba(10, 10, 10, 0.6);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(0, 229, 255, 0.15);
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), inset 0 0 10px rgba(0, 229, 255, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}
'''

if 'backdrop-filter: blur(20px);' not in css:
    css = css.replace(old_glass.strip(), new_glass.strip())

# Upgrade body background
css = css.replace('background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);', 'background: linear-gradient(135deg, #020202 0%, #0a0a0a 100%);')

with open('static/style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Injected Dark Cyan Glassmorphism Theme into style.css")
