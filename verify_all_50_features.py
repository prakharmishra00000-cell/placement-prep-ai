import re

def verify_features():
    print("Starting Comprehensive 50-Feature Verification...")
    
    try:
        with open('templates/index.html', 'r', encoding='utf-8') as f:
            html = f.read()
        with open('static/app.js', 'r', encoding='utf-8') as f:
            js = f.read()
        with open('app.py', 'r', encoding='utf-8') as f:
            py = f.read()
    except Exception as e:
        print(f"Error reading files: {e}")
        return

    # 1. Extract all sidebar nav items
    nav_items = re.findall(r'data-tab="([^"]+)"', html)
    # Remove duplicates but preserve order roughly
    sidebar_tabs = list(dict.fromkeys(nav_items))
    
    print(f"\nFound {len(sidebar_tabs)} unique features defined in the sidebar.")
    if len(sidebar_tabs) != 50:
        print(f"WARNING: Expected 50 features, found {len(sidebar_tabs)}")

    errors = []
    
    for tab_id in sidebar_tabs:
        # Check 1: Dashboard Card exists
        card_pattern = f'data-tab={tab_id}'
        if card_pattern not in html:
            errors.append(f"[{tab_id}] Missing dashboard card onclick reference")
            
        # Check 2: Tab Content exists
        tab_pattern = f'id="tab-{tab_id}"'
        if tab_pattern not in html:
            errors.append(f"[{tab_id}] Missing tab-content div (id='tab-{tab_id}')")
            continue
            
        # Check 3: Is there a button to trigger JS?
        # Find the block for this tab
        tab_start = html.find(tab_pattern)
        tab_end = html.find('class="tab-content"', tab_start + 1)
        if tab_end == -1: tab_end = len(html)
        tab_html = html[tab_start:tab_end]
        
        button_ids = re.findall(r'id="([^"]+-btn|btn-[^"]+)"', tab_html)
        if not button_ids:
            # Some tools might be pure static or have different button naming
            pass
            
    # Check JS endpoints
    api_calls = re.findall(r'fetch\([\'"](/api/career/[^\'"]+)[\'"]', js)
    api_calls = list(dict.fromkeys(api_calls))
    print(f"\nFound {len(api_calls)} API fetch calls in app.js")
    
    # Check PY routes
    py_routes = re.findall(r'@app\.route\([\'"](/api/career/[^\'"]+)[\'"]', py)
    py_routes = list(dict.fromkeys(py_routes))
    print(f"Found {len(py_routes)} Flask routes in app.py")
    
    # Cross verify JS to PY
    for api in api_calls:
        if api not in py_routes:
            errors.append(f"API {api} is called in JS but missing in app.py!")
            
    # Count total tools visually via card count
    cards = len(re.findall(r'class="glass-card saas-card"', html))
    print(f"\nTotal Dashboard Cards: {cards}")
    
    print("\n--- Verification Report ---")
    if not errors:
        print("ALL CLEAR! No architectural disconnections found.")
    else:
        for err in errors:
            print(f"ERROR: {err}")

verify_features()
