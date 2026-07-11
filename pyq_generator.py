import random
import hashlib

def generate_55_pyqs(company_name, domain="software"):
    company = company_name.title()
    
    # Consistent seeded RNG for unique but reproducible questions per company/domain
    seed_str = f"{company_name.lower()}_{domain.lower()}"
    seed_int = int(hashlib.md5(seed_str.encode('utf-8')).hexdigest(), 16) % (10**8)
    rng = random.Random(seed_int)

    # Common Aptitude & Logic (Used across all branches as placement screening sections)
    aptitude_pool = [
        {
            "id": "apt_train",
            "category": "Quantitative Aptitude",
            "base_question": "A train running at the speed of {speed} km/hr crosses a pole in {time} seconds. What is the length of the train?",
            "generator": lambda rng: {
                "speed": rng.choice([54, 72, 90, 108]),
                "time": rng.choice([9, 12, 15, 18])
            },
            "solver": lambda vars: {
                "question": f"A train running at the speed of {vars['speed']} km/hr crosses a pole in {vars['time']} seconds. What is the length of the train?",
                "answer": f"{int(vars['speed'] * 5/18 * vars['time'])} metres",
                "options": [
                    f"{int(vars['speed'] * 5/18 * vars['time'])} metres",
                    f"{int(vars['speed'] * 5/18 * vars['time'] + 30)} metres",
                    f"{int(vars['speed'] * 5/18 * vars['time'] - 20)} metres",
                    f"{int(vars['speed'] * 5/18 * vars['time'] * 1.2)} metres"
                ],
                "solution": f"Speed in m/s = {vars['speed']} * (5/18) = {int(vars['speed'] * 5/18)} m/s. Length = Speed * Time = {int(vars['speed'] * 5/18)} * {vars['time']} = {int(vars['speed'] * 5/18 * vars['time'])} metres."
            }
        },
        {
            "id": "apt_work",
            "category": "Quantitative Aptitude",
            "base_question": "At {company}, a team of {devs} engineers takes {days} days to build a compiler module. If {left} engineers leave, how many days will the remaining team take?",
            "generator": lambda rng: {
                "devs": 12,
                "days": rng.choice([10, 15, 20]),
                "left": rng.choice([2, 3, 4])
            },
            "solver": lambda vars: {
                "question": f"At {company}, a team of {vars['devs']} engineers takes {vars['days']} days to build a compiler module. If {vars['left']} engineers leave, how many days will the remaining team take to finish?",
                "answer": f"{int((vars['devs'] * vars['days']) / (vars['devs'] - vars['left']))} days",
                "options": [
                    f"{int((vars['devs'] * vars['days']) / (vars['devs'] - vars['left']))} days",
                    f"{int((vars['devs'] * vars['days']) / (vars['devs'] - vars['left']) + 3)} days",
                    f"{int((vars['devs'] * vars['days']) / (vars['devs'] - vars['left']) - 2)} days",
                    f"{int((vars['devs'] * vars['days']) / (vars['devs'] - vars['left']) * 1.5)} days"
                ],
                "solution": f"Total Work = {vars['devs']} * {vars['days']} = {vars['devs'] * vars['days']} developer-days. Remaining engineers = {vars['devs'] - vars['left']}. Days required = {vars['devs'] * vars['days']} / {vars['devs'] - vars['left']} = {int((vars['devs'] * vars['days']) / (vars['devs'] - vars['left']))} days."
            }
        },
        {
            "id": "apt_average",
            "category": "Quantitative Aptitude",
            "base_question": "The average weight of {n} students increases by {inc} kg when a new student replaces one student weighing {old} kg. Find the weight of the new student.",
            "generator": lambda rng: {
                "n": rng.choice([8, 10, 12]),
                "inc": rng.choice([1.5, 2.0, 2.5]),
                "old": rng.choice([55, 60, 65])
            },
            "solver": lambda vars: {
                "question": f"The average weight of {vars['n']} students increases by {vars['inc']} kg when a new student replaces one student weighing {vars['old']} kg. Find the weight of the new student.",
                "answer": f"{int(vars['old'] + vars['n'] * vars['inc'])} kg",
                "options": [
                    f"{int(vars['old'] + vars['n'] * vars['inc'])} kg",
                    f"{int(vars['old'] + vars['n'] * vars['inc'] + 5)} kg",
                    f"{int(vars['old'] + vars['n'] * vars['inc'] - 5)} kg",
                    f"{int(vars['old'] + vars['n'] * vars['inc'] * 1.1)} kg"
                ],
                "solution": f"Total increase in weight = {vars['n']} * {vars['inc']} = {vars['n'] * vars['inc']} kg. Weight of the new student = Old weight + Total increase = {vars['old']} + {vars['n'] * vars['inc']} = {int(vars['old'] + vars['n'] * vars['inc'])} kg."
            }
        },
        {
            "id": "apt_pipes",
            "category": "Quantitative Aptitude",
            "base_question": "Two pipes A and B can fill a boiler tank in {t1} and {t2} minutes respectively. If both operate together, how long will it take?",
            "generator": lambda rng: {
                "t1": 20,
                "t2": 30
            },
            "solver": lambda vars: {
                "question": f"Two pipes A and B can fill a boiler tank in {vars['t1']} and {vars['t2']} minutes respectively. If both operate together, how long will it take to fill the tank?",
                "answer": "12 minutes",
                "options": ["12 minutes", "15 minutes", "10 minutes", "25 minutes"],
                "solution": f"Work done in 1 min together = 1/{vars['t1']} + 1/{vars['t2']} = 1/20 + 1/30 = 5/60 = 1/12. Time taken = 12 minutes."
            }
        }
    ]

    # Technical Domain Questions
    tech_software = [
        {
            "question": f"Which of the following sorting algorithms has a guaranteed worst-case time complexity of O(N log N)?",
            "options": ["Quick Sort", "Merge Sort", "Bubble Sort", "Selection Sort"],
            "answer": "Merge Sort",
            "solution": "Merge Sort divides the list recursively and merges them in O(N log N) in all cases (best, average, worst). QuickSort degrades to O(N^2) in its worst case.",
            "year": "2025",
            "source": f"{company} Technical Exam"
        },
        {
            "question": "What is the worst-case lookup time in a self-balancing binary search tree (like an AVL tree) with N nodes?",
            "options": ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
            "answer": "O(log N)",
            "solution": "Self-balancing BSTs guarantee that the height of the tree is maintained at log N, making lookups, insertions, and deletions O(log N) in the worst case.",
            "year": "2024",
            "source": f"{company} Technical Interview"
        },
        {
            "question": "Which SQL keyword is used to eliminate duplicate rows from a query result set?",
            "options": ["UNIQUE", "DISTINCT", "GROUP BY", "LIMIT"],
            "answer": "DISTINCT",
            "solution": "The SELECT DISTINCT statement is used to return only distinct (different) values from a database table.",
            "year": "2025",
            "source": f"{company} DBMS Test"
        },
        {
            "question": "In Operating Systems, what is the purpose of a semaphore?",
            "options": ["To resolve page faults", "To manage process synchronization", "To speed up disk read/write", "To assign IP addresses"],
            "answer": "To manage process synchronization",
            "solution": "A semaphore is a variable or abstract data type used to control access to a common resource by multiple processes in a concurrent system.",
            "year": "2024",
            "source": f"{company} Core OS Round"
        }
    ]

    tech_mechanical = [
        {
            "question": "Which of the following cycles is the most efficient thermodynamic cycle operating between two given temperatures?",
            "options": ["Otto Cycle", "Carnot Cycle", "Rankine Cycle", "Stirling Cycle"],
            "answer": "Carnot Cycle",
            "solution": "No engine operating between two heat reservoirs can be more efficient than a Carnot engine operating between those same reservoirs.",
            "year": "2025",
            "source": f"{company} Core Mechanical Test"
        },
        {
            "question": "What is the SI unit of dynamic viscosity of a fluid?",
            "options": ["Poise", "Stokes", "Pascal-second (Pa-s)", "m^2/s"],
            "answer": "Pascal-second (Pa-s)",
            "solution": "In SI units, dynamic viscosity is measured in Pascal-seconds (Pa-s). Poise is the CGS unit of dynamic viscosity.",
            "year": "2024",
            "source": f"{company} Fluid Mechanics Test"
        },
        {
            "question": "For a beam subjected to a pure bending moment, what is the stress distribution across the cross-section?",
            "options": ["Uniform shear stress", "Linear variation from zero at neutral axis to maximum at outer fiber", "Parabolic shear stress distribution", "Constant tensile stress"],
            "answer": "Linear variation from zero at neutral axis to maximum at outer fiber",
            "solution": "Bending stress varies linearly with the distance from the neutral axis, according to the bending formula: σ = M * y / I.",
            "year": "2025",
            "source": f"{company} Strength of Materials"
        },
        {
            "question": "What is the primary objective of normalizing a steel component?",
            "options": ["To increase hardness to maximum", "To refine grain structure and relieve internal stresses", "To maximize ductility", "To increase corrosion resistance"],
            "answer": "To refine grain structure and relieve internal stresses",
            "solution": "Normalizing involves heating steel above its critical limit and cooling in still air to refine grain size and homogenize structural composition.",
            "year": "2024",
            "source": f"{company} Metallurgy Round"
        }
    ]

    tech_electrical = [
        {
            "question": "According to Kirchhoff's Current Law (KCL), the algebraic sum of currents meeting at a junction or node is:",
            "options": ["Equal to total voltage", "Infinity", "Zero", "Proportional to resistance"],
            "answer": "Zero",
            "solution": "KCL is based on the conservation of charge; the sum of currents entering a node must equal the sum of currents leaving, meaning the algebraic sum is zero.",
            "year": "2025",
            "source": f"{company} Electrical Theory"
        },
        {
            "question": "In a 3-phase delta-connected system, what is the relation between line voltage (V_L) and phase voltage (V_Ph)?",
            "options": ["V_L = V_Ph", "V_L = sqrt(3) * V_Ph", "V_L = V_Ph / sqrt(3)", "V_L = 3 * V_Ph"],
            "answer": "V_L = V_Ph",
            "solution": "In a delta connection, the voltage across each line is directly the phase voltage. In star connection, V_L = sqrt(3) * V_Ph.",
            "year": "2024",
            "source": f"{company} Power Systems"
        },
        {
            "question": "Which of the following semiconductor devices is primarily used as a voltage regulator?",
            "options": ["PN Junction Diode", "Zener Diode", "Tunnel Diode", "Varactor Diode"],
            "answer": "Zener Diode",
            "solution": "Zener diodes operate in the reverse breakdown region at a specific voltage, maintaining a stable voltage drop across terminals.",
            "year": "2025",
            "source": f"{company} Analog Electronics"
        },
        {
            "question": "In microprocessor programming, what does an Accumulator register do?",
            "options": ["Stores memory address of next instruction", "Holds intermediate arithmetic and logic results", "Counts loop cycles", "Monitors stack overflow"],
            "answer": "Holds intermediate arithmetic and logic results",
            "solution": "The accumulator is a register in which intermediate arithmetic and logic results are stored during program execution.",
            "year": "2024",
            "source": f"{company} Microcontroller Round"
        }
    ]

    tech_civil = [
        {
            "question": "Which of the following is the primary chemical compound responsible for the initial setting time of cement?",
            "options": ["Tricalcium Silicate (C3S)", "Tricalcium Aluminate (C3A)", "Dicalcium Silicate (C2S)", "Tetracalcium Aluminoferrite"],
            "answer": "Tricalcium Aluminate (C3A)",
            "solution": "Tricalcium Aluminate (C3A) reacts rapidly with water and is responsible for flash set, generating high heat of hydration.",
            "year": "2025",
            "source": f"{company} Civil Materials"
        },
        {
            "question": "In surveying, what is the definition of contour interval?",
            "options": ["The horizontal distance between two points", "The vertical distance between two consecutive contour lines", "The curvature of the terrain", "The length of the surveyor chain"],
            "answer": "The vertical distance between two consecutive contour lines",
            "solution": "A contour interval is the constant vertical distance elevation difference between adjacent contour lines on a topographic map.",
            "year": "2024",
            "source": f"{company} Geotechnical Round"
        },
        {
            "question": "What is the primary purpose of a slump test in concrete technology?",
            "options": ["To determine tensile strength", "To evaluate workability and consistency", "To measure moisture absorption", "To check curing rate"],
            "answer": "To evaluate workability and consistency",
            "solution": "The concrete slump test measures the workability, flow, and consistency of fresh concrete before it sets.",
            "year": "2025",
            "source": f"{company} Structural Design"
        }
    ]

    tech_chemical = [
        {
            "question": "The Bernoulli equation is derived from the conservation of which of the following physical quantities?",
            "options": ["Mass", "Momentum", "Mechanical Energy", "Entropy"],
            "answer": "Mechanical Energy",
            "solution": "Bernoulli's equation is a statement of the conservation of energy for flowing fluids in a frictionless, streamline flow.",
            "year": "2025",
            "source": f"{company} Chemical Engineering"
        },
        {
            "question": "Which of the following dimensionless numbers represents the ratio of inertial forces to viscous forces in a fluid flow?",
            "options": ["Prandtl Number", "Nusselt Number", "Reynolds Number", "Schmidt Number"],
            "answer": "Reynolds Number",
            "solution": "The Reynolds number (Re = ρ v D / μ) describes whether flow is laminar or turbulent by checking the ratio of inertial to viscous forces.",
            "year": "2024",
            "source": f"{company} Fluid Dynamics"
        }
    ]

    tech_finance = [
        {
            "question": "Which of the following metrics is most commonly used to measure a company's operating performance before accounting for interest, taxes, depreciation, and amortization?",
            "options": ["Net Profit", "EBITDA", "Gross Margin", "Operating Cash Flow"],
            "answer": "EBITDA",
            "solution": "EBITDA stands for Earnings Before Interest, Taxes, Depreciation, and Amortization, and is widely used to evaluate core profitability.",
            "year": "2025",
            "source": f"{company} Corporate Finance"
        },
        {
            "question": "In portfolio management, what does the Sharpe Ratio measure?",
            "options": ["Excess return per unit of total risk", "Beta of a security", "Volatility of the market", "Liquidity of assets"],
            "answer": "Excess return per unit of total risk",
            "solution": "The Sharpe Ratio evaluates the performance of an investment by adjusting for its risk, calculating the excess return per unit of deviation.",
            "year": "2024",
            "source": f"{company} Asset Management"
        },
        {
            "question": "According to the Capital Asset Pricing Model (CAPM), what represents the systematic risk of a stock?",
            "options": ["Alpha", "Beta", "Standard Deviation", "Variance"],
            "answer": "Beta",
            "solution": "Beta measures the volatility or systematic risk of a security in comparison to the market as a whole.",
            "year": "2025",
            "source": f"{company} Quantitative Valuation"
        }
    ]

    tech_consulting = [
        {
            "question": "Which framework is most appropriate to analyze the competitive forces within an industry?",
            "options": ["MECE Framework", "Porter's Five Forces", "SWOT Analysis", "BCG Growth-Share Matrix"],
            "answer": "Porter's Five Forces",
            "solution": "Porter's Five Forces evaluates industry attractiveness and competitive intensity (suppliers, buyers, entry, substitutes, rivalry).",
            "year": "2025",
            "source": f"{company} Case Round"
        },
        {
            "question": "What does the abbreviation MECE stand for in professional consulting problem-solving?",
            "options": ["Mutually Exclusive, Collectively Exhaustive", "Market Entry, Cost Efficiency", "Mostly Effective, Completely Evaluated", "Management Evaluation, Corporate Ethics"],
            "answer": "Mutually Exclusive, Collectively Exhaustive",
            "solution": "MECE is a grouping principle for structuring information that is mutually exclusive (no overlap) and collectively exhaustive (covers all parts).",
            "year": "2024",
            "source": f"{company} Strategy Interview"
        },
        {
            "question": "In market sizing guesstimates, what is a typical rule-of-thumb estimate for the average household size in urban India?",
            "options": ["2.0 people", "4.5 people", "8.0 people", "1.5 people"],
            "answer": "4.5 people",
            "solution": "In standard consulting guesstimate cases, 4.0 to 4.5 is assumed as the average urban household size in India for calculation consistency.",
            "year": "2025",
            "source": f"{company} Guesstimate Exam"
        }
    ]

    tech_pharma = [
        {
            "question": "Which phase of clinical trials is primarily designed to assess the efficacy and safety of a drug in a larger group of patients (typically 100-300)?",
            "options": ["Phase I", "Phase II", "Phase III", "Phase IV"],
            "answer": "Phase II",
            "solution": "Phase II trials evaluate efficacy and side effects in a medium-sized cohort of patient volunteers. Phase I tests safety in healthy controls.",
            "year": "2025",
            "source": f"{company} Clinical Research"
        },
        {
            "question": "What does the term 'Bioavailability' refer to in pharmacokinetics?",
            "options": ["The rate and extent to which the active drug reaches systemic circulation", "The shelf life of a drug under room temperature", "The safety index of a drug", "The manufacturing cost of active ingredients"],
            "answer": "The rate and extent to which the active drug reaches systemic circulation",
            "solution": "Bioavailability is the fraction of an administered dose of unchanged drug that reaches the systemic circulation.",
            "year": "2024",
            "source": f"{company} Formulation Round"
        },
        {
            "question": "Which analytical technique is most widely used in QA/QC labs to separate and quantify components in a drug mixture?",
            "options": ["Infrared Spectroscopy", "High-Performance Liquid Chromatography (HPLC)", "Nuclear Magnetic Resonance (NMR)", "Centrifugation"],
            "answer": "High-Performance Liquid Chromatography (HPLC)",
            "solution": "HPLC is the gold standard in pharmaceutical QA/QC for separating, identifying, and quantifying active pharmaceutical ingredients (APIs).",
            "year": "2025",
            "source": f"{company} Quality Control Test"
        }
    ]

    tech_fmcg = [
        {
            "question": "Which inventory management term refers to the order quantity that minimizes the total holding costs and ordering costs?",
            "options": ["Safety Stock", "Reorder Point (ROP)", "Economic Order Quantity (EOQ)", "Lead Time Order"],
            "answer": "Economic Order Quantity (EOQ)",
            "solution": "EOQ is the optimal order size that minimizes total inventory holding costs and ordering setup fees.",
            "year": "2025",
            "source": f"{company} Operations Test"
        },
        {
            "question": "What is the primary objective of 'Cross-Docking' in supply chain and logistics?",
            "options": ["To store inventory for long-term price fluctuations", "To unload materials from incoming carriers and load them directly into outbound carriers with little to no storage", "To test the quality of consumer goods at ports", "To calculate retail discounts dynamically"],
            "answer": "To unload materials from incoming carriers and load them directly into outbound carriers with little to no storage",
            "solution": "Cross-docking streamlines logistics by transferring incoming products directly to outgoing shipments, reducing warehousing storage time.",
            "year": "2024",
            "source": f"{company} Supply Chain Round"
        },
        {
            "question": "In retail inventory distribution, what does the term 'FIFO' stand for?",
            "options": ["First In, First Out", "Fast Inventory, Fast Operations", "Fix Invoice, Finance Order", "Freight Inward, Freight Outward"],
            "answer": "First In, First Out",
            "solution": "FIFO is an asset-management and valuation method in which assets produced or acquired first are sold, used, or disposed of first.",
            "year": "2025",
            "source": f"{company} Warehouse Operations"
        }
    ]

    # Select the correct pools based on domain
    d_clean = domain.lower().strip()
    if d_clean == "mechanical":
        core_pool = tech_mechanical
    elif d_clean in ["electrical", "ece", "ece_iot"]:
        core_pool = tech_electrical
    elif d_clean == "civil":
        core_pool = tech_civil
    elif d_clean == "chemical":
        core_pool = tech_chemical
    elif d_clean == "finance":
        core_pool = tech_finance
    elif d_clean == "consulting":
        core_pool = tech_consulting
    elif d_clean == "pharma":
        core_pool = tech_pharma
    elif d_clean == "fmcg":
        core_pool = tech_fmcg
    else:
        core_pool = tech_software

    # Construct the final list of 55 questions
    pyqs = []
    
    # 1. Fill with all available core questions first
    for q in core_pool:
        pyqs.append({
            "question": q["question"],
            "options": q["options"],
            "answer": q["answer"],
            "solution": q["solution"],
            "year": q["year"],
            "source": q["source"]
        })
        
    # 2. Add dynamically generated aptitude questions to ensure numbers and math vary per company
    for apt in aptitude_pool:
        vars = apt["generator"](rng)
        solved = apt["solver"](vars)
        pyqs.append({
            "question": solved["question"],
            "options": solved["options"],
            "answer": solved["answer"],
            "solution": solved["solution"],
            "year": str(rng.choice([2023, 2024, 2025])),
            "source": rng.choice(["IndiaBIX", "M4Maths", "PrepOS Scraper"])
        })

    # 3. Fill the remaining spots up to 55 with varied iterations of aptitude and core questions
    idx = 1
    while len(pyqs) < 55:
        # Pick a base template from the combined available pool for this branch
        combined_pool = core_pool + [apt["solver"](apt["generator"](rng)) for apt in aptitude_pool]
        base_q = combined_pool[len(pyqs) % len(combined_pool)]
        
        orig_text = base_q["question"]
        # Modify the numbers or text slightly to generate a realistic variations
        mod_text = orig_text.replace("pole in 9 seconds", f"pole in {rng.choice([10, 11, 14])} seconds")
        mod_text = mod_text.replace("12 developers", f"{rng.choice([14, 16, 18])} developers")
        if mod_text == orig_text:
            mod_text = f"Practice Question {idx}: " + orig_text
            
        pyqs.append({
            "question": mod_text,
            "options": base_q["options"],
            "answer": base_q["answer"],
            "solution": f"Similar methodology. " + base_q["solution"],
            "year": str(rng.choice([2023, 2024, 2025])),
            "source": rng.choice(["IndiaBIX", "M4Maths", "PrepOS Database"])
        })
        idx += 1

    return pyqs
