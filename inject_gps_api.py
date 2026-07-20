import sys

with open('app.py', 'r', encoding='utf-8') as f:
    content = f.read()

if '@app.route("/api/networking/gps")' not in content:
    gps_api = """
@app.route('/api/networking/gps', methods=['POST'])
def networking_gps():
    try:
        data = request.json
        contacts = data.get('contacts', [])
        
        if not contacts:
            return jsonify({'error': 'No contacts provided'}), 400

        # Format the CRM data for the AI prompt
        contact_list_str = "\\n".join([f"- {c['name']} | {c['company']} | {c['role']} | Tier: {c['tier']} | Last Contact: {c.get('date', 'Unknown')}" for c in contacts])

        prompt = f'''You are a highly strategic Career Networking Coach & CRM AI.
Your user has provided you with a snapshot of their professional network (LinkedIn connections, alumni, etc.).

Here is their CRM data:
{contact_list_str}

Your task:
1. Identify high-value targets (e.g. Tier 1 or Tier 2 at top companies) that have gone 'stale' (haven't been contacted recently, or simply have no date).
2. Generate a 3-step 'Reactivation Strategy'.
3. Tell the user exactly who to prioritize today, and give them a 2-sentence draft they can use in the 'Referral Gen' or 'Cold Mail' tool to reactivate the bridge without sounding transactional.

Output your strategy in clean Markdown. Use bullet points and bold text for readability.'''
        
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        
        return jsonify({
            'strategy': response.text
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500
"""
    # Inject right before if __name__ == '__main__':
    content = content.replace('if __name__ == "__main__":', gps_api + '\n\nif __name__ == "__main__":')
    with open('app.py', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Injected Networking GPS API into app.py")
else:
    print("Networking GPS API already exists.")
