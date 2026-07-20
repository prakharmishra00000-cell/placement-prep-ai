import sys

with open('templates/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# I will find the entire footer block and replace it with a clean version that only has Contact and Legal.

footer_start = html.find('<footer')
footer_end = html.find('</footer>') + 9

if footer_start != -1 and footer_end != -1:
    clean_footer = '''<footer style="background: rgba(3, 0, 8, 0.9); border-top: 1px solid var(--border-color); padding: 3rem 2rem 1.5rem; margin-top: 4rem;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 3rem;">
                    <div>
                        <div class="logo" style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
                            <i class="fa-solid fa-brain-circuit neon-icon" style="color: var(--neon-blue); font-size: 1.6rem;"></i>
                            <h2 style="font-family: var(--font-heading); font-weight: 800; font-size: 1.35rem; color: #fff;">PrepOS <span style="background: linear-gradient(135deg, var(--neon-blue), var(--neon-purple)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">AI</span></h2>
                        </div>
                        <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5; margin-bottom: 1.5rem;">The world's most advanced autonomous career preparation operating system.</p>
                        <div style="display: flex; gap: 1rem;">
                            <a href="#" style="color: var(--text-muted); transition: color 0.2s;" onmouseover="this.style.color='var(--neon-blue)'" onmouseout="this.style.color='var(--text-muted)'"><i class="fa-brands fa-twitter text-lg"></i></a>
                            <a href="#" style="color: var(--text-muted); transition: color 0.2s;" onmouseover="this.style.color='var(--neon-blue)'" onmouseout="this.style.color='var(--text-muted)'"><i class="fa-brands fa-linkedin text-lg"></i></a>
                            <a href="#" style="color: var(--text-muted); transition: color 0.2s;" onmouseover="this.style.color='var(--neon-blue)'" onmouseout="this.style.color='var(--text-muted)'"><i class="fa-brands fa-github text-lg"></i></a>
                        </div>
                    </div>
                    <div>
                        <h5 style="color: #fff; font-weight: 600; margin-bottom: 1rem; font-size: 0.95rem; margin-top: 0;">Contact & Support</h5>
                        <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.85rem; color: var(--text-muted); margin: 0;">
                            <li><i class="fa-solid fa-envelope" style="color: var(--neon-cyan); margin-right: 4px;"></i> prakharmishra00000@gmail.com</li>
                        </ul>
                    </div>
                    <div>
                        <h5 style="color: #fff; font-weight: 600; margin-bottom: 1rem; font-size: 0.95rem; margin-top: 0;">Legal</h5>
                        <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.85rem; margin: 0;">
                            <li><a href="#" style="color: var(--text-muted); text-decoration: none;" onmouseover="this.style.color='var(--neon-cyan)'" onmouseout="this.style.color='var(--text-muted)'">Privacy Policy</a></li>
                            <li><a href="#" style="color: var(--text-muted); text-decoration: none;" onmouseover="this.style.color='var(--neon-cyan)'" onmouseout="this.style.color='var(--text-muted)'">Terms of Service</a></li>
                            <li><a href="#" style="color: var(--text-muted); text-decoration: none;" onmouseover="this.style.color='var(--neon-cyan)'" onmouseout="this.style.color='var(--text-muted)'">Placement Disclaimers</a></li>
                        </ul>
                    </div>
                </div>
                <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; font-size: 0.8rem; color: var(--text-muted);">
                    <span>&copy; 2026 PrepOS AI. All rights reserved.</span>
                    <span style="display: flex; gap: 1.5rem;">
                        <a href="#" style="color: var(--text-muted); text-decoration: none;">Legal Privacy</a>
                        <a href="#" style="color: var(--text-muted); text-decoration: none;">Terms of Use</a>
                    </span>
                </div>
            </footer>'''

    html = html[:footer_start] + clean_footer + html[footer_end:]
    
    with open('templates/index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Injected clean footer successfully.")
