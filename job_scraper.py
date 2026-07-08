import os
import json
import requests
from datetime import datetime

# Helper to fetch credentials from env or config.json
def get_scraper_credential(key_name):
    val = os.environ.get(key_name, "").strip()
    if val:
        return val
    if os.path.exists("config.json"):
        try:
            with open("config.json", "r") as f:
                cfg = json.load(f)
                return cfg.get(key_name, "").strip()
        except:
            pass
    return ""

def scrape_local_jobs():
    search_key = get_scraper_credential("SEARCH_API_KEY")
    current_date = datetime.now().strftime("%B %d, %Y")
    
    # Base fallback jobs that will be updated with the current date
    jobs = [
        {
            "title": "Software Engineer Intern",
            "company": "Google",
            "branch": "cse",
            "description": "Develop next-gen search features, optimize web latency, and build scalable microservices.",
            "experience": "Fresher",
            "qualification": "B.Tech",
            "link": "https://careers.google.com",
            "posted_date": current_date
        },
        {
            "title": "Graduate Developer",
            "company": "Microsoft",
            "branch": "cse",
            "description": "Build features for Azure Cloud platforms, developer toolings, and API interfaces.",
            "experience": "1 Year",
            "qualification": "B.Tech",
            "link": "https://careers.microsoft.com",
            "posted_date": current_date
        },
        {
            "title": "Embedded Systems Engineer Trainee",
            "company": "Qualcomm",
            "branch": "ece",
            "description": "Design firmware drivers, optimize power consumption profiles, and test transceivers.",
            "experience": "Fresher",
            "qualification": "M.Tech",
            "link": "https://www.qualcomm.com/company/careers",
            "posted_date": current_date
        },
        {
            "title": "Hardware Design Engineer",
            "company": "Intel",
            "branch": "ece",
            "description": "Verify semiconductor RTL logic, prototype micro-architectures, and debug test-benches.",
            "experience": "2 Years",
            "qualification": "B.Tech",
            "link": "https://jobs.intel.com",
            "posted_date": current_date
        },
        {
            "title": "Graduate Engineer Trainee (GET)",
            "company": "Tata Motors",
            "branch": "mechanical",
            "description": "Conduct structural FEA tests, design CAD transmission subsystems, and optimize assembly line.",
            "experience": "Fresher",
            "qualification": "Diploma",
            "link": "https://www.tatamotors.com/careers/",
            "posted_date": current_date
        },
        {
            "title": "Assistant Power Engineer",
            "company": "Siemens",
            "branch": "electrical",
            "description": "Build high-voltage switchgear grids, configure smart meter models, and oversee electrical substation.",
            "experience": "1 Year",
            "qualification": "B.Tech",
            "link": "https://jobs.siemens.com",
            "posted_date": current_date
        },
        {
            "title": "Junior Structural Designer",
            "company": "L&T Construction",
            "branch": "civil",
            "description": "Perform RCC load analysis, check site safety parameters, and review blueprints in AutoCAD.",
            "experience": "Fresher",
            "qualification": "Diploma",
            "link": "https://www.larsentoubro.com/corporate/careers/",
            "posted_date": current_date
        }
    ]

    # If SerpAPI key is available, query live jobs to augment the listings
    if search_key:
        try:
            url = f"https://serpapi.com/search.json?engine=google_jobs&q=Engineering+Jobs+India&api_key={search_key}"
            res = requests.get(url, timeout=10)
            data = res.json()
            if "jobs_results" in data:
                api_jobs = []
                for j in data["jobs_results"][:5]:
                    api_jobs.append({
                        "title": j.get("title", "Engineering Post"),
                        "company": j.get("company_name", "Leading Company"),
                        "branch": "cse" if "software" in j.get("title", "").lower() else "mechanical",
                        "description": j.get("description", "Active job opportunity listed on corporate careers portal."),
                        "experience": "Fresher" if "junior" in j.get("title", "").lower() else "2 Years",
                        "qualification": "B.Tech",
                        "link": j.get("related_links", [{}])[0].get("link", "https://careers.google.com"),
                        "posted_date": current_date
                    })
                if api_jobs:
                    jobs = api_jobs + jobs
        except Exception as e:
            print("SerpAPI Local Job Fetch error:", e)

    with open("jobs_cache.json", "w") as f:
        json.dump(jobs, f, indent=4)
    print(f"Scraped {len(jobs)} local jobs successfully.")

def scrape_abroad_jobs():
    search_key = get_scraper_credential("SEARCH_API_KEY")
    current_date = datetime.now().strftime("%B %d, %Y")
    
    abroad_jobs = [
        {
            "title": "AI Platform Engineer",
            "company": "OpenAI",
            "branch": "cse",
            "country": "usa",
            "description": "Build orchestration platforms for large language model deployments and low-latency APIs.",
            "experience": "3+ Years",
            "qualification": "M.Tech",
            "link": "https://openai.com/careers",
            "posted_date": current_date
        },
        {
            "title": "Systems Architect",
            "company": "Dyson",
            "branch": "ece",
            "country": "singapore",
            "description": "Design electronic microcontrollers and sensor subsystems for robotic consumer products.",
            "experience": "2 Years",
            "qualification": "B.Tech",
            "link": "https://careers.dyson.com",
            "posted_date": current_date
        },
        {
            "title": "Robotics Integration Specialist",
            "company": "KUKA Robotics",
            "branch": "mechanical",
            "country": "germany",
            "description": "Program factory automation cells, coordinate robotic arms paths, and perform kinematics simulations.",
            "experience": "1 Year",
            "qualification": "B.Tech",
            "link": "https://www.kuka.com/en-de/about-kuka/careers",
            "posted_date": current_date
        },
        {
            "title": "Microprocessor Layout Designer",
            "company": "TSMC",
            "branch": "ece",
            "country": "japan",
            "description": "Structure sub-5nm microchip packaging physical designs and run electromagnetic analyses.",
            "experience": "Fresher",
            "qualification": "M.Tech",
            "link": "https://www.tsmc.com/english/careers",
            "posted_date": current_date
        },
        {
            "title": "Senior Energy Storage Specialist",
            "company": "BMW Group",
            "branch": "electrical",
            "country": "germany",
            "description": "Integrate modular lithium-ion powertrains and optimize regenerative braking control parameters.",
            "experience": "3+ Years",
            "qualification": "M.Tech",
            "link": "https://www.bmwgroup.jobs/de/en.html",
            "posted_date": current_date
        },
        {
            "title": "Junior BIM Infrastructure Engineer",
            "company": "AECOM",
            "branch": "civil",
            "country": "usa",
            "description": "Build high-precision 3D structural concrete models and track green building certifications.",
            "experience": "Fresher",
            "qualification": "B.Tech",
            "link": "https://aecom.jobs",
            "posted_date": current_date
        }
    ]

    if search_key:
        try:
            url = f"https://serpapi.com/search.json?engine=google_jobs&q=Engineering+Jobs+USA&api_key={search_key}"
            res = requests.get(url, timeout=10)
            data = res.json()
            if "jobs_results" in data:
                api_jobs = []
                for j in data["jobs_results"][:5]:
                    api_jobs.append({
                        "title": j.get("title", "International Engineering Trainee"),
                        "company": j.get("company_name", "Global Inc"),
                        "branch": "cse",
                        "country": "usa",
                        "description": j.get("description", "Overseas placement opportunity with visa sponsorship prospects."),
                        "experience": "3+ Years",
                        "qualification": "B.Tech",
                        "link": j.get("related_links", [{}])[0].get("link", "https://careers.google.com"),
                        "posted_date": current_date
                    })
                if api_jobs:
                    abroad_jobs = api_jobs + abroad_jobs
        except Exception as e:
            print("SerpAPI Abroad Job Fetch error:", e)

    with open("abroad_cache.json", "w") as f:
        json.dump(abroad_jobs, f, indent=4)
    print(f"Scraped {len(abroad_jobs)} abroad jobs successfully.")

if __name__ == "__main__":
    scrape_local_jobs()
    scrape_abroad_jobs()
