import re

with open('templates/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# We want to remove the block that starts with <div> and <h5>Products</h5>
# up to the next <div> that contains <h5>Contact & Support</h5>
pattern = r'(<div>\s*<h5[^>]*>Products</h5>.*?)<div>\s*<h5[^>]*>Contact & Support</h5>'
# use re.DOTALL to match across newlines
match = re.search(pattern, html, re.DOTALL)
if match:
    products_block = match.group(1)
    html = html.replace(products_block, '')
    with open('templates/index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Successfully removed the Products list from the footer using regex.")
else:
    print("Could not find the Products block in the HTML.")
