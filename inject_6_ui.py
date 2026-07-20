import sys

with open('templates/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update 38 Premium Tools Badge to 44
html = html.replace('38 Premium Tools Available', '44 Premium Tools Available')

# 2. Sidebar Links
sidebar_links = '''
                                <li><a href="#" onclick="document.querySelector('[data-tab=cert-verifier]').click();" style="color: var(--text-muted); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--neon-cyan)'" onmouseout="this.style.color='var(--text-muted)'">Certificate Parser</a></li>
                                <li><a href="#" onclick="document.querySelector('[data-tab=project-scaler]').click();" style="color: var(--text-muted); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--neon-cyan)'" onmouseout="this.style.color='var(--text-muted)'">Project Scaler</a></li>
                                <li><a href="#" onclick="document.querySelector('[data-tab=reverse-interview]').click();" style="color: var(--text-muted); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--neon-cyan)'" onmouseout="this.style.color='var(--text-muted)'">Reverse Interview</a></li>
                                <li><a href="#" onclick="document.querySelector('[data-tab=acronym-decoder]').click();" style="color: var(--text-muted); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--neon-cyan)'" onmouseout="this.style.color='var(--text-muted)'">Tech Jargon Decoder</a></li>
                                <li><a href="#" onclick="document.querySelector('[data-tab=hackathon-pitch]').click();" style="color: var(--text-muted); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--neon-cyan)'" onmouseout="this.style.color='var(--text-muted)'">Hackathon Pitch</a></li>
                                <li><a href="#" onclick="document.querySelector('[data-tab=imposter-reframe]').click();" style="color: var(--text-muted); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--neon-cyan)'" onmouseout="this.style.color='var(--text-muted)'">Imposter Reframer</a></li>
'''
if 'data-tab=cert-verifier' not in html:
    html = html.replace('<li><a href="#" onclick="document.querySelector(\'[data-tab=bullet-polish]\').click();"', sidebar_links + '                                <li><a href="#" onclick="document.querySelector(\'[data-tab=bullet-polish]\').click();"')

# 3. Nav Items
nav_items = '''
                        <a href="#" class="nav-item" data-tab="cert-verifier"><i class="fa-solid fa-certificate text-neon-cyan"></i> Cert Parser</a>
                        <a href="#" class="nav-item" data-tab="project-scaler"><i class="fa-solid fa-arrow-up-right-dots text-neon-pink"></i> Project Scaler</a>
                        <a href="#" class="nav-item" data-tab="reverse-interview"><i class="fa-solid fa-person-circle-question text-neon-yellow"></i> Reverse Interview</a>
                        <a href="#" class="nav-item" data-tab="acronym-decoder"><i class="fa-solid fa-spell-check text-neon-purple"></i> Jargon Decoder</a>
                        <a href="#" class="nav-item" data-tab="hackathon-pitch"><i class="fa-solid fa-microphone text-neon-cyan"></i> Hackathon Pitch</a>
                        <a href="#" class="nav-item" data-tab="imposter-reframe"><i class="fa-solid fa-brain text-neon-pink"></i> Imposter Reframer</a>
'''
if 'data-tab="cert-verifier"' not in html:
    html = html.replace('<a href="#" class="nav-item" data-tab="bullet-polish">', nav_items + '                        <a href="#" class="nav-item" data-tab="bullet-polish">')

# 4. Dashboard Cards
dashboard_cards = '''
                    <div class="glass-card saas-card" onclick="document.querySelector('[data-tab=cert-verifier]').click();">
                        <i class="fa-solid fa-certificate card-icon" style="color: var(--neon-cyan);"></i>
                        <h3>Cert Parser</h3>
                        <p>Extract core skills from course syllabi for high-impact CV bullets.</p>
                    </div>
                    <div class="glass-card saas-card" onclick="document.querySelector('[data-tab=project-scaler]').click();">
                        <i class="fa-solid fa-arrow-up-right-dots card-icon" style="color: var(--neon-pink);"></i>
                        <h3>Project Scaler</h3>
                        <p>Enhance basic college projects with enterprise architecture terminology.</p>
                    </div>
                    <div class="glass-card saas-card" onclick="document.querySelector('[data-tab=reverse-interview]').click();">
                        <i class="fa-solid fa-person-circle-question card-icon" style="color: var(--neon-yellow);"></i>
                        <h3>Reverse Interview</h3>
                        <p>Generate sharp, tailored closing questions to ask your interviewer.</p>
                    </div>
                    <div class="glass-card saas-card" onclick="document.querySelector('[data-tab=acronym-decoder]').click();">
                        <i class="fa-solid fa-spell-check card-icon" style="color: var(--neon-purple);"></i>
                        <h3>Jargon Decoder</h3>
                        <p>Instantly simplify System Design acronyms and architectural jargon.</p>
                    </div>
                    <div class="glass-card saas-card" onclick="document.querySelector('[data-tab=hackathon-pitch]').click();">
                        <i class="fa-solid fa-microphone card-icon" style="color: var(--neon-cyan);"></i>
                        <h3>Hackathon Pitch</h3>
                        <p>Condense a 24-hr sprint into a punchy 30-sec recruiter narrative.</p>
                    </div>
                    <div class="glass-card saas-card" onclick="document.querySelector('[data-tab=imposter-reframe]').click();">
                        <i class="fa-solid fa-brain card-icon" style="color: var(--neon-pink);"></i>
                        <h3>Imposter Reframer</h3>
                        <p>Convert self-doubt into a logical, objective skill-acquisition roadmap.</p>
                    </div>
'''
if '<h3>Cert Parser</h3>' not in html:
    html = html.replace('<!-- Card 31 (New Networking GPS) -->', dashboard_cards + '\n                    <!-- Card 31 (New Networking GPS) -->')


# 5. Tab Contents
tab_contents = '''
            <!-- 6 New Tabs -->
            <!-- Certificate Verifier -->
            <div class="tab-content" id="tab-cert-verifier">
                <div class="glass-card panel-card">
                    <h3 class="panel-title"><i class="fa-solid fa-certificate text-neon-cyan"></i> Certificate Verifier & Summary</h3>
                    <p style="color: var(--text-muted); margin-bottom: 2rem;">Extract core skills from tedious course syllabi into crisp, high-impact resume bullets.</p>
                    <div class="form-group">
                        <label>Paste Certificate Description or Syllabus</label>
                        <textarea class="saas-input" id="cert-input" rows="5" placeholder="This course covered basic HTML, loops in Python, and simple APIs..."></textarea>
                    </div>
                    <button class="btn btn-primary" id="cert-btn" style="width: 100%; margin-bottom: 2rem;"><i class="fa-solid fa-bolt"></i> Summarize for CV</button>
                    <div id="cert-loading" style="display: none; text-align: center;"><div class="loading-spinner"></div></div>
                    <div id="cert-result" style="display: none; background: rgba(0, 255, 170, 0.05); padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--neon-cyan);">
                        <div id="cert-content" class="markdown-body"></div>
                    </div>
                </div>
            </div>

            <!-- Project Scope Scaler -->
            <div class="tab-content" id="tab-project-scaler">
                <div class="glass-card panel-card">
                    <h3 class="panel-title"><i class="fa-solid fa-arrow-up-right-dots text-neon-pink"></i> Project Scope Scaler</h3>
                    <p style="color: var(--text-muted); margin-bottom: 2rem;">Enhance basic college project descriptions with enterprise architecture terminology.</p>
                    <div class="form-group">
                        <label>Simple Project Description</label>
                        <textarea class="saas-input" id="scaler-input" rows="4" placeholder="I built a basic e-commerce website using React and Node.js..."></textarea>
                    </div>
                    <button class="btn btn-primary" id="scaler-btn" style="width: 100%; margin-bottom: 2rem;"><i class="fa-solid fa-arrow-up-right-dots"></i> Scale Up to Enterprise</button>
                    <div id="scaler-loading" style="display: none; text-align: center;"><div class="loading-spinner"></div></div>
                    <div id="scaler-result" style="display: none; background: rgba(255, 0, 128, 0.05); padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--neon-pink);">
                        <div id="scaler-content" class="markdown-body"></div>
                    </div>
                </div>
            </div>

            <!-- Reverse Interview Q's -->
            <div class="tab-content" id="tab-reverse-interview">
                <div class="glass-card panel-card">
                    <h3 class="panel-title"><i class="fa-solid fa-person-circle-question text-neon-yellow"></i> Reverse Interview Q's</h3>
                    <p style="color: var(--text-muted); margin-bottom: 2rem;">Never freeze when they ask "Do you have any questions for us?". Generate sharp closing questions.</p>
                    <div class="form-group">
                        <label>Interviewer Persona (Round Type)</label>
                        <select class="saas-input" id="ri-round">
                            <option value="Technical Round (Senior Engineer)">Technical Round (Senior Engineer / Peer)</option>
                            <option value="Hiring Manager Round (Engineering Manager)">Hiring Manager (EM / Director)</option>
                            <option value="HR / Cultural Fit Round">HR / Talent Acquisition</option>
                            <option value="Executive Round (VP / CTO)">Executive Round (VP / CTO)</option>
                        </select>
                    </div>
                    <button class="btn btn-primary" id="ri-btn" style="width: 100%; margin-bottom: 2rem;"><i class="fa-solid fa-person-circle-question"></i> Generate Questions</button>
                    <div id="ri-loading" style="display: none; text-align: center;"><div class="loading-spinner"></div></div>
                    <div id="ri-result" style="display: none; background: rgba(255, 200, 0, 0.05); padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--neon-yellow);">
                        <div id="ri-content" class="markdown-body"></div>
                    </div>
                </div>
            </div>

            <!-- Tech Acronym Decoder -->
            <div class="tab-content" id="tab-acronym-decoder">
                <div class="glass-card panel-card">
                    <h3 class="panel-title"><i class="fa-solid fa-spell-check text-neon-purple"></i> Tech Acronym Decoder</h3>
                    <p style="color: var(--text-muted); margin-bottom: 2rem;">Instantly simplify complex System Design jargon during interviews.</p>
                    <div class="form-group">
                        <label>Jargon or Acronym</label>
                        <input type="text" class="saas-input" id="acronym-input" placeholder="e.g. CAP Theorem, Sharding, Idempotency">
                    </div>
                    <button class="btn btn-primary" id="acronym-btn" style="width: 100%; margin-bottom: 2rem;"><i class="fa-solid fa-spell-check"></i> Explain Like an Interviewer</button>
                    <div id="acronym-loading" style="display: none; text-align: center;"><div class="loading-spinner"></div></div>
                    <div id="acronym-result" style="display: none; background: rgba(157, 0, 255, 0.05); padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--neon-purple);">
                        <div id="acronym-content" class="markdown-body"></div>
                    </div>
                </div>
            </div>

            <!-- Hackathon Pitch -->
            <div class="tab-content" id="tab-hackathon-pitch">
                <div class="glass-card panel-card">
                    <h3 class="panel-title"><i class="fa-solid fa-microphone text-neon-cyan"></i> Hackathon Pitch Synthesizer</h3>
                    <p style="color: var(--text-muted); margin-bottom: 2rem;">Condense a 24-hr coding sprint into a clear, recruiter-friendly 30-second summary.</p>
                    <div class="form-group">
                        <label>The Problem You Solved</label>
                        <input type="text" class="saas-input" id="hack-prob" placeholder="e.g. Students waste food in college messes">
                    </div>
                    <div class="form-group">
                        <label>Your Tech Solution</label>
                        <input type="text" class="saas-input" id="hack-sol" placeholder="e.g. React Native app with Firebase for real-time tracking">
                    </div>
                    <div class="form-group">
                        <label>The Impact</label>
                        <input type="text" class="saas-input" id="hack-imp" placeholder="e.g. Saved 10kg of food during the weekend">
                    </div>
                    <button class="btn btn-primary" id="hack-btn" style="width: 100%; margin-bottom: 2rem;"><i class="fa-solid fa-bullhorn"></i> Synthesize Pitch</button>
                    <div id="hack-loading" style="display: none; text-align: center;"><div class="loading-spinner"></div></div>
                    <div id="hack-result" style="display: none; background: rgba(0, 255, 170, 0.05); padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--neon-cyan);">
                        <div id="hack-content" class="markdown-body"></div>
                    </div>
                </div>
            </div>

            <!-- Imposter Reframer -->
            <div class="tab-content" id="tab-imposter-reframe">
                <div class="glass-card panel-card">
                    <h3 class="panel-title"><i class="fa-solid fa-brain text-neon-pink"></i> Imposter Syndrome Reframer</h3>
                    <p style="color: var(--text-muted); margin-bottom: 2rem;">Convert self-doubt and post-rejection anxiety into an objective skill-acquisition roadmap.</p>
                    <div class="form-group">
                        <label>What are you doubting right now?</label>
                        <textarea class="saas-input" id="imposter-input" rows="4" placeholder="I don't know React Native as well as the job requires, I feel like a fraud..."></textarea>
                    </div>
                    <button class="btn btn-primary" id="imposter-btn" style="width: 100%; margin-bottom: 2rem;"><i class="fa-solid fa-recycle"></i> Reframe to Confidence</button>
                    <div id="imposter-loading" style="display: none; text-align: center;"><div class="loading-spinner"></div></div>
                    <div id="imposter-result" style="display: none; background: rgba(255, 0, 128, 0.05); padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--neon-pink);">
                        <div id="imposter-content" class="markdown-body"></div>
                    </div>
                </div>
            </div>
'''
if 'id="tab-cert-verifier"' not in html:
    html = html.replace('<!-- Tab Content: Networking GPS -->', tab_contents + '\n\n            <!-- Tab Content: Networking GPS -->')

with open('templates/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Injected 6 Final UI tabs into index.html")
