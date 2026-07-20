import sys

with open('templates/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Add sidebar link
if 'data-tab=\"networking-gps\"' not in html:
    sidebar_insert = '''                                <li><a href=\"#\" onclick=\"document.querySelector('[data-tab=networking-gps]').click();\" style=\"color: var(--text-muted); text-decoration: none; transition: color 0.2s;\" onmouseover=\"this.style.color='var(--neon-cyan)'\" onmouseout=\"this.style.color='var(--text-muted)'\">Networking GPS</a></li>'''
    
    html = html.replace('<li><a href=\"#\" onclick=\"document.querySelector(\\'[data-tab=referral-gen]\\').click();\" style=\"color: var(--text-muted); text-decoration: none; transition: color 0.2s;\" onmouseover=\"this.style.color=\\'var(--neon-cyan)\\'\" onmouseout=\"this.style.color=\\'var(--text-muted)\\'\">Referral Gen</a></li>', '<li><a href=\"#\" onclick=\"document.querySelector(\\'[data-tab=referral-gen]\\').click();\" style=\"color: var(--text-muted); text-decoration: none; transition: color 0.2s;\" onmouseover=\"this.style.color=\\'var(--neon-cyan)\\'\" onmouseout=\"this.style.color=\\'var(--text-muted)\\'\">Referral Gen</a></li>\n' + sidebar_insert)

# 2. Add sub-nav link
if '<a href=\"#\" class=\"nav-item\" data-tab=\"networking-gps\">' not in html:
    subnav_insert = '''                        <a href=\"#\" class=\"nav-item\" data-tab=\"networking-gps\"><i class=\"fa-solid fa-map-location-dot text-neon-yellow\"></i> Networking GPS</a>'''
    html = html.replace('<a href=\"#\" class=\"nav-item\" data-tab=\"ghost-detector\"><i class=\"fa-solid fa-ghost text-neon-purple\"></i> Ghost Detector</a>', '<a href=\"#\" class=\"nav-item\" data-tab=\"ghost-detector\"><i class=\"fa-solid fa-ghost text-neon-purple\"></i> Ghost Detector</a>\n' + subnav_insert)

# 3. Add Dashboard Card
if '<h3>Networking GPS</h3>' not in html:
    card_insert = '''                    <!-- Card 31 -->
                    <div class=\"glass-card saas-card\" onclick=\"document.querySelector('[data-tab=networking-gps]').click();\">
                        <i class=\"fa-solid fa-map-location-dot card-icon\" style=\"color: var(--neon-yellow);\"></i>
                        <h3 style=\"margin:0.5rem 0\">Networking GPS</h3>
                        <p style=\"font-size:0.9rem; color:var(--text-muted);\">Map relationships, categorize connections by tiers, and get AI strategy to reactivate stale referrals.</p>
                    </div>'''
    html = html.replace('<!-- Tab Content: Ghost Detector -->', card_insert + '\n\n            <!-- Tab Content: Ghost Detector -->')

# 4. Add Tab Content
if 'id=\"tab-networking-gps\"' not in html:
    tab_insert = '''
            <!-- Tab Content: Networking GPS -->
            <div class=\"tab-content\" id=\"tab-networking-gps\">
                <div class=\"glass-card panel-card\">
                    <h3 class=\"panel-title\"><i class=\"fa-solid fa-map-location-dot text-neon-yellow\"></i> Networking GPS (CRM)</h3>
                    <div style=\"max-width: 1000px; margin: 0 auto;\">
                        <p style=\"color: var(--text-muted); margin-bottom: 2rem;\">Map your professional relationships, assign tiers, and let the AI generate a personalized, real-time networking strategy to turn dormant connections into active referrals.</p>
                        
                        <div class=\"interview-setup\" style=\"margin-bottom: 2rem;\">
                            <div class=\"form-group\">
                                <label><i class=\"fa-solid fa-user-plus\"></i> Add a Connection</label>
                                <div style=\"display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 1rem; align-items: end;\">
                                    <input type=\"text\" class=\"saas-input\" id=\"gps-name\" placeholder=\"Connection Name (e.g. John Doe)\">
                                    <input type=\"text\" class=\"saas-input\" id=\"gps-company\" placeholder=\"Company (e.g. Google)\">
                                    <input type=\"text\" class=\"saas-input\" id=\"gps-role\" placeholder=\"Role (e.g. Alumni / SWE)\">
                                    <select class=\"saas-input\" id=\"gps-tier\">
                                        <option value=\"Tier 1\">Tier 1 (Close / Active)</option>
                                        <option value=\"Tier 2\">Tier 2 (Met Once / Alumni)</option>
                                        <option value=\"Tier 3\">Tier 3 (Cold / Unresponsive)</option>
                                    </select>
                                </div>
                                <div style=\"display: grid; grid-template-columns: 1fr 200px; gap: 1rem; align-items: end; margin-top: 1rem;\">
                                    <div>
                                        <label>Last Contacted Date</label>
                                        <input type=\"date\" class=\"saas-input\" id=\"gps-date\">
                                    </div>
                                    <button class=\"btn btn-primary\" id=\"gps-add-btn\" style=\"width: 100%; height: 42px;\">
                                        <i class=\"fa-solid fa-plus\"></i> Add to CRM
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div style=\"background: var(--dark-bg); padding: 1.5rem; border-radius: 12px; border: 1px solid var(--border-color); margin-bottom: 2rem;\">
                            <h4 style=\"margin-bottom: 1rem;\"><i class=\"fa-solid fa-address-book\"></i> Your Connections</h4>
                            <div style=\"overflow-x: auto;\">
                                <table style=\"width: 100%; text-align: left; border-collapse: collapse;\" id=\"gps-table\">
                                    <thead>
                                        <tr style=\"border-bottom: 1px solid var(--border-color);\">
                                            <th style=\"padding: 0.5rem; color: var(--neon-cyan);\">Name</th>
                                            <th style=\"padding: 0.5rem; color: var(--neon-cyan);\">Company</th>
                                            <th style=\"padding: 0.5rem; color: var(--neon-cyan);\">Role</th>
                                            <th style=\"padding: 0.5rem; color: var(--neon-cyan);\">Tier</th>
                                            <th style=\"padding: 0.5rem; color: var(--neon-cyan);\">Last Contacted</th>
                                            <th style=\"padding: 0.5rem; color: var(--neon-cyan);\">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody id=\"gps-table-body\">
                                        <!-- Rows generated dynamically -->
                                    </tbody>
                                </table>
                            </div>
                            <p id=\"gps-empty-state\" style=\"text-align: center; color: var(--text-muted); margin-top: 1rem;\">No connections mapped yet.</p>
                        </div>

                        <button class=\"btn btn-secondary\" id=\"gps-analyze-btn\" style=\"width: 100%; margin-bottom: 2rem; font-size: 1.1rem; padding: 1rem;\">
                            <i class=\"fa-solid fa-brain\"></i> Analyze Network & Generate Strategy
                        </button>

                        <div id=\"gps-loading\" style=\"display: none; text-align: center; margin: 2rem 0;\">
                            <div class=\"loading-spinner\"></div>
                            <p style=\"color: var(--neon-cyan); margin-top: 1rem;\">Analyzing your relationship map...</p>
                        </div>

                        <div id=\"gps-result\" style=\"display: none; background: rgba(0, 255, 170, 0.05); border-left: 4px solid var(--neon-cyan); padding: 1.5rem; border-radius: 8px; margin-top: 1rem;\">
                            <div id=\"gps-strategy-content\" class=\"markdown-body\"></div>
                        </div>
                    </div>
                </div>
            </div>
'''
    html = html.replace('<!-- Tab Content: Ghost Detector -->', tab_insert + '\n\n            <!-- Tab Content: Ghost Detector -->')

with open('templates/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print(\"Injected Networking GPS into index.html\")
