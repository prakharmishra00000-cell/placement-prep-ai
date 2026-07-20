import sys

with open('app.py', 'r', encoding='utf-8') as f:
    content = f.read()

if '@app.route("/sitemap.xml")' not in content:
    routes = """
@app.route('/sitemap.xml', methods=['GET'])
def sitemap():
    import datetime
    now = datetime.datetime.now().strftime('%Y-%m-%d')
    xml = f'''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://placement-prep-ai-nqhm.onrender.com/</loc>
    <lastmod>{now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>'''
    return app.response_class(xml, mimetype='application/xml')

@app.route('/robots.txt', methods=['GET'])
def robots():
    txt = '''User-agent: *
Allow: /
Sitemap: https://placement-prep-ai-nqhm.onrender.com/sitemap.xml'''
    return app.response_class(txt, mimetype='text/plain')
"""
    content = content.replace('if __name__ == "__main__":', routes + '\n\nif __name__ == "__main__":')
    with open('app.py', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Added SEO routes to app.py")
else:
    print("SEO routes already exist in app.py")
