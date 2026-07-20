import re

with open('templates/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

tabs = re.findall(r'id="(tab-[^"]+)"', html)
actual_tabs = set([t.replace('tab-', '') for t in tabs if f'id="{t}"' in html and 'tab-content' in html[html.find(f'id="{t}"') - 30 : html.find(f'id="{t}"') + 30]])

main_start = html.find('<div class="tab-content active" id="tab-home">')
main_end = html.find('<!-- Tab Content: Guide & PYQs -->')
main_html = html[main_start:main_end]

cards = set(re.findall(r'data-tab=([^\]]+)\]', main_html))

missing_in_cards = actual_tabs - cards
print("Tabs missing in cards:", missing_in_cards)
