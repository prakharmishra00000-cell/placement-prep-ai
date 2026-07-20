import re
from collections import Counter

with open('templates/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

main_start = html.find('<div class="tab-content active" id="tab-home">')
main_end = html.find('<!-- Tab Content: Guide & PYQs -->')
main_html = html[main_start:main_end]

cards = re.findall(r'data-tab=([^\]]+)\]', main_html)
counts = Counter(cards)

for card, count in counts.items():
    if count > 1:
        print(f"DUPLICATE FOUND: {card} appears {count} times in the dashboard cards.")
