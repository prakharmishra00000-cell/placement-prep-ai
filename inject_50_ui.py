import sys

with open('templates/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update Premium Tools Badge to 50
html = html.replace('44 Premium Tools Available', '50 Premium Tools Available')

# 2. Sidebar Links
sidebar_links = '''
                                <li><a href="#" onclick="document.querySelector('[data-tab=takehome-blueprint]').click();" style="color: var(--text-muted); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--neon-cyan)'" onmouseout="this.style.color='var(--text-muted)'">Take-Home Planner</a></li>
                                <li><a href="#" onclick="document.querySelector('[data-tab=aptitude-vault]').click();" style="color: var(--text-muted); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--neon-cyan)'" onmouseout="this.style.color='var(--text-muted)'">Aptitude Vault</a></li>
                                <li><a href="#" onclick="document.querySelector('[data-tab=company-intel]').click();" style="color: var(--text-muted); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--neon-cyan)'" onmouseout="this.style.color='var(--text-muted)'">Company Intel</a></li>
                                <li><a href="#" onclick="document.querySelector('[data-tab=soft-skill-star]').click();" style="color: var(--text-muted); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--neon-cyan)'" onmouseout="this.style.color='var(--text-muted)'">Soft Skill STAR</a></li>
                                <li><a href="#" onclick="document.querySelector('[data-tab=notice-period]').click();" style="color: var(--text-muted); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--neon-cyan)'" onmouseout="this.style.color='var(--text-muted)'">Notice Period Calc</a></li>
                                <li><a href="#" onclick="document.querySelector('[data-tab=gd-shield]').click();" style="color: var(--text-muted); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--neon-cyan)'" onmouseout="this.style.color='var(--text-muted)'">GD Counter-Shield</a></li>
'''
if 'data-tab=takehome-blueprint' not in html:
    html = html.replace('<li><a href="#" onclick="document.querySelector(\'[data-tab=imposter-reframe]\').click();"', sidebar_links + '                                <li><a href="#" onclick="document.querySelector(\'[data-tab=imposter-reframe]\').click();"')

# 3. Nav Items
nav_items = '''
                        <a href="#" class="nav-item" data-tab="takehome-blueprint"><i class="fa-solid fa-map-location-dot text-neon-cyan"></i> Take-Home Planner</a>
                        <a href="#" class="nav-item" data-tab="aptitude-vault"><i class="fa-solid fa-calculator text-neon-pink"></i> Aptitude Vault</a>
                        <a href="#" class="nav-item" data-tab="company-intel"><i class="fa-solid fa-building-user text-neon-yellow"></i> Company Intel</a>
                        <a href="#" class="nav-item" data-tab="soft-skill-star"><i class="fa-solid fa-people-arrows text-neon-purple"></i> Soft Skill STAR</a>
                        <a href="#" class="nav-item" data-tab="notice-period"><i class="fa-solid fa-calendar-days text-neon-cyan"></i> Notice Period Calc</a>
                        <a href="#" class="nav-item" data-tab="gd-shield"><i class="fa-solid fa-shield-halved text-neon-pink"></i> GD Counter-Shield</a>
'''
if 'data-tab="takehome-blueprint"' not in html:
    html = html.replace('<a href="#" class="nav-item" data-tab="imposter-reframe">', nav_items + '                        <a href="#" class="nav-item" data-tab="imposter-reframe">')

# 4. Dashboard Cards
dashboard_cards = '''
                    <div class="glass-card saas-card" onclick="document.querySelector('[data-tab=takehome-blueprint]').click();">
                        <i class="fa-solid fa-map-location-dot card-icon" style="color: var(--neon-cyan);"></i>
                        <h3>Take-Home Planner</h3>
                        <p>Break down multi-day coding assignments into 24-hour milestones.</p>
                    </div>
                    <div class="glass-card saas-card" onclick="document.querySelector('[data-tab=aptitude-vault]').click();">
                        <i class="fa-solid fa-calculator card-icon" style="color: var(--neon-pink);"></i>
                        <h3>Aptitude Vault</h3>
                        <p>High-frequency math tricks and memory mnemonics for rapid revision.</p>
                    </div>
                    <div class="glass-card saas-card" onclick="document.querySelector('[data-tab=company-intel]').click();">
                        <i class="fa-solid fa-building-user card-icon" style="color: var(--neon-yellow);"></i>
                        <h3>Company Intel</h3>
                        <p>Crowdsourced interview loops, culture highlights, and engineering quirks.</p>
                    </div>
                    <div class="glass-card saas-card" onclick="document.querySelector('[data-tab=soft-skill-star]').click();">
                        <i class="fa-solid fa-people-arrows card-icon" style="color: var(--neon-purple);"></i>
                        <h3>Soft Skill STAR</h3>
                        <p>Convert messy anecdotes into polished STAR behavioral narratives.</p>
                    </div>
                    <div class="glass-card saas-card" onclick="document.querySelector('[data-tab=notice-period]').click();">
                        <i class="fa-solid fa-calendar-days card-icon" style="color: var(--neon-cyan);"></i>
                        <h3>Notice Period Calc</h3>
                        <p>Calculate transition timelines, resignation dates, and handovers instantly.</p>
                    </div>
                    <div class="glass-card saas-card" onclick="document.querySelector('[data-tab=gd-shield]').click();">
                        <i class="fa-solid fa-shield-halved card-icon" style="color: var(--neon-pink);"></i>
                        <h3>GD Counter-Shield</h3>
                        <p>Predict opposing arguments and generate data-driven defensive pivots.</p>
                    </div>
'''
if '<h3>Take-Home Planner</h3>' not in html:
    html = html.replace('<!-- Card 31 (New Networking GPS) -->', dashboard_cards + '\n                    <!-- Card 31 (New Networking GPS) -->')


# 5. Tab Contents
tab_contents = '''
            <!-- The Final 6 Tabs (45-50) -->
            <!-- Take-Home Planner -->
            <div class="tab-content" id="tab-takehome-blueprint">
                <div class="glass-card panel-card">
                    <h3 class="panel-title"><i class="fa-solid fa-map-location-dot text-neon-cyan"></i> Take-Home Project Blueprint</h3>
                    <p style="color: var(--text-muted); margin-bottom: 2rem;">Don't get overwhelmed by massive coding assignments. Break them down into structured 24-hour milestones.</p>
                    <div class="form-group">
                        <label>Paste Take-Home Assignment Prompt</label>
                        <textarea class="saas-input" id="takehome-input" rows="5" placeholder="Build a highly scalable backend API that handles user authentication and..."></textarea>
                    </div>
                    <button class="btn btn-primary" id="takehome-btn" style="width: 100%; margin-bottom: 2rem;"><i class="fa-solid fa-gears"></i> Generate Architecture Plan</button>
                    <div id="takehome-loading" style="display: none; text-align: center;"><div class="loading-spinner"></div></div>
                    <div id="takehome-result" style="display: none; background: rgba(0, 255, 170, 0.05); padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--neon-cyan);">
                        <div id="takehome-content" class="markdown-body"></div>
                    </div>
                </div>
            </div>

            <!-- Aptitude Vault -->
            <div class="tab-content" id="tab-aptitude-vault">
                <div class="glass-card panel-card">
                    <h3 class="panel-title"><i class="fa-solid fa-calculator text-neon-pink"></i> Aptitude Shortcut Vault</h3>
                    <p style="color: var(--text-muted); margin-bottom: 2rem;">High-frequency mathematical tricks and memory mnemonics for rapid revision before an online test.</p>
                    <div class="form-group">
                        <label>Search Topic (e.g. Time & Work, Percentages, Probabilities)</label>
                        <input type="text" class="saas-input" id="aptitude-input" placeholder="e.g. Time Speed and Distance">
                    </div>
                    <button class="btn btn-primary" id="aptitude-btn" style="width: 100%; margin-bottom: 2rem;"><i class="fa-solid fa-bolt"></i> Get Shortcut Formula</button>
                    <div id="aptitude-loading" style="display: none; text-align: center;"><div class="loading-spinner"></div></div>
                    <div id="aptitude-result" style="display: none; background: rgba(255, 0, 128, 0.05); padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--neon-pink);">
                        <div id="aptitude-content" class="markdown-body"></div>
                    </div>
                </div>
            </div>

            <!-- Company Intel -->
            <div class="tab-content" id="tab-company-intel">
                <div class="glass-card panel-card">
                    <h3 class="panel-title"><i class="fa-solid fa-building-user text-neon-yellow"></i> Alumni Company Intel Drop</h3>
                    <p style="color: var(--text-muted); margin-bottom: 2rem;">Extract crowdsourced engineering culture secrets, interview quirks, and team priorities.</p>
                    <div class="form-group">
                        <label>Company Name</label>
                        <input type="text" class="saas-input" id="company-input" placeholder="e.g. Razorpay, Postman, Snowflake">
                    </div>
                    <button class="btn btn-primary" id="company-btn" style="width: 100%; margin-bottom: 2rem;"><i class="fa-solid fa-user-secret"></i> Extract Intel</button>
                    <div id="company-loading" style="display: none; text-align: center;"><div class="loading-spinner"></div></div>
                    <div id="company-result" style="display: none; background: rgba(255, 200, 0, 0.05); padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--neon-yellow);">
                        <div id="company-content" class="markdown-body"></div>
                    </div>
                </div>
            </div>

            <!-- Soft Skill STAR -->
            <div class="tab-content" id="tab-soft-skill-star">
                <div class="glass-card panel-card">
                    <h3 class="panel-title"><i class="fa-solid fa-people-arrows text-neon-purple"></i> Soft Skill STAR Translator</h3>
                    <p style="color: var(--text-muted); margin-bottom: 2rem;">Articulate behavioral competencies effortlessly. Convert messy real-life stories into flawless HR frameworks.</p>
                    <div class="form-group">
                        <label>Rough Situation / Anecdote</label>
                        <textarea class="saas-input" id="star-input" rows="4" placeholder="My team was fighting over which database to use, so I held a meeting to compare trade-offs and we picked Postgres..."></textarea>
                    </div>
                    <button class="btn btn-primary" id="star-btn" style="width: 100%; margin-bottom: 2rem;"><i class="fa-solid fa-wand-magic-sparkles"></i> Map to STAR Framework</button>
                    <div id="star-loading" style="display: none; text-align: center;"><div class="loading-spinner"></div></div>
                    <div id="star-result" style="display: none; background: rgba(157, 0, 255, 0.05); padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--neon-purple);">
                        <div id="star-content" class="markdown-body"></div>
                    </div>
                </div>
            </div>

            <!-- Notice Period Calc -->
            <div class="tab-content" id="tab-notice-period">
                <div class="glass-card panel-card">
                    <h3 class="panel-title"><i class="fa-solid fa-calendar-days text-neon-cyan"></i> Notice Period Calculator</h3>
                    <p style="color: var(--text-muted); margin-bottom: 2rem;">Map out exact resignation timelines, handover dates, and your new joining window.</p>
                    <div class="form-group" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div>
                            <label>Date of Resignation</label>
                            <input type="date" class="saas-input" id="np-date">
                        </div>
                        <div>
                            <label>Notice Period (Days)</label>
                            <input type="number" class="saas-input" id="np-days" value="60">
                        </div>
                    </div>
                    <button class="btn btn-primary" id="np-btn" style="width: 100%; margin-bottom: 2rem;"><i class="fa-solid fa-timeline"></i> Calculate Timeline</button>
                    <div id="np-result" style="display: none; background: var(--dark-bg); padding: 2rem; border-radius: 12px; text-align: center; border: 1px solid var(--border-color);">
                        <h4 style="color: var(--text-muted); margin-bottom: 0.5rem;">Last Working Day</h4>
                        <h2 id="np-lwd" style="font-size: 2.5rem; color: var(--neon-cyan); margin-bottom: 1.5rem;">--</h2>
                        <div style="display: flex; justify-content: space-around; background: rgba(255,255,255,0.02); padding: 1rem; border-radius: 8px;">
                            <div>
                                <div style="font-size: 0.8rem; color: var(--text-muted);">Start Handover</div>
                                <div id="np-handover" style="color: var(--neon-yellow); font-weight: bold;">--</div>
                            </div>
                            <div>
                                <div style="font-size: 0.8rem; color: var(--text-muted);">Earliest Joining</div>
                                <div id="np-join" style="color: var(--neon-pink); font-weight: bold;">--</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- GD Counter Shield -->
            <div class="tab-content" id="tab-gd-shield">
                <div class="glass-card panel-card">
                    <h3 class="panel-title"><i class="fa-solid fa-shield-halved text-neon-pink"></i> GD Counter-Argument Shield</h3>
                    <p style="color: var(--text-muted); margin-bottom: 2rem;">Never freeze in a Group Discussion. Predict opposing arguments and generate data-driven defensive pivots.</p>
                    <div class="form-group">
                        <label>Your Primary Stance / Topic</label>
                        <textarea class="saas-input" id="gd-shield-input" rows="3" placeholder="AI will replace junior developers within the next 5 years..."></textarea>
                    </div>
                    <button class="btn btn-primary" id="gd-shield-btn" style="width: 100%; margin-bottom: 2rem;"><i class="fa-solid fa-shield-virus"></i> Generate Defenses</button>
                    <div id="gd-shield-loading" style="display: none; text-align: center;"><div class="loading-spinner"></div></div>
                    <div id="gd-shield-result" style="display: none; background: rgba(255, 0, 128, 0.05); padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--neon-pink);">
                        <div id="gd-shield-content" class="markdown-body"></div>
                    </div>
                </div>
            </div>
'''
if 'id="tab-takehome-blueprint"' not in html:
    html = html.replace('<!-- Tab Content: Networking GPS -->', tab_contents + '\n\n            <!-- Tab Content: Networking GPS -->')

with open('templates/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Injected final 6 UI tabs into index.html (Total: 50 Tools)")
