import re

with open('templates/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

tabs = re.findall(r'id="(tab-[^"]+)"', html)
# Filter only those that are actual tab containers (they have class tab-content)
actual_tabs = [t for t in tabs if f'id="{t}"' in html and 'tab-content' in html[html.find(f'id="{t}"') - 30 : html.find(f'id="{t}"') + 30]]
print(f"Total unique tabs: {len(set(actual_tabs))}")

# Also remove the footer/products section
footer_start = html.find('<footer')
if footer_start != -1:
    footer_end = html.find('</footer>') + 9
    html = html[:footer_start] + html[footer_end:]
    print("Removed footer.")

with open('templates/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Footer removed.")
