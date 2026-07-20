import sys

with open('templates/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. 38 Premium Tools Badge
if '>38 Premium Tools Available<' not in html:
    badge_html = '''<div style="background: rgba(0, 255, 170, 0.1); color: var(--neon-cyan); padding: 0.5rem 1rem; border-radius: 20px; font-weight: 600; display: inline-block; margin-bottom: 1rem; border: 1px solid var(--neon-cyan); box-shadow: 0 0 10px rgba(0,255,170,0.2);"><i class="fa-solid fa-bolt"></i> 38 Premium Tools Available</div>\n                        '''
    html = html.replace('<h2 class="section-title">Your Career Arsenal</h2>', badge_html + '<h2 class="section-title">Your Career Arsenal</h2>')

# 2. Sidebar Links
sidebar_links = '''
                                <li><a href="#" onclick="document.querySelector('[data-tab=skill-mesh]').click();" style="color: var(--text-muted); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--neon-cyan)'" onmouseout="this.style.color='var(--text-muted)'">AI Skill-Mesh</a></li>
                                <li><a href="#" onclick="document.querySelector('[data-tab=rejection-rehab]').click();" style="color: var(--text-muted); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--neon-cyan)'" onmouseout="this.style.color='var(--text-muted)'">Rejection Rehab</a></li>
                                <li><a href="#" onclick="document.querySelector('[data-tab=timezone-calc]').click();" style="color: var(--text-muted); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--neon-cyan)'" onmouseout="this.style.color='var(--text-muted)'">Recruiter Time-Zone</a></li>
                                <li><a href="#" onclick="document.querySelector('[data-tab=referral-tracker]').click();" style="color: var(--text-muted); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--neon-cyan)'" onmouseout="this.style.color='var(--text-muted)'">Referral Tracker</a></li>
                                <li><a href="#" onclick="document.querySelector('[data-tab=gd-generator]').click();" style="color: var(--text-muted); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--neon-cyan)'" onmouseout="this.style.color='var(--text-muted)'">GD Key Phrases</a></li>
                                <li><a href="#" onclick="document.querySelector('[data-tab=thank-you]').click();" style="color: var(--text-muted); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--neon-cyan)'" onmouseout="this.style.color='var(--text-muted)'">Thank-You Sculptor</a></li>
                                <li><a href="#" onclick="document.querySelector('[data-tab=bullet-polish]').click();" style="color: var(--text-muted); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--neon-cyan)'" onmouseout="this.style.color='var(--text-muted)'">Resume Bullet Polish</a></li>
'''
if 'data-tab=skill-mesh' not in html:
    html = html.replace('<li><a href="#" onclick="document.querySelector(\'[data-tab=networking-gps]\').click();"', sidebar_links + '                                <li><a href="#" onclick="document.querySelector(\'[data-tab=networking-gps]\').click();"')

# 3. Nav Items
nav_items = '''
                        <a href="#" class="nav-item" data-tab="skill-mesh"><i class="fa-solid fa-network-wired text-neon-cyan"></i> AI Skill-Mesh</a>
                        <a href="#" class="nav-item" data-tab="rejection-rehab"><i class="fa-solid fa-heart-pulse text-neon-pink"></i> Rejection Rehab</a>
                        <a href="#" class="nav-item" data-tab="timezone-calc"><i class="fa-solid fa-earth-americas text-neon-yellow"></i> Time-Zone Calc</a>
                        <a href="#" class="nav-item" data-tab="referral-tracker"><i class="fa-solid fa-users-rays text-neon-purple"></i> Referral Tracker</a>
                        <a href="#" class="nav-item" data-tab="gd-generator"><i class="fa-solid fa-comments text-neon-cyan"></i> GD Phrases</a>
                        <a href="#" class="nav-item" data-tab="thank-you"><i class="fa-solid fa-envelope-open-text text-neon-pink"></i> Thank-You Note</a>
                        <a href="#" class="nav-item" data-tab="bullet-polish"><i class="fa-solid fa-wand-magic-sparkles text-neon-yellow"></i> Bullet Polish</a>
'''
if 'data-tab="skill-mesh"' not in html:
    html = html.replace('<a href="#" class="nav-item" data-tab="networking-gps">', nav_items + '                        <a href="#" class="nav-item" data-tab="networking-gps">')

# 4. Dashboard Cards
dashboard_cards = '''
                    <div class="glass-card saas-card" onclick="document.querySelector('[data-tab=skill-mesh]').click();">
                        <i class="fa-solid fa-network-wired card-icon" style="color: var(--neon-cyan);"></i>
                        <h3>AI Skill-Mesh</h3>
                        <p>Cross-reference your stack with a job description for a 48-hour upskilling plan.</p>
                    </div>
                    <div class="glass-card saas-card" onclick="document.querySelector('[data-tab=rejection-rehab]').click();">
                        <i class="fa-solid fa-heart-pulse card-icon" style="color: var(--neon-pink);"></i>
                        <h3>Rejection Rehab</h3>
                        <p>Analyze rejection emails to remove emotional sting and get an immediate pivot strategy.</p>
                    </div>
                    <div class="glass-card saas-card" onclick="document.querySelector('[data-tab=timezone-calc]').click();">
                        <i class="fa-solid fa-earth-americas card-icon" style="color: var(--neon-yellow);"></i>
                        <h3>Time-Zone Calc</h3>
                        <p>Find the perfect sending window for international recruiters.</p>
                    </div>
                    <div class="glass-card saas-card" onclick="document.querySelector('[data-tab=referral-tracker]').click();">
                        <i class="fa-solid fa-users-rays card-icon" style="color: var(--neon-purple);"></i>
                        <h3>Referral Tracker</h3>
                        <p>Minimalist CRM to log network nudges and follow-ups without bloated spreadsheets.</p>
                    </div>
                    <div class="glass-card saas-card" onclick="document.querySelector('[data-tab=gd-generator]').click();">
                        <i class="fa-solid fa-comments card-icon" style="color: var(--neon-cyan);"></i>
                        <h3>GD Phrases</h3>
                        <p>Instantly build structured talking points for Group Discussion rounds.</p>
                    </div>
                    <div class="glass-card saas-card" onclick="document.querySelector('[data-tab=thank-you]').click();">
                        <i class="fa-solid fa-envelope-open-text card-icon" style="color: var(--neon-pink);"></i>
                        <h3>Thank-You Sculptor</h3>
                        <p>Generate non-robotic post-interview thank you notes.</p>
                    </div>
                    <div class="glass-card saas-card" onclick="document.querySelector('[data-tab=bullet-polish]').click();">
                        <i class="fa-solid fa-wand-magic-sparkles card-icon" style="color: var(--neon-yellow);"></i>
                        <h3>Bullet Polish</h3>
                        <p>Upgrade weak resume bullets with high-impact action verbs instantly.</p>
                    </div>
'''
if '<h3>AI Skill-Mesh</h3>' not in html:
    html = html.replace('<!-- Card 31 (New Networking GPS) -->', dashboard_cards + '\n                    <!-- Card 31 (New Networking GPS) -->')


# 5. Tab Contents
tab_contents = '''
            <!-- 7 New Tabs -->
            <!-- AI Skill-Mesh -->
            <div class="tab-content" id="tab-skill-mesh">
                <div class="glass-card panel-card">
                    <h3 class="panel-title"><i class="fa-solid fa-network-wired text-neon-cyan"></i> AI Skill-Mesh Optimizer</h3>
                    <p style="color: var(--text-muted); margin-bottom: 2rem;">Bridge the gap between your current tech stack and cross-functional role requirements.</p>
                    <div class="form-group">
                        <label>Target Job Description</label>
                        <textarea class="saas-input" id="mesh-jd" rows="4" placeholder="Paste the job description..."></textarea>
                    </div>
                    <div class="form-group">
                        <label>Your Current Project Stack</label>
                        <textarea class="saas-input" id="mesh-stack" rows="3" placeholder="e.g. React, Node, SQL..."></textarea>
                    </div>
                    <button class="btn btn-primary" id="mesh-btn" style="width: 100%; margin-bottom: 2rem;"><i class="fa-solid fa-bolt"></i> Generate 48-Hour Sprint Plan</button>
                    <div id="mesh-loading" style="display: none; text-align: center;"><div class="loading-spinner"></div></div>
                    <div id="mesh-result" style="display: none; background: rgba(0, 255, 170, 0.05); padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--neon-cyan);">
                        <div id="mesh-content" class="markdown-body"></div>
                    </div>
                </div>
            </div>

            <!-- Rejection Rehab -->
            <div class="tab-content" id="tab-rejection-rehab">
                <div class="glass-card panel-card">
                    <h3 class="panel-title"><i class="fa-solid fa-heart-pulse text-neon-pink"></i> Rejection Rehab</h3>
                    <p style="color: var(--text-muted); margin-bottom: 2rem;">Diagnose rejection emails and get a constructive pivot strategy.</p>
                    <div class="form-group">
                        <label>Paste Automated Rejection Email</label>
                        <textarea class="saas-input" id="rehab-email" rows="5" placeholder="Dear applicant, unfortunately..."></textarea>
                    </div>
                    <button class="btn btn-primary" id="rehab-btn" style="width: 100%; margin-bottom: 2rem;"><i class="fa-solid fa-stethoscope"></i> Diagnose & Pivot</button>
                    <div id="rehab-loading" style="display: none; text-align: center;"><div class="loading-spinner"></div></div>
                    <div id="rehab-result" style="display: none; background: rgba(255, 0, 128, 0.05); padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--neon-pink);">
                        <div id="rehab-content" class="markdown-body"></div>
                    </div>
                </div>
            </div>

            <!-- Recruiter Time-Zone Calc -->
            <div class="tab-content" id="tab-timezone-calc">
                <div class="glass-card panel-card">
                    <h3 class="panel-title"><i class="fa-solid fa-earth-americas text-neon-yellow"></i> Recruiter Time-Zone Calc</h3>
                    <p style="color: var(--text-muted); margin-bottom: 2rem;">Land your cold email at the top of their inbox by sending during optimal local working hours.</p>
                    <div class="form-group">
                        <label>Recruiter's Office Location</label>
                        <select class="saas-input" id="tz-city">
                            <option value="America/Los_Angeles">San Francisco / Silicon Valley (PST/PDT)</option>
                            <option value="America/New_York">New York (EST/EDT)</option>
                            <option value="Europe/London">London (GMT/BST)</option>
                            <option value="Europe/Berlin">Berlin / Paris (CET/CEST)</option>
                            <option value="Asia/Tokyo">Tokyo (JST)</option>
                            <option value="Asia/Kolkata" selected>Bengaluru / India (IST)</option>
                            <option value="Australia/Sydney">Sydney (AEST/AEDT)</option>
                        </select>
                    </div>
                    <div style="background: var(--dark-bg); padding: 2rem; border-radius: 12px; text-align: center; border: 1px solid var(--border-color);">
                        <h2 id="tz-time" style="font-size: 3rem; margin-bottom: 0.5rem; color: #fff;">--:--</h2>
                        <h4 id="tz-status" style="margin-bottom: 1rem;">Select a city</h4>
                        <div id="tz-badge" style="display: inline-block; padding: 0.5rem 1.5rem; border-radius: 20px; font-weight: bold;">-</div>
                    </div>
                </div>
            </div>

            <!-- Peer Referral Tracker -->
            <div class="tab-content" id="tab-referral-tracker">
                <div class="glass-card panel-card">
                    <h3 class="panel-title"><i class="fa-solid fa-users-rays text-neon-purple"></i> Peer Referral Tracker</h3>
                    <p style="color: var(--text-muted); margin-bottom: 2rem;">Log network nudges and follow-ups without bloated spreadsheets.</p>
                    <div class="interview-setup" style="margin-bottom: 2rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 150px; gap: 1rem; align-items: end;">
                            <input type="text" class="saas-input" id="ref-name" placeholder="Name">
                            <input type="text" class="saas-input" id="ref-company" placeholder="Company">
                            <input type="date" class="saas-input" id="ref-date">
                            <button class="btn btn-primary" id="ref-add-btn" style="height: 42px;"><i class="fa-solid fa-plus"></i> Add Log</button>
                        </div>
                    </div>
                    <table style="width: 100%; text-align: left; border-collapse: collapse;" id="ref-table">
                        <thead>
                            <tr style="border-bottom: 1px solid var(--border-color);">
                                <th style="padding: 0.5rem; color: var(--neon-cyan);">Name</th>
                                <th style="padding: 0.5rem; color: var(--neon-cyan);">Company</th>
                                <th style="padding: 0.5rem; color: var(--neon-cyan);">Date Contacted</th>
                                <th style="padding: 0.5rem; color: var(--neon-cyan);">Status</th>
                                <th style="padding: 0.5rem; color: var(--neon-cyan);">Action</th>
                            </tr>
                        </thead>
                        <tbody id="ref-table-body"></tbody>
                    </table>
                    <p id="ref-empty" style="text-align: center; color: var(--text-muted); margin-top: 1rem;">No referrals logged yet.</p>
                </div>
            </div>

            <!-- GD Key Phrase Generator -->
            <div class="tab-content" id="tab-gd-generator">
                <div class="glass-card panel-card">
                    <h3 class="panel-title"><i class="fa-solid fa-comments text-neon-cyan"></i> GD Key Phrase Generator</h3>
                    <p style="color: var(--text-muted); margin-bottom: 2rem;">Instantly build structured talking points for Group Discussion rounds.</p>
                    <div class="form-group">
                        <label>Discussion Topic</label>
                        <input type="text" class="saas-input" id="gd-topic" placeholder="e.g. AI in the Workplace">
                    </div>
                    <button class="btn btn-primary" id="gd-btn" style="width: 100%; margin-bottom: 2rem;"><i class="fa-solid fa-gavel"></i> Build Arguments</button>
                    <div id="gd-loading" style="display: none; text-align: center;"><div class="loading-spinner"></div></div>
                    <div id="gd-result" style="display: none; background: rgba(0, 255, 170, 0.05); padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--neon-cyan);">
                        <div id="gd-content" class="markdown-body"></div>
                    </div>
                </div>
            </div>

            <!-- Thank-You Note Sculptor -->
            <div class="tab-content" id="tab-thank-you">
                <div class="glass-card panel-card">
                    <h3 class="panel-title"><i class="fa-solid fa-envelope-open-text text-neon-pink"></i> Thank-You Note Sculptor</h3>
                    <p style="color: var(--text-muted); margin-bottom: 2rem;">Generate a non-robotic post-interview thank you email.</p>
                    <div class="form-group">
                        <label>Interviewer Name</label>
                        <input type="text" class="saas-input" id="ty-name" placeholder="e.g. Sarah">
                    </div>
                    <div class="form-group">
                        <label>Key Topic Discussed</label>
                        <input type="text" class="saas-input" id="ty-topic" placeholder="e.g. Microservices architecture">
                    </div>
                    <div class="form-group">
                        <label>One Specific Takeaway</label>
                        <input type="text" class="saas-input" id="ty-takeaway" placeholder="e.g. Loved your approach to CI/CD pipelines">
                    </div>
                    <button class="btn btn-primary" id="ty-btn" style="width: 100%; margin-bottom: 2rem;"><i class="fa-solid fa-feather-pointed"></i> Sculpt Note</button>
                    <div id="ty-loading" style="display: none; text-align: center;"><div class="loading-spinner"></div></div>
                    <div id="ty-result" style="display: none; background: rgba(255, 0, 128, 0.05); padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--neon-pink);">
                        <div id="ty-content" class="markdown-body"></div>
                    </div>
                </div>
            </div>

            <!-- Resume Bullet Polish -->
            <div class="tab-content" id="tab-bullet-polish">
                <div class="glass-card panel-card">
                    <h3 class="panel-title"><i class="fa-solid fa-wand-magic-sparkles text-neon-yellow"></i> Resume Bullet Polishing Grid</h3>
                    <p style="color: var(--text-muted); margin-bottom: 2rem;">Upgrade weak resume bullets with high-impact action verbs and structure.</p>
                    <div class="form-group">
                        <label>Paste Weak Bullet Point</label>
                        <textarea class="saas-input" id="bullet-input" rows="3" placeholder="Responsible for making the backend faster..."></textarea>
                    </div>
                    <button class="btn btn-primary" id="bullet-btn" style="width: 100%; margin-bottom: 2rem;"><i class="fa-solid fa-bolt"></i> Power Up</button>
                    <div id="bullet-loading" style="display: none; text-align: center;"><div class="loading-spinner"></div></div>
                    <div id="bullet-result" style="display: none; background: rgba(255, 200, 0, 0.05); padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--neon-yellow);">
                        <div id="bullet-content" class="markdown-body"></div>
                    </div>
                </div>
            </div>
'''
if 'id="tab-skill-mesh"' not in html:
    html = html.replace('<!-- Tab Content: Networking GPS -->', tab_contents + '\n\n            <!-- Tab Content: Networking GPS -->')

with open('templates/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Injected 7 UI tabs into index.html")
