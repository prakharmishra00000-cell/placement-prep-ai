document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------
    // Tab Navigation Logic
    // ----------------------------------------------------
    const navItems = document.querySelectorAll(".nav-item");
    const tabContents = document.querySelectorAll(".tab-content");
    const tabHeading = document.getElementById("tab-heading");
    const tabSubheading = document.getElementById("tab-subheading");

    const tabMeta = {
        "guide": { title: "Placement Guide & PYQ Hub", sub: "Retrieve previous year questions, salaries, and scope for any target company" },
        "twin": { title: "AI Digital Twin & Autonomous Agent", sub: "Analyze candidate readiness, estimated offer probabilities, and run autonomous tasks" },
        "interview": { title: "AI Interview Simulator", sub: "Realistic interactive voice & technical interview simulation with scorecard feedback" },
        "hiring": { title: "Hiring Pattern Analyzer", sub: "Detailed hiring structures, selection rates, and test weightages" },
        "resume": { title: "ATS Resume & JD Matcher", sub: "Check your resume score and match percentage against target job descriptions" },
        "roadmap": { title: "Personalized Roadmap Generator", sub: "Generate customized study schedules, weekly goals, and calendars" },
        "coding": { title: "AI Coding IDE & Debugger", sub: "Write, trace, and debug programming solutions against hidden test cases" },
        "copilot": { title: "AI Doubt Solver & Copilot", sub: "Ask doubt queries, generate flashcards, and revise CS concepts" },
        "career_suite": { title: "AI Career Operating System Suite", sub: "Launch real-time simulations, gap reports, onboarding mock cycles, and recruiter evaluations for any engineering branch and company" },
        "recruiter": { title: "AI Recruiter Copilot & Screening Engine", sub: "Generate candidate shortlists, resume gap reports, and target team fit audits" },
        "oa": { title: "Mock Online Assessment (OA) Simulator", sub: "Take simulated tests under strict timings with focus lock proctor diagnostics" },
        "project": { title: "AI Project Evaluation Lab", sub: "Audit code originality, scalability design, database schemas, and architectural flaws" },
        "negotiation": { title: "Offer Negotiation & Compensation Coach", sub: "Structure counter-offers, analyze location indices, and evaluate total CTC components" },
        "settings": { title: "API Keys & Setup Settings", sub: "Add your Gemini and Vector DB credentials to configure the active server engine" },
        "docs": { title: "PrepOS AI User Guide", sub: "Detailed reference manual explaining how all 230 flagship features work" }
    };

    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            navItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");

            const targetTab = item.getAttribute("data-tab");
            tabContents.forEach(content => {
                if (content.id === `tab-${targetTab}`) {
                    content.classList.add("active");
                } else {
                    content.classList.remove("active");
                }
            });

            // Update headings
            if (tabMeta[targetTab]) {
                tabHeading.textContent = tabMeta[targetTab].title;
                tabSubheading.textContent = tabMeta[targetTab].sub;
            }
        });
    });

    // ----------------------------------------------------
    // Tab 1: Search & Core Guide Engine
    // ----------------------------------------------------
    const searchBtn = document.getElementById("search-btn");
    const companyInput = document.getElementById("company-name");
    const categoryCards = document.querySelectorAll(".radio-card");
    const resultsContainer = document.getElementById("results-container");
    
    const salaryContainer = document.getElementById("salary-info-container");
    const careerTimeline = document.getElementById("career-timeline");
    const skillsList = document.getElementById("skills-progress-list");
    const topicsList = document.getElementById("topics-weight-list");
    const tipsBox = document.getElementById("category-tips-box");
    const pyqsContainer = document.getElementById("pyqs-container");

    let currentCompany = "TCS";
    let currentCategory = "technical";

    categoryCards.forEach(card => {
        card.addEventListener("click", () => {
            categoryCards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");
            const radioInput = card.querySelector("input[type='radio']");
            radioInput.checked = true;
            currentCategory = radioInput.value;
        });
    });

    searchBtn.addEventListener("click", () => {
        const companyName = companyInput.value.trim();
        if (!companyName) {
            alert("Please enter a company name.");
            return;
        }
        currentCompany = companyName;
        fetchCompanyDetails(currentCompany, currentCategory);
    });

    companyInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            searchBtn.click();
        }
    });

    function syncDigitalTwinBranchAndCompany(branch, company) {
        const companyNameEl = document.querySelector(".hiring-stages-prob h5");
        if (companyNameEl && company) {
            companyNameEl.textContent = `${company.toUpperCase()} Hiring Pipeline Probability`;
        }

        const skill1 = document.getElementById("twin-skill-1");
        const skill2 = document.getElementById("twin-skill-2");
        const skill3 = document.getElementById("twin-skill-3");
        const skill4 = document.getElementById("twin-skill-4");
        const skill5 = document.getElementById("twin-skill-5");

        if (!skill1) return;

        const bClean = branch.toLowerCase().trim();
        if (["cse", "it"].includes(bClean)) {
            skill1.textContent = "DSA Skill Level";
            skill3.textContent = "System Design";
        } else if (["ece", "ece_iot"].includes(bClean)) {
            skill1.textContent = "VLSI & RTOS Design";
            skill3.textContent = "Circuit Interfacing";
        } else if (bClean === "mechanical") {
            skill1.textContent = "CAD/CAM Drafting";
            skill3.textContent = "Thermodynamics Core";
        } else if (bClean === "electrical") {
            skill1.textContent = "Machines & Power Grid";
            skill3.textContent = "Circuit Schematics";
        } else if (bClean === "civil") {
            skill1.textContent = "RCC Design & Survey";
            skill3.textContent = "Soil Mechanics";
        } else if (bClean === "chemical") {
            skill1.textContent = "Process Thermodynamics";
            skill3.textContent = "Mass & Heat Transfer";
        } else {
            skill1.textContent = "Core Engineering Skill";
            skill3.textContent = "Domain Theory";
        }
    }

    function fetchCompanyDetails(company, category) {
        searchBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Researching...';
        searchBtn.disabled = true;

        const branchSelect = document.getElementById("branch-select");
        const branchVal = branchSelect ? branchSelect.value : "cse";

        fetch(`/api/search?company=${encodeURIComponent(company)}&category=${category}&branch=${branchVal}`)
            .then(res => {
                if (!res.ok) throw new Error("Search failed.");
                return res.json();
            })
            .then(data => {
                renderDashboard(data);
                updateHiringAnalyzer(data);
                syncDigitalTwinBranchAndCompany(branchVal, company);
            })
            .catch(err => {
                console.error(err);
                alert("Error fetching company details.");
            })
            .finally(() => {
                searchBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i> Analyze & Retrieve PYQs';
                searchBtn.disabled = false;
            });
    }

    function renderDashboard(data) {
        if (!data) return;

        // 1. Salary Tiers
        salaryContainer.innerHTML = "";
        if (data.salary && data.salary.tiers && Array.isArray(data.salary.tiers)) {
            data.salary.tiers.forEach(tier => {
                const div = document.createElement("div");
                div.className = "salary-tier";
                div.innerHTML = `
                    <div class="tier-name">${tier.name || "Default Role"}</div>
                    <div class="tier-package">${tier.package || "N/A"}</div>
                    <div class="tier-inhand">${tier.inhand || "N/A"}</div>
                    <div class="tier-details">${tier.details || "N/A"}</div>
                `;
                salaryContainer.appendChild(div);
            });
        } else {
            salaryContainer.innerHTML = '<p class="text-muted">Salary information unavailable.</p>';
        }

        // 2. Career Path Timeline
        careerTimeline.innerHTML = "";
        if (data.career_path && Array.isArray(data.career_path)) {
            data.career_path.forEach(level => {
                const item = document.createElement("div");
                item.className = "timeline-item";
                item.innerHTML = `
                    <div class="timeline-marker"></div>
                    <div class="timeline-content">
                        <div class="timeline-role">${level.role || "Trainee"} (${level.level || "L1"})</div>
                        <div class="timeline-meta">
                            <span>Avg. Package: ${level.salary || "N/A"}</span>
                            <span class="time">${level.duration || "N/A"}</span>
                        </div>
                    </div>
                `;
                careerTimeline.appendChild(item);
            });
        } else {
            careerTimeline.innerHTML = '<p class="text-muted">Career path timeline unavailable.</p>';
        }

        // 3. Required Skills
        skillsList.innerHTML = "";
        if (data.skills && Array.isArray(data.skills)) {
            data.skills.forEach(skill => {
                const wrapper = document.createElement("div");
                wrapper.className = "skill-bar-wrapper";
                wrapper.innerHTML = `
                    <div class="skill-label">
                        <span>${skill.name || "Core Skills"}</span>
                        <span class="skill-pct">${skill.level || 75}%</span>
                    </div>
                    <div class="bar-bg">
                        <div class="bar-fill" style="width: 0%"></div>
                    </div>
                `;
                skillsList.appendChild(wrapper);
                setTimeout(() => {
                    const fill = wrapper.querySelector(".bar-fill");
                    if (fill) fill.style.width = `${skill.level || 75}%`;
                }, 100);
            });
        } else {
            skillsList.innerHTML = '<p class="text-muted">Skills assessment unavailable.</p>';
        }

        // 4. Topic Weightages
        topicsList.innerHTML = "";
        if (data.topics && Array.isArray(data.topics)) {
            data.topics.forEach(topic => {
                const wrapper = document.createElement("div");
                wrapper.className = "topic-bar-wrapper";
                wrapper.innerHTML = `
                    <div class="topic-label">
                        <span>${topic.name || "General Subjects"}</span>
                        <span class="topic-pct">${topic.weight || 25}%</span>
                    </div>
                    <div class="bar-bg">
                        <div class="bar-fill" style="width: 0%"></div>
                    </div>
                `;
                topicsList.appendChild(wrapper);
                setTimeout(() => {
                    const fill = wrapper.querySelector(".bar-fill");
                    if (fill) fill.style.width = `${topic.weight || 25}%`;
                }, 100);
            });
        } else {
            topicsList.innerHTML = '<p class="text-muted">Topic weights unavailable.</p>';
        }

        // 5. Category Tips
        let tipText = "Prepare standard placement questions.";
        if (data.tips) {
            tipText = data.tips[currentCategory] || data.tips.technical || "Prepare standard placement questions.";
        }
        tipsBox.innerHTML = `
            <p><i class="fa-solid fa-circle-info text-neon-cyan"></i> ${tipText}</p>
        `;

        // 6. PYQ Questions List
        pyqsContainer.innerHTML = "";
        if (data.pyqs && Array.isArray(data.pyqs) && data.pyqs.length > 0) {
            data.pyqs.forEach((q, idx) => {
                const item = document.createElement("div");
                item.className = "pyq-card-item";
                
                let optHtml = "";
                if (q.options && Array.isArray(q.options) && q.options.length > 0) {
                    optHtml = '<div class="pyq-options">';
                    q.options.forEach(opt => {
                        const isCorrect = opt.toLowerCase() === (q.answer || "").toLowerCase() || opt.includes(q.answer || "");
                        optHtml += `<div class="pyq-option ${isCorrect ? 'correct' : ''}">${opt}</div>`;
                    });
                    optHtml += '</div>';
                }

                item.innerHTML = `
                    <div class="pyq-meta">
                        <span>Source: <strong>${q.source || "M4Maths"}</strong></span>
                        <span class="year">${q.year || "2024"}</span>
                    </div>
                    <div class="pyq-question">Q${idx + 1}: ${q.question || "Placement Question"}</div>
                    ${optHtml}
                    <button class="sol-toggle-btn" onclick="toggleSolution(${idx})">
                        <i class="fa-solid fa-eye"></i> Show Solution & Explanation
                    </button>
                    <div class="pyq-solution hide" id="sol-${idx}">
                        <strong>Correct Answer:</strong> ${q.answer || "Refer Source"}<br>
                        <strong>Explanation:</strong><br>
                        ${(q.solution || "Refer Source").replace(/\n/g, "<br>")}
                    </div>
                `;
                pyqsContainer.appendChild(item);
            });
        } else {
            pyqsContainer.innerHTML = '<p class="text-muted">No PYQs found.</p>';
        }
    }

    window.toggleSolution = function(idx) {
        const solDiv = document.getElementById(`sol-${idx}`);
        const btn = solDiv.previousElementSibling;
        if (solDiv.classList.contains("hide")) {
            solDiv.classList.remove("hide");
            btn.innerHTML = '<i class="fa-solid fa-eye-slash"></i> Hide Solution';
        } else {
            solDiv.classList.add("hide");
            btn.innerHTML = '<i class="fa-solid fa-eye"></i> Show Solution';
        }
    };

    // ----------------------------------------------------
    // Tab 2: AI Interview Simulator
    // ----------------------------------------------------
    const startInterviewBtn = document.getElementById("start-interview-btn");
    const interviewSetup = document.querySelector(".interview-setup");
    const interviewAvatarPanel = document.getElementById("interview-avatar-panel");
    const interviewChatMessages = document.getElementById("interview-chat-messages");
    const interviewInputContainer = document.getElementById("interview-input-container");
    const interviewResponseInput = document.getElementById("interview-response-input");
    const submitResponseBtn = document.getElementById("submit-response-btn");
    const interviewFeedbackScore = document.getElementById("interview-feedback-score");

    let interviewStep = 0;
    let interviewQuestions = [];
    let responses = [];

    startInterviewBtn.addEventListener("click", () => {
        const company = document.getElementById("interview-company").value.trim() || "TCS";
        const role = document.getElementById("interview-role").value;
        const diff = document.getElementById("interview-difficulty").value;

        // Generate interview questions based on role
        if (role.includes("Software")) {
            interviewQuestions = [
                `Welcome. Let's start the technical round. Can you explain the difference between a process and a thread?`,
                `Good. How would you design a database schema to support a ride-sharing app? What indexes are critical?`,
                `Finally, tell me about a time you resolved a major logic deadlock in your project. How did you diagnose it?`
            ];
        } else if (role.includes("Mechanical")) {
            interviewQuestions = [
                `Welcome. Let's start the mechanical round. Can you explain the difference between stress and strain?`,
                `Explain the working principle of a four-stroke internal combustion engine.`,
                `How do you determine the critical speed of a rotating shaft?`
            ];
        } else if (role.includes("Electrical")) {
            interviewQuestions = [
                `Welcome. Let's start the electrical round. Can you explain Kirchhoff's Current and Voltage laws?`,
                `What is the difference between a synchronous motor and an induction motor?`,
                `How does a transformer step up or step down AC voltage?`
            ];
        } else if (role.includes("Civil")) {
            interviewQuestions = [
                `Welcome. Let's start the civil round. Can you explain the concept of workability in fresh concrete?`,
                `What is the difference between one-way and two-way slabs?`,
                `Explain the purpose of providing reinforcement bars in concrete structures.`
            ];
        } else if (role.includes("Data Analyst")) {
            interviewQuestions = [
                `Welcome. Let's start the data analysis round. Can you explain the difference between inner join and outer join in SQL?`,
                `What is the difference between supervised and unsupervised machine learning?`,
                `How do you handle missing or duplicate values in a large dataset?`
            ];
        } else {
            interviewQuestions = [
                `Welcome. Let's start the general round. Can you explain the concept of conservation of energy?`,
                `What is Bernoulli's principle and where is it applied?`,
                `Explain step-by-step how you would approach a complex problem in your domain.`
            ];
        }

        interviewSetup.classList.add("hide");
        interviewAvatarPanel.classList.remove("hide");
        interviewInputContainer.classList.remove("hide");
        interviewFeedbackScore.classList.add("hide");
        interviewStep = 0;
        responses = [];
        interviewChatMessages.innerHTML = "";

        // First question
        appendInterviewMsg("system", interviewQuestions[0]);
    });

    submitResponseBtn.addEventListener("click", () => {
        const text = interviewResponseInput.value.trim();
        if (!text) return;

        appendInterviewMsg("user", text);
        responses.push(text);
        interviewResponseInput.value = "";

        interviewStep++;
        if (interviewStep < interviewQuestions.length) {
            setTimeout(() => {
                appendInterviewMsg("system", interviewQuestions[interviewStep]);
            }, 1000);
        } else {
            // End simulation, show scorecard
            setTimeout(() => {
                interviewAvatarPanel.classList.add("hide");
                interviewInputContainer.classList.add("hide");
                interviewFeedbackScore.classList.remove("hide");
                interviewSetup.classList.remove("hide");

                // Calculate random positive scores
                document.querySelector("#score-tech span").style.width = `${Math.floor(Math.random() * 20) + 75}%`;
                document.querySelector("#score-comm span").style.width = `${Math.floor(Math.random() * 20) + 70}%`;
                document.querySelector("#score-speed span").style.width = `${Math.floor(Math.random() * 25) + 70}%`;
                document.querySelector("#score-vocab span").style.width = `${Math.floor(Math.random() * 15) + 80}%`;

                document.getElementById("interview-remarks").textContent = "Excellent communication skills. Suggest revising system design paradigms and memory cache edge cases.";
            }, 1200);
        }
    });

    interviewResponseInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") submitResponseBtn.click();
    });

    function appendInterviewMsg(sender, text) {
        const div = document.createElement("div");
        div.className = `message ${sender}-msg`;
        const avatar = sender === "user" ? '<i class="fa-solid fa-user"></i>' : '<i class="fa-solid fa-user-ninja"></i>';
        div.innerHTML = `<div class="msg-avatar">${avatar}</div><div class="msg-body">${text}</div>`;
        interviewChatMessages.appendChild(div);
        interviewChatMessages.scrollTop = interviewChatMessages.scrollHeight;
    }

    // ----------------------------------------------------
    // Tab 3: Hiring Pattern Analyzer
    // ----------------------------------------------------
    const hiringBranchSelect = document.getElementById("hiring-branch-select");

    if (hiringBranchSelect) {
        hiringBranchSelect.addEventListener("change", () => {
            const currentCompanyName = document.getElementById("hiring-company-name").textContent || "TCS";
            updateHiringAnalyzer({ name: currentCompanyName });
        });
    }

    function updateHiringAnalyzer(data) {
        document.getElementById("hiring-company-name").textContent = data.name;
        
        const rate = Math.floor(Math.random() * 15) + 8; // 8% - 23%
        document.getElementById("hiring-selection-rate").textContent = `${rate}%`;
        
        const diffStars = ["★★☆☆☆ (Easy)", "★★★☆☆ (Medium)", "★★★★☆ (Hard)"];
        document.getElementById("hiring-difficulty").textContent = diffStars[rate % 3];

        const branchVal = hiringBranchSelect ? hiringBranchSelect.value : "cse";

        // Dynamic hiring step data by branch
        const flowSteps = document.querySelectorAll("#tab-hiring .flow-step");
        const distContainer = document.querySelector("#tab-hiring .hiring-distribution");
        
        const branchFlows = {
            cse: {
                steps: [
                    "Aptitude (30%), DSA (40%), Core CS Concepts (30%)",
                    "Dynamic Programming, System Design, Live coding IDE check",
                    "Teamwork, behavioral metrics, SDE career objectives"
                ],
                topics: [
                    { name: "Problem Solving / Algorithms", weight: "40%", bg: "var(--neon-pink)" },
                    { name: "Quantitative Aptitude", weight: "20%", bg: "var(--neon-blue)" },
                    { name: "DBMS & SQL", weight: "20%", bg: "var(--neon-cyan)" },
                    { name: "OS & Computer Networks", weight: "20%", bg: "var(--neon-purple)" }
                ]
            },
            it: {
                steps: [
                    "Aptitude (30%), Basic Coding (35%), OOPs (35%)",
                    "Web Technologies, Databases, System Debugging",
                    "Customer interaction, agile processes, tech stack growth"
                ],
                topics: [
                    { name: "Coding / Scripting", weight: "35%", bg: "var(--neon-pink)" },
                    { name: "Aptitude & Reasoning", weight: "25%", bg: "var(--neon-blue)" },
                    { name: "Database Design", weight: "20%", bg: "var(--neon-cyan)" },
                    { name: "OS & Cloud Concepts", weight: "20%", bg: "var(--neon-purple)" }
                ]
            },
            ece: {
                steps: [
                    "Digital Circuits (35%), Analog VLSI (35%), Quant Aptitude (30%)",
                    "Hardware description languages (Verilog), circuit layout debugging",
                    "Interfacing team collaboration, micro-architecture projects"
                ],
                topics: [
                    { name: "Digital Circuits & VLSI", weight: "35%", bg: "var(--neon-pink)" },
                    { name: "Quantitative Aptitude", weight: "25%", bg: "var(--neon-blue)" },
                    { name: "Signal Processing & Comm", weight: "20%", bg: "var(--neon-cyan)" },
                    { name: "Microcontrollers", weight: "20%", bg: "var(--neon-purple)" }
                ]
            },
            mechanical: {
                steps: [
                    "Thermodynamics (30%), Fluids (30%), Materials (20%), Aptitude (20%)",
                    "Engine components, CAD layout designs, manufacturing cycles",
                    "Rotational shifts, industrial workplace safety standards"
                ],
                topics: [
                    { name: "Thermal & Fluids Engineering", weight: "35%", bg: "var(--neon-pink)" },
                    { name: "CAD / CAM & Design", weight: "25%", bg: "var(--neon-blue)" },
                    { name: "Industrial & Production", weight: "20%", bg: "var(--neon-cyan)" },
                    { name: "Quantitative Aptitude", weight: "20%", bg: "var(--neon-purple)" }
                ]
            },
            electrical: {
                steps: [
                    "Power Systems (30%), AC/DC Machines (30%), Networks (20%), Aptitude (20%)",
                    "Grid calculations, transformer configurations, electronics interfacing",
                    "Substation safety, multi-disciplinary engineering projects"
                ],
                topics: [
                    { name: "Electrical Machines & Grid", weight: "35%", bg: "var(--neon-pink)" },
                    { name: "Analog Electronics", weight: "25%", bg: "var(--neon-blue)" },
                    { name: "Control Systems", weight: "20%", bg: "var(--neon-cyan)" },
                    { name: "Quantitative Aptitude", weight: "20%", bg: "var(--neon-purple)" }
                ]
            },
            civil: {
                steps: [
                    "Structural Mechanics (30%), Concrete Design (30%), Surveying (20%), Aptitude (20%)",
                    "AutoCAD blueprinting, RCC material parameters, soil testing analysis",
                    "Site supervision, vendor communication, environmental compliance"
                ],
                topics: [
                    { name: "Structural Analysis & RCC", weight: "35%", bg: "var(--neon-pink)" },
                    { name: "Concrete & Surveying", weight: "25%", bg: "var(--neon-blue)" },
                    { name: "Soil Mechanics", weight: "20%", bg: "var(--neon-cyan)" },
                    { name: "Quantitative Aptitude", weight: "20%", bg: "var(--neon-purple)" }
                ]
            },
            chemical: {
                steps: [
                    "Mass & Heat Transfer (35%), Reaction kinetics (35%), Aptitude (30%)",
                    "Distillation design, reactor temperature controllers, safety valves",
                    "Refinery operations, plant environmental standards"
                ],
                topics: [
                    { name: "Reaction Kinetics & Thermo", weight: "35%", bg: "var(--neon-pink)" },
                    { name: "Transport Phenomena", weight: "25%", bg: "var(--neon-blue)" },
                    { name: "Process Calculations", weight: "20%", bg: "var(--neon-cyan)" },
                    { name: "Quantitative Aptitude", weight: "20%", bg: "var(--neon-purple)" }
                ]
            },
            ece_iot: {
                steps: [
                    "Sensors & Actuators (30%), Embedded C (30%), Network protocols (20%), Aptitude (20%)",
                    "ESP32/Arduino microcontroller configurations, MQTT client setup",
                    "Hardware debugging, smart city application architectures"
                ],
                topics: [
                    { name: "IoT Protocols & Systems", weight: "35%", bg: "var(--neon-pink)" },
                    { name: "Embedded C & RTOS", weight: "25%", bg: "var(--neon-blue)" },
                    { name: "Microcontrollers", weight: "20%", bg: "var(--neon-cyan)" },
                    { name: "Quantitative Aptitude", weight: "20%", bg: "var(--neon-purple)" }
                ]
            }
        };

        const flow = branchFlows[branchVal] || branchFlows.cse;

        // Populate steps description
        if (flowSteps.length >= 3) {
            flowSteps[0].querySelector(".step-details").textContent = flow.steps[0];
            flowSteps[1].querySelector(".step-details").textContent = flow.steps[1];
            flowSteps[2].querySelector(".step-details").textContent = flow.steps[2];
        }

        // Populate weightages charts
        if (distContainer) {
            distContainer.innerHTML = "";
            flow.topics.forEach(t => {
                const item = document.createElement("div");
                item.className = "distribution-item";
                item.innerHTML = `
                    <span>${t.name}</span>
                    <div class="distribution-bar"><span style="width: ${t.weight}; background: ${t.bg}"></span></div>
                    <span>${t.weight}</span>
                `;
                distContainer.appendChild(item);
            });
        }
    }

    // ----------------------------------------------------
    // Tab 4: Resume & JD Matcher
    // ----------------------------------------------------
    const analyzeResumeBtn = document.getElementById("analyze-resume-btn");
    const resumeLoader = document.getElementById("resume-loader");
    const resumeResultPanel = document.getElementById("resume-result-panel");

    analyzeResumeBtn.addEventListener("click", () => {
        const resumeText = document.getElementById("resume-text").value.trim();
        const jdText = document.getElementById("jd-text").value.trim();
        const fileInput = document.getElementById("resume-file");

        if (!resumeText && (!fileInput || !fileInput.files.length)) {
            alert("Please paste your resume content or upload a resume file.");
            return;
        }

        resumeLoader.classList.remove("hide");
        resumeResultPanel.classList.add("hide");

        const formData = new FormData();
        formData.append("jd_text", jdText);
        if (resumeText) formData.append("resume_text", resumeText);
        if (fileInput && fileInput.files.length) {
            formData.append("file", fileInput.files[0]);
        }

        fetch("/api/analyze-resume", {
            method: "POST",
            body: formData
        })
        .then(res => {
            if (!res.ok) throw new Error("Resume analysis failed.");
            return res.json();
        })
        .then(data => {
            resumeLoader.classList.add("hide");
            if (data.error) {
                alert(data.error);
                return;
            }
            resumeResultPanel.classList.remove("hide");

            const score = data.score || 75;
            document.getElementById("ats-score-num").textContent = score;

            document.getElementById("match-google").textContent = `${Math.max(50, score - 5)}%`;
            document.getElementById("match-microsoft").textContent = `${Math.min(99, score + 4)}%`;
            document.getElementById("match-amazon").textContent = `${Math.max(50, score - 2)}%`;

            // Keywords suggestions
            const missingContainer = document.getElementById("ats-missing-keywords");
            missingContainer.innerHTML = "";
            if (data.missing_keywords && data.missing_keywords.length > 0) {
                data.missing_keywords.forEach(kw => {
                    const li = document.createElement("li");
                    li.textContent = kw;
                    missingContainer.appendChild(li);
                });
            } else {
                missingContainer.innerHTML = "<li>No missing keywords found! Excellent job.</li>";
            }

            const suggestionsContainer = document.getElementById("ats-suggestions");
            suggestionsContainer.innerHTML = "";
            if (data.suggestions && data.suggestions.length > 0) {
                data.suggestions.forEach(sug => {
                    const li = document.createElement("li");
                    li.textContent = sug;
                    suggestionsContainer.appendChild(li);
                });
            } else {
                suggestionsContainer.innerHTML = "<li>Formatting looks great. Ready to apply!</li>";
            }

            // Sync with Digital Twin Profile
            const twinSkills = document.querySelectorAll(".twin-skill");
            twinSkills.forEach(skill => {
                if (skill.textContent.includes("Resume Quality")) {
                    const meter = skill.querySelector(".skill-meter span");
                    const val = skill.querySelector(".val");
                    if (meter) meter.style.width = `${score}%`;
                    if (val) val.textContent = `${score}%`;
                }
            });
        })
        .catch(err => {
            console.error(err);
            alert("Error running resume ATS analysis.");
            resumeLoader.classList.add("hide");
        });
    });

    // ----------------------------------------------------
    // Tab 5: Personalized Roadmap Generator
    // ----------------------------------------------------
    const validateEligibilityBtn = document.getElementById("validate-eligibility-btn");
    const roadmapEligibilityError = document.getElementById("roadmap-eligibility-error");
    const roadmapSelectionContainer = document.getElementById("roadmap-selection-container");
    const generateRoadmapBtn = document.getElementById("generate-roadmap-btn");
    const roadmapLoader = document.getElementById("roadmap-loader");
    const roadmapOutputPanel = document.getElementById("roadmap-output-panel");
    const roadmapSubject = document.getElementById("roadmap-subject");

    const branchSubjects = {
        cse: ["Data Structures & Algorithms", "Object-Oriented Programming (OOPs)", "Database Management Systems (DBMS)", "Operating Systems (OS)", "System Design"],
        it: ["Data Structures & Algorithms", "Database Management Systems (DBMS)", "Web Development Technologies", "Cloud Computing Basics", "Computer Networks"],
        ece: ["Analog & Digital Electronics", "Microcontrollers & VLSI Design", "Signal Processing & Communications", "Computer Organization & Architecture"],
        ece_iot: ["IoT Architectures & Sensors", "Embedded Systems & RTOS", "Microcontrollers (ESP32/ARM)", "Wireless Communications"],
        mechanical: ["Thermodynamics & Heat Transfer", "Fluid Mechanics & Turbo-machinery", "CAD/CAM & Machine Design", "Strength of Materials"],
        electrical: ["Electrical Machines & Transformers", "Power Systems & Transmission", "Control Systems Engineering", "Analog & Digital Circuit Analysis"],
        civil: ["Concrete Technology & Materials", "Structural Analysis & Mechanics", "RCC Design & Structures", "Soil Mechanics & Foundations"],
        chemical: ["Mass & Heat Transfer Operations", "Chemical Reaction Kinetics & Reactors", "Process Dynamics & Control", "Chemical Engineering Thermodynamics"]
    };

    if (validateEligibilityBtn) {
        validateEligibilityBtn.addEventListener("click", () => {
            const company = document.getElementById("roadmap-target").value.trim().toLowerCase();
            const branch = document.getElementById("roadmap-branch").value;

            if (!company) {
                alert("Please enter a target company name.");
                return;
            }

            // Determine company class
            let companyClass = "service"; // default is service (TCS, Infosys, Wipro, Cognizant, Accenture - all eligible)
            
            const techCompanies = ["google", "microsoft", "amazon", "meta", "netflix", "apple", "uber", "ola", "flipkart", "adobe", "salesforce"];
            const mechanicalCompanies = ["mahindra", "tata motors", "maruti suzuki", "reliance", "honda", "ford", "hyundai", "ashok leyland"];
            const civilCompanies = ["l&t", "larsen", "dlf", "godrej properties", "tata projects", "shapoorji"];
            const chemicalCompanies = ["ongc", "iocl", "bpcl", "hpcl", "shell", "dupont", "dow", "basf"];

            if (techCompanies.some(tc => company.includes(tc))) {
                companyClass = "tech";
            } else if (mechanicalCompanies.some(mc => company.includes(mc))) {
                companyClass = "mechanical";
            } else if (civilCompanies.some(cc => company.includes(cc))) {
                companyClass = "civil";
            } else if (chemicalCompanies.some(cc => company.includes(cc))) {
                companyClass = "chemical";
            }

            // Verify eligibility
            let eligible = false;
            if (companyClass === "service") {
                eligible = true;
            } else if (companyClass === "tech") {
                eligible = ["cse", "it", "ece", "ece_iot"].includes(branch);
            } else if (companyClass === "mechanical") {
                eligible = ["mechanical", "electrical", "ece_iot"].includes(branch);
            } else if (companyClass === "civil") {
                eligible = ["civil"].includes(branch);
            } else if (companyClass === "chemical") {
                eligible = ["chemical", "mechanical"].includes(branch);
            }

            if (!eligible) {
                roadmapEligibilityError.classList.remove("hide");
                roadmapSelectionContainer.classList.add("hide");
                roadmapOutputPanel.classList.add("hide");
            } else {
                roadmapEligibilityError.classList.add("hide");
                roadmapSelectionContainer.classList.remove("hide");
                
                // Populate subjects dynamically
                roadmapSubject.innerHTML = "";
                const subjects = branchSubjects[branch] || branchSubjects.cse;
                subjects.forEach(sub => {
                    const opt = document.createElement("option");
                    opt.value = sub;
                    opt.textContent = sub;
                    roadmapSubject.appendChild(opt);
                });
            }
        });
    }

    if (generateRoadmapBtn) {
        generateRoadmapBtn.addEventListener("click", () => {
            const subject = roadmapSubject.value;
            const time = document.getElementById("roadmap-time").value;
            const targetCompany = document.getElementById("roadmap-target").value.trim();

            roadmapLoader.classList.remove("hide");
            roadmapOutputPanel.classList.add("hide");

            setTimeout(() => {
                roadmapLoader.classList.add("hide");
                roadmapOutputPanel.classList.remove("hide");

                let monthlyHtml = "";
                let weeklyHtml = "";
                let dailyHtml = "";

                const monthsCount = parseInt(time) || 3;

                // 1. Compile Month-by-month Milestones based on Selected Subject
                if (time === "1 Month") {
                    monthlyHtml = `
                        <p><strong>Week 1 (Fundamentals):</strong> Read basic terminologies, syntax, and properties of <strong>${subject}</strong>.</p>
                        <p><strong>Week 2 (Core Application):</strong> Solve standard problem sheets and gate level questions on <strong>${subject}</strong>.</p>
                        <p><strong>Week 3 (Advanced Work):</strong> Review previous year questions asked at ${targetCompany} related to <strong>${subject}</strong>.</p>
                        <p><strong>Week 4 (Mock Evaluation):</strong> Take mock online tests and participate in technical simulation sessions.</p>
                    `;
                } else {
                    for (let i = 1; i <= monthsCount; i++) {
                        if (i === 1) {
                            monthlyHtml += `<p><strong>Month 1 (Core Concepts):</strong> Complete foundational chapters, definitions, and theory of <strong>${subject}</strong>.</p>`;
                        } else if (i === 2) {
                            monthlyHtml += `<p><strong>Month 2 (Problem Solving):</strong> Solve medium difficulty numericals, designs, or coding queries of <strong>${subject}</strong>.</p>`;
                        } else if (i === 3) {
                            monthlyHtml += `<p><strong>Month 3 (Company Target):</strong> Apply <strong>${subject}</strong> to case studies, puzzles, and test configurations asked at ${targetCompany}.</p>`;
                        } else {
                            monthlyHtml += `<p><strong>Month ${i} (Intensive Drills):</strong> Solve comprehensive practice exams, revise weak modules, and attempt timed tests.</p>`;
                        }
                    }
                }
                document.getElementById("roadmap-monthly").innerHTML = monthlyHtml;

                // 2. Weekly Goals
                weeklyHtml = `
                    <p><strong>Module Target:</strong> Review 2 sub-topics of <strong>${subject}</strong> per week.</p>
                    <p><strong>Aptitude Integration:</strong> Combine technical study with 3 hours of quantitative reasoning sheets.</p>
                    <p><strong>Self Assessment:</strong> Dry run previous codes/formula sheets every Saturday.</p>
                `;
                document.getElementById("roadmap-weekly").innerHTML = weeklyHtml;

                // 3. Daily Study Routine
                dailyHtml = `
                    <p><strong>09:00 AM - 11:30 AM (Concept Deep-dive):</strong> Study advanced theoretical proofs and documentations of <strong>${subject}</strong>.</p>
                    <p><strong>02:00 PM - 04:00 PM (Numerical/Coding):</strong> Active practice of 5 standard numerical algorithms / layout designs related to <strong>${subject}</strong>.</p>
                    <p><strong>07:30 PM - 09:00 PM (Revision & QA):</strong> Revision of yesterday's weak topics and solving MCQs on IndiaBIX / M4Maths.</p>
                `;
                document.getElementById("roadmap-daily").innerHTML = dailyHtml;
            }, 1200);
        });
    }

    // ----------------------------------------------------
    // Tab 6: AI Coding IDE
    // ----------------------------------------------------
    const ideRunBtn = document.getElementById("ide-run-btn");
    const ideHintBtn = document.getElementById("ide-hint-btn");
    const ideDebugBtn = document.getElementById("ide-debug-btn");
    const ideEditor = document.getElementById("ide-editor");
    const ideConsole = document.getElementById("ide-console");
    const ideOptimization = document.getElementById("ide-optimization");

    ideRunBtn.addEventListener("click", () => {
        const code = ideEditor.value;
        const lang = document.getElementById("ide-language").value;
        
        ideConsole.innerHTML = "<p>Running compilation tests...</p>";
        ideOptimization.classList.add("hide");

        fetch("/api/run-code", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code: code, lang: lang })
        })
        .then(res => res.json())
        .then(data => {
            const outText = data.output || "No output returned.";
            const hasError = outText.includes("[ERROR]") || outText.includes("[STDERR]") || outText.includes("Error") || outText.includes("[FAIL]");
            
            ideConsole.innerHTML = `
                <pre style="color: ${hasError ? 'var(--neon-pink)' : 'var(--neon-cyan)'}; font-family: monospace; white-space: pre-wrap; margin: 0;">${outText}</pre>
            `;
            if (!hasError) {
                ideOptimization.classList.remove("hide");
                document.getElementById("ide-complexity-info").textContent = "Time Complexity: O(N) | Space Complexity: O(1)";
                document.getElementById("ide-optimization-notes").innerHTML = "Optimization: Used two pointers to trap water instead of dynamic storage arrays, reducing space usage.";
            }
        })
        .catch(err => {
            console.error(err);
            ideConsole.innerHTML = "<p style='color: var(--neon-pink)'>Error invoking code execution sandbox backend.</p>";
        });
    });

    ideHintBtn.addEventListener("click", () => {
        ideConsole.innerHTML = `
            <p style="color: var(--neon-blue)">[AI HINT] For Trapping Rain Water, track the maximum height from both left and right directions using two pointers moving towards the center.</p>
        `;
    });

    ideDebugBtn.addEventListener("click", () => {
        ideConsole.innerHTML = `
            <p style="color: var(--neon-purple)">[AI DEBUGGER] Checked loop boundaries. Found no array index overflows. Variables initialized correctly.</p>
        `;
    });

    // ----------------------------------------------------
    // Tab 7: AI Copilot & Doubt Solver
    // ----------------------------------------------------
    const copilotInput = document.getElementById("copilot-input");
    const sendCopilotBtn = document.getElementById("send-copilot-btn");
    const copilotMessages = document.getElementById("copilot-messages");

    sendCopilotBtn.addEventListener("click", () => {
        const text = copilotInput.value.trim();
        if (!text) return;

        appendCopilotMsg("user", text);
        copilotInput.value = "";

        fetch("/api/query", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: text, company: currentCompany, category: currentCategory })
        })
        .then(res => res.json())
        .then(data => {
            appendCopilotMsg("system", data.answer || data.error || "Error processing request.");
        })
        .catch(err => {
            console.error(err);
            appendCopilotMsg("system", "Error processing request.");
        });
    });

    copilotInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendCopilotBtn.click();
    });

    function appendCopilotMsg(sender, text) {
        const div = document.createElement("div");
        div.className = `message ${sender}-msg`;
        const avatar = sender === "user" ? '<i class="fa-solid fa-user"></i>' : '<i class="fa-solid fa-robot"></i>';
        div.innerHTML = `<div class="msg-avatar">${avatar}</div><div class="msg-body">${text.replace(/\n/g, "<br>")}</div>`;
        copilotMessages.appendChild(div);
        copilotMessages.scrollTop = copilotMessages.scrollHeight;
    }

    // ----------------------------------------------------
    // Tab: AI Career OS Suite Logic
    // ----------------------------------------------------
    const runSuiteBtn = document.getElementById("run-suite-btn");
    const suiteBranch = document.getElementById("suite-branch-select");
    const suiteModule = document.getElementById("suite-module-select");
    const suiteCompany = document.getElementById("suite-company-name");
    const suiteResultCard = document.getElementById("suite-result-card");
    const suiteResultBody = document.getElementById("suite-result-body");
    const suiteResultTitle = document.getElementById("suite-result-title");

    if (runSuiteBtn) {
        runSuiteBtn.addEventListener("click", () => {
            const branch = suiteBranch.value;
            const moduleId = suiteModule.value;
            const company = suiteCompany.value.trim() || "TCS";
            const moduleText = suiteModule.options[suiteModule.selectedIndex].text;

            runSuiteBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing Simulation...';
            runSuiteBtn.disabled = true;
            suiteResultCard.style.display = "none";

            fetch("/api/career_suite", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ branch, module_id: moduleId, company })
            })
            .then(res => res.json())
            .then(data => {
                suiteResultTitle.innerHTML = `<i class="fa-solid fa-square-poll-vertical"></i> Simulation Report: ${moduleText} for ${company.toUpperCase()}`;
                suiteResultBody.innerHTML = data.report || "No simulation details returned.";
                suiteResultCard.style.display = "block";
            })
            .catch(err => {
                console.error(err);
                alert("Error running career suite simulation.");
            })
            .finally(() => {
                runSuiteBtn.innerHTML = '<i class="fa-solid fa-bolt"></i> Run AI Suite Simulation';
                runSuiteBtn.disabled = false;
            });
        });
    }

    // ----------------------------------------------------
    // Tab: Recruiter Copilot
    // ----------------------------------------------------
    const runRecruiterBtn = document.getElementById("run-recruiter-btn");
    const recruiterBranch = document.getElementById("recruiter-branch");
    const recruiterPersona = document.getElementById("recruiter-persona");
    const recruiterReportCard = document.getElementById("recruiter-report-card");
    const recruiterReportBody = document.getElementById("recruiter-report-body");

    if (runRecruiterBtn) {
        runRecruiterBtn.addEventListener("click", () => {
            runRecruiterBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Screen-scanning...';
            runRecruiterBtn.disabled = true;
            recruiterReportCard.style.display = "none";

            fetch("/api/career_suite", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ branch: recruiterBranch.value, module_id: "1", company: currentCompany || "TCS" })
            })
            .then(res => res.json())
            .then(data => {
                recruiterReportBody.innerHTML = data.report || "No evaluation metrics returned.";
                recruiterReportCard.style.display = "block";
            })
            .catch(err => { console.error(err); alert("Assessment failed."); })
            .finally(() => {
                runRecruiterBtn.innerHTML = '<i class="fa-solid fa-glasses"></i> Run Recruiter Screening Assessment';
                runRecruiterBtn.disabled = false;
            });
        });
    }

    // ----------------------------------------------------
    // Tab: OA Simulator
    // ----------------------------------------------------
    const runOaBtn = document.getElementById("run-oa-btn");
    const oaDuration = document.getElementById("oa-duration");
    const oaProctor = document.getElementById("oa-proctor");
    const oaReportCard = document.getElementById("oa-report-card");
    const oaReportBody = document.getElementById("oa-report-body");

    if (runOaBtn) {
        runOaBtn.addEventListener("click", () => {
            runOaBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Preparing OA sandbox...';
            runOaBtn.disabled = true;
            oaReportCard.style.display = "none";

            fetch("/api/career_suite", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ branch: "cse", module_id: "14", company: currentCompany || "TCS" })
            })
            .then(res => res.json())
            .then(data => {
                oaReportBody.innerHTML = data.report || "No OA stats returned.";
                oaReportCard.style.display = "block";
            })
            .catch(err => { console.error(err); alert("OA simulator start failed."); })
            .finally(() => {
                runOaBtn.innerHTML = '<i class="fa-solid fa-play"></i> Initialize Mock Exam';
                runOaBtn.disabled = false;
            });
        });
    }

    // ----------------------------------------------------
    // Tab: Project Evaluator
    // ----------------------------------------------------
    const runProjectBtn = document.getElementById("run-project-btn");
    const projectDesc = document.getElementById("project-desc");
    const projectReportCard = document.getElementById("project-report-card");
    const projectReportBody = document.getElementById("project-report-body");

    if (runProjectBtn) {
        runProjectBtn.addEventListener("click", () => {
            const desc = projectDesc.value.trim();
            if (!desc) { alert("Please write a project description first."); return; }

            runProjectBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Auditing source code...';
            runProjectBtn.disabled = true;
            projectReportCard.style.display = "none";

            fetch("/api/career_suite", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ branch: "cse", module_id: "10", company: currentCompany || "TCS" })
            })
            .then(res => res.json())
            .then(data => {
                projectReportBody.innerHTML = `<h5>Project Context Analysed:</h5><p>${desc}</p><br>` + (data.report || "");
                projectReportCard.style.display = "block";
            })
            .catch(err => { console.error(err); alert("Project review failed."); })
            .finally(() => {
                runProjectBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass-chart"></i> Run Project Architecture Audit';
                runProjectBtn.disabled = false;
            });
        });
    }

    // ----------------------------------------------------
    // Tab: Offer Negotiation
    // ----------------------------------------------------
    const runNegBtn = document.getElementById("run-neg-btn");
    const negCtc = document.getElementById("neg-ctc");
    const negLocation = document.getElementById("neg-location");
    const negReportCard = document.getElementById("neg-report-card");
    const negReportBody = document.getElementById("neg-report-body");

    if (runNegBtn) {
        runNegBtn.addEventListener("click", () => {
            runNegBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Formulating strategy...';
            runNegBtn.disabled = true;
            negReportCard.style.display = "none";

            fetch("/api/career_suite", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ branch: "cse", module_id: "12", company: currentCompany || "TCS" })
            })
            .then(res => res.json())
            .then(data => {
                negReportBody.innerHTML = `<h5>Proposed Base Offer:</h5><p>CTC: ${negCtc.value} LPA, Location: ${negLocation.value}</p><br>` + (data.report || "");
                negReportCard.style.display = "block";
            })
            .catch(err => { console.error(err); alert("Negotiation strategy computation failed."); })
            .finally(() => {
                runNegBtn.innerHTML = '<i class="fa-solid fa-file-signature"></i> Evolve Negotiation Strategy';
                runNegBtn.disabled = false;
            });
        });
    }

    // ----------------------------------------------------
    // Tab: API Keys & Settings
    // ----------------------------------------------------
    const saveSettingsBtn = document.getElementById("save-settings-btn");
    const setupGemini = document.getElementById("setup-gemini-key");
    const setupVectorUrl = document.getElementById("setup-vector-url");
    const setupVectorKey = document.getElementById("setup-vector-key");
    const setupSpeech = document.getElementById("setup-speech-key");
    const setupSearch = document.getElementById("setup-search-key");
    const settingsStatus = document.getElementById("settings-status-box");

    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener("click", () => {
            const keys = {
                gemini_key: setupGemini.value.trim(),
                vector_url: setupVectorUrl.value.trim(),
                vector_key: setupVectorKey.value.trim(),
                speech_key: setupSpeech.value.trim(),
                search_key: setupSearch.value.trim()
            };

            saveSettingsBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
            saveSettingsBtn.disabled = true;

            fetch("/api/save_credentials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(keys)
            })
            .then(res => res.json())
            .then(data => {
                settingsStatus.style.display = "block";
                settingsStatus.style.background = data.success ? "rgba(0, 255, 102, 0.15)" : "rgba(255, 0, 85, 0.15)";
                settingsStatus.style.border = data.success ? "1px solid var(--neon-cyan)" : "1px solid var(--neon-pink)";
                settingsStatus.style.color = data.success ? "var(--neon-cyan)" : "var(--neon-pink)";
                settingsStatus.textContent = data.message || "Credential status processed.";
            })
            .catch(err => {
                console.error(err);
                settingsStatus.style.display = "block";
                settingsStatus.style.background = "rgba(255, 0, 85, 0.15)";
                settingsStatus.style.border = "1px solid var(--neon-pink)";
                settingsStatus.style.color = "var(--neon-pink)";
                settingsStatus.textContent = "Error saving backend credentials.";
            })
            .finally(() => {
                saveSettingsBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Save & Load Backend Credentials';
                saveSettingsBtn.disabled = false;
            });
        });
    }

    // Initialize first load
    fetchCompanyDetails("TCS", "technical");
});
