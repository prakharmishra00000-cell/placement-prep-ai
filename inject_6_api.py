import sys

with open('app.py', 'r', encoding='utf-8') as f:
    content = f.read()

api_addition = """
# ==========================================
# 6 FINAL PREMIUM AI CAREER TOOLS ENDPOINTS
# ==========================================

@app.route('/api/career/certificate-parser', methods=['POST'])
def certificate_parser():
    try:
        data = request.json
        text = data.get('text')
        if not text: return jsonify({'error': 'Missing input'}), 400
        prompt = f'''You are a Senior Technical Recruiter.
A student has pasted the description or syllabus of a certificate they completed:
{text}

Extract the core skills and summarize this credential into a single, crisp, high-impact bullet point ready for a resume or LinkedIn credentials section. Output ONLY the bullet point (formatted in markdown).'''
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        return jsonify({'result': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/career/project-scaler', methods=['POST'])
def project_scaler():
    try:
        data = request.json
        project = data.get('project')
        if not project: return jsonify({'error': 'Missing input'}), 400
        prompt = f'''You are an Enterprise Software Architect.
A student has provided a simple, basic description of their college project:
{project}

Rewrite this project description to emphasize advanced engineering concepts (like concurrency handling, modular components, API integrations, and database optimization). Make it sound like a robust enterprise system without lying about the core technology. Format it as 3 high-impact resume bullet points in markdown.'''
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        return jsonify({'result': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/career/reverse-interview', methods=['POST'])
def reverse_interview():
    try:
        data = request.json
        round_type = data.get('round')
        if not round_type: return jsonify({'error': 'Missing input'}), 400
        prompt = f'''You are an elite Interview Coach.
The candidate is preparing for a **{round_type}**.
At the end of the interview, they will be asked: "Do you have any questions for us?"

Provide exactly 3 sharp, high-impact, and intelligent questions tailored specifically to this interviewer persona that demonstrate genuine business insight and technical maturity. Format the output in clean markdown.'''
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        return jsonify({'result': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/career/acronym-decoder', methods=['POST'])
def acronym_decoder():
    try:
        data = request.json
        jargon = data.get('jargon')
        if not jargon: return jsonify({'error': 'Missing input'}), 400
        prompt = f'''You are a friendly FAANG Staff Engineer helping a junior prepare for a System Design interview.
The jargon/acronym they need to decode is: **{jargon}**

Give a crisp, 2-sentence technical definition paired with a relatable, real-world system design example (e.g., comparing it to a restaurant, a post office, or an everyday tech product). Format in markdown.'''
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        return jsonify({'result': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/career/hackathon-pitch', methods=['POST'])
def hackathon_pitch():
    try:
        data = request.json
        problem = data.get('problem')
        solution = data.get('solution')
        impact = data.get('impact')
        if not problem or not solution: return jsonify({'error': 'Missing input'}), 400
        prompt = f'''You are an Angel Investor and Tech Storyteller.
A student built a project in a 24-hour hackathon.
Problem: {problem}
Solution: {solution}
Impact: {impact}

Synthesize this into a punchy, results-oriented 30-second elevator pitch narrative ready for a recruiter or LinkedIn post. Make it sound highly impressive and action-driven. Use markdown formatting.'''
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        return jsonify({'result': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/career/imposter-reframe', methods=['POST'])
def imposter_reframe():
    try:
        data = request.json
        doubt = data.get('doubt')
        if not doubt: return jsonify({'error': 'Missing input'}), 400
        prompt = f'''You are an empathetic yet highly logical Career Resilience Coach.
A student is experiencing deep imposter syndrome and self-doubt. Here is what they are doubting about themselves:
"{doubt}"

Convert this emotional self-doubt into an objective, foundational skill-acquisition roadmap. 
1. Validate their feeling briefly.
2. Highlight the foundational/transferable skills they probably already have that are related to this.
3. Give them a logical, 2-step micro-plan to start closing the gap today to restore their confidence. 
Use markdown.'''
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        return jsonify({'result': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
"""

if '@app.route(\'/api/career/certificate-parser\')' not in content:
    content = content.replace('if __name__ == "__main__":', api_addition + '\n\nif __name__ == "__main__":')
    with open('app.py', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Injected 6 Final API endpoints into app.py")
else:
    print("API endpoints already exist.")
