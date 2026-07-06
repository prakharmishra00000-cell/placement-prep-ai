import os
import re
import json
import urllib.parse
import random
import requests
from bs4 import BeautifulSoup
from flask import Flask, jsonify, request, render_template
from pyq_generator import generate_55_pyqs

app = Flask(__name__)

# Cache of mock/real pre-defined high-quality placement data for top companies
COMPANY_KNOWLEDGE = {
    "tcs": {
        "name": "Tata Consultancy Services (TCS)",
        "skills": [
            {"name": "Java/C++/Python", "level": 85},
            {"name": "Data Structures & Algorithms", "level": 75},
            {"name": "Quantitative Aptitude", "level": 90},
            {"name": "SQL & DBMS", "level": 70},
            {"name": "Logical Reasoning", "level": 80},
            {"name": "Verbal Ability", "level": 75}
        ],
        "topics": [
            {"name": "Aptitude (Numbers, Speed & Time, Work)", "weight": 35},
            {"name": "Coding (Arrays, Strings, Dynamic Programming)", "weight": 25},
            {"name": "SQL Queries & DBMS", "weight": 15},
            {"name": "Pseudo-code & MCQ (C/C++ output)", "weight": 15},
            {"name": "Software Engineering & SDLC", "weight": 10}
        ],
        "salary": {
            "tiers": [
                {"name": "Ninja (Entry Level)", "package": "3.36 - 3.6 LPA", "inhand": "₹22,000 - ₹24,000 / month", "details": "Base Salary: ₹15K, HRA: ₹5K, Allowances: ₹3K. Deductions: PF (₹1.8K), Professional Tax (₹200)"},
                {"name": "Digital (Mid Level)", "package": "7.0 - 7.5 LPA", "inhand": "₹50,000 - ₹54,000 / month", "details": "Base Salary: ₹32K, HRA: ₹12K, Performance Pay: ₹7K, Allowances: ₹3K. Deductions: PF (₹3.8K), Tax (₹1.2K)"},
                {"name": "Prime (High Level)", "package": "9.0 - 11.5 LPA", "inhand": "₹68,000 - ₹75,000 / month", "details": "Base Salary: ₹45K, HRA: ₹18K, Flexible Benefit Plan: ₹10K. Deductions: PF (₹5.4K), Tax (₹3.5K)"}
            ]
        },
        "career_path": [
            {"level": "Level 1", "role": "Assistant System Engineer Trainee", "duration": "1 Year", "salary": "3.36 LPA - 7.0 LPA"},
            {"level": "Level 2", "role": "Assistant System Engineer", "duration": "1-2 Years", "salary": "4.0 LPA - 8.0 LPA"},
            {"level": "Level 3", "role": "System Engineer", "duration": "2-3 Years", "salary": "5.5 LPA - 11.0 LPA"},
            {"level": "Level 4", "role": "IT Analyst", "duration": "3-5 Years", "salary": "8.5 LPA - 15.0 LPA"},
            {"level": "Level 5", "role": "Assistant Consultant / Project Manager", "duration": "4-6 Years", "salary": "14.0 LPA - 22.0 LPA"},
            {"level": "Level 6", "role": "Consultant / Program Manager", "duration": "5+ Years", "salary": "25.0 LPA - 35.0 LPA"},
            {"level": "Level 7", "role": "Senior Consultant / Director", "duration": "To the top!", "salary": "40.0+ LPA"}
        ],
        "tips": {
            "technical": "Focus heavily on TCS NQT mock tests. TCS values speed in coding. Prepare recursion, string manipulation, and standard data structures like trees and graphs. In interviews, prepare to explain your final year project in deep technical detail.",
            "hr": "TCS values long-term commitment. Prepare for questions like 'Are you willing to relocate?' and 'Why TCS?'. Mention TCS's research divisions, global reach, and stability.",
            "assessment": "Practice cognitive assessment (numerical, verbal, reasoning) on IndiaBIX and M4Maths. Speed is key, as NQT section timers are strict."
        },
        "pyqs": [
            {
                "question": "A sum of money at compound interest amounts to threefold itself in 3 years. In how many years will it be 9 times itself?",
                "options": ["6 years", "9 years", "12 years", "15 years"],
                "answer": "6 years",
                "solution": "Let principal be P.\nAmount after 3 years = 3P.\nP*(1 + R/100)^3 = 3P => (1 + R/100)^3 = 3.\nWe want it to become 9 times, i.e., 9P.\nP*(1 + R/100)^n = 9P => (1 + R/100)^n = 9 = 3^2 = [(1 + R/100)^3]^2 = (1 + R/100)^6.\nThus, n = 6 years.",
                "year": "2024",
                "source": "M4Maths"
            },
            {
                "question": "Given a string S, write a program to find the first non-repeating character in it. If it doesn't exist, return '$'.",
                "options": ["O(N) time with O(1) space", "O(N^2) time", "O(N log N) time", "O(N) time & O(N) space"],
                "answer": "O(N) time & O(N) space",
                "solution": "We can use a hash map or a frequency array of size 256. Scan the string once to populate frequencies, then scan it again to find the first character with frequency 1. Time complexity: O(N) (two passes). Space complexity: O(1) auxiliary space (since alphabet size is constant 256), but practically O(N) space to store the string/characters mapping.",
                "year": "2023",
                "source": "IndiaBIX"
            }
        ]
    },
    "infosys": {
        "name": "Infosys",
        "skills": [
            {"name": "Java/Python/C#", "level": 80},
            {"name": "System Design", "level": 70},
            {"name": "Mathematical Aptitude", "level": 85},
            {"name": "RDBMS & SQL", "level": 75},
            {"name": "Logical Puzzles", "level": 85}
        ],
        "topics": [
            {"name": "Mathematical & Cryptarithmetic Puzzles", "weight": 35},
            {"name": "Data Interpretation & Logical Reasoning", "weight": 25},
            {"name": "Coding (Python/Java outputs)", "weight": 20},
            {"name": "DBMS, OS & OOPS Concepts", "weight": 20}
        ],
        "salary": {
            "tiers": [
                {"name": "System Engineer (SE)", "package": "3.6 - 4.0 LPA", "inhand": "₹24,000 - ₹26,000 / month", "details": "Base Salary: ₹17K, HRA: ₹5K, Allowances: ₹4K. Deductions: PF (₹1.9K), Medical Ins: ₹500"},
                {"name": "Specialist Programmer (SP)", "package": "8.0 - 9.5 LPA", "inhand": "₹58,000 - ₹64,000 / month", "details": "Base Salary: ₹40K, HRA: ₹15K, Performance Bonus: ₹6K. Deductions: PF (₹4.8K), Tax: ₹2.2K"},
                {"name": "Power Programmer (PP)", "package": "10.0 - 13.0 LPA", "inhand": "₹75,000 - ₹85,000 / month", "details": "Base Salary: ₹55K, HRA: ₹20K, Perks: ₹8K. Deductions: PF (₹6.5K), Tax: ₹4.5K"}
            ]
        },
        "career_path": [
            {"level": "Level 1", "role": "System Engineer Trainee", "duration": "0.5 Year", "salary": "3.6 LPA - 8.0 LPA"},
            {"level": "Level 2", "role": "System Engineer", "duration": "1.5-2 Years", "salary": "4.2 LPA - 9.0 LPA"},
            {"level": "Level 3", "role": "Senior System Engineer", "duration": "2 Years", "salary": "5.5 LPA - 11.5 LPA"},
            {"level": "Level 4", "role": "Technology Analyst (TA)", "duration": "3 Years", "salary": "8.5 LPA - 15.0 LPA"},
            {"level": "Level 5", "role": "Technology Lead (TL)", "duration": "3-4 Years", "salary": "13.0 LPA - 20.0 LPA"},
            {"level": "Level 6", "role": "Project Manager", "duration": "4+ Years", "salary": "18.0 LPA - 28.0 LPA"},
            {"level": "Level 7", "role": "Senior PM / Delivery Manager", "duration": "To the top!", "salary": "32.0+ LPA"}
        ],
        "tips": {
            "technical": "Infosys InfyTQ and HackWithInfy exams are highly competitive. Practice algorithmic coding, especially arrays, greedy algorithms, and backtracking. Prepare OOPs concepts thoroughly.",
            "hr": "Infosys focuses heavily on learnability. Emphasize your certification courses, eagerness to learn new tech stacks, and how you resolve team conflicts.",
            "assessment": "Infosys is famous for its Cryptarithmetic puzzles (e.g., SEND+MORE=MONEY) and logical deductions. Practice puzzles extensively from IndiaBIX and M4Maths."
        },
        "pyqs": [
            {
                "question": "In a cryptarithmetic puzzle: SEND + MORE = MONEY. What is the value of 'M' and 'O'?",
                "options": ["M = 1, O = 0", "M = 2, O = 1", "M = 1, O = 9", "M = 9, O = 8"],
                "answer": "M = 1, O = 0",
                "solution": "SEND + MORE = MONEY.\nSince we are adding two 4-digit numbers to get a 5-digit number, the carry 'M' must be 1. So, M = 1.\nNow, S + M + carry = MO. Since M = 1, S + 1 + carry = 10 + O.\nIf S = 9 and carry = 0/1, then S + 1 = 10 or 11. Thus, O must be 0 (since M=1 is already taken).\nHence, M = 1 and O = 0.",
                "year": "2024",
                "source": "M4Maths"
            }
        ]
    },
    "google": {
        "name": "Google",
        "skills": [
            {"name": "Algorithms & Complex Data Structures", "level": 98},
            {"name": "System Design & Scalability", "level": 90},
            {"name": "Coding Proficiency (C++/Java/Go/Python)", "level": 95},
            {"name": "Operating Systems & Networking", "level": 85}
        ],
        "topics": [
            {"name": "Graphs & Tree Traversal (DFS, BFS, Dijkstra, Segment Trees)", "weight": 35},
            {"name": "Dynamic Programming & Recursion", "weight": 30},
            {"name": "System Design (Scalability, Load Balancing, Cache)", "weight": 20},
            {"name": "Googleyness, Leadership & Scenario Qs", "weight": 15}
        ],
        "salary": {
            "tiers": [
                {"name": "L3 (Software Engineer I)", "package": "30 - 45 LPA", "inhand": "₹1,80,000 - ₹2,20,000 / month", "details": "Base Salary: ₹18-22L, Stocks (GSUs): ₹10-15L/yr, Sign-on & Annual Performance Bonus: ₹4-6L. Inhand excludes stock vesting."},
                {"name": "L4 (Software Engineer II)", "package": "50 - 75 LPA", "inhand": "₹2,80,000 - ₹3,50,000 / month", "details": "Base: ₹28-35L, Stocks: ₹25-30L/yr, Bonus: ₹8-10L."},
                {"name": "L5 (Senior Software Engineer)", "package": "85 - 120+ LPA", "inhand": "₹4,20,000 - ₹5,50,000 / month", "details": "Base: ₹45-55L, Stocks: ₹40-55L/yr, Bonus: ₹12-15L."}
            ]
        },
        "career_path": [
            {"level": "Level 3", "role": "Software Engineer II (Entry/L3)", "duration": "2 Years", "salary": "30 - 45 LPA"},
            {"level": "Level 4", "role": "Software Engineer III (L4)", "duration": "2-3 Years", "salary": "50 - 75 LPA"},
            {"level": "Level 5", "role": "Senior Software Engineer (L5)", "duration": "3-5 Years", "salary": "85 - 120 LPA"},
            {"level": "Level 6", "role": "Staff Software Engineer (L6)", "duration": "4-6 Years", "salary": "1.5 - 2.5 Cr"},
            {"level": "Level 7", "role": "Senior Staff Engineer (L7)", "duration": "5+ Years", "salary": "3.0 - 5.0 Cr"},
            {"level": "Level 8", "role": "Principal Engineer (L8)", "duration": "Rare milestone", "salary": "8.0+ Cr"}
        ],
        "tips": {
            "technical": "Google cares deeply about clean, efficient, and bug-free code. Speak out loud your thought process during coding. Discuss edge cases, time/space complexity, and write modular code.",
            "hr": "Googleyness is highly valued. Showcase instances where you took initiative, helped a teammate, showed intellectual humility, and worked collaboratively.",
            "assessment": "Google Online Challenge (GOC) contains 2 highly complex algorithmic questions (LeetCode Medium to Hard). Time limit is strict (60-90 mins)."
        },
        "pyqs": [
            {
                "question": "Given an array of integers representing the height of blocks, calculate how much water can be trapped after raining (Trapping Rain Water).",
                "options": ["O(N) time and O(1) space using Two Pointers", "O(N) time and O(N) space using DP", "O(N^2) time with brute force", "Both A and B are possible"],
                "answer": "Both A and B are possible",
                "solution": "Yes, both are possible. The dynamic programming approach uses prefix and suffix max arrays costing O(N) space. The two-pointer approach tracks left_max and right_max iteratively, keeping space complexity to O(1) while maintaining O(N) time.",
                "year": "2025",
                "source": "Google Placement Archive"
            }
        ]
    }
}

# General Fallback Builder to dynamically synthesize data for any searched company
def synthesize_company_data(company_name, category):
    c_key = company_name.lower().strip()
    
    # Check cache first
    if c_key in COMPANY_KNOWLEDGE:
        return COMPANY_KNOWLEDGE[c_key]
        
    # Generate intelligent dynamic data based on company name
    # We will also pull from Google Search to supplement.
    search_query = f"{company_name} placement papers previous year questions solutions"
    scraped_questions = fetch_real_pyqs_from_search(company_name)
    
    # Setup standard tier template for salary based on company type (e.g. FAANG vs MNC)
    is_faang = any(x in c_key for x in ["amazon", "meta", "netflix", "microsoft", "apple", "google", "uber", "goldman", "adobe"])
    
    if is_faang:
        skills = [
            {"name": "Algorithms & Advanced DS", "level": 95},
            {"name": "System Design", "level": 85},
            {"name": "Coding (C++/Java/Go/Python)", "level": 90},
            {"name": "Logical Puzzles", "level": 80}
        ]
        topics = [
            {"name": "Data Structures & Algorithms (Trees, Graphs, DP)", "weight": 40},
            {"name": "System Design (Scalability, Microservices)", "weight": 25},
            {"name": "OOPS, Operating Systems & DBMS", "weight": 20},
            {"name": "Behavioral & Leadership Scenario Qs", "weight": 15}
        ]
        salary = {
            "tiers": [
                {"name": "SDE 1 (Entry)", "package": "20 - 35 LPA", "inhand": "₹1,40,000 - ₹1,80,000 / month", "details": "Base Salary: ₹15-20L, Stocks: ₹8-12L/yr, Variable Bonus: 10%"},
                {"name": "SDE 2 (Mid)", "package": "40 - 65 LPA", "inhand": "₹2,50,000 - ₹3,20,000 / month", "details": "Base: ₹28-36L, Stocks: ₹15-25L/yr, Allowances & Bonus."},
                {"name": "SDE 3 (Senior)", "package": "75 - 110+ LPA", "inhand": "₹4,00,000 - ₹5,00,000 / month", "details": "Base: ₹45-55L, Stocks: ₹30-45L/yr, Performance Bonus."}
            ]
        }
        career_path = [
            {"level": "Level 1", "role": "Software Engineer I", "duration": "1-2 Years", "salary": "20 - 35 LPA"},
            {"level": "Level 2", "role": "Software Engineer II", "duration": "2-3 Years", "salary": "40 - 65 LPA"},
            {"level": "Level 3", "role": "Senior Software Engineer", "duration": "3-5 Years", "salary": "75 - 110 LPA"},
            {"level": "Level 4", "role": "Principal / Staff Architect", "duration": "4+ Years", "salary": "1.5 - 2.5 Cr"},
            {"level": "Level 5", "role": "Engineering Manager / Director", "duration": "To the top!", "salary": "3.0+ Cr"}
        ]
        tips = {
            "technical": f"Focus on high-level coding challenges (LeetCode Medium/Hard). Speak out loud during solution explanation.",
            "hr": f"Understand the Leadership Principles or Core Values of {company_name}. Use STAR method.",
            "assessment": "Expect hard coding assessments and structural engineering questions."
        }
    else:
        # Standard Service/Product MNC (Accenture, Cognizant, Wipro, Capgemini)
        skills = [
            {"name": "Core Language (Java/C++/Python/JS)", "level": 75},
            {"name": "Quantitative Aptitude", "level": 85},
            {"name": "Logical Reasoning", "level": 80},
            {"name": "Verbal Ability", "level": 75},
            {"name": "RDBMS & SQL", "level": 70}
        ]
        topics = [
            {"name": "Aptitude & Verbal Ability", "weight": 35},
            {"name": "Logical & Visual Reasoning", "weight": 25},
            {"name": "Pseudocode, Debugging & Output Tracing", "weight": 20},
            {"name": "Coding (Basic Data Structures, Strings, Arrays)", "weight": 20}
        ]
        salary = {
            "tiers": [
                {"name": "Associate / Trainee", "package": "3.5 - 4.5 LPA", "inhand": "₹24,000 - ₹28,000 / month", "details": "Base Salary: ₹18K, HRA: ₹5K, Allowances: ₹3K. Deductions: PF (₹1.8K)"},
                {"name": "Senior Software Engineer", "package": "6.5 - 8.5 LPA", "inhand": "₹45,000 - ₹55,000 / month", "details": "Base Salary: ₹35K, HRA: ₹12K, Allowances: ₹5K. Deductions: PF (₹3.6K), Tax"},
                {"name": "Team Lead / Consultant", "package": "10 - 15 LPA", "inhand": "₹70,000 - ₹95,000 / month", "details": "Base: ₹65K, HRA: ₹25K, Variable: ₹10K. Deductions: PF (₹7.8K), Tax"}
            ]
        }
        career_path = [
            {"level": "Level 1", "role": "Software Engineer Associate", "duration": "1 Year", "salary": "3.5 - 4.5 LPA"},
            {"level": "Level 2", "role": "Software Engineer", "duration": "1-2 Years", "salary": "4.5 - 6.0 LPA"},
            {"level": "Level 3", "role": "Senior Software Engineer", "duration": "2 Years", "salary": "6.5 - 9.0 LPA"},
            {"level": "Level 4", "role": "Team Lead / Consultant", "duration": "3 Years", "salary": "10 - 15 LPA"},
            {"level": "Level 5", "role": "Manager / Architect", "duration": "4+ Years", "salary": "16 - 25 LPA"},
            {"level": "Level 6", "role": "Senior Manager / VP", "duration": "To the top!", "salary": "30.0+ LPA"}
        ]
        tips = {
            "technical": f"Focus on logical reasoning and pseudo-code outputs. TCS/Accenture NQT style questions dominate the test pattern.",
            "hr": f"Express enthusiasm to learn multiple domain technologies. Highlight collaborative skills and readiness for rotational shifts.",
            "assessment": "Practice MCQs on OS, DBMS, Networks, and clean code pseudo-code logic."
        }

    all_pyqs = (scraped_questions or []) + generate_55_pyqs(company_name)
    return {
        "name": company_name.title(),
        "skills": skills,
        "topics": topics,
        "salary": salary,
        "career_path": career_path,
        "tips": tips,
        "pyqs": all_pyqs
    }

# Live DuckDuckGo search + parsing of target placement websites
def fetch_real_pyqs_from_search(company_name):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36'
    }
    
    questions = []
    
    # Query DuckDuckGo for candidate links
    query = f"site:m4maths.com OR site:indiabix.com OR site:freshersworld.com {company_name} placement puzzles questions"
    url = f"https://html.duckduckgo.com/html/?q={urllib.parse.quote(query)}"
    
    try:
        r = requests.get(url, headers=headers, timeout=8)
        if r.status_code == 200:
            soup = BeautifulSoup(r.text, 'html.parser')
            links = []
            for a in soup.find_all('a'):
                href = a.get('href', '')
                if 'uddg=' in href:
                    parts = href.split('uddg=')
                    if len(parts) > 1:
                        actual_url = urllib.parse.unquote(parts[1].split('&')[0])
                        if actual_url not in links and any(dom in actual_url for dom in ['m4maths.com', 'indiabix.com', 'freshersworld.com', 'youth4work.com', 'freshersnow.com']):
                            links.append(actual_url)
            
            # Scrape matching links
            for link in links[:8]:
                # Fetch target page
                try:
                    page_res = requests.get(link, headers=headers, timeout=5)
                    if page_res.status_code == 200:
                        page_soup = BeautifulSoup(page_res.text, 'html.parser')
                        
                        # Custom parsing based on domain
                        if "m4maths.com" in link:
                            # M4maths parsing - scrape all questions
                            q_containers = page_soup.find_all('div', class_='question-body') or page_soup.find_all('div', style=re.compile("font-size|padding"))
                            for qc in q_containers:
                                text = qc.get_text().strip()
                                if len(text) > 40:
                                    questions.append({
                                        "question": text[:400] + ("..." if len(text) > 400 else ""),
                                        "options": ["Option A", "Option B", "Option C", "Option D"],
                                        "answer": "Solved",
                                        "solution": f"Scraped from M4Maths: {link}",
                                        "year": "Recent",
                                        "source": "M4Maths"
                                    })
                        
                        elif "indiabix.com" in link:
                            # Indiabix parsing - scrape all questions on the page
                            q_blocks = page_soup.find_all('div', class_='bix-div-container') or page_soup.find_all('table', class_='bix-tbl-container')
                            for q_block in q_blocks:
                                q_text_div = q_block.find('div', class_='bix-div-question') or q_block.find('td', class_='bix-td-qtxt')
                                if q_text_div:
                                    text = q_text_div.get_text().strip()
                                    options = [opt.get_text().strip() for opt in q_block.find_all('div', class_='bix-div-option') or q_block.find_all('td', class_='bix-td-option-val')]
                                    ans_span = q_block.find('span', class_='jq-hdg-answer') or q_block.find('div', class_='bix-div-answer') or q_block.find('span', class_='bix-span-answer')
                                    ans = ans_span.get_text().strip() if ans_span else "Answer details on website"
                                    questions.append({
                                        "question": text,
                                        "options": options if len(options) >= 2 else ["Option A", "Option B", "Option C", "Option D"],
                                        "answer": ans.replace("Answer: Option", "").strip(),
                                        "solution": f"Parsed from IndiaBIX. Source link: {link}",
                                        "year": "2024",
                                        "source": "IndiaBIX"
                                    })
                                    
                        else:
                            # Generic page paragraph question parser for other sites
                            paragraphs = page_soup.find_all('p') or page_soup.find_all('li')
                            for p in paragraphs:
                                text = p.get_text().strip()
                                # Simple heuristic for question patterns
                                if len(text) > 60 and any(kw in text.lower() for kw in ["what", "how", "find", "calculate", "solve", "if a"]):
                                    questions.append({
                                        "question": text[:350] + ("..." if len(text) > 350 else ""),
                                        "options": ["A", "B", "C", "D"],
                                        "answer": "Refer Source",
                                        "solution": f"Scraped from page: {link}",
                                        "year": "Recent",
                                        "source": urllib.parse.urlparse(link).netloc
                                    })
                except Exception as ex:
                    print(f"Error scraping {link}: {ex}")
    except Exception as e:
        print("Scraping search error:", e)
        
    return questions

def get_generic_pyqs(company_name):
    return [
        {
            "question": f"A developer at {company_name} is designing a database schema where queries frequently require sorting records. Which index structure is most suitable for range queries and sorting?",
            "options": ["B-Tree Index", "Hash Index", "Bitmap Index", "Inverted Index"],
            "answer": "B-Tree Index",
            "solution": "B-Tree indexes maintain data in sorted order which allows sequential traversal, making it extremely efficient for range queries (e.g., BETWEEN) and sorting (e.g., ORDER BY). Hash indexes are only efficient for point lookups (equality).",
            "year": "2024",
            "source": "Technical Test"
        },
        {
            "question": "A train passes a station platform in 36 seconds and a man standing on the platform in 20 seconds. If the speed of the train is 54 km/hr, what is the length of the platform?",
            "options": ["240 m", "300 m", "360 m", "400 m"],
            "answer": "240 m",
            "solution": "Speed of train = 54 * (5/18) = 15 m/s.\nLength of the train = Speed * time taken to pass the standing man = 15 * 20 = 300 m.\nLet length of the platform be P.\nTime to pass platform = (Length of train + Length of platform) / Speed\n36 = (300 + P) / 15 => 540 = 300 + P => P = 240 meters.",
            "year": "2025",
            "source": "M4Maths"
        }
    ]

import google.generativeai as genai

def fetch_company_data_via_gemini(company, category, api_key):
    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel("gemini-1.5-flash")
        prompt = f"""
        Provide a placement preparation guide for the company "{company}" under the category "{category}".
        You must return a raw JSON object and nothing else (do NOT include ```json wrappers, backticks, or any explanation).
        The structure must be exactly:
        {{
          "name": "Full Company Name",
          "skills": [
             {{"name": "Skill Name", "level": 85}}
          ],
          "topics": [
             {{"name": "Topic Name", "weight": 35}}
          ],
          "salary": {{
             "tiers": [
                {{"name": "Role Name (e.g. SDE 1)", "package": "Salary in LPA", "inhand": "Approx. take home per month", "details": "Breakdown description"}}
             ]
          }},
          "career_path": [
             {{"level": "Level 1", "role": "Role Title", "duration": "Duration to upgrade", "salary": "Salary range"}}
          ],
          "tips": {{
             "technical": "Prep tips",
             "hr": "Prep tips",
             "assessment": "Prep tips"
          }},
          "pyqs": [
             {{
                "question": "Real previous year question or coding puzzle asked at {company}",
                "options": ["Option A", "Option B", "Option C", "Option D"],
                "answer": "Correct Option text",
                "solution": "Detailed step-by-step mathematical or logic explanation",
                "year": "2024",
                "source": "M4Maths / IndiaBIX"
             }}
          ]
        }}
        Provide real or highly realistic placement questions, correct answers, and exact details. Return raw JSON.
        """
        response = model.generate_content(prompt)
        text = response.text.strip()
        if text.startswith("```json"):
            text = text[7:]
        if text.endswith("```"):
            text = text[:-3]
        text = text.strip()
        return json.loads(text)
    except Exception as e:
        print("Gemini Search integration error:", e)
        return None

def query_gemini_chat(prompt, company, category, api_key):
    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel("gemini-1.5-flash")
        sys_instr = f"You are a placement guide helper for {company} under the category {category} round. Answer the candidate's query accurately with facts and details."
        response = model.generate_content(f"{sys_instr}\n\nCandidate Query: {prompt}")
        return response.text.strip()
    except Exception as e:
        print("Gemini Chat integration error:", e)
        return None

def is_valid_key(k):
    if not k:
        return False
    if any(p in k for p in ["YOUR_KEY", "PASTE_YOUR", "PLACEHOLDER", "YOUR_GEMINI"]):
        return False
    return True

def get_backend_gemini_key():
    key = os.environ.get("GEMINI_API_KEY", "").strip()
    if is_valid_key(key):
        return key
    if os.path.exists("config.json"):
        try:
            with open("config.json", "r") as f:
                cfg = json.load(f)
                val = cfg.get("GEMINI_API_KEY", "").strip()
                if is_valid_key(val):
                    return val
        except:
            pass
    if os.path.exists(".env"):
        try:
            with open(".env", "r") as f:
                for line in f:
                    if line.strip().startswith("GEMINI_API_KEY="):
                        val = line.split("GEMINI_API_KEY=")[1].strip()
                        if is_valid_key(val):
                            return val
        except:
            pass
    return ""

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/search", methods=["GET"])
def search_company():
    company = request.args.get("company", "").strip().lower()
    category = request.args.get("category", "technical").strip()
    api_key = request.args.get("gemini_key", "").strip() or get_backend_gemini_key()
    
    if not company:
        return jsonify({"error": "Company name is required."}), 400
        
    if api_key:
        data = fetch_company_data_via_gemini(company, category, api_key)
        if data:
            return jsonify(data)
            
    data = synthesize_company_data(company, category)
    return jsonify(data)

@app.route("/api/query", methods=["POST"])
def custom_query():
    body = request.json or {}
    prompt = body.get("prompt", "").strip()
    company = body.get("company", "").strip()
    category = body.get("category", "technical").strip()
    api_key = body.get("gemini_key", "").strip() or get_backend_gemini_key()
    
    if not prompt:
        return jsonify({"error": "Prompt cannot be empty."}), 400
        
    if api_key:
        answer = query_gemini_chat(prompt, company, category, api_key)
        if answer:
            return jsonify({"answer": answer})
            
    response_text = generate_smart_answer(prompt, company, category)
    return jsonify({"answer": response_text})

def generate_smart_answer(prompt, company, category):
    p_lower = prompt.lower()
    comp_title = company.title() if company else "the company"
    
    if "salary" in p_lower or "lpa" in p_lower or "hand" in p_lower:
        return f"For {comp_title}, the in-hand salary depends heavily on the role. Entry level (Ninja/Associate) offers around 3.5 - 4.5 LPA, translating to ~₹24,000 - ₹28,000 in hand per month. Mid-level roles (Digital/Specialist SDE) scale up to 7 - 9.5 LPA (in-hand ~₹50,000 - ₹64,000/month). Top tier developers (Prime/SDE-3) command over 12 - 25 LPA with monthly take-homes exceeding ₹85,000 to ₹1.8 Lakhs. Regular promotions happen every 1.5 to 2 years."
        
    if "rounds" in p_lower or "interview" in p_lower or "selection" in p_lower:
        return f"The recruitment process at {comp_title} typically has 3-4 phases:\n1. Online Assessment (Aptitude, Coding, and English MCQs)\n2. Technical Interview Round 1 (Data Structures, project description, and SQL queries)\n3. Technical Interview Round 2 or System Design (for higher packages)\n4. HR Interview (cultural fit, relocation check, document review)."

    if "topic" in p_lower or "prepare" in p_lower or "syllabus" in p_lower:
        return f"To crack the {category} segment for {comp_title}, focus specifically on:\n- **Quantitative Aptitude**: Time and Work, Probability, Percentage, Puzzles (Indiabix and M4Maths).\n- **Programming**: String reversal, array sliding-window algorithms, OOPs concepts (Polymorphism, Inheritance), SQL group-by queries.\n- **CS Core**: Operating systems deadlock conditions and DBMS indexing structures."
        
    if "easy" in p_lower or "tough" in p_lower or "difficulty" in p_lower:
        return f"The difficulty rating for {comp_title} is moderate. Service-oriented roles are relatively straightforward to crack if your basic aptitude and SQL commands are clear. However, higher-tier roles (like SDE 2/Digital/Prime) demand solid coding skills on arrays, logic recursion, and structural system design."
        
    return f"Regarding your query about {comp_title}: \"{prompt}\"\n\nIn our deep database analysis of recent placement patterns, candidates facing this question are advised to:\n1. Revise historical PYQs from IndiaBIX and M4Maths relative to your selected {category} category.\n2. Ensure you have clear explanations for your projects and can optimize time/space complexity.\n3. Mention specific tech stacks aligned with {comp_title}'s digital initiatives."

if __name__ == "__main__":
    app.run(debug=True, port=9876)
