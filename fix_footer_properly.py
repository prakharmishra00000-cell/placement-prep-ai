import sys
import re

with open('templates/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# The block to remove starts with:
# <div>
#     <h5 style="color: #fff; font-weight: 600; margin-bottom: 1rem; font-size: 0.95rem; margin-top: 0;">Products</h5>
# and ends right before:
# <div>
#     <h5 style="color: #fff; font-weight: 600; margin-bottom: 1rem; font-size: 0.95rem; margin-top: 0;">Contact & Support</h5>

start_marker = '<div>\n                        <h5 style="color: #fff; font-weight: 600; margin-bottom: 1rem; font-size: 0.95rem; margin-top: 0;">Products</h5>'
end_marker = '<div>\n                        <h5 style="color: #fff; font-weight: 600; margin-bottom: 1rem; font-size: 0.95rem; margin-top: 0;">Contact & Support</h5>'

if start_marker in html and end_marker in html:
    start_idx = html.find(start_marker)
    end_idx = html.find(end_marker)
    
    html = html[:start_idx] + html[end_idx:]
    with open('templates/index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Successfully removed the Products list from the footer while keeping the rest.")
else:
    print("Could not find the markers in the HTML.")
