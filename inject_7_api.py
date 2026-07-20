import sys

with open('app.py', 'r', encoding='utf-8') as f:
    content = f.read()

api_addition = """
# ==========================================
# 5 NEW PREMIUM AI CAREER TOOLS ENDPOINTS
# ==========================================

@app.route('/api/career/skill-mesh', methods=['POST'])
def skill_mesh():
    try:
        data = request.json
        jd = data.get('jd')
        stack = data.get('stack')
        if not jd or not stack: return jsonify({'error': 'Missing input'}), 400
        prompt = f'''You are a highly strategic Technical Recruiter and Career Coach.
Target Job Description:
{jd}

User's Current Stack:
{stack}

Cross-reference the overlap percentage. Generate a 48-hour micro-upskilling sprint plan to bridge the missing secondary competencies that recruiters are actively filtering for. Use markdown, bolding, and bullet points.'''
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        return jsonify({'result': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/career/rejection-rehab', methods=['POST'])
def rejection_rehab():
    try:
        data = request.json
        email = data.get('email')
        if not email: return jsonify({'error': 'Missing input'}), 400
        prompt = f'''You are a Career Resilience Coach.
Here is an automated rejection email the user received:
{email}

Diagnose the rejection. Strip away the emotional sting. Analyze if the rejection was due to a skills gap or sheer market volume (ATS filtering). 
Output a one-sentence perspective shift, and then give the user an immediate, constructive next action to bounce back. Use markdown.'''
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        return jsonify({'result': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/career/gd-generator', methods=['POST'])
def gd_generator():
    try:
        data = request.json
        topic = data.get('topic')
        if not topic: return jsonify({'error': 'Missing input'}), 400
        prompt = f'''You are a Group Discussion (GD) expert for Tech placements.
Topic: {topic}

Generate three structured talking points to help the user speak with authority:
1. Opening hook (catchy intro to steal the floor)
2. Core data/logical angle (a unique perspective)
3. Conclusion summary (how to wrap it up professionally)
Keep it sharp, actionable, and formatted in markdown.'''
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        return jsonify({'result': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/career/thank-you', methods=['POST'])
def thank_you_sculptor():
    try:
        data = request.json
        name = data.get('name')
        topic = data.get('topic')
        takeaway = data.get('takeaway')
        if not name or not topic: return jsonify({'error': 'Missing input'}), 400
        prompt = f'''You are an elite Executive Communication Coach.
Interviewer Name: {name}
Key Topic Discussed: {topic}
One Specific Takeaway: {takeaway}

Write a sharp, genuine, and professional post-interview thank you email. It must sound human, not robotic or desperate. It must reinforce the candidate's technical alignment based on the topic discussed. Output the email directly in plain text (no markdown code blocks, just the email body).'''
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        return jsonify({'result': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/career/bullet-polish', methods=['POST'])
def bullet_polish():
    try:
        data = request.json
        bullet = data.get('bullet')
        if not bullet: return jsonify({'error': 'Missing input'}), 400
        prompt = f'''You are a FAANG Resume Reviewer.
Weak bullet point: {bullet}

Instantly rewrite this bullet point into 3 high-impact variations using strong action verbs (e.g. Spearheaded, Engineered, Optimized) and technical metrics structure (e.g. XYZ format).
Format the output in markdown, bolding the action verbs.'''
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        return jsonify({'result': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
"""

if '@app.route(\'/api/career/skill-mesh\')' not in content:
    content = content.replace('if __name__ == "__main__":', api_addition + '\n\nif __name__ == "__main__":')
    with open('app.py', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Injected 5 API endpoints into app.py")
else:
    print("API endpoints already exist.")
