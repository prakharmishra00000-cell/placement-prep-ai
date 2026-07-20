import sys

with open('app.py', 'r', encoding='utf-8') as f:
    content = f.read()

api_addition = """
# ==========================================
# 50-FEATURE MILESTONE: FINAL 5 BACKEND ENDPOINTS
# ==========================================

@app.route('/api/career/take-home-blueprint', methods=['POST'])
def take_home_blueprint():
    try:
        data = request.json
        prompt_text = data.get('prompt')
        if not prompt_text: return jsonify({'error': 'Missing input'}), 400
        system_prompt = f'''You are an elite Senior Staff Engineer at a FAANG company.
A student received this take-home coding assignment:
{prompt_text}

Break this assignment down into a clear, stress-free 24-hour milestone timeline. Provide:
1. Recommended Tech Stack (keep it simple but modern).
2. Key Deliverables for Hour 4, Hour 12, and Hour 24.
3. One "Bonus / Show-off" feature they can add to impress the hiring manager.
Format the output in clean markdown.'''
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(system_prompt)
        return jsonify({'result': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/career/aptitude-vault', methods=['POST'])
def aptitude_vault():
    try:
        data = request.json
        topic = data.get('topic')
        if not topic: return jsonify({'error': 'Missing input'}), 400
        system_prompt = f'''You are a Quantitative Aptitude test expert.
The student is searching for shortcuts on this topic: {topic}

Provide exactly one high-frequency mathematical formula/shortcut for this topic. 
Include:
1. The 30-second mental trick.
2. A fast memory mnemonic.
Keep it extremely concise and format it in markdown with bolding for emphasis.'''
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(system_prompt)
        return jsonify({'result': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/career/company-intel', methods=['POST'])
def company_intel():
    try:
        data = request.json
        company = data.get('company')
        if not company: return jsonify({'error': 'Missing input'}), 400
        system_prompt = f'''You are an Insider Technical Recruiter.
The candidate is interviewing at: {company}

Simulate crowdsourced alumni intelligence for this company. Detail:
1. Their typical engineering interview loop (e.g., 1 DSA round, 1 System Design, 1 Culture fit).
2. What their engineering team heavily prioritizes (e.g., speed over perfection, extreme testing, customer obsession).
3. One "hidden quirk" or red flag they test for.
Format the output cleanly in markdown.'''
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(system_prompt)
        return jsonify({'result': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/career/soft-skill-translator', methods=['POST'])
def soft_skill_translator():
    try:
        data = request.json
        anecdote = data.get('anecdote')
        if not anecdote: return jsonify({'error': 'Missing input'}), 400
        system_prompt = f'''You are a Behavioral Interview Coach.
The candidate has provided a rough, messy real-life anecdote:
"{anecdote}"

Restructure this raw anecdote into a flawless, professional STAR framework narrative ready for an HR behavioral round.
Provide headings for:
**Situation:**
**Task:**
**Action:**
**Result:**
Ensure it sounds professional but authentic. Use markdown.'''
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(system_prompt)
        return jsonify({'result': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/career/gd-counter-shield', methods=['POST'])
def gd_counter_shield():
    try:
        data = request.json
        stance = data.get('stance')
        if not stance: return jsonify({'error': 'Missing input'}), 400
        system_prompt = f'''You are a Group Discussion (GD) Debate Coach.
The candidate's primary stance is: "{stance}"

Predict the top two most likely opposing arguments that other candidates will throw at them in a GD.
For each predicted attack, provide a polite, data-driven, and authoritative rebuttal framework they can use to pivot and maintain dominance in the conversation. Use markdown formatting.'''
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(system_prompt)
        return jsonify({'result': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
"""

if '@app.route(\'/api/career/take-home-blueprint\')' not in content:
    content = content.replace('if __name__ == "__main__":', api_addition + '\n\nif __name__ == "__main__":')
    with open('app.py', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Injected final 5 API endpoints into app.py (Total: 50 Tools)")
else:
    print("API endpoints already exist.")
