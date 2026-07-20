import requests

BASE = 'http://127.0.0.1:9876'
endpoints = [
    ('/api/analyze-resume', {'job_description': 'SWE', 'resume_text': 'Python'}),
    ('/api/query', {'text': 'Hello', 'session_id': '123'}),
    ('/api/career_suite', {'type': 'cover_letter', 'details': 'SWE'}),
    ('/api/notes/generate', {'topic': 'OS', 'type': 'flashcards'}),
    ('/api/portfolio/generate', {'name': 'Yash', 'role': 'SWE', 'theme': 'dark'}),
    ('/api/interview/evaluate', {'question': 'Tell me about yourself', 'answer': 'I am Yash'}),
    ('/api/tax/advise', {'salary': '1000000', 'savings': '50000'}),
    ('/api/sheets/generate', {'prompt': 'Monthly budget'}),
    ('/api/placeiq/predict', {'cgpa': '8', 'skills': 'Python'}),
    ('/api/networking/generate', {'type': 'ghost_detector', 'days_ghosted': 14, 'ghost_context': 'Ghosted'})
]

all_passed = True
for path, payload in endpoints:
    url = f"{BASE}{path}"
    try:
        res = requests.post(url, json=payload)
        # 500 is fine if it's a Gemini error, but not if it's a TypeError HTML page
        if 'TypeError' in res.text or 'AttributeError' in res.text or 'Exception on' in res.text:
            print(f"[FAIL] {path} crashed! Response: {res.text[:100]}")
            all_passed = False
        else:
            print(f"[OK] {path} returned clean response.")
    except Exception as e:
        print(f"[FAIL] {path} request failed: {e}")
        all_passed = False

if all_passed:
    print("All endpoints passed without Python crashes!")
else:
    print("Some endpoints crashed.")
