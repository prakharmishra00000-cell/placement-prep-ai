import re

with open('templates/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract sidebar links
sidebar_start = html.find('<aside class="app-sidebar"')
sidebar_end = html.find('</aside>')
sidebar_html = html[sidebar_start:sidebar_end]
sidebar_tabs = set(re.findall(r'data-tab="([^"]+)"', sidebar_html))

# Extract dashboard cards
main_start = html.find('<div class="tab-content active" id="tab-home">')
main_end = html.find('<!-- Tab Content: Guide & PYQs -->')
main_html = html[main_start:main_end]
card_tabs = set(re.findall(r'data-tab=([^\]]+)\]', main_html))

missing_in_sidebar = card_tabs - sidebar_tabs
missing_in_cards = sidebar_tabs - card_tabs

print("Features missing in sidebar:", missing_in_sidebar)
print("Features missing in cards:", missing_in_cards)
