import sys

with open('app.py', 'r', encoding='utf-8') as f:
    content = f.read()

if '@app.route("/googlef348f482c7865d61.html")' not in content:
    routes = """
@app.route('/googlef348f482c7865d61.html', methods=['GET'])
def google_verification():
    return app.response_class('google-site-verification: googlef348f482c7865d61.html', mimetype='text/html')
"""
    content = content.replace('if __name__ == "__main__":', routes + '\n\nif __name__ == "__main__":')
    with open('app.py', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Added Google verification route to app.py")
else:
    print("Google verification route already exists in app.py")
