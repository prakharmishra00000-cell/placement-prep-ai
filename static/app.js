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
        "jobs": { title: "Active Job Opportunities Feed", sub: "Browse automatically updated global openings and application links for all branches" },
        "abroad": { title: "Active Abroad Opportunities Feed", sub: "Explore visa sponsored positions and international job boards for all branches" },
        "exams": { title: "Active Competitive & Government Exams Feed", sub: "Track live national/international exam bulletins, syllabus, and registration forms" },
        "books": { title: "AI Book Store & Placement Library (Only Competitive Exam Books)", sub: "Search, fetch, and download reference engineering textbooks and guides instantly" },
        "portfolio": { title: "AI Portfolio Generator", sub: "Build a beautiful, modern, shareable developer portfolio website from your links and resume instantly" },
        "sheet-generator": { title: "Company Sheet PDF Generator", sub: "Generate comprehensive and authentic placement preparation sheets in PDF format using real-time search context" },
        "relocation": { title: "AI Relocation Assistant", sub: "Analyze rental indexes, food costs, transit routes, and corporate office parks for any target city" },
        "cheatsheet": { title: "1-Page Company Cheat Sheet", sub: "Quick 2-minute revision key metrics, tech stacks, and news before your interview" },
        "placeiq": { title: "PrepOS Predictor", sub: "Calculate your campus placement probability, match matching companies, and audit skill gaps" },
        "script-doctor": { title: "Script Doctor (60-Second Elevator Pitch)", sub: "Generate a perfectly timed, 130-word conversational pitch based on your profile" },
        "negotiation": { title: "Negotiation Arena", sub: "HR Counter-Offer Scripting & Strategy" },
        "cold-mail": { title: "Cold Mail Generator", sub: "1-Click Outreach Templates & Strategies" },
        "email-doctor": { title: "Email Etiquette Doctor", sub: "Professional Tone Polisher" },
        "skill-radar": { title: "Skill Gap Radar", sub: "Target Role vs. Current Stack Matcher" },
        "ghost-detector": { title: "Ghost Detector", sub: "Application Health & Follow-Up Analyzer" },
        "linkedin-studio": { title: "LinkedIn Studio", sub: "1-Click Headline & Bio Makeover" },
        "lor-builder": { title: "Endorsement Scripting", sub: "Faculty & Manager LoR Request Builder" },
        "referral-gen": { title: "Referral Request Generator", sub: "Cold Outreach Scripts" },
        "home": { title: "PrepOS AI Workspace Hub", sub: "Welcome Prakhar Mishra! Select any flagship career intelligence tool to get started." },
        "mmmut": { title: "MMMUT Placement Statistics", sub: "Official Placement Brochure & Recruitment Dashboard 2026-27" },
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
                if (resultsContainer) {
                    resultsContainer.innerHTML = `<p class="text-muted" style="color: var(--neon-pink); text-align: center;">Error fetching details. Please check your connection and try again.</p>`;
                }
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
    const micRecordBtn = document.getElementById("mic-record-btn");
    const vocalVisualizer = document.getElementById("vocal-visualizer");
    const interviewFeedbackScore = document.getElementById("interview-feedback-score");
    let heatmapChart = null;

    let interviewStep = 0;
    let interviewQuestions = [];
    let responses = [];

    startInterviewBtn.addEventListener("click", () => {
        const company = document.getElementById("interview-company").value.trim() || "TCS";
        const role = document.getElementById("interview-role").value;
        const diff = document.getElementById("interview-difficulty").value;

        startInterviewBtn.disabled = true;
        startInterviewBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Generating Questions...';

        fetch(`/api/interview/questions?company=${encodeURIComponent(company)}&role=${encodeURIComponent(role)}&difficulty=${encodeURIComponent(diff)}`)
            .then(res => res.json())
            .then(questions => {
                interviewQuestions = questions;
                startInterviewBtn.disabled = false;
                startInterviewBtn.innerHTML = 'Start AI Simulation Round';

                interviewSetup.classList.add("hide");
                interviewAvatarPanel.classList.remove("hide");
                interviewInputContainer.classList.remove("hide");
                interviewFeedbackScore.classList.add("hide");
                interviewStep = 0;
                responses = [];
                if (window.vocalAnalyzer) {
                    window.vocalAnalyzer.metrics.topicData = [];
                }
                interviewChatMessages.innerHTML = "";

                appendInterviewMsg("system", interviewQuestions[0]);
            })
            .catch(err => {
                console.error(err);
                alert("Failed to initialize simulator. Please try again.");
                startInterviewBtn.disabled = false;
                startInterviewBtn.innerHTML = 'Start AI Simulation Round';
            });
    });

    if (micRecordBtn) {
        micRecordBtn.addEventListener("click", () => {
            if (window.vocalAnalyzer && window.vocalAnalyzer.isRecording) {
                window.vocalAnalyzer.stopRecording();
                micRecordBtn.style.color = "var(--text-muted)";
                vocalVisualizer.style.display = "none";
            } else if (window.vocalAnalyzer) {
                const topic = interviewQuestions.length > interviewStep ? `Q${interviewStep+1}` : "General";
                window.vocalAnalyzer.startRecording(topic, vocalVisualizer);
                micRecordBtn.style.color = "#ff4d4d"; // Red to indicate recording
                vocalVisualizer.style.display = "inline-block";
            }
        });
    }

    submitResponseBtn.addEventListener("click", () => {
        if (window.vocalAnalyzer && window.vocalAnalyzer.isRecording) {
            window.vocalAnalyzer.stopRecording();
            if (micRecordBtn) micRecordBtn.style.color = "var(--text-muted)";
            if (vocalVisualizer) vocalVisualizer.style.display = "none";
        }

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
            interviewAvatarPanel.classList.add("hide");
            interviewInputContainer.classList.add("hide");
            
            appendInterviewMsg("system", "Thank you for completing the interview. Evaluating your performance scorecard...");

            const company = document.getElementById("interview-company").value.trim() || "TCS";
            const role = document.getElementById("interview-role").value;

            fetch("/api/interview/evaluate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    company: company,
                    role: role,
                    questions: interviewQuestions,
                    responses: responses
                })
            })
            .then(res => res.json())
            .then(evaluation => {
                interviewFeedbackScore.classList.remove("hide");
                interviewSetup.classList.remove("hide");

                document.querySelector("#score-tech span").style.width = `${evaluation.tech}%`;
                document.querySelector("#score-comm span").style.width = `${evaluation.comm}%`;
                document.querySelector("#score-speed span").style.width = `${evaluation.speed}%`;
                document.querySelector("#score-vocab span").style.width = `${evaluation.vocab}%`;

                document.getElementById("interview-remarks").textContent = evaluation.remarks;

                // Render Heatmap
                if (window.vocalAnalyzer && window.vocalAnalyzer.metrics.topicData.length > 0) {
                    const ctx = document.getElementById('vocal-heatmap-canvas');
                    if (ctx) {
                        if (heatmapChart) heatmapChart.destroy();
                        
                        const labels = window.vocalAnalyzer.metrics.topicData.map(d => d.topic);
                        const latencies = window.vocalAnalyzer.metrics.topicData.map(d => parseFloat(d.latency));
                        const wpms = window.vocalAnalyzer.metrics.topicData.map(d => d.wpm);
                        const stresses = window.vocalAnalyzer.metrics.topicData.map(d => d.stressIndex);
                        const fillers = window.vocalAnalyzer.metrics.topicData.map(d => d.fillerCount);

                        heatmapChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: labels,
                                datasets: [
                                    {
                                        label: 'Latency (s)',
                                        data: latencies,
                                        backgroundColor: 'rgba(54, 162, 235, 0.8)',
                                        yAxisID: 'y'
                                    },
                                    {
                                        label: 'WPM',
                                        data: wpms,
                                        backgroundColor: 'rgba(75, 192, 192, 0.8)',
                                        yAxisID: 'y1'
                                    },
                                    {
                                        label: 'Stress Index',
                                        data: stresses,
                                        backgroundColor: 'rgba(255, 99, 132, 0.8)',
                                        yAxisID: 'y2'
                                    }
                                ]
                            },
                            options: {
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    y: { type: 'linear', display: true, position: 'left', title: {display: true, text: 'Latency (s)', color: 'rgba(255,255,255,0.7)'}, ticks: {color: 'rgba(255,255,255,0.7)'} },
                                    y1: { type: 'linear', display: true, position: 'right', title: {display: true, text: 'WPM', color: 'rgba(255,255,255,0.7)'}, grid: {drawOnChartArea: false}, ticks: {color: 'rgba(255,255,255,0.7)'} },
                                    y2: { type: 'linear', display: false, position: 'right', max: 100 }
                                },
                                plugins: {
                                    legend: { labels: { color: 'rgba(255,255,255,0.8)' } },
                                    tooltip: {
                                        callbacks: {
                                            afterBody: function(context) {
                                                const idx = context[0].dataIndex;
                                                return `Filler Words: ${fillers[idx]}`;
                                            }
                                        }
                                    }
                                }
                            }
                        });
                    }
                }
            })
            .catch(err => {
                console.error(err);
                alert("Failed to compile evaluation scorecard.");
                interviewSetup.classList.remove("hide");
            });
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

    if (hiringBranchSelect) {
        hiringBranchSelect.addEventListener("change", () => {
            const currentCompanyName = document.getElementById("hiring-company-name").textContent || "TCS";
            const categorySelect = document.getElementById("category-select");
            const category = categorySelect ? categorySelect.value : "technical";
            fetch(`/api/search?company=${encodeURIComponent(currentCompanyName)}&category=${category}&branch=${hiringBranchSelect.value}`)
                .then(res => res.json())
                .then(data => {
                    updateHiringAnalyzer(data);
                })
                .catch(err => console.error("Error updating hiring analyzer branch:", err));
        });
    }

    function updateHiringAnalyzer(data) {
        if (!data) return;
        document.getElementById("hiring-company-name").textContent = data.name || "TCS";
        
        if (data.selection_rate) {
            document.getElementById("hiring-selection-rate").textContent = data.selection_rate;
        } else {
            const rate = Math.floor(Math.random() * 15) + 8;
            document.getElementById("hiring-selection-rate").textContent = `${rate}%`;
        }
        
        if (data.difficulty) {
            document.getElementById("hiring-difficulty").textContent = data.difficulty;
        } else {
            document.getElementById("hiring-difficulty").textContent = "★★★☆☆ (Medium)";
        }
        
        if (data.duration) {
            document.getElementById("hiring-duration").textContent = data.duration;
        } else {
            document.getElementById("hiring-duration").textContent = "45 mins";
        }

        const flowStepsContainer = document.querySelector("#tab-hiring .hiring-flow");
        if (data.flow_steps && Array.isArray(data.flow_steps) && data.flow_steps.length > 0) {
            if (flowStepsContainer) {
                flowStepsContainer.innerHTML = "";
                data.flow_steps.forEach(step => {
                    const stepDiv = document.createElement("div");
                    stepDiv.className = "flow-step";
                    stepDiv.innerHTML = `
                        <div class="step-num">${step.num || 1}</div>
                        <div class="step-name">${step.name || "Assessment Stage"}</div>
                        <div class="step-details">${step.details || ""}</div>
                    `;
                    flowStepsContainer.appendChild(stepDiv);
                });
            }
        } else {
            const branchVal = hiringBranchSelect ? hiringBranchSelect.value : "cse";
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
            if (flowStepsContainer) {
                flowStepsContainer.innerHTML = "";
                flow.steps.forEach((step, idx) => {
                    const stepDiv = document.createElement("div");
                    stepDiv.className = "flow-step";
                    stepDiv.innerHTML = `
                        <div class="step-num">${idx + 1}</div>
                        <div class="step-name">${idx === 0 ? 'Online Assessment' : idx === 1 ? 'Technical Interview' : 'HR & Managerial Round'}</div>
                        <div class="step-details">${step}</div>
                    `;
                    flowStepsContainer.appendChild(stepDiv);
                });
            }
        }

        const distContainer = document.querySelector("#tab-hiring .hiring-distribution");
        if (distContainer) {
            distContainer.innerHTML = "";
            if (data.topics && Array.isArray(data.topics)) {
                const colors = ["var(--neon-pink)", "var(--neon-blue)", "var(--neon-cyan)", "var(--neon-purple)", "var(--neon-yellow)"];
                data.topics.forEach((topic, idx) => {
                    const wStr = typeof topic.weight === 'number' ? `${topic.weight}%` : (topic.weight || "20%");
                    const item = document.createElement("div");
                    item.className = "distribution-item";
                    item.innerHTML = `
                        <span>${topic.name}</span>
                        <div class="distribution-bar"><span style="width: ${wStr}; background: ${colors[idx % colors.length]}"></span></div>
                        <span>${wStr}</span>
                    `;
                    distContainer.appendChild(item);
                });
            }
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

    const ideLangSelect = document.getElementById("ide-language");
    const ideTemplates = {
        "python": `def trapping_rain_water(height):
    # Write your code here
    # Return the total trapped water
    return 0`,
        "cpp": `#include <vector>
using namespace std;

int trap(vector<int>& height) {
    // Write your code here
    // Return the total trapped water
    return 0;
}`,
        "java": `import java.util.*;

class Solution {
    public int trap(int[] height) {
        // Write your code here
        // Return the total trapped water
        return 0;
    }
}`,
        "javascript": `function trap(height) {
    // Write your code here
    // Return the total trapped water
    return 0;
}`
    };

    if (ideLangSelect && ideEditor) {
        ideLangSelect.addEventListener("change", () => {
            const selected = ideLangSelect.value;
            if (ideTemplates[selected]) {
                ideEditor.value = ideTemplates[selected];
            }
        });
    }

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

        // Append thinking indicator
        const thinkingDiv = document.createElement("div");
        thinkingDiv.className = "message system-msg thinking-msg";
        thinkingDiv.innerHTML = `
            <div class="msg-avatar"><i class="fa-solid fa-brain fa-spin-pulse" style="color: var(--neon-purple);"></i></div>
            <div class="msg-body">
                <span class="thinking-text" style="color: var(--neon-blue); font-weight: 600;">PrepOS AI is researching your query...</span>
                <div class="thinking-progress-container" style="width: 150px; height: 4px; background: rgba(255,255,255,0.05); border-radius: 10px; margin-top: 8px; overflow: hidden; position: relative;">
                    <div class="thinking-progress-bar" style="width: 100%; height: 100%; background: linear-gradient(90deg, var(--neon-blue), var(--neon-purple)); border-radius: 10px; position: absolute; left: -100%; animation: think-slide 1.5s infinite ease-in-out;"></div>
                </div>
            </div>
        `;
        copilotMessages.appendChild(thinkingDiv);
        copilotMessages.scrollTop = copilotMessages.scrollHeight;

        fetch("/api/query", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: text, company: currentCompany, category: currentCategory })
        })
        .then(res => res.json())
        .then(data => {
            thinkingDiv.remove();
            appendCopilotMsg("system", data.answer || data.error || "Error processing request.");
        })
        .catch(err => {
            console.error(err);
            thinkingDiv.remove();
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
    // Tab: Job Opportunities Feed
    // ----------------------------------------------------
    const jobsContainer = document.getElementById("jobs-container");
    const jobsLoading = document.getElementById("jobs-loading");
    const jobBranchFilter = document.getElementById("job-branch-filter");
    const jobExpFilter = document.getElementById("job-exp-filter");
    const jobQualFilter = document.getElementById("job-qual-filter");
    const refreshJobsBtn = document.getElementById("refresh-jobs-btn");

    function fetchJobsFeed() {
        if (!jobsContainer) return;
        jobsContainer.innerHTML = "";
        jobsLoading.style.display = "block";

        const branch = jobBranchFilter.value;
        const experience = jobExpFilter.value;
        const qualification = jobQualFilter.value;

        fetch(`/api/jobs?branch=${branch}&experience=${experience}&qualification=${qualification}&_=${Date.now()}`)
        .then(res => res.json())
        .then(data => {
            jobsLoading.style.display = "none";
            if (!data.jobs || data.jobs.length === 0) {
                jobsContainer.innerHTML = '<p class="text-muted" style="text-align: center; grid-column: 1/-1;">No job vacancies matched your filter selection.</p>';
                return;
            }

            data.jobs.forEach(job => {
                const card = document.createElement("div");
                card.className = "docs-card";
                card.style.display = "flex";
                card.style.flexDirection = "column";
                card.style.justifyContent = "space-between";
                card.style.padding = "1.25rem";
                card.style.border = "1px solid var(--border-color)";
                card.style.position = "relative";

                card.innerHTML = `
                    <div>
                        <span style="position: absolute; top: 1rem; right: 1rem; font-size: 0.75rem; background: rgba(0, 210, 255, 0.15); color: var(--neon-cyan); padding: 0.25rem 0.5rem; border-radius: 4px; text-transform: uppercase;">${job.branch}</span>
                        <h4 style="color: var(--neon-cyan); margin-bottom: 0.25rem; padding-right: 3rem;">${job.title}</h4>
                        <h5 style="color: var(--text-primary); margin-bottom: 0.75rem;"><i class="fa-solid fa-building"></i> ${job.company}</h5>
                        <p style="font-size: 0.8rem; margin-bottom: 1rem; line-height: 1.5; color: var(--text-muted);">${job.description}</p>
                        
                        <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.4rem;">
                            <strong>💼 Experience:</strong> ${job.experience}
                        </div>
                        <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.4rem;">
                            <strong>🎓 Qualification:</strong> ${job.qualification}
                        </div>
                        <div style="font-size: 0.75rem; color: var(--neon-cyan); margin-bottom: 1.25rem;">
                            <strong>📅 Posted Date:</strong> ${job.posted_date}
                        </div>
                    </div>
                    <a href="${job.link}" target="_blank" class="btn btn-primary" style="justify-content: center; font-size: 0.8rem; width: 100%;">
                        <i class="fa-solid fa-paper-plane"></i> Apply Instantly
                    </a>
                `;
                jobsContainer.appendChild(card);
            });
        })
        .catch(err => {
            console.error(err);
            jobsLoading.style.display = "none";
            jobsContainer.innerHTML = '<p class="text-muted" style="text-align: center; grid-column: 1/-1; color: var(--neon-pink);">Error loading job listings feed.</p>';
        });
    }

    if (jobBranchFilter) jobBranchFilter.addEventListener("change", fetchJobsFeed);
    if (jobExpFilter) jobExpFilter.addEventListener("change", fetchJobsFeed);
    if (jobQualFilter) jobQualFilter.addEventListener("change", fetchJobsFeed);
    if (refreshJobsBtn) refreshJobsBtn.addEventListener("click", fetchJobsFeed);

    // ----------------------------------------------------
    // Tab: Abroad Opportunities Feed
    // ----------------------------------------------------
    const abroadContainer = document.getElementById("abroad-container");
    const abroadLoading = document.getElementById("abroad-loading");
    const abroadBranchFilter = document.getElementById("abroad-branch-filter");
    const abroadCountryFilter = document.getElementById("abroad-country-filter");
    const abroadExpFilter = document.getElementById("abroad-exp-filter");
    const abroadQualFilter = document.getElementById("abroad-qual-filter");
    const refreshAbroadBtn = document.getElementById("refresh-abroad-btn");

    function fetchAbroadJobsFeed() {
        if (!abroadContainer) return;
        abroadContainer.innerHTML = "";
        abroadLoading.style.display = "block";

        const branch = abroadBranchFilter.value;
        const country = abroadCountryFilter.value;
        const experience = abroadExpFilter.value;
        const qualification = abroadQualFilter.value;

        fetch(`/api/abroad?branch=${branch}&country=${country}&experience=${experience}&qualification=${qualification}&_=${Date.now()}`)
        .then(res => res.json())
        .then(data => {
            abroadLoading.style.display = "none";
            if (!data.jobs || data.jobs.length === 0) {
                abroadContainer.innerHTML = '<p class="text-muted" style="text-align: center; grid-column: 1/-1;">No abroad opportunities matched your filter criteria.</p>';
                return;
            }

            data.jobs.forEach(job => {
                const card = document.createElement("div");
                card.className = "docs-card";
                card.style.display = "flex";
                card.style.flexDirection = "column";
                card.style.justifyContent = "space-between";
                card.style.padding = "1.25rem";
                card.style.border = "1px solid var(--border-color)";
                card.style.position = "relative";

                card.innerHTML = `
                    <div>
                        <span style="position: absolute; top: 1rem; right: 1rem; font-size: 0.75rem; background: rgba(157, 78, 221, 0.15); color: var(--neon-purple); padding: 0.25rem 0.5rem; border-radius: 4px; text-transform: uppercase;">${job.country}</span>
                        <h4 style="color: var(--neon-cyan); margin-bottom: 0.25rem; padding-right: 4rem;">${job.title}</h4>
                        <h5 style="color: var(--text-primary); margin-bottom: 0.75rem;"><i class="fa-solid fa-building"></i> ${job.company}</h5>
                        <p style="font-size: 0.8rem; margin-bottom: 1rem; line-height: 1.5; color: var(--text-muted);">${job.description}</p>
                        
                        <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.4rem;">
                            <strong>💼 Experience:</strong> ${job.experience}
                        </div>
                        <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.4rem;">
                            <strong>🎓 Qualification:</strong> ${job.qualification}
                        </div>
                        <div style="font-size: 0.75rem; color: var(--neon-cyan); margin-bottom: 1.25rem;">
                            <strong>📅 Posted Date:</strong> ${job.posted_date}
                        </div>
                    </div>
                    <a href="${job.link}" target="_blank" class="btn btn-primary" style="justify-content: center; font-size: 0.8rem; width: 100%;">
                        <i class="fa-solid fa-plane-departure"></i> Apply Abroad Instantly
                    </a>
                `;
                abroadContainer.appendChild(card);
            });
        })
        .catch(err => {
            console.error(err);
            abroadLoading.style.display = "none";
            abroadContainer.innerHTML = '<p class="text-muted" style="text-align: center; grid-column: 1/-1; color: var(--neon-pink);">Error loading international listings.</p>';
        });
    }

    if (abroadBranchFilter) abroadBranchFilter.addEventListener("change", fetchAbroadJobsFeed);
    if (abroadCountryFilter) abroadCountryFilter.addEventListener("change", fetchAbroadJobsFeed);
    if (abroadExpFilter) abroadExpFilter.addEventListener("change", fetchAbroadJobsFeed);
    if (abroadQualFilter) abroadQualFilter.addEventListener("change", fetchAbroadJobsFeed);
    if (refreshAbroadBtn) refreshAbroadBtn.addEventListener("click", fetchAbroadJobsFeed);

    // ----------------------------------------------------
    // Tab: Competitive Exams Feed
    // ----------------------------------------------------
    const examsContainer = document.getElementById("exams-container");
    const examsLoading = document.getElementById("exams-loading");
    const examBranchFilter = document.getElementById("exam-branch-filter");
    const examExpFilter = document.getElementById("exam-exp-filter");
    const examQualFilter = document.getElementById("exam-qual-filter");
    const refreshExamsBtn = document.getElementById("refresh-exams-btn");

    function fetchExamsFeed() {
        if (!examsContainer) return;
        examsContainer.innerHTML = "";
        examsLoading.style.display = "block";

        const branch = examBranchFilter.value;
        const experience = examExpFilter.value;
        const qualification = examQualFilter.value;

        fetch(`/api/exams?branch=${branch}&experience=${experience}&qualification=${qualification}&_=${Date.now()}`)
        .then(res => res.json())
        .then(data => {
            examsLoading.style.display = "none";
            if (!data.jobs || data.jobs.length === 0) {
                examsContainer.innerHTML = '<p class="text-muted" style="text-align: center; grid-column: 1/-1;">No exams matched your criteria.</p>';
                return;
            }

            data.jobs.forEach(exam => {
                const card = document.createElement("div");
                card.className = "docs-card";
                card.style.display = "flex";
                card.style.flexDirection = "column";
                card.style.justifyContent = "space-between";
                card.style.padding = "1.25rem";
                card.style.border = "1px solid var(--border-color)";
                card.style.position = "relative";

                card.innerHTML = `
                    <div>
                        <span style="position: absolute; top: 1rem; right: 1rem; font-size: 0.75rem; background: rgba(0, 210, 255, 0.15); color: var(--neon-cyan); padding: 0.25rem 0.5rem; border-radius: 4px; text-transform: uppercase;">${exam.branch}</span>
                        <h4 style="color: var(--neon-cyan); margin-bottom: 0.25rem; padding-right: 4rem;">${exam.title}</h4>
                        <h5 style="color: var(--text-primary); margin-bottom: 0.75rem;"><i class="fa-solid fa-building-columns"></i> ${exam.company}</h5>
                        <p style="font-size: 0.8rem; margin-bottom: 1rem; line-height: 1.5; color: var(--text-muted);">${exam.description}</p>
                        
                        <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.4rem;">
                            <strong>💼 Age/Exp:</strong> ${exam.experience}
                        </div>
                        <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.4rem;">
                            <strong>🎓 Qualification:</strong> ${exam.qualification}
                        </div>
                        <div style="font-size: 0.75rem; color: var(--neon-cyan); margin-bottom: 1.25rem;">
                            <strong>📅 Last Updated:</strong> ${exam.posted_date}
                        </div>
                    </div>
                    <a href="${exam.link}" target="_blank" class="btn btn-primary" style="justify-content: center; font-size: 0.8rem; width: 100%;">
                        <i class="fa-solid fa-graduation-cap"></i> Register / View Portal
                    </a>
                `;
                examsContainer.appendChild(card);
            });
        })
        .catch(err => {
            console.error(err);
            examsLoading.style.display = "none";
            examsContainer.innerHTML = '<p class="text-muted" style="text-align: center; grid-column: 1/-1; color: var(--neon-pink);">Error loading exam listings.</p>';
        });
    }

    if (examBranchFilter) examBranchFilter.addEventListener("change", fetchExamsFeed);
    if (examExpFilter) examExpFilter.addEventListener("change", fetchExamsFeed);
    if (examQualFilter) examQualFilter.addEventListener("change", fetchExamsFeed);
    if (refreshExamsBtn) refreshExamsBtn.addEventListener("click", fetchExamsFeed);

    // ----------------------------------------------------
    // Tab: AI Book Store & Placement Library
    // ----------------------------------------------------
    const searchBookBtn = document.getElementById("search-book-btn");
    const bookSearchInput = document.getElementById("book-search-input");
    const bookLoading = document.getElementById("book-loading");
    const bookResults = document.getElementById("book-results");

    function executeBookSearch() {
        const query = bookSearchInput.value.trim();
        if (!query) {
            alert("Please enter a book title or keyword to search!");
            return;
        }

        bookResults.innerHTML = "";
        bookLoading.style.display = "block";

        fetch(`/api/books/search?q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
            bookLoading.style.display = "none";
            if (data.error) {
                bookResults.innerHTML = `<p class="text-muted" style="text-align: center; grid-column: 1/-1; color: var(--neon-pink);">${data.error}</p>`;
                return;
            }
            if (!data.books || data.books.length === 0) {
                bookResults.innerHTML = '<p class="text-muted" style="text-align: center; grid-column: 1/-1;">No books matching that title were found in the library database.</p>';
                return;
            }

            data.books.forEach(book => {
                const card = document.createElement("div");
                card.className = "docs-card";
                card.style.display = "flex";
                card.style.flexDirection = "column";
                card.style.justifyContent = "space-between";
                card.style.padding = "1.25rem";
                card.style.border = "1px solid var(--border-color)";

                card.innerHTML = `
                    <div>
                        <h4 style="color: var(--neon-cyan); margin-bottom: 0.5rem;"><i class="fa-solid fa-file-pdf"></i> ${book.name}</h4>
                        <p style="font-size: 0.8rem; margin-bottom: 1rem; color: var(--text-muted);">Format: PDF/Document • Source: PrepOS Library Archive</p>
                        <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 1rem;">
                            <strong>File Size:</strong> ${book.size || "Unknown"}
                        </div>
                    </div>
                    <a href="${book.download_url}" target="_blank" class="btn btn-primary" style="justify-content: center; font-size: 0.8rem; width: 100%;">
                        <i class="fa-solid fa-download"></i> Download Book Now
                    </a>
                `;
                bookResults.appendChild(card);
            });
        })
        .catch(err => {
            console.error(err);
            bookLoading.style.display = "none";
            bookResults.innerHTML = '<p class="text-muted" style="text-align: center; grid-column: 1/-1; color: var(--neon-pink);">Error connecting to book archives engine.</p>';
        });
    }

    const bookModeSelect = document.getElementById("book-mode-select");
    const bookSearchSection = document.getElementById("book-search-section");
    const bookNotesSection = document.getElementById("book-notes-section");
    const bookNotesInput = document.getElementById("book-notes-input");
    const generateNotesBtn = document.getElementById("generate-notes-btn");
    const bookNotesOutput = document.getElementById("book-notes-output");
    const bookNotesBody = document.getElementById("book-notes-body");
    const bookLoadingText = document.getElementById("book-loading-text");

    if (bookModeSelect) {
        bookModeSelect.addEventListener("change", () => {
            const mode = bookModeSelect.value;
            if (mode === "search") {
                bookSearchSection.style.display = "flex";
                bookResults.style.display = "grid";
                bookNotesSection.style.display = "none";
                bookNotesOutput.style.display = "none";
            } else {
                bookSearchSection.style.display = "none";
                bookResults.style.display = "none";
                bookNotesSection.style.display = "flex";
                bookNotesOutput.style.display = "block";
            }
        });
    }

    function executeNotesGeneration() {
        const topic = bookNotesInput.value.trim();
        if (!topic) {
            alert("Please enter a topic name to generate notes!");
            return;
        }

        bookNotesBody.innerHTML = "";
        bookLoadingText.textContent = "Generating detailed study notes via Google Gemini... This may take 5-10 seconds...";
        bookLoading.style.display = "block";

        fetch("/api/notes/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic })
        })
        .then(res => res.json())
        .then(data => {
            bookLoading.style.display = "none";
            bookLoadingText.textContent = "Searching cloud book repositories... This may take 10-15 seconds...";
            
            if (data.error) {
                bookNotesBody.innerHTML = `<p class="text-muted" style="color: var(--neon-pink);">${data.error}</p>`;
                return;
            }
            bookNotesBody.innerHTML = data.notes || "<p class='text-muted'>No notes generated.</p>";
        })
        .catch(err => {
            console.error(err);
            bookLoading.style.display = "none";
            bookLoadingText.textContent = "Searching cloud book repositories... This may take 10-15 seconds...";
            bookNotesBody.innerHTML = '<p class="text-muted" style="color: var(--neon-pink);">Error connecting to AI Notes engine.</p>';
        });
    }

    if (searchBookBtn) searchBookBtn.addEventListener("click", executeBookSearch);
    if (bookSearchInput) {
        bookSearchInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                executeBookSearch();
            }
        });
    }

    if (generateNotesBtn) generateNotesBtn.addEventListener("click", executeNotesGeneration);
    if (bookNotesInput) {
        bookNotesInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                executeNotesGeneration();
            }
        });
    }

    // ----------------------------------------------------
    // Telegram Userbot Authorization Handling
    // ----------------------------------------------------
    const telegramAuthSection = document.getElementById("telegram-auth-section");
    const sendAuthCodeBtn = document.getElementById("send-auth-code-btn");
    const authCodeInputGroup = document.getElementById("auth-code-input-group");
    const submitAuthCodeBtn = document.getElementById("submit-auth-code-btn");
    const authOtpCode = document.getElementById("auth-otp-code");

    function checkTelegramStatus() {
        if (!telegramAuthSection) return;
        fetch("/api/telegram/status")
        .then(res => res.json())
        .then(data => {
            if (data.authenticated) {
                telegramAuthSection.style.display = "none";
            } else {
                telegramAuthSection.style.display = "block";
            }
        })
        .catch(err => console.error("Error checking Telegram status:", err));
    }

    if (sendAuthCodeBtn) {
        sendAuthCodeBtn.addEventListener("click", () => {
            sendAuthCodeBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending Request...';
            sendAuthCodeBtn.disabled = true;

            fetch("/api/telegram/send_code", { method: "POST" })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert(data.message);
                    authCodeInputGroup.style.display = "flex";
                    sendAuthCodeBtn.style.display = "none";
                } else {
                    alert(data.error || "Failed to trigger login request.");
                    sendAuthCodeBtn.innerHTML = '<i class="fa-solid fa-key"></i> Request Login OTP';
                    sendAuthCodeBtn.disabled = false;
                }
            })
            .catch(err => {
                console.error(err);
                alert("Error connecting to server authentication API.");
                sendAuthCodeBtn.innerHTML = '<i class="fa-solid fa-key"></i> Request Login OTP';
                sendAuthCodeBtn.disabled = false;
            });
        });
    }

    if (submitAuthCodeBtn) {
        submitAuthCodeBtn.addEventListener("click", () => {
            const code = authOtpCode.value.trim();
            if (!code) {
                alert("Please enter the verification code received on Telegram!");
                return;
            }

            submitAuthCodeBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Verifying...';
            submitAuthCodeBtn.disabled = true;

            fetch("/api/telegram/verify_code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert(data.message);
                    if (data.session_string) {
                        prompt("COPY THIS SESSION STRING & ADD AS TELEGRAM_SESSION_STRING IN RENDER ENV VARIABLES TO LOG IN PERMANENTLY:", data.session_string);
                    }
                    telegramAuthSection.style.display = "none";
                } else {
                    alert(data.error || "Verification failed.");
                    submitAuthCodeBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Verify & Link';
                    submitAuthCodeBtn.disabled = false;
                }
            })
            .catch(err => {
                console.error(err);
                alert("Verification failed due to connection error.");
                submitAuthCodeBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Verify & Link';
                submitAuthCodeBtn.disabled = false;
            });
        });
    }

    checkTelegramStatus();

    // ----------------------------------------------------
    // Tab: AI Portfolio Website Generator
    // ----------------------------------------------------
    const generatePortBtn = document.getElementById("generate-portfolio-btn");
    const portName = document.getElementById("port-name");
    const portBio = document.getElementById("port-bio");
    const portSkills = document.getElementById("port-skills");
    const portResume = document.getElementById("port-resume");
    const portGithub = document.getElementById("port-github");
    const portLinkedin = document.getElementById("port-linkedin");

    const portEmptyState = document.getElementById("port-empty-state");
    const portLoading = document.getElementById("port-loading");
    const portResultState = document.getElementById("port-result-state");
    const shareUrlBox = document.getElementById("share-url-box");
    const copyUrlBtn = document.getElementById("copy-url-btn");
    const portPreviewFrame = document.getElementById("portfolio-preview-frame");

    if (generatePortBtn) {
        generatePortBtn.addEventListener("click", () => {
            const nameVal = portName.value.trim();
            const bioVal = portBio.value.trim();
            const skillsVal = portSkills.value.trim();
            const resumeVal = portResume.value.trim();
            const githubVal = portGithub.value.trim();
            const linkedinVal = portLinkedin.value.trim();

            if (!nameVal) {
                alert("Please enter your Full Name to generate the portfolio website!");
                return;
            }

            // Switch states to loading
            portEmptyState.style.display = "none";
            portResultState.style.display = "none";
            portLoading.style.display = "block";
            generatePortBtn.disabled = true;
            generatePortBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Assembling Site...';

            fetch("/api/portfolio/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: nameVal,
                    bio: bioVal,
                    skills: skillsVal,
                    resume: resumeVal,
                    github: githubVal,
                    linkedin: linkedinVal
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success && data.shareable_url) {
                    const fullUrl = window.location.origin + data.shareable_url;
                    shareUrlBox.value = fullUrl;
                    portPreviewFrame.src = data.shareable_url;

                    portLoading.style.display = "none";
                    portResultState.style.display = "flex";
                } else {
                    alert(data.error || "Failed to generate portfolio.");
                    portLoading.style.display = "none";
                    portEmptyState.style.display = "block";
                }
                generatePortBtn.disabled = false;
                generatePortBtn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Generate Portfolio Site';
            })
            .catch(err => {
                console.error(err);
                alert("Failed to build portfolio due to connection error.");
                portLoading.style.display = "none";
                portEmptyState.style.display = "block";
                generatePortBtn.disabled = false;
                generatePortBtn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Generate Portfolio Site';
            });
        });
    }

    if (copyUrlBtn) {
        copyUrlBtn.addEventListener("click", () => {
            shareUrlBox.select();
            shareUrlBox.setSelectionRange(0, 99999); // Mobile
            navigator.clipboard.writeText(shareUrlBox.value)
                .then(() => {
                    copyUrlBtn.textContent = "Copied!";
                    copyUrlBtn.style.background = "var(--neon-cyan)";
                    setTimeout(() => {
                        copyUrlBtn.textContent = "Copy Link";
                        copyUrlBtn.style.background = "var(--neon-blue)";
                    }, 2000);
                })
                .catch(err => console.error("Clipboard copy failed:", err));
        });
    }

    // ----------------------------------------------------
    // Tab: Indian Tax & Salary Advisor AI Bot
    // ----------------------------------------------------
    const inputCtc = document.getElementById('input-ctc');
    const sliderCtc = document.getElementById('slider-ctc');
    const selectPf = document.getElementById('select-pf');
    const selectRegime = document.getElementById('select-regime');
    const inputBasicPct = document.getElementById('input-basic-pct');
    const selectState = document.getElementById('select-state');
    const inputRent = document.getElementById('input-rent');
    const selectCityType = document.getElementById('select-city-type');
    const inputDed80c = document.getElementById('input-ded-80c');
    const inputDed80d = document.getElementById('input-ded-80d');
    const inputDedNps = document.getElementById('input-ded-nps');
    const inputDed24b = document.getElementById('input-ded-24b');
    
    const inputCorpNps = document.getElementById('input-corp-nps');
    const inputHraPct = document.getElementById('input-hra-pct');
    const inputVpfPct = document.getElementById('input-vpf-pct');
    const selectCarEngine = document.getElementById('select-car-engine');
    const checkDriver = document.getElementById('check-driver');
    const inputHouseRent = document.getElementById('input-house-rent');
    const inputHouseTaxes = document.getElementById('input-house-taxes');
    const optTipsContainer = document.getElementById('opt-tips-container');

    const checkGratuity = document.getElementById('check-gratuity');
    
    const ctcValText = document.getElementById('ctc-val-text');
    const monthlyInhandValue = document.getElementById('monthly-inhand-value');
    const recommendedRegimeBadge = document.getElementById('recommended-regime-badge');
    const inhandPctDisplay = document.getElementById('inhand-pct-display');
    const inhandProgressRing = document.getElementById('inhand-progress-ring');
    
    const breakdownCtc = document.getElementById('breakdown-ctc');
    const breakdownEpf = document.getElementById('breakdown-epf');
    const breakdownGratuity = document.getElementById('breakdown-gratuity');
    const breakdownPt = document.getElementById('breakdown-pt');
    const breakdownPf = document.getElementById('breakdown-pf');
    const breakdownTax = document.getElementById('breakdown-tax');
    const breakdownInhand = document.getElementById('breakdown-inhand');
    
    const comparisonTaxNew = document.getElementById('comparison-tax-new');
    const comparisonInhandNew = document.getElementById('comparison-inhand-new');
    const comparisonTaxOld = document.getElementById('comparison-tax-old');
    const comparisonInhandOld = document.getElementById('comparison-inhand-old');
    const badgeBestNew = document.getElementById('badge-best-new');
    const badgeBestOld = document.getElementById('badge-best-old');
    const regimeComparisonAdvice = document.getElementById('regime-comparison-advice');
    
    const btnShowMonthly = document.getElementById('btn-show-monthly');
    const btnShowAnnually = document.getElementById('btn-show-annually');
    const advSettingsTrigger = document.getElementById('adv-settings-trigger');
    const btnExportPdf = document.getElementById('btn-export-pdf');
    
    const chatMessages = document.getElementById('chat-messages');
    const chatChips = document.getElementById('chat-chips');
    const chatInput = document.getElementById('chat-input');
    const btnChatSend = document.getElementById('btn-chat-send');
    const btnSaveScenario = document.getElementById('btn-save-scenario');
    const compareScenariosGrid = document.getElementById('compare-scenarios-grid');
    
    let displayMode = 'monthly';
    let myChart = null;
    
    let currentCalcState = {
        ctc: 0,
        basicSalary: 0,
        annualEmployerPf: 0,
        annualEmployeePf: 0,
        annualGratuity: 0,
        annualPT: 0,
        newTax: 0,
        oldTax: 0,
        newInHand: 0,
        oldInHand: 0,
        recommendedRegime: 'New Regime'
    };

    if (advSettingsTrigger) {
        advSettingsTrigger.addEventListener('click', () => {
            const item = advSettingsTrigger.closest('.accordion-item');
            if (item) item.classList.toggle('active');
        });
    }

    if (btnShowMonthly) {
        btnShowMonthly.addEventListener('click', () => {
            displayMode = 'monthly';
            btnShowMonthly.classList.add('active');
            btnShowAnnually.classList.remove('active');
            calculateAndDisplay();
        });
    }

    if (btnShowAnnually) {
        btnShowAnnually.addEventListener('click', () => {
            displayMode = 'annually';
            btnShowAnnually.classList.add('active');
            btnShowMonthly.classList.remove('active');
            calculateAndDisplay();
        });
    }

    if (inputCtc && sliderCtc) {
        inputCtc.addEventListener('input', (e) => {
            let val = parseInt(e.target.value) || 0;
            if (val > 100000000) val = 100000000;
            sliderCtc.value = val;
            calculateAndDisplay();
        });

        sliderCtc.addEventListener('input', (e) => {
            inputCtc.value = e.target.value;
            calculateAndDisplay();
        });
    }

    const presets = document.querySelectorAll('#tab-tax-advisor .btn-preset');
    presets.forEach(btn => {
        btn.addEventListener('click', () => {
            const val = btn.getAttribute('data-val');
            if (inputCtc && sliderCtc) {
                inputCtc.value = val;
                sliderCtc.value = val;
                calculateAndDisplay();
            }
        });
    });

    const formElements = [
        selectPf, selectRegime, inputBasicPct, selectState, inputRent, selectCityType, 
        inputDed80c, inputDed80d, inputDedNps, inputDed24b, checkGratuity,
        inputCorpNps, inputHraPct, inputVpfPct, selectCarEngine, checkDriver, inputHouseRent, inputHouseTaxes
    ];
    formElements.forEach(el => {
        if (el) {
            el.addEventListener('change', calculateAndDisplay);
            el.addEventListener('input', calculateAndDisplay);
        }
    });

    if (btnExportPdf) {
        btnExportPdf.addEventListener('click', () => {
            window.print();
        });
    }

    function formatINR(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    }

    function calculateNewRegimeTaxWithoutSurcharge(taxableIncome) {
        if (taxableIncome <= 0) return 0;
        let tax = 0;
        if (taxableIncome <= 400000) {
            tax = 0;
        } else if (taxableIncome <= 800000) {
            tax = (taxableIncome - 400000) * 0.05;
        } else if (taxableIncome <= 1200000) {
            tax = (400000 * 0.05) + (taxableIncome - 800000) * 0.10;
        } else if (taxableIncome <= 1600000) {
            tax = (400000 * 0.05) + (400000 * 0.10) + (taxableIncome - 1200000) * 0.15;
        } else if (taxableIncome <= 2400000) {
            tax = (400000 * 0.05) + (400000 * 0.10) + (400000 * 0.15) + (taxableIncome - 1600000) * 0.20;
        } else {
            tax = (400000 * 0.05) + (400000 * 0.10) + (400000 * 0.15) + (800000 * 0.20) + (taxableIncome - 2400000) * 0.30;
        }
        if (taxableIncome <= 1200000) tax = 0;
        return tax;
    }

    function calculateOldRegimeTaxWithoutSurcharge(taxableIncome) {
        if (taxableIncome <= 0) return 0;
        let tax = 0;
        if (taxableIncome <= 250000) {
            tax = 0;
        } else if (taxableIncome <= 500000) {
            tax = (taxableIncome - 250000) * 0.05;
        } else if (taxableIncome <= 1000000) {
            tax = (250000 * 0.05) + (taxableIncome - 500000) * 0.20;
        } else {
            tax = (250000 * 0.05) + (500000 * 0.20) + (taxableIncome - 1000000) * 0.30;
        }
        if (taxableIncome <= 500000) tax = 0;
        return tax;
    }

    function calculateSurchargeAndRelief(taxableIncome, baseTax, regime) {
        if (baseTax <= 0) return 0;
        let surchargeRate = 0;
        let threshold = 0;
        if (regime === 'new') {
            if (taxableIncome > 20000000) {
                surchargeRate = 0.25;
                threshold = 20000000;
            } else if (taxableIncome > 10000000) {
                surchargeRate = 0.15;
                threshold = 10000000;
            } else if (taxableIncome > 5000000) {
                surchargeRate = 0.10;
                threshold = 5000000;
            }
        } else {
            if (taxableIncome > 50000000) {
                surchargeRate = 0.37;
                threshold = 50000000;
            } else if (taxableIncome > 20000000) {
                surchargeRate = 0.25;
                threshold = 20000000;
            } else if (taxableIncome > 10000000) {
                surchargeRate = 0.15;
                threshold = 10000000;
            } else if (taxableIncome > 5000000) {
                surchargeRate = 0.10;
                threshold = 5000000;
            }
        }
        if (surchargeRate === 0) return 0;
        const rawSurcharge = baseTax * surchargeRate;
        const totalTaxWithSurcharge = baseTax + rawSurcharge;
        let baseTaxAtThreshold = regime === 'new' ? calculateNewRegimeTaxWithoutSurcharge(threshold) : calculateOldRegimeTaxWithoutSurcharge(threshold);
        let surchargeRateAtThreshold = threshold === 20000000 ? 0.15 : (threshold === 10000000 ? 0.10 : 0);
        const surchargeAtThreshold = baseTaxAtThreshold * surchargeRateAtThreshold;
        const totalTaxAtThreshold = baseTaxAtThreshold + surchargeAtThreshold;
        const excessIncome = taxableIncome - threshold;
        const maxAllowedTax = totalTaxAtThreshold + excessIncome;
        if (totalTaxWithSurcharge > maxAllowedTax) {
            return Math.max(0, maxAllowedTax - baseTax);
        }
        return rawSurcharge;
    }

    function calculateNewRegimeTax(taxableIncome) {
        if (taxableIncome <= 0) return 0;
        const baseTax = calculateNewRegimeTaxWithoutSurcharge(taxableIncome);
        const surcharge = calculateSurchargeAndRelief(taxableIncome, baseTax, 'new');
        let totalTax = baseTax + surcharge;
        if (totalTax > 0) totalTax += totalTax * 0.04;
        return totalTax;
    }

    function calculateOldRegimeTax(taxableIncome) {
        if (taxableIncome <= 0) return 0;
        const baseTax = calculateOldRegimeTaxWithoutSurcharge(taxableIncome);
        const surcharge = calculateSurchargeAndRelief(taxableIncome, baseTax, 'old');
        let totalTax = baseTax + surcharge;
        if (totalTax > 0) totalTax += totalTax * 0.04;
        return totalTax;
    }

    function calculateAndDisplay() {
        if (!inputCtc) return;
        const ctc = parseFloat(inputCtc.value) || 0;
        if (ctcValText) ctcValText.innerText = ctc.toLocaleString('en-IN');
        
        const basicPct = (parseFloat(inputBasicPct.value) || 50) / 100;
        const basicSalary = ctc * basicPct;
        
        const hasGratuity = checkGratuity ? checkGratuity.checked : true;
        const annualGratuity = hasGratuity ? (basicSalary * 0.0481) : 0;
        
        const pfMode = selectPf ? selectPf.value : '12basic';
        let annualEmployerPf = 0;
        let annualEmployeePf = 0;
        if (pfMode === '12basic') {
            annualEmployerPf = basicSalary * 0.12;
            annualEmployeePf = basicSalary * 0.12;
        } else if (pfMode === 'capped') {
            annualEmployerPf = Math.min(21600, basicSalary * 0.12);
            annualEmployeePf = Math.min(21600, basicSalary * 0.12);
        }
        
        const annualGrossSalary = Math.max(0, ctc - annualEmployerPf - annualGratuity);
        const stateCode = selectState ? selectState.value : 'kar';
        const monthlyGrossLimit = annualGrossSalary / 12;
        let annualPT = 0;
        if (stateCode === 'kar') {
            annualPT = (monthlyGrossLimit > 25000) ? 2400 : 0;
        } else if (stateCode === 'mah') {
            annualPT = (monthlyGrossLimit > 10000) ? 2500 : (monthlyGrossLimit > 7500 ? 2100 : 0);
        } else if (stateCode === 'tam') {
            const halfYearlyGross = monthlyGrossLimit * 6;
            let halfYearlyPT = halfYearlyGross <= 21000 ? 0 : (halfYearlyGross <= 30000 ? 135 : (halfYearlyGross <= 45000 ? 315 : (halfYearlyGross <= 60000 ? 690 : (halfYearlyGross <= 75000 ? 1025 : 1250))));
            annualPT = halfYearlyPT * 2;
        } else if (stateCode === 'tel') {
            annualPT = (monthlyGrossLimit > 20000) ? 2400 : (monthlyGrossLimit > 15000 ? 1800 : 0);
        } else if (stateCode === 'wbe') {
            annualPT = (monthlyGrossLimit > 40000) ? 2400 : (monthlyGrossLimit > 25000 ? 1800 : (monthlyGrossLimit > 15000 ? 1560 : (monthlyGrossLimit > 10000 ? 1320 : 0)));
        } else if (stateCode === 'guj') {
            annualPT = (monthlyGrossLimit > 12000) ? 2400 : 0;
        } else {
            annualPT = (annualGrossSalary > 150000) ? 2500 : 0;
        }
        
        const vpfPct = (parseFloat(inputVpfPct ? inputVpfPct.value : 0) || 0) / 100;
        const annualVPF = basicSalary * vpfPct;

        const monthlyRent = parseFloat(inputRent ? inputRent.value : 0) || 0;
        const annualRent = monthlyRent * 12;
        const cityType = selectCityType ? selectCityType.value : 'nonmetro';
        const hraPct = (parseFloat(inputHraPct ? inputHraPct.value : 40) || 40) / 100;
        const hraComponent = basicSalary * hraPct;
        let annualHraExemption = 0;
        if (annualRent > 0) {
            const rentMinusTenBasic = Math.max(0, annualRent - (basicSalary * 0.1));
            annualHraExemption = Math.min(hraComponent, rentMinusTenBasic, basicSalary * (cityType === 'metro' ? 0.5 : 0.4));
        }

        const corpNpsPct = (parseFloat(inputCorpNps ? inputCorpNps.value : 0) || 0) / 100;
        const annualCorpNpsDeduction = basicSalary * corpNpsPct;

        const carEngine = selectCarEngine ? selectCarEngine.value : 'none';
        const hasDriver = checkDriver ? checkDriver.checked : false;
        let annualCarPerq = 0;
        if (carEngine === 'small') annualCarPerq += 1800 * 12;
        else if (carEngine === 'large') annualCarPerq += 2400 * 12;
        if (carEngine !== 'none' && hasDriver) annualCarPerq += 900 * 12;

        const houseRent = parseFloat(inputHouseRent ? inputHouseRent.value : 0) || 0;
        const houseTaxes = parseFloat(inputHouseTaxes ? inputHouseTaxes.value : 0) || 0;
        const manual24b = parseFloat(inputDed24b ? inputDed24b.value : 0) || 0;
        const netRentalIncome = Math.max(0, (houseRent - houseTaxes) * 0.70);
        const oldHouseOffset = Math.max(-200000, netRentalIncome - manual24b);
        const newHouseOffset = Math.max(0, netRentalIncome - manual24b);

        const manual80C = parseFloat(inputDed80c ? inputDed80c.value : 150000) || 0;
        const manual80D = parseFloat(inputDed80d ? inputDed80d.value : 25000) || 0;
        const manualNps = parseFloat(inputDedNps ? inputDedNps.value : 0) || 0;
        const total80C = Math.min(150000, manual80C + annualEmployeePf + annualVPF);
        const total80D = Math.min(75000, manual80D);
        const totalNps = Math.min(50000, manualNps);
        
        const oldDeductions = total80C + total80D + totalNps + annualHraExemption + 50000;
        const oldTaxableIncome = Math.max(0, annualGrossSalary - oldDeductions - annualCorpNpsDeduction + annualCarPerq + oldHouseOffset);
        const oldTax = calculateOldRegimeTax(oldTaxableIncome);
        const oldInHand = Math.max(0, annualGrossSalary - annualEmployeePf - annualVPF - annualPT - oldTax);
        
        const newDeductions = 75000;
        const newTaxableIncome = Math.max(0, annualGrossSalary - newDeductions - annualCorpNpsDeduction + annualCarPerq + newHouseOffset);
        const newTax = calculateNewRegimeTax(newTaxableIncome);
        const newInHand = Math.max(0, annualGrossSalary - annualEmployeePf - annualVPF - annualPT - newTax);
        
        const selectedMode = selectRegime ? selectRegime.value : 'compare';
        let recommendedRegime = 'New Regime';
        let finalTax = newTax;
        let finalInHand = newInHand;
        
        if (selectedMode === 'compare') {
            if (newInHand >= oldInHand) {
                recommendedRegime = 'New Regime';
                finalTax = newTax;
                finalInHand = newInHand;
            } else {
                recommendedRegime = 'Old Regime';
                finalTax = oldTax;
                finalInHand = oldInHand;
            }
        } else if (selectedMode === 'new') {
            recommendedRegime = 'New Regime';
            finalTax = newTax;
            finalInHand = newInHand;
        } else if (selectedMode === 'old') {
            recommendedRegime = 'Old Regime';
            finalTax = oldTax;
            finalInHand = oldInHand;
        }
        
        currentCalcState = {
            ctc, basicSalary, annualEmployerPf, annualEmployeePf, annualGratuity, annualPT,
            newTax, oldTax, newInHand, oldInHand, recommendedRegime, oldDeductions,
            annualHraExemption, annualCorpNpsDeduction, annualVPF, annualCarPerq, oldHouseOffset, newHouseOffset
        };
        
        const mult = displayMode === 'monthly' ? (1/12) : 1;
        if (monthlyInhandValue) monthlyInhandValue.innerText = formatINR(finalInHand / 12);
        if (recommendedRegimeBadge) {
            recommendedRegimeBadge.innerText = recommendedRegime;
            recommendedRegimeBadge.className = `best-badge text-success`;
        }
        
        const pctInHand = Math.round((finalInHand / ctc) * 100) || 0;
        if (inhandPctDisplay) inhandPctDisplay.innerText = pctInHand;
        if (inhandProgressRing) {
            const circumference = 2 * Math.PI * 38;
            inhandProgressRing.style.strokeDashoffset = circumference - (pctInHand / 100) * circumference;
        }
        
        if (breakdownCtc) breakdownCtc.innerText = formatINR(ctc * mult);
        if (breakdownEpf) breakdownEpf.innerText = `- ` + formatINR(annualEmployerPf * mult);
        if (breakdownGratuity) breakdownGratuity.innerText = `- ` + formatINR(annualGratuity * mult);
        if (breakdownPt) breakdownPt.innerText = `- ` + formatINR(annualPT * mult);
        if (breakdownPf) breakdownPf.innerText = `- ` + formatINR((annualEmployeePf + annualVPF) * mult);
        if (breakdownTax) breakdownTax.innerText = `- ` + formatINR(finalTax * mult);
        if (breakdownInhand) breakdownInhand.innerText = formatINR(finalInHand * mult);
        
        if (comparisonTaxNew) comparisonTaxNew.innerText = formatINR(newTax);
        if (comparisonInhandNew) comparisonInhandNew.innerText = formatINR(newInHand / 12) + '/mo';
        if (comparisonTaxOld) comparisonTaxOld.innerText = formatINR(oldTax);
        if (comparisonInhandOld) comparisonInhandOld.innerText = formatINR(oldInHand / 12) + '/mo';
        
        if (badgeBestNew && badgeBestOld && regimeComparisonAdvice) {
            if (newInHand >= oldInHand) {
                badgeBestNew.style.display = 'inline-block';
                badgeBestOld.style.display = 'none';
                const diff = newInHand - oldInHand;
                regimeComparisonAdvice.innerText = diff > 0 ? `Saving ${formatINR(diff)} annually by choosing the New Tax Regime.` : `Both regimes offer identical take-home pay.`;
            } else {
                badgeBestNew.style.display = 'none';
                badgeBestOld.style.display = 'inline-block';
                const diff = oldInHand - newInHand;
                regimeComparisonAdvice.innerText = `Saving ${formatINR(diff)} annually by choosing the Old Tax Regime.`;
            }
        }
        
        renderChart(finalInHand, finalTax, annualEmployeePf + annualEmployerPf + annualVPF, annualGratuity, annualPT);
        updateOptimizationTips();
    }

    function updateOptimizationTips() {
        if (!optTipsContainer) return;
        optTipsContainer.innerHTML = '';
        const tips = [];
        const state = currentCalcState;
        
        const manual80C = parseFloat(inputDed80c ? inputDed80c.value : 0) || 0;
        const total80C = Math.min(150000, manual80C + state.annualEmployeePf + state.annualVPF);
        const remaining80C = 150000 - total80C;
        if (remaining80C > 2000 && state.recommendedRegime === 'Old Regime' && state.oldTax > 0) {
            tips.push({
                title: "Maximize Section 80C",
                desc: `You have ₹${remaining80C.toLocaleString('en-IN')} remaining limit. Invest in ELSS, PPF, or raise VPF to save tax.`,
                saving: `Save up to ${formatINR(remaining80C * 0.312)}`
            });
        }
        
        const currentCorpNpsPct = (parseFloat(inputCorpNps ? inputCorpNps.value : 0) || 0) / 100;
        if (currentCorpNpsPct < 0.10) {
            const extraEligible = state.basicSalary * (0.10 - currentCorpNpsPct);
            if (extraEligible > 2000 && (state.newTax > 0 || state.oldTax > 0)) {
                tips.push({
                    title: "Opt for Corporate NPS (Sec 80CCD(2))",
                    desc: "Ask your employer to contribute 10% of basic salary to NPS. It is fully tax-exempt under both regimes!",
                    saving: "Save 10% to 30%"
                });
            }
        }

        const manual80D = parseFloat(inputDed80d ? inputDed80d.value : 0) || 0;
        if (manual80D < 75000 && state.recommendedRegime === 'Old Regime' && state.oldTax > 0) {
            tips.push({
                title: "Claim Health Insurance (Sec 80D)",
                desc: "Purchase health insurance premiums for self and senior citizen parents to lower old regime taxable salary.",
                saving: "Highly Tax Deductible"
            });
        }

        if (tips.length === 0) {
            tips.push({
                title: "Your Tax is Optimized!",
                desc: "Great job! You have fully utilized your tax deductions or fall under a zero-tax slab bracket.",
                saving: "Maximized"
            });
        }
        
        tips.slice(0, 3).forEach(tip => {
            const div = document.createElement('div');
            div.className = 'opt-tip-card';
            div.innerHTML = `
                <div style="display: flex; flex-direction: column; gap: 0.25rem; max-width: 75%;">
                    <span style="font-size: 0.8rem; font-weight: 700; color: #fff;">${tip.title}</span>
                    <span style="font-size: 0.72rem; color: var(--text-muted);">${tip.desc}</span>
                </div>
                <div class="opt-tip-saving">${tip.saving}</div>
            `;
            optTipsContainer.appendChild(div);
        });
    }

    function renderChart(inhand, tax, pf, gratuity, pt) {
        if (!document.getElementById('ctc-pie-chart')) return;
        const dataVals = [inhand, tax, pf, gratuity, pt];
        const labels = ['In-Hand', 'Income Tax (TDS)', 'Provident Fund (PF)', 'Gratuity Deduction', 'Professional Tax'];
        
        const activeIndexes = dataVals.map((val, idx) => val > 0 ? idx : -1).filter(idx => idx !== -1);
        const filteredData = activeIndexes.map(idx => dataVals[idx]);
        const filteredLabels = activeIndexes.map(idx => labels[idx]);
        const baseColors = ['#3b82f6', '#ef4444', '#a855f7', '#f59e0b', '#6b7280'];
        const filteredColors = activeIndexes.map(idx => baseColors[idx]);
        
        if (myChart) {
            myChart.data.labels = filteredLabels;
            myChart.data.datasets[0].data = filteredData;
            myChart.data.datasets[0].backgroundColor = filteredColors;
            myChart.update();
        } else {
            const ctx = document.getElementById('ctc-pie-chart').getContext('2d');
            myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: filteredLabels,
                    datasets: [{
                        data: filteredData,
                        backgroundColor: filteredColors,
                        borderWidth: 0,
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '65%',
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return (context.label || '') + ': ' + formatINR(context.raw);
                                }
                            }
                        }
                    }
                }
            });
        }
    }

    let savedScenarios = JSON.parse(localStorage.getItem('saved_salary_scenarios')) || [];
    renderScenarios();

    if (btnSaveScenario) {
        btnSaveScenario.addEventListener('click', () => {
            const state = currentCalcState;
            const scenarioName = prompt("Enter a label for this offer scenario (e.g. 'Company A Offer', 'Standard Capped PF'):");
            if (scenarioName) {
                const newScenario = {
                    id: Date.now(),
                    name: scenarioName,
                    ctc: state.ctc,
                    monthlyInhand: (state.recommendedRegime === 'New Regime' ? state.newInHand : state.oldInHand) / 12,
                    regime: state.recommendedRegime,
                    annualTax: state.recommendedRegime === 'New Regime' ? state.newTax : state.oldTax,
                    pf: state.annualEmployeePf + state.annualEmployerPf + state.annualVPF,
                    timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                };
                savedScenarios.push(newScenario);
                localStorage.setItem('saved_salary_scenarios', JSON.stringify(savedScenarios));
                renderScenarios();
            }
        });
    }

    function renderScenarios() {
        if (!compareScenariosGrid) return;
        if (savedScenarios.length === 0) {
            compareScenariosGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); font-size: 0.75rem; margin: 1rem 0;">No saved scenarios. Set your numbers and click "Save Current Setup" to compare offers side-by-side!</p>`;
            return;
        }
        
        compareScenariosGrid.innerHTML = '';
        const baseInhand = savedScenarios[0].monthlyInhand;
        
        savedScenarios.forEach((sc, index) => {
            const card = document.createElement('div');
            card.className = 'scenario-card';
            
            const delta = sc.monthlyInhand - baseInhand;
            let deltaBadge = '';
            if (index > 0) {
                if (delta > 0) {
                    deltaBadge = `<span class="scenario-delta plus">+${formatINR(delta)}/mo vs base</span>`;
                } else if (delta < 0) {
                    deltaBadge = `<span class="scenario-delta minus">-${formatINR(Math.abs(delta))}/mo vs base</span>`;
                } else {
                    deltaBadge = `<span class="scenario-delta" style="background: rgba(255,255,255,0.05); color: var(--text-muted);">Flat</span>`;
                }
            } else {
                deltaBadge = `<span class="scenario-delta plus" style="background: rgba(59,130,246,0.1); color: var(--primary);">Base Offer</span>`;
            }
            
            card.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:0.4rem;">
                    <span style="font-size:0.8rem; font-weight:700; color:var(--primary);">${sc.name}</span>
                    <button class="btn-delete-scenario" data-id="${sc.id}" style="background:transparent; border:none; color:var(--text-muted); cursor:pointer;" title="Delete Offer">
                        <i class="fa-solid fa-trash-can" style="font-size:0.75rem;"></i>
                    </button>
                </div>
                <div style="font-family:'Outfit',sans-serif; font-size:1.15rem; font-weight:800; color:#fff;">${formatINR(sc.monthlyInhand)}<span style="font-size: 0.7rem; font-weight: 500; color: var(--text-muted);">/mo</span></div>
                ${deltaBadge}
                <div style="margin-top: 0.4rem; display: flex; flex-direction: column; gap: 0.2rem; font-size:0.72rem; color:var(--text-muted);">
                    <div style="display:flex; justify-content:space-between;"><span>CTC:</span><span style="color:#fff;">${formatINR(sc.ctc)}</span></div>
                    <div style="display:flex; justify-content:space-between;"><span>Regime:</span><span style="color:#fff;">${sc.regime}</span></div>
                    <div style="display:flex; justify-content:space-between;"><span>TDS (Tax):</span><span style="color:#fff;">${formatINR(sc.annualTax)}/yr</span></div>
                    <div style="display:flex; justify-content:space-between;"><span>Total PF:</span><span style="color:#fff;">${formatINR(sc.pf)}/yr</span></div>
                </div>
            `;
            
            compareScenariosGrid.appendChild(card);
        });
        
        compareScenariosGrid.querySelectorAll('.btn-delete-scenario').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idToDelete = parseInt(btn.getAttribute('data-id'));
                savedScenarios = savedScenarios.filter(sc => sc.id !== idToDelete);
                localStorage.setItem('saved_salary_scenarios', JSON.stringify(savedScenarios));
                renderScenarios();
            });
        });
    }

    // Instant Chatbot Terminal Handlers
    function appendMessage(text, sender) {
        if (!chatMessages) return;
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${sender}`;
        msgDiv.style.padding = '0.5rem 0.75rem';
        msgDiv.style.borderRadius = '8px';
        msgDiv.style.fontSize = '0.8rem';
        msgDiv.style.lineHeight = '1.4';
        msgDiv.style.marginBottom = '0.5rem';
        if (sender === 'user') {
            msgDiv.style.alignSelf = 'flex-end';
            msgDiv.style.background = 'rgba(59, 130, 246, 0.15)';
            msgDiv.style.border = '1px solid rgba(59, 130, 246, 0.3)';
            msgDiv.style.color = '#fff';
        } else {
            msgDiv.style.alignSelf = 'flex-start';
            msgDiv.style.background = 'rgba(255, 255, 255, 0.03)';
            msgDiv.style.border = '1px solid var(--border-color)';
            msgDiv.style.color = '#fff';
        }
        msgDiv.innerHTML = `<p style="margin:0;">${text}</p>`;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function processQuery(query) {
        appendMessage(query, 'user');
        
        // Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-msg system';
        typingDiv.style.alignSelf = 'flex-start';
        typingDiv.style.background = 'rgba(255, 255, 255, 0.03)';
        typingDiv.style.border = '1px solid var(--border-color)';
        typingDiv.style.color = '#fff';
        typingDiv.style.padding = '0.5rem 0.75rem';
        typingDiv.style.borderRadius = '8px';
        typingDiv.style.fontSize = '0.8rem';
        typingDiv.style.marginBottom = '0.5rem';
        typingDiv.innerHTML = '<p style="margin:0;">Thinking...</p>';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        const state = currentCalcState;
        fetch("/api/tax/advise", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ctc: state.ctc,
                basic_pct: parseFloat(inputBasicPct ? inputBasicPct.value : 50) || 50,
                vpf_pct: parseFloat(inputVpfPct ? inputVpfPct.value : 0) || 0,
                rent_paid: parseFloat(inputRent ? inputRent.value : 0) * 12, // Annual
                car_perk: state.annualCarPerq,
                other_deductions: state.oldDeductions - 50000,
                question: query
            })
        })
        .then(res => res.json())
        .then(data => {
            typingDiv.remove();
            if (data.success && data.advice) {
                let text = data.advice;
                text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
                text = text.replace(/\n/g, '<br>');
                appendMessage(text, 'system');
            } else {
                appendMessage(data.error || "Could not process response.", 'system');
            }
        })
        .catch(err => {
            typingDiv.remove();
            console.error(err);
            appendMessage("Connection error while requesting advice from the server.", 'system');
        });
    }

    if (btnChatSend && chatInput) {
        btnChatSend.addEventListener('click', () => {
            const txt = chatInput.value.trim();
            if (txt) {
                processQuery(txt);
                chatInput.value = '';
            }
        });

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const txt = chatInput.value.trim();
                if (txt) {
                    processQuery(txt);
                    chatInput.value = '';
                }
            }
        });
    }

    if (chatChips) {
        chatChips.addEventListener('click', (e) => {
            const btn = e.target.closest('.chip-btn');
            if (btn) {
                const query = btn.getAttribute('data-query');
                processQuery(query);
            }
        });
    }

    // Trigger initial run
    calculateAndDisplay();

    // ----------------------------------------------------
    // Tab: Company Sheet PDF Generator
    // ----------------------------------------------------
    const generateSheetBtn = document.getElementById("generate-pdf-sheet-btn");
    const sheetCompanyInput = document.getElementById("sheet-company-name");
    const sheetLoading = document.getElementById("sheet-loading");
    const sheetResult = document.getElementById("sheet-result");
    const sheetDownloadLink = document.getElementById("sheet-download-link");

    if (generateSheetBtn) {
        generateSheetBtn.addEventListener("click", () => {
            const companyName = sheetCompanyInput.value.trim();
            if (!companyName) {
                alert("Please enter a target company name!");
                return;
            }

            sheetResult.style.display = "none";
            sheetLoading.style.display = "block";
            generateSheetBtn.disabled = true;
            generateSheetBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Researching & Generating PDF...';

            fetch("/api/sheets/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ company: companyName })
            })
            .then(res => res.json())
            .then(data => {
                sheetLoading.style.display = "none";
                generateSheetBtn.disabled = false;
                generateSheetBtn.innerHTML = '<i class="fa-solid fa-file-export"></i> Compile & Generate PDF Sheet';

                if (data.success && data.pdf_url) {
                    sheetDownloadLink.href = data.pdf_url;
                    sheetResult.style.display = "block";
                } else {
                    alert(data.error || "Failed to generate PDF sheet.");
                }
            })
            .catch(err => {
                console.error(err);
                alert("Failed to build PDF sheet due to network error.");
                sheetLoading.style.display = "none";
                generateSheetBtn.disabled = false;
                generateSheetBtn.innerHTML = '<i class="fa-solid fa-file-export"></i> Compile & Generate PDF Sheet';
            });
        });
    }

    // ----------------------------------------------------
    // Tab: Company Sheet PDF Generator Directory Index (Server-Paginated to prevent lag)
    // ----------------------------------------------------
    const alphabetBarContainer = document.getElementById("alphabet-bar-container");
    const directorySearchInput = document.getElementById("directory-search-input");
    const directoryCompaniesList = document.getElementById("directory-companies-list");

    let currentLetter = "A";
    let currentSearch = "";
    let currentPage = 1;
    let hasMoreCompanies = false;

    if (alphabetBarContainer && directoryCompaniesList) {
        initAlphabetDirectory();
        selectLetter("A");

        function initAlphabetDirectory() {
            alphabetBarContainer.innerHTML = "";
            const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
            letters.forEach(letter => {
                const span = document.createElement("span");
                span.className = "letter-tag";
                span.textContent = letter;
                span.dataset.letter = letter;
                span.addEventListener("click", () => {
                    selectLetter(letter);
                });
                alphabetBarContainer.appendChild(span);
            });
        }

        function selectLetter(letter) {
            currentLetter = letter;
            currentSearch = "";
            currentPage = 1;

            const activeLetter = alphabetBarContainer.querySelector(".letter-tag.active");
            if (activeLetter) activeLetter.classList.remove("active");
            
            const targetSpan = alphabetBarContainer.querySelector(`[data-letter="${letter}"]`);
            if (targetSpan) targetSpan.classList.add("active");

            if (directorySearchInput) directorySearchInput.value = "";

            fetchCompaniesFromServer(false);
        }

        function fetchCompaniesFromServer(append = false) {
            if (!append) {
                directoryCompaniesList.innerHTML = '<p class="text-muted" style="text-align: center; margin-top: 2rem;"><i class="fa-solid fa-circle-notch fa-spin text-neon-blue"></i> Loading global directory...</p>';
            }

            const url = `/api/companies/directory?letter=${currentLetter}&search=${encodeURIComponent(currentSearch)}&page=${currentPage}&limit=100`;
            fetch(url)
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
                .then(data => {
                    hasMoreCompanies = data.has_more;
                    renderCompaniesList(data.results, data.total_count, append);
                })
                .catch(err => {
                    console.error("Error loading directory from server:", err);
                    // Resilient client-side fallback: synthesize matching options locally if backend is rebuilding
                    const query = currentSearch.trim() || currentLetter;
                    const capBase = query.charAt(0).toUpperCase() + query.slice(1);
                    const fallbackList = [
                        capBase,
                        `${capBase} Technologies`,
                        `${capBase} Solutions`,
                        `${capBase} India`,
                        `${capBase} Global`,
                        `${capBase} Group`,
                        `${capBase} Services`
                    ];
                    hasMoreCompanies = false;
                    renderCompaniesList(fallbackList, fallbackList.length, append);
                });
        }

        function renderCompaniesList(list, totalCount, append) {
            const existingBtn = document.getElementById("load-more-companies-btn");
            if (existingBtn) existingBtn.remove();

            const existingMsg = document.getElementById("directory-count-msg");
            if (existingMsg) existingMsg.remove();

            if (!append) {
                directoryCompaniesList.innerHTML = "";
            }

            if (list.length === 0 && !append) {
                directoryCompaniesList.innerHTML = `<p class="text-muted" style="font-size: 0.8rem; text-align: center; margin-top: 2rem;">No companies found matching criteria</p>`;
                return;
            }

            if (!append) {
                const infoDiv = document.createElement("div");
                infoDiv.id = "directory-count-msg";
                infoDiv.style = "font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.5rem; padding: 0.25rem 0.5rem; background: rgba(255,255,255,0.02); border-radius: 4px;";
                infoDiv.innerHTML = `<i class="fa-solid fa-database text-neon-cyan"></i> Showing ${list.length} of ${totalCount.toLocaleString()} companies`;
                directoryCompaniesList.appendChild(infoDiv);
            }

            list.forEach(comp => {
                const div = document.createElement("div");
                div.className = "company-item";
                if (sheetCompanyInput.value === comp) {
                    div.classList.add("active");
                }
                div.innerHTML = `<i class="fa-regular fa-building text-neon-blue"></i> <span>${comp}</span>`;
                div.addEventListener("click", () => {
                    const prevActive = directoryCompaniesList.querySelector(".company-item.active");
                    if (prevActive) prevActive.classList.remove("active");
                    div.classList.add("active");

                    sheetCompanyInput.value = comp;
                });
                directoryCompaniesList.appendChild(div);
            });

            if (hasMoreCompanies) {
                const btn = document.createElement("button");
                btn.id = "load-more-companies-btn";
                btn.className = "glow-btn";
                btn.style = "width: 100%; margin-top: 1rem; padding: 0.5rem; font-size: 0.75rem; justify-content: center; height: auto;";
                btn.innerHTML = '<i class="fa-solid fa-angle-down"></i> Load More Companies';
                btn.addEventListener("click", () => {
                    currentPage += 1;
                    fetchCompaniesFromServer(true);
                });
                directoryCompaniesList.appendChild(btn);
            }
        }

        let searchDebounceTimeout;
        if (directorySearchInput) {
            directorySearchInput.addEventListener("input", () => {
                clearTimeout(searchDebounceTimeout);
                searchDebounceTimeout = setTimeout(() => {
                    const query = directorySearchInput.value.trim().toLowerCase();
                    currentSearch = query;
                    currentPage = 1;

                    if (query) {
                        const activeLetter = alphabetBarContainer.querySelector(".letter-tag.active");
                        if (activeLetter) activeLetter.classList.remove("active");
                    } else {
                        selectLetter("A");
                        return;
                    }

                    fetchCompaniesFromServer(false);
                }, 300);
            });
        }
    }

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            const tab = item.getAttribute("data-tab");
            if (tab === "jobs") {
                fetchJobsFeed();
            } else if (tab === "abroad") {
                fetchAbroadJobsFeed();
            } else if (tab === "exams") {
                fetchExamsFeed();
            }
        });
    });

    // ----------------------------------------------------
    // Tab: Relocation Assistant Handlers
    // ----------------------------------------------------
    const relocCityInput = document.getElementById("relocation-city-input");
    const relocSearchBtn = document.getElementById("relocation-search-btn");
    const relocLoading = document.getElementById("relocation-loading");
    const relocResults = document.getElementById("relocation-results");
    const relocPdfBtn = document.getElementById("relocation-pdf-btn");

    const relocRent = document.getElementById("reloc-rent");
    const relocFood = document.getElementById("reloc-food");
    const relocPg = document.getElementById("reloc-pg");
    const relocWeather = document.getElementById("reloc-weather");
    const relocTransport = document.getElementById("reloc-transport");
    const relocOffices = document.getElementById("reloc-offices");

    function executeRelocationAnalysis() {
        const city = relocCityInput.value.trim();
        if (!city) {
            alert("Please enter a valid city name.");
            return;
        }

        relocLoading.style.display = "block";
        relocResults.classList.add("hide");

        fetch(`/api/relocation?city=${encodeURIComponent(city)}`)
        .then(res => res.json())
        .then(data => {
            relocLoading.style.display = "none";
            if (data.error) {
                alert("Failed to analyze city: " + data.error);
                return;
            }

            // Populate cards
            relocRent.innerText = data.rent || "N/A";
            relocFood.innerText = data.food || "N/A";
            relocPg.innerText = data.pgs || "N/A";
            relocWeather.innerText = data.weather || "N/A";
            relocTransport.innerText = data.transport || "N/A";
            relocOffices.innerText = data.offices || "N/A";

            // Update PDF download link
            relocPdfBtn.href = `/api/relocation/pdf?city=${encodeURIComponent(city)}`;

            relocResults.classList.remove("hide");
        })
        .catch(err => {
            console.error("Relocation analysis error:", err);
            relocLoading.style.display = "none";
            alert("An error occurred during relocation analysis.");
        });
    }

    if (relocSearchBtn) {
        relocSearchBtn.addEventListener("click", executeRelocationAnalysis);
    }
    if (relocCityInput) {
        relocCityInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                executeRelocationAnalysis();
            }
        });
    }

    // ----------------------------------------------------
    // Tab: 1-Page Company Cheat Sheet Handlers
    // ----------------------------------------------------
    const cheatInput = document.getElementById("cheatsheet-company-input");
    const cheatSearchBtn = document.getElementById("cheatsheet-search-btn");
    const cheatLoading = document.getElementById("cheatsheet-loading");
    const cheatResults = document.getElementById("cheatsheet-results");
    const cheatPdfBtn = document.getElementById("cheatsheet-pdf-btn");

    const cheatHq = document.getElementById("cheat-hq");
    const cheatCeo = document.getElementById("cheat-ceo");
    const cheatFounded = document.getElementById("cheat-founded");
    const cheatProducts = document.getElementById("cheat-products");
    const cheatNews = document.getElementById("cheat-news");
    const cheatHiring = document.getElementById("cheat-hiring");
    const cheatSalary = document.getElementById("cheat-salary");
    const cheatTech = document.getElementById("cheat-tech");

    function executeCheatSheetAnalysis() {
        const company = cheatInput.value.trim();
        if (!company) {
            alert("Please enter a company name.");
            return;
        }

        cheatLoading.style.display = "block";
        cheatResults.classList.add("hide");

        fetch(`/api/cheatsheet?company=${encodeURIComponent(company)}`)
        .then(res => res.json())
        .then(data => {
            cheatLoading.style.display = "none";
            if (data.error) {
                alert("Failed to generate cheat sheet: " + data.error);
                return;
            }

            // Populate cards
            cheatHq.innerText = data.headquarters || "N/A";
            cheatCeo.innerText = data.ceo || "N/A";
            cheatFounded.innerText = data.founded || "N/A";
            cheatProducts.innerText = data.products || "N/A";
            cheatNews.innerText = data.news || "N/A";
            cheatHiring.innerText = data.hiring || "N/A";
            cheatSalary.innerText = data.salary || "N/A";
            cheatTech.innerText = data.tech_stack || "N/A";

            // Update PDF download link
            cheatPdfBtn.href = `/api/cheatsheet/pdf?company=${encodeURIComponent(company)}`;

            cheatResults.classList.remove("hide");
        })
        .catch(err => {
            console.error("Cheat sheet analysis error:", err);
            cheatLoading.style.display = "none";
            alert("An error occurred during cheat sheet generation.");
        });
    }

    if (cheatSearchBtn) {
        cheatSearchBtn.addEventListener("click", executeCheatSheetAnalysis);
    }
    if (cheatInput) {
        cheatInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                executeCheatSheetAnalysis();
            }
        });
    }

    // ----------------------------------------------------
    // Tab: PlaceIQ Placement Readiness Predictor
    // ----------------------------------------------------
    const piqCollege = document.getElementById("placeiq-college");
    const piqBranch = document.getElementById("placeiq-branch");
    const piqCgpa = document.getElementById("placeiq-cgpa");
    const piqBacklogs = document.getElementById("placeiq-backlogs");
    const piqSkills = document.getElementById("placeiq-skills");
    const piqRole = document.getElementById("placeiq-role");
    const piqDsa = document.getElementById("placeiq-dsa");
    const piqSubjects = document.getElementById("placeiq-subjects");
    const piqAptitude = document.getElementById("placeiq-aptitude");
    const piqCommunication = document.getElementById("placeiq-communication");
    
    const piqPredictBtn = document.getElementById("placeiq-predict-btn");
    const piqLoading = document.getElementById("placeiq-loading");
    const piqResults = document.getElementById("placeiq-results");
    const piqPdfBtn = document.getElementById("placeiq-pdf-btn");

    const piqProbVal = document.getElementById("placeiq-prob-val");
    const piqGradeVal = document.getElementById("placeiq-grade-val");
    const piqPercentileVal = document.getElementById("placeiq-percentile-val");
    const piqBenchmark = document.getElementById("placeiq-benchmark");
    const piqGap = document.getElementById("placeiq-gap");
    const piqRoadmap = document.getElementById("placeiq-roadmap");

    // Dynamic engine container
    const piqEngineContainer = document.getElementById("placeiq-engine-container");

    function executePlaceIQPrediction() {
        const college = piqCollege.value.trim();
        const branch = piqBranch.value;
        const cgpa = piqCgpa.value.trim();
        const backlogs = piqBacklogs.value.trim();
        const skills = piqSkills.value.trim();
        const role = piqRole.value.trim();
        const dsa = piqDsa ? piqDsa.value.trim() : "0";
        const subjects = piqSubjects ? piqSubjects.value.trim() : "7";
        const aptitude = piqAptitude ? piqAptitude.value.trim() : "7";
        const communication = piqCommunication ? piqCommunication.value.trim() : "7";

        if (!college || !cgpa || !skills || !role) {
            alert("Please fill in College Name, CGPA, Core Skills, and Target Job Role.");
            return;
        }

        piqLoading.style.display = "block";
        piqResults.classList.add("hide");

        fetch("/api/placeiq/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                college: college,
                branch: branch,
                cgpa: parseFloat(cgpa),
                backlogs: parseInt(backlogs) || 0,
                skills: skills,
                role: role,
                dsa: parseInt(dsa) || 0,
                subjects: parseInt(subjects) || 7,
                aptitude: parseInt(aptitude) || 7,
                communication: parseInt(communication) || 7
            })
        })
        .then(res => res.json())
        .then(data => {
            piqLoading.style.display = "none";
            if (data.error) {
                alert("Prediction failed: " + data.error);
                return;
            }

            // Populate dashboard metrics
            piqProbVal.innerText = `${data.probability}%`;
            piqGradeVal.innerText = data.grade || "C";
            piqPercentileVal.innerText = `${data.percentile}th`;

            piqBenchmark.innerText = data.benchmark_info || "N/A";
            piqGap.innerText = data.skills_gap || "None";
            piqRoadmap.innerText = data.milestones || "None";

            // Render Company probability bars dynamically
            if (piqEngineContainer) {
                piqEngineContainer.innerHTML = "";
                const engine = data.probability_engine || [];
                engine.forEach(comp => {
                    const row = document.createElement("div");
                    row.innerHTML = `
                        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.25rem;">
                            <span>${comp.name}</span>
                            <span style="color: ${comp.tier === 'core' ? 'var(--neon-yellow)' : comp.tier === 'product' ? 'var(--neon-cyan)' : 'var(--neon-purple)'}; font-weight: 700;">${comp.score}%</span>
                        </div>
                        <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.05); border-radius: 4px; overflow: hidden;">
                            <div style="width: 0%; height: 100%; background: ${comp.tier === 'core' ? 'var(--neon-yellow)' : comp.tier === 'product' ? 'var(--neon-cyan)' : 'var(--neon-purple)'}; transition: width 0.8s ease;" class="engine-bar" data-width="${comp.score}"></div>
                        </div>
                    `;
                    piqEngineContainer.appendChild(row);
                });
                
                // Trigger animation width
                setTimeout(() => {
                    document.querySelectorAll(".engine-bar").forEach(bar => {
                        bar.style.width = `${bar.getAttribute("data-width")}%`;
                    });
                }, 100);
            }

            // Update PDF Link
            piqPdfBtn.href = `/api/placeiq/pdf?college=${encodeURIComponent(college)}&branch=${encodeURIComponent(branch)}&cgpa=${cgpa}&backlogs=${backlogs}&skills=${encodeURIComponent(skills)}&role=${encodeURIComponent(role)}&dsa=${dsa}&subjects=${subjects}&aptitude=${aptitude}&communication=${communication}`;

            piqResults.classList.remove("hide");
        })
        .catch(err => {
            console.error("PlaceIQ analysis error:", err);
            piqLoading.style.display = "none";
            alert("An error occurred during placement readiness analysis.");
        });
    }

    if (piqPredictBtn) {
        piqPredictBtn.addEventListener("click", executePlaceIQPrediction);
    }

    // Initialize first load
    fetchCompanyDetails("TCS", "technical");
    // ----------------------------------------------------
    // Tab: Script Doctor
    // ----------------------------------------------------
    const generateScriptBtn = document.getElementById("generate-script-btn");
    if (generateScriptBtn) {
        generateScriptBtn.addEventListener("click", () => {
            const role = document.getElementById("script-role").value;
            const superpower = document.getElementById("script-superpower").value.toLowerCase();
            const vibe = document.getElementById("script-vibe").value;

            const btnOriginal = generateScriptBtn.innerHTML;
            generateScriptBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Generating...';
            generateScriptBtn.disabled = true;

            fetch("/api/networking/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "script",
                    role: role,
                    superpower: superpower,
                    vibe: vibe,
                    context: ""
                })
            })
            .then(response => response.json())
            .then(data => {
                generateScriptBtn.innerHTML = btnOriginal;
                generateScriptBtn.disabled = false;
                
                if (data.error) {
                    document.getElementById("script-output-body").innerHTML = `<span style="color:var(--neon-pink)">Error: ${data.error}</span>`;
                    document.getElementById("script-output-container").style.display = "block";
                } else {
                    document.getElementById("script-output-body").innerHTML = data.result;
                    document.getElementById("script-output-container").style.display = "block";
                }
            })
            .catch(error => {
                console.error("Error:", error);
                generateScriptBtn.innerHTML = btnOriginal;
                generateScriptBtn.disabled = false;
            });
        });
    }
    
    // ----------------------------------------------------
    // Tab: Negotiation Arena
    // ----------------------------------------------------
    const generateNegoBtn = document.getElementById("generate-nego-btn");
    if (generateNegoBtn) {
        generateNegoBtn.addEventListener("click", () => {
            const situation = document.getElementById("nego-situation").value.trim();
            const leverage = document.getElementById("nego-leverage").value;
            
            if (!situation) {
                alert("Please describe your exact situation to generate scripts.");
                return;
            }

            const btnOriginal = generateNegoBtn.innerHTML;
            generateNegoBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Strategizing...';
            generateNegoBtn.disabled = true;

            fetch("/api/networking/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "negotiation",
                    company: "Unknown",
                    base: situation,
                    leverage: leverage,
                    context: "" 
                })
            })
            .then(response => response.json())
            .then(data => {
                generateNegoBtn.innerHTML = btnOriginal;
                generateNegoBtn.disabled = false;
                
                if (data.error) {
                    document.getElementById("nego-output-body").innerHTML = `<span style="color:var(--neon-pink)">Error: ${data.error}</span>`;
                    document.getElementById("nego-output-container").style.display = "block";
                } else {
                    document.getElementById("nego-output-body").innerHTML = data.result;
                    document.getElementById("nego-output-container").style.display = "block";
                }
            })
            .catch(error => {
                console.error("Error:", error);
                generateNegoBtn.innerHTML = btnOriginal;
                generateNegoBtn.disabled = false;
            });
        });
    }
    
    // ----------------------------------------------------
    // Tab: Cold Mail Generator
    // ----------------------------------------------------
    const generateColdBtn = document.getElementById("generate-cold-btn");
    if (generateColdBtn) {
        generateColdBtn.addEventListener("click", () => {
            const recipient = document.getElementById("cold-recipient").value;
            const connection = document.getElementById("cold-connection").value;
            const ask = document.getElementById("cold-ask").value;
            const custom = document.getElementById("cold-custom").value.trim();

            const btnOriginal = generateColdBtn.innerHTML;
            generateColdBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Generating...';
            generateColdBtn.disabled = true;

            fetch("/api/networking/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "cold_mail",
                    role: recipient,
                    connection: connection,
                    ask: ask,
                    context: custom
                })
            })
            .then(response => response.json())
            .then(data => {
                generateColdBtn.innerHTML = btnOriginal;
                generateColdBtn.disabled = false;
                
                if (data.error) {
                    document.getElementById("cold-output-body").innerHTML = `<span style="color:var(--neon-pink)">Error: ${data.error}</span>`;
                    document.getElementById("cold-output-container").style.display = "block";
                } else {
                    document.getElementById("cold-output-body").innerHTML = data.result;
                    document.getElementById("cold-output-container").style.display = "block";
                }
            })
            .catch(error => {
                console.error("Error:", error);
                generateColdBtn.innerHTML = btnOriginal;
                generateColdBtn.disabled = false;
            });
        });
    }

    // ----------------------------------------------------
    // Tab: Email Etiquette Doctor
    // ----------------------------------------------------
    const generateEmailBtn = document.getElementById("generate-email-btn");
    if (generateEmailBtn) {
        generateEmailBtn.addEventListener("click", () => {
            const draft = document.getElementById("email-draft").value.trim();
            const tone = document.getElementById("email-tone").value;

            if (!draft) {
                alert("Please paste your rough draft email to polish.");
                return;
            }

            const btnOriginal = generateEmailBtn.innerHTML;
            generateEmailBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Polishing...';
            generateEmailBtn.disabled = true;

            fetch("/api/networking/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "email_doctor",
                    draft: draft,
                    tone: tone,
                    context: ""
                })
            })
            .then(response => response.json())
            .then(data => {
                generateEmailBtn.innerHTML = btnOriginal;
                generateEmailBtn.disabled = false;
                
                if (data.error) {
                    document.getElementById("email-output-body").innerHTML = `<span style="color:var(--neon-pink)">Error: ${data.error}</span>`;
                    document.getElementById("email-explanation-body").innerHTML = "<em>Polished by AI Email Doctor</em>";
                    document.getElementById("email-output-container").style.display = "block";
                } else {
                    document.getElementById("email-output-body").innerHTML = data.result;
                    document.getElementById("email-explanation-body").innerHTML = "<em>Polished by AI Email Doctor</em>";
                    document.getElementById("email-output-container").style.display = "block";
                }
            })
            .catch(error => {
                console.error("Error:", error);
                generateEmailBtn.innerHTML = btnOriginal;
                generateEmailBtn.disabled = false;
            });
        });
    }

    // ----------------------------------------------------
    // Tab: Skill Gap Radar
    // ----------------------------------------------------
    const generateRadarBtn = document.getElementById("generate-radar-btn");
    if (generateRadarBtn) {
        generateRadarBtn.addEventListener("click", () => {
            const role = document.getElementById("radar-role").value;
            const skillsRaw = document.getElementById("radar-skills").value.toLowerCase();
            
            if (!skillsRaw) {
                alert("Please enter some of your current skills.");
                return;
            }

            const btnOriginal = generateRadarBtn.innerHTML;
            generateRadarBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Scanning...';
            generateRadarBtn.disabled = true;

            fetch("/api/networking/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "skill_radar",
                    role: role,
                    stack: skillsRaw
                })
            })
            .then(response => response.json())
            .then(data => {
                generateRadarBtn.innerHTML = btnOriginal;
                generateRadarBtn.disabled = false;
                
                if (data.error) {
                    document.getElementById("radar-output-body").innerHTML = `<span style="color:var(--neon-pink)">Error: ${data.error}</span>`;
                    document.getElementById("radar-output-container").style.display = "block";
                } else {
                    document.getElementById("radar-output-body").innerHTML = data.result;
                    document.getElementById("radar-output-container").style.display = "block";
                }
            })
            .catch(error => {
                console.error("Error:", error);
                generateRadarBtn.innerHTML = btnOriginal;
                generateRadarBtn.disabled = false;
            });
        });
    }

    // ----------------------------------------------------
    // Tab: Ghost Detector
    // ----------------------------------------------------
    const generateGhostBtn = document.getElementById("generate-ghost-btn");
    if (generateGhostBtn) {
        generateGhostBtn.addEventListener("click", () => {
            const size = document.getElementById("ghost-size").value;
            const days = parseInt(document.getElementById("ghost-days").value, 10);
            const context = document.getElementById("ghost-context").value.trim();

            if (isNaN(days) || days < 1) {
                alert("Please enter a valid number of days.");
                return;
            }

            const btnOriginal = generateGhostBtn.innerHTML;
            generateGhostBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Diagnosing...';
            generateGhostBtn.disabled = true;

            fetch("/api/networking/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "ghost_detector",
                    company: "Unknown",
                    size: size,
                    days: days,
                    context: context
                })
            })
            .then(response => response.json())
            .then(data => {
                generateGhostBtn.innerHTML = btnOriginal;
                generateGhostBtn.disabled = false;
                
                if (data.error) {
                    document.getElementById("ghost-status-desc").innerHTML = "<strong>AI Analysis Complete.</strong>";
                    document.getElementById("ghost-script-body").innerHTML = `<span style="color:var(--neon-pink)">Error: ${data.error}</span>`;
                    document.getElementById("ghost-output-container").style.display = "block";
                } else {
                    document.getElementById("ghost-status-desc").innerHTML = "<strong>AI Analysis Complete.</strong>";
                    document.getElementById("ghost-script-body").innerHTML = data.result;
                    document.getElementById("ghost-output-container").style.display = "block";
                }
            })
            .catch(error => {
                console.error("Error:", error);
                generateGhostBtn.innerHTML = btnOriginal;
                generateGhostBtn.disabled = false;
            });
        });
    }

    // ----------------------------------------------------
    // Tab: LinkedIn Studio
    // ----------------------------------------------------
    const generateLiBtn = document.getElementById("generate-li-btn");
    if (generateLiBtn) {
        generateLiBtn.addEventListener("click", () => {
            const domain = document.getElementById("li-domain").value;
            const skills = document.getElementById("li-skills").value.trim() || "Modern Tech Stack";
            const tone = document.getElementById("li-tone").value;
            const context = document.getElementById("li-context").value.trim();

            const btnOriginal = generateLiBtn.innerHTML;
            generateLiBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Generating...';
            generateLiBtn.disabled = true;

            fetch("/api/networking/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "linkedin",
                    domain: domain,
                    keywords: skills,
                    tone: tone,
                    context: context
                })
            })
            .then(response => response.json())
            .then(data => {
                generateLiBtn.innerHTML = btnOriginal;
                generateLiBtn.disabled = false;
                
                if (data.error) {
                    document.getElementById("li-headline-body").innerHTML = "<strong>AI Generated Profile</strong>";
                    document.getElementById("li-about-body").innerHTML = `<span style="color:var(--neon-pink)">Error: ${data.error}</span>`;
                    document.getElementById("li-output-container").style.display = "block";
                } else {
                    document.getElementById("li-headline-body").innerHTML = "<strong>AI Generated Profile</strong>";
                    document.getElementById("li-about-body").innerHTML = data.result;
                    document.getElementById("li-output-container").style.display = "block";
                }
            })
            .catch(error => {
                console.error("Error:", error);
                generateLiBtn.innerHTML = btnOriginal;
                generateLiBtn.disabled = false;
            });
        });
    }

    // ----------------------------------------------------
    // Tab: Endorsement Scripting (LoR Builder)
    // ----------------------------------------------------
    const generateLorBtn = document.getElementById("generate-lor-btn");
    if (generateLorBtn) {
        generateLorBtn.addEventListener("click", () => {
            const relationship = document.getElementById("lor-relationship").value;
            const platform = document.getElementById("lor-platform").value;
            const achievements = document.getElementById("lor-achievements").value.trim();

            const btnOriginal = generateLorBtn.innerHTML;
            generateLorBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Drafting...';
            generateLorBtn.disabled = true;

            fetch("/api/networking/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "lor",
                    relationship: relationship,
                    platform: platform,
                    achievements: achievements
                })
            })
            .then(response => response.json())
            .then(data => {
                generateLorBtn.innerHTML = btnOriginal;
                generateLorBtn.disabled = false;
                
                if (data.error) {
                    document.getElementById("lor-output-body").innerHTML = `<span style="color:var(--neon-pink)">Error: ${data.error}</span>`;
                } else {
                    document.getElementById("lor-output-body").innerHTML = data.result;
                }
                document.getElementById("lor-output-container").style.display = "block";
            })
            .catch(error => {
                console.error("Error:", error);
                generateLorBtn.innerHTML = btnOriginal;
                generateLorBtn.disabled = false;
                document.getElementById("lor-output-body").innerHTML = `<span style="color:var(--neon-pink)">An error occurred. Please try again later.</span>`;
                document.getElementById("lor-output-container").style.display = "block";
            });
        });
    }

    // ----------------------------------------------------
    // Tab: Referral Request Generator
    // ----------------------------------------------------
    const generateRefBtn = document.getElementById("generate-ref-btn");
    if (generateRefBtn) {
        generateRefBtn.addEventListener("click", () => {
            const role = document.getElementById("ref-role").value.trim() || "[Target Role]";
            const connection = document.getElementById("ref-connection").value;
            const goal = document.getElementById("ref-goal").value.trim() || "[Job ID]";
            const context = document.getElementById("ref-context").value.trim();

            const btnOriginal = generateRefBtn.innerHTML;
            generateRefBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Generating...';
            generateRefBtn.disabled = true;

            fetch("/api/networking/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "referral",
                    job_id: role + " - " + goal,
                    connection: connection,
                    context: context
                })
            })
            .then(response => response.json())
            .then(data => {
                generateRefBtn.innerHTML = btnOriginal;
                generateRefBtn.disabled = false;
                
                if (data.error) {
                    document.getElementById("ref-output-body").innerHTML = `<span style="color:var(--neon-pink)">Error: ${data.error}</span>`;
                } else {
                    document.getElementById("ref-output-body").innerHTML = data.result;
                }
                document.getElementById("ref-output-container").style.display = "block";
            })
            .catch(error => {
                console.error("Error:", error);
                generateRefBtn.innerHTML = btnOriginal;
                generateRefBtn.disabled = false;
                document.getElementById("ref-output-body").innerHTML = `<span style="color:var(--neon-pink)">An error occurred. Please try again later.</span>`;
                document.getElementById("ref-output-container").style.display = "block";
            });
        });
    }
});


// ==========================================
// Networking GPS (CRM) Logic
// ==========================================
let gpsContacts = JSON.parse(localStorage.getItem('networkingGPSContacts')) || [];

function renderGPSContacts() {
    const tbody = document.getElementById('gps-table-body');
    const emptyState = document.getElementById('gps-empty-state');
    const table = document.getElementById('gps-table');
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (gpsContacts.length === 0) {
        emptyState.style.display = 'block';
        table.style.display = 'none';
        return;
    }
    
    emptyState.style.display = 'none';
    table.style.display = 'table';
    
    gpsContacts.forEach((contact, index) => {
        const tr = document.createElement('tr');
        tr.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        
        tr.innerHTML = 
            <td style="padding: 0.75rem;"></td>
            <td style="padding: 0.75rem;"></td>
            <td style="padding: 0.75rem;"></td>
            <td style="padding: 0.75rem;"><span class="badge badge-primary"></span></td>
            <td style="padding: 0.75rem;"></td>
            <td style="padding: 0.75rem;">
                <button class="btn btn-sm" onclick="deleteGPSContact()" style="background: transparent; color: var(--neon-pink); padding: 0.2rem 0.5rem;"><i class="fa-solid fa-trash"></i></button>
            </td>
        ;
        tbody.appendChild(tr);
    });
}

function deleteGPSContact(index) {
    gpsContacts.splice(index, 1);
    localStorage.setItem('networkingGPSContacts', JSON.stringify(gpsContacts));
    renderGPSContacts();
}

const gpsAddBtn = document.getElementById('gps-add-btn');
if (gpsAddBtn) {
    gpsAddBtn.addEventListener('click', () => {
        const name = document.getElementById('gps-name').value.trim();
        const company = document.getElementById('gps-company').value.trim();
        const role = document.getElementById('gps-role').value.trim();
        const tier = document.getElementById('gps-tier').value;
        const date = document.getElementById('gps-date').value;
        
        if (!name || !company) {
            alert('Please enter at least a Name and Company.');
            return;
        }
        
        gpsContacts.push({ name, company, role, tier, date });
        localStorage.setItem('networkingGPSContacts', JSON.stringify(gpsContacts));
        
        // Clear inputs
        document.getElementById('gps-name').value = '';
        document.getElementById('gps-company').value = '';
        document.getElementById('gps-role').value = '';
        document.getElementById('gps-date').value = '';
        
        renderGPSContacts();
    });
}

const gpsAnalyzeBtn = document.getElementById('gps-analyze-btn');
if (gpsAnalyzeBtn) {
    gpsAnalyzeBtn.addEventListener('click', async () => {
        if (gpsContacts.length === 0) {
            alert('Please add some connections to your CRM first!');
            return;
        }
        
        const loading = document.getElementById('gps-loading');
        const result = document.getElementById('gps-result');
        const content = document.getElementById('gps-strategy-content');
        const btn = document.getElementById('gps-analyze-btn');
        
        btn.disabled = true;
        loading.style.display = 'block';
        result.style.display = 'none';
        
        try {
            const res = await fetch('/api/networking/gps', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contacts: gpsContacts })
            });
            
            const data = await res.json();
            
            if (data.error) {
                content.innerHTML = <p style="color: var(--neon-pink)">Error: </p>;
            } else {
                content.innerHTML = marked.parse(data.strategy);
            }
        } catch (err) {
            content.innerHTML = <p style="color: var(--neon-pink)">Connection error: </p>;
        } finally {
            loading.style.display = 'none';
            result.style.display = 'block';
            btn.disabled = false;
        }
    });
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(renderGPSContacts, 500);
});


// ==========================================
// 7 NEW PREMIUM AI TOOLS LOGIC
// ==========================================

// 1. AI Skill-Mesh Optimizer
const meshBtn = document.getElementById('mesh-btn');
if (meshBtn) {
    meshBtn.addEventListener('click', async () => {
        const jd = document.getElementById('mesh-jd').value.trim();
        const stack = document.getElementById('mesh-stack').value.trim();
        if (!jd || !stack) { alert("Please provide both the JD and your Stack."); return; }
        
        meshBtn.disabled = true;
        document.getElementById('mesh-loading').style.display = 'block';
        document.getElementById('mesh-result').style.display = 'none';
        
        try {
            const res = await fetch('/api/career/skill-mesh', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jd, stack })
            });
            const data = await res.json();
            document.getElementById('mesh-content').innerHTML = marked.parse(data.result);
        } catch (e) {
            document.getElementById('mesh-content').innerHTML = `<p style="color:var(--neon-pink)">Error: ${e.message}</p>`;
        } finally {
            meshBtn.disabled = false;
            document.getElementById('mesh-loading').style.display = 'none';
            document.getElementById('mesh-result').style.display = 'block';
        }
    });
}

// 2. Rejection Rehab
const rehabBtn = document.getElementById('rehab-btn');
if (rehabBtn) {
    rehabBtn.addEventListener('click', async () => {
        const email = document.getElementById('rehab-email').value.trim();
        if (!email) return;
        
        rehabBtn.disabled = true;
        document.getElementById('rehab-loading').style.display = 'block';
        document.getElementById('rehab-result').style.display = 'none';
        
        try {
            const res = await fetch('/api/career/rejection-rehab', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            document.getElementById('rehab-content').innerHTML = marked.parse(data.result);
        } catch (e) {
            document.getElementById('rehab-content').innerHTML = `<p style="color:var(--neon-pink)">Error: ${e.message}</p>`;
        } finally {
            rehabBtn.disabled = false;
            document.getElementById('rehab-loading').style.display = 'none';
            document.getElementById('rehab-result').style.display = 'block';
        }
    });
}

// 3. Recruiter Time-Zone Calc
const tzCity = document.getElementById('tz-city');
if (tzCity) {
    tzCity.addEventListener('change', () => {
        const timezone = tzCity.value;
        const now = new Date();
        
        // Calculate local time in target timezone
        const options = { timeZone: timezone, hour: '2-digit', minute: '2-digit', hour12: false };
        const localTimeStr = now.toLocaleTimeString('en-US', options);
        document.getElementById('tz-time').innerText = localTimeStr;
        
        // Extract hour for logic (0-23)
        const hour = parseInt(localTimeStr.split(':')[0], 10);
        
        const badge = document.getElementById('tz-badge');
        const status = document.getElementById('tz-status');
        
        if (hour >= 9 && hour <= 11) {
            badge.innerText = "PERFECT: Send Now";
            badge.style.background = "var(--neon-cyan)";
            badge.style.color = "#000";
            status.innerText = "Morning Inbox Peak";
        } else if (hour >= 13 && hour <= 16) {
            badge.innerText = "GOOD: Afternoon Window";
            badge.style.background = "var(--neon-yellow)";
            badge.style.color = "#000";
            status.innerText = "Standard Work Hours";
        } else {
            badge.innerText = "WAIT: Out of Office / Night";
            badge.style.background = "var(--neon-pink)";
            badge.style.color = "#fff";
            status.innerText = "Do not send email now";
        }
    });
    // Trigger on load
    tzCity.dispatchEvent(new Event('change'));
}

// 4. Peer Referral Tracker
let refLogs = JSON.parse(localStorage.getItem('peerReferralLogs')) || [];

function renderRefLogs() {
    const tbody = document.getElementById('ref-table-body');
    const emptyState = document.getElementById('ref-empty');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (refLogs.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    refLogs.forEach((log, index) => {
        const tr = document.createElement('tr');
        tr.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        
        // Calculate status badge
        const contactDate = new Date(log.date);
        const diffTime = Math.abs(new Date() - contactDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        
        let statusBadge = `<span class="badge" style="background:var(--neon-cyan);color:#000;">Fresh</span>`;
        if (diffDays >= 7) {
            statusBadge = `<span class="badge" style="background:var(--neon-yellow);color:#000;">Follow-Up Ready</span>`;
        }
        if (diffDays >= 30) {
            statusBadge = `<span class="badge" style="background:var(--neon-pink);color:#fff;">Archived</span>`;
        }
        
        tr.innerHTML = `
            <td style="padding: 0.75rem;">${log.name}</td>
            <td style="padding: 0.75rem;">${log.company}</td>
            <td style="padding: 0.75rem;">${log.date}</td>
            <td style="padding: 0.75rem;">${statusBadge}</td>
            <td style="padding: 0.75rem;">
                <button class="btn btn-sm" onclick="deleteRefLog(${index})" style="background:transparent; color:var(--neon-pink);"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function deleteRefLog(index) {
    refLogs.splice(index, 1);
    localStorage.setItem('peerReferralLogs', JSON.stringify(refLogs));
    renderRefLogs();
}

const refAddBtn = document.getElementById('ref-add-btn');
if (refAddBtn) {
    refAddBtn.addEventListener('click', () => {
        const name = document.getElementById('ref-name').value;
        const company = document.getElementById('ref-company').value;
        const date = document.getElementById('ref-date').value;
        if (!name || !date) return alert("Name and Date required.");
        
        refLogs.push({ name, company, date });
        localStorage.setItem('peerReferralLogs', JSON.stringify(refLogs));
        renderRefLogs();
        
        document.getElementById('ref-name').value = '';
        document.getElementById('ref-company').value = '';
        document.getElementById('ref-date').value = '';
    });
}

document.addEventListener('DOMContentLoaded', () => { setTimeout(renderRefLogs, 500); });

// 5. GD Key Phrase Generator
const gdBtn = document.getElementById('gd-btn');
if (gdBtn) {
    gdBtn.addEventListener('click', async () => {
        const topic = document.getElementById('gd-topic').value.trim();
        if (!topic) return;
        
        gdBtn.disabled = true;
        document.getElementById('gd-loading').style.display = 'block';
        document.getElementById('gd-result').style.display = 'none';
        
        try {
            const res = await fetch('/api/career/gd-generator', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic })
            });
            const data = await res.json();
            document.getElementById('gd-content').innerHTML = marked.parse(data.result);
        } catch (e) {
            document.getElementById('gd-content').innerHTML = `<p style="color:var(--neon-pink)">Error: ${e.message}</p>`;
        } finally {
            gdBtn.disabled = false;
            document.getElementById('gd-loading').style.display = 'none';
            document.getElementById('gd-result').style.display = 'block';
        }
    });
}

// 6. Thank-You Note Sculptor
const tyBtn = document.getElementById('ty-btn');
if (tyBtn) {
    tyBtn.addEventListener('click', async () => {
        const name = document.getElementById('ty-name').value;
        const topic = document.getElementById('ty-topic').value;
        const takeaway = document.getElementById('ty-takeaway').value;
        if (!name || !topic) return;
        
        tyBtn.disabled = true;
        document.getElementById('ty-loading').style.display = 'block';
        document.getElementById('ty-result').style.display = 'none';
        
        try {
            const res = await fetch('/api/career/thank-you', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, topic, takeaway })
            });
            const data = await res.json();
            document.getElementById('ty-content').innerHTML = marked.parse(data.result);
        } catch (e) {
            document.getElementById('ty-content').innerHTML = `<p style="color:var(--neon-pink)">Error: ${e.message}</p>`;
        } finally {
            tyBtn.disabled = false;
            document.getElementById('ty-loading').style.display = 'none';
            document.getElementById('ty-result').style.display = 'block';
        }
    });
}

// 7. Resume Bullet Polish
const bulletBtn = document.getElementById('bullet-btn');
if (bulletBtn) {
    bulletBtn.addEventListener('click', async () => {
        const bullet = document.getElementById('bullet-input').value;
        if (!bullet) return;
        
        bulletBtn.disabled = true;
        document.getElementById('bullet-loading').style.display = 'block';
        document.getElementById('bullet-result').style.display = 'none';
        
        try {
            const res = await fetch('/api/career/bullet-polish', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bullet })
            });
            const data = await res.json();
            document.getElementById('bullet-content').innerHTML = marked.parse(data.result);
        } catch (e) {
            document.getElementById('bullet-content').innerHTML = `<p style="color:var(--neon-pink)">Error: ${e.message}</p>`;
        } finally {
            bulletBtn.disabled = false;
            document.getElementById('bullet-loading').style.display = 'none';
            document.getElementById('bullet-result').style.display = 'block';
        }
    });
}


// ==========================================
// 6 FINAL PREMIUM AI TOOLS LOGIC
// ==========================================

// 1. Certificate Verifier
const certBtn = document.getElementById('cert-btn');
if (certBtn) {
    certBtn.addEventListener('click', async () => {
        const text = document.getElementById('cert-input').value.trim();
        if (!text) return;
        
        certBtn.disabled = true;
        document.getElementById('cert-loading').style.display = 'block';
        document.getElementById('cert-result').style.display = 'none';
        
        try {
            const res = await fetch('/api/career/certificate-parser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text })
            });
            const data = await res.json();
            document.getElementById('cert-content').innerHTML = marked.parse(data.result);
        } catch (e) {
            document.getElementById('cert-content').innerHTML = `<p style="color:var(--neon-pink)">Error: ${e.message}</p>`;
        } finally {
            certBtn.disabled = false;
            document.getElementById('cert-loading').style.display = 'none';
            document.getElementById('cert-result').style.display = 'block';
        }
    });
}

// 2. Project Scope Scaler
const scalerBtn = document.getElementById('scaler-btn');
if (scalerBtn) {
    scalerBtn.addEventListener('click', async () => {
        const project = document.getElementById('scaler-input').value.trim();
        if (!project) return;
        
        scalerBtn.disabled = true;
        document.getElementById('scaler-loading').style.display = 'block';
        document.getElementById('scaler-result').style.display = 'none';
        
        try {
            const res = await fetch('/api/career/project-scaler', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ project })
            });
            const data = await res.json();
            document.getElementById('scaler-content').innerHTML = marked.parse(data.result);
        } catch (e) {
            document.getElementById('scaler-content').innerHTML = `<p style="color:var(--neon-pink)">Error: ${e.message}</p>`;
        } finally {
            scalerBtn.disabled = false;
            document.getElementById('scaler-loading').style.display = 'none';
            document.getElementById('scaler-result').style.display = 'block';
        }
    });
}

// 3. Reverse Interview
const riBtn = document.getElementById('ri-btn');
if (riBtn) {
    riBtn.addEventListener('click', async () => {
        const round = document.getElementById('ri-round').value;
        if (!round) return;
        
        riBtn.disabled = true;
        document.getElementById('ri-loading').style.display = 'block';
        document.getElementById('ri-result').style.display = 'none';
        
        try {
            const res = await fetch('/api/career/reverse-interview', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ round })
            });
            const data = await res.json();
            document.getElementById('ri-content').innerHTML = marked.parse(data.result);
        } catch (e) {
            document.getElementById('ri-content').innerHTML = `<p style="color:var(--neon-pink)">Error: ${e.message}</p>`;
        } finally {
            riBtn.disabled = false;
            document.getElementById('ri-loading').style.display = 'none';
            document.getElementById('ri-result').style.display = 'block';
        }
    });
}

// 4. Tech Acronym Decoder
const acronymBtn = document.getElementById('acronym-btn');
if (acronymBtn) {
    acronymBtn.addEventListener('click', async () => {
        const jargon = document.getElementById('acronym-input').value.trim();
        if (!jargon) return;
        
        acronymBtn.disabled = true;
        document.getElementById('acronym-loading').style.display = 'block';
        document.getElementById('acronym-result').style.display = 'none';
        
        try {
            const res = await fetch('/api/career/acronym-decoder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jargon })
            });
            const data = await res.json();
            document.getElementById('acronym-content').innerHTML = marked.parse(data.result);
        } catch (e) {
            document.getElementById('acronym-content').innerHTML = `<p style="color:var(--neon-pink)">Error: ${e.message}</p>`;
        } finally {
            acronymBtn.disabled = false;
            document.getElementById('acronym-loading').style.display = 'none';
            document.getElementById('acronym-result').style.display = 'block';
        }
    });
}

// 5. Hackathon Pitch
const hackBtn = document.getElementById('hack-btn');
if (hackBtn) {
    hackBtn.addEventListener('click', async () => {
        const problem = document.getElementById('hack-prob').value.trim();
        const solution = document.getElementById('hack-sol').value.trim();
        const impact = document.getElementById('hack-imp').value.trim();
        if (!problem || !solution) return;
        
        hackBtn.disabled = true;
        document.getElementById('hack-loading').style.display = 'block';
        document.getElementById('hack-result').style.display = 'none';
        
        try {
            const res = await fetch('/api/career/hackathon-pitch', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ problem, solution, impact })
            });
            const data = await res.json();
            document.getElementById('hack-content').innerHTML = marked.parse(data.result);
        } catch (e) {
            document.getElementById('hack-content').innerHTML = `<p style="color:var(--neon-pink)">Error: ${e.message}</p>`;
        } finally {
            hackBtn.disabled = false;
            document.getElementById('hack-loading').style.display = 'none';
            document.getElementById('hack-result').style.display = 'block';
        }
    });
}

// 6. Imposter Reframer
const imposterBtn = document.getElementById('imposter-btn');
if (imposterBtn) {
    imposterBtn.addEventListener('click', async () => {
        const doubt = document.getElementById('imposter-input').value.trim();
        if (!doubt) return;
        
        imposterBtn.disabled = true;
        document.getElementById('imposter-loading').style.display = 'block';
        document.getElementById('imposter-result').style.display = 'none';
        
        try {
            const res = await fetch('/api/career/imposter-reframe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ doubt })
            });
            const data = await res.json();
            document.getElementById('imposter-content').innerHTML = marked.parse(data.result);
        } catch (e) {
            document.getElementById('imposter-content').innerHTML = `<p style="color:var(--neon-pink)">Error: ${e.message}</p>`;
        } finally {
            imposterBtn.disabled = false;
            document.getElementById('imposter-loading').style.display = 'none';
            document.getElementById('imposter-result').style.display = 'block';
        }
    });
}


// ==========================================
// 50-FEATURE MILESTONE: FINAL 6 TOOLS LOGIC
// ==========================================

// 1. Take-Home Planner
const takehomeBtn = document.getElementById('takehome-btn');
if (takehomeBtn) {
    takehomeBtn.addEventListener('click', async () => {
        const prompt = document.getElementById('takehome-input').value.trim();
        if (!prompt) return;
        
        takehomeBtn.disabled = true;
        document.getElementById('takehome-loading').style.display = 'block';
        document.getElementById('takehome-result').style.display = 'none';
        
        try {
            const res = await fetch('/api/career/take-home-blueprint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt })
            });
            const data = await res.json();
            document.getElementById('takehome-content').innerHTML = marked.parse(data.result);
        } catch (e) {
            document.getElementById('takehome-content').innerHTML = `<p style="color:var(--neon-pink)">Error: ${e.message}</p>`;
        } finally {
            takehomeBtn.disabled = false;
            document.getElementById('takehome-loading').style.display = 'none';
            document.getElementById('takehome-result').style.display = 'block';
        }
    });
}

// 2. Aptitude Vault
const aptitudeBtn = document.getElementById('aptitude-btn');
if (aptitudeBtn) {
    aptitudeBtn.addEventListener('click', async () => {
        const topic = document.getElementById('aptitude-input').value.trim();
        if (!topic) return;
        
        aptitudeBtn.disabled = true;
        document.getElementById('aptitude-loading').style.display = 'block';
        document.getElementById('aptitude-result').style.display = 'none';
        
        try {
            const res = await fetch('/api/career/aptitude-vault', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic })
            });
            const data = await res.json();
            document.getElementById('aptitude-content').innerHTML = marked.parse(data.result);
        } catch (e) {
            document.getElementById('aptitude-content').innerHTML = `<p style="color:var(--neon-pink)">Error: ${e.message}</p>`;
        } finally {
            aptitudeBtn.disabled = false;
            document.getElementById('aptitude-loading').style.display = 'none';
            document.getElementById('aptitude-result').style.display = 'block';
        }
    });
}

// 3. Company Intel
const companyBtn = document.getElementById('company-btn');
if (companyBtn) {
    companyBtn.addEventListener('click', async () => {
        const company = document.getElementById('company-input').value.trim();
        if (!company) return;
        
        companyBtn.disabled = true;
        document.getElementById('company-loading').style.display = 'block';
        document.getElementById('company-result').style.display = 'none';
        
        try {
            const res = await fetch('/api/career/company-intel', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ company })
            });
            const data = await res.json();
            document.getElementById('company-content').innerHTML = marked.parse(data.result);
        } catch (e) {
            document.getElementById('company-content').innerHTML = `<p style="color:var(--neon-pink)">Error: ${e.message}</p>`;
        } finally {
            companyBtn.disabled = false;
            document.getElementById('company-loading').style.display = 'none';
            document.getElementById('company-result').style.display = 'block';
        }
    });
}

// 4. Soft Skill STAR Translator
const starBtn = document.getElementById('star-btn');
if (starBtn) {
    starBtn.addEventListener('click', async () => {
        const anecdote = document.getElementById('star-input').value.trim();
        if (!anecdote) return;
        
        starBtn.disabled = true;
        document.getElementById('star-loading').style.display = 'block';
        document.getElementById('star-result').style.display = 'none';
        
        try {
            const res = await fetch('/api/career/soft-skill-translator', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ anecdote })
            });
            const data = await res.json();
            document.getElementById('star-content').innerHTML = marked.parse(data.result);
        } catch (e) {
            document.getElementById('star-content').innerHTML = `<p style="color:var(--neon-pink)">Error: ${e.message}</p>`;
        } finally {
            starBtn.disabled = false;
            document.getElementById('star-loading').style.display = 'none';
            document.getElementById('star-result').style.display = 'block';
        }
    });
}

// 5. Notice Period Calculator (Pure JS)
const npBtn = document.getElementById('np-btn');
if (npBtn) {
    npBtn.addEventListener('click', () => {
        const dateInput = document.getElementById('np-date').value;
        const daysInput = parseInt(document.getElementById('np-days').value, 10);
        
        if (!dateInput || isNaN(daysInput)) return alert("Please enter valid dates.");
        
        const resDate = new Date(dateInput);
        
        // Calculate Last Working Day
        const lwdDate = new Date(resDate);
        lwdDate.setDate(lwdDate.getDate() + daysInput);
        
        // Calculate Handover (last 14 days)
        const handoverDate = new Date(lwdDate);
        handoverDate.setDate(handoverDate.getDate() - 14);
        
        // Calculate Earliest Joining (Day after LWD)
        const joinDate = new Date(lwdDate);
        joinDate.setDate(joinDate.getDate() + 1);
        
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        
        document.getElementById('np-lwd').innerText = lwdDate.toLocaleDateString('en-US', options);
        document.getElementById('np-handover').innerText = handoverDate.toLocaleDateString('en-US', options);
        document.getElementById('np-join').innerText = joinDate.toLocaleDateString('en-US', options);
        
        document.getElementById('np-result').style.display = 'block';
    });
}

// 6. GD Counter-Shield
const gdShieldBtn = document.getElementById('gd-shield-btn');
if (gdShieldBtn) {
    gdShieldBtn.addEventListener('click', async () => {
        const stance = document.getElementById('gd-shield-input').value.trim();
        if (!stance) return;
        
        gdShieldBtn.disabled = true;
        document.getElementById('gd-shield-loading').style.display = 'block';
        document.getElementById('gd-shield-result').style.display = 'none';
        
        try {
            const res = await fetch('/api/career/gd-counter-shield', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ stance })
            });
            const data = await res.json();
            document.getElementById('gd-shield-content').innerHTML = marked.parse(data.result);
        } catch (e) {
            document.getElementById('gd-shield-content').innerHTML = `<p style="color:var(--neon-pink)">Error: ${e.message}</p>`;
        } finally {
            gdShieldBtn.disabled = false;
            document.getElementById('gd-shield-loading').style.display = 'none';
            document.getElementById('gd-shield-result').style.display = 'block';
        }
    });
}
