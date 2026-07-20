import sys
import re

# 1. FIX CSS
with open('static/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = re.sub(r'--bg-dark:\s*#070913;', '--bg-dark: #050505;', css)
css = re.sub(r'--card-bg:\s*rgba\(13,\s*17,\s*23,\s*0\.65\);', '--card-bg: rgba(10, 10, 10, 0.6);', css)
css = re.sub(r'backdrop-filter:\s*blur\(12px\);', 'backdrop-filter: blur(20px);', css)
css = re.sub(r'-webkit-backdrop-filter:\s*blur\(12px\);', '-webkit-backdrop-filter: blur(20px);', css)

with open('static/style.css', 'w', encoding='utf-8') as f:
    f.write(css)

# 2. FIX HTML LOGO PLACEMENT
with open('templates/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove the big center logo
old_logo = '''
                    <div style="text-align: center; margin-bottom: 2rem;">
                        <img src="/static/premium_50_logo_gold.jpg" alt="50 Premium AI Tools" style="width: 300px; border-radius: 12px; box-shadow: 0 0 20px rgba(255,215,0,0.5); border: 2px solid #FFD700;">
                    </div>
'''
html = html.replace(old_logo, '')
# In case of minor spacing differences, let's also do a regex remove
html = re.sub(r'<div style="text-align: center; margin-bottom: 2rem;">\s*<img src="/static/premium_50_logo_gold\.jpg"[^>]+>\s*</div>', '', html)

# Add small badge logo to the top left of the Hero Banner
new_logo_badge = '''
<img src="/static/premium_50_logo_gold.jpg" alt="50 Premium Tools" style="position: absolute; top: 1rem; left: 1rem; width: 60px; height: 60px; border-radius: 50%; box-shadow: 0 0 15px rgba(255,215,0,0.6); border: 2px solid #FFD700; z-index: 10;">
'''
# We find the hero banner div opening tag and insert the badge right after it.
hero_div_target = '<div class="glass-card" style="padding: 2.5rem; margin-bottom: 2.5rem; text-align: center; border-color: var(--neon-cyan); background: radial-gradient(circle at top right, rgba(123, 44, 191, 0.15) 0%, rgba(18, 5, 30, 0.4) 100%);">'
# Wait, let's make sure the hero div has position: relative so absolute positioning works within it.
hero_div_fixed = '<div class="glass-card" style="position: relative; padding: 2.5rem; margin-bottom: 2.5rem; text-align: center; border-color: var(--neon-cyan); background: radial-gradient(circle at top right, rgba(123, 44, 191, 0.15) 0%, rgba(18, 5, 30, 0.4) 100%);">'

html = html.replace(hero_div_target, hero_div_fixed + new_logo_badge)

with open('templates/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("CSS Fixed and Logo Badge Positioned.")
