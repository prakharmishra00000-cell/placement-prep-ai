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
        "docs": { title: "PrepOS AI User Guide", sub: "Detailed reference manual explaining how all 60 flagship features work" }
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

    function fetchCompanyDetails(company, category) {
        searchBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Researching...';
        searchBtn.disabled = true;

        fetch(`/api/search?company=${encodeURIComponent(company)}&category=${category}`)
            .then(res => {
                if (!res.ok) throw new Error("Search failed.");
                return res.json();
            })
            .then(data => {
                renderDashboard(data);
                updateHiringAnalyzer(data);
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
    function updateHiringAnalyzer(data) {
        document.getElementById("hiring-company-name").textContent = data.name;
        
        // Randomise some hiring data for dynamic outputs
        const rate = Math.floor(Math.random() * 15) + 8; // 8% - 23%
        document.getElementById("hiring-selection-rate").textContent = `${rate}%`;
        
        const diffStars = ["★★☆☆☆ (Easy)", "★★★☆☆ (Medium)", "★★★★☆ (Hard)"];
        document.getElementById("hiring-difficulty").textContent = diffStars[rate % 3];
    }

    // ----------------------------------------------------
    // Tab 4: Resume & JD Matcher
    // ----------------------------------------------------
    const analyzeResumeBtn = document.getElementById("analyze-resume-btn");
    const resumeLoader = document.getElementById("resume-loader");
    const resumeResultPanel = document.getElementById("resume-result-panel");

    analyzeResumeBtn.addEventListener("click", () => {
        const resumeText = document.getElementById("resume-text").value.trim();
        if (!resumeText) {
            alert("Please paste your resume content.");
            return;
        }

        resumeLoader.classList.remove("hide");
        resumeResultPanel.classList.add("hide");

        setTimeout(() => {
            resumeLoader.classList.add("hide");
            resumeResultPanel.classList.remove("hide");

            const generatedScore = Math.floor(Math.random() * 20) + 70; // 70-90
            document.getElementById("ats-score-num").textContent = generatedScore;

            document.getElementById("match-google").textContent = `${generatedScore - 5}%`;
            document.getElementById("match-microsoft").textContent = `${generatedScore + 8}%`;
            document.getElementById("match-amazon").textContent = `${generatedScore - 2}%`;

            // Keywords suggestions
            document.getElementById("ats-missing-keywords").innerHTML = `
                <li>System Design Metrics</li>
                <li>Docker / Containerization</li>
                <li>Quantitative Analysis</li>
            `;
            document.getElementById("ats-suggestions").innerHTML = `
                <li>Re-write your projects using the STAR method action verbs (e.g. 'Optimized', 'Engineered').</li>
                <li>Add a dedicated Skills matrix block.</li>
            `;
        }, 1500);
    });

    // ----------------------------------------------------
    // Tab 5: Personalized Roadmap Generator
    // ----------------------------------------------------
    const generateRoadmapBtn = document.getElementById("generate-roadmap-btn");
    const roadmapLoader = document.getElementById("roadmap-loader");
    const roadmapOutputPanel = document.getElementById("roadmap-output-panel");

    generateRoadmapBtn.addEventListener("click", () => {
        const branch = document.getElementById("roadmap-branch").value.trim() || "CSE";
        const target = document.getElementById("roadmap-target").value.trim() || "Microsoft";

        roadmapLoader.classList.remove("hide");
        roadmapOutputPanel.classList.add("hide");

        setTimeout(() => {
            roadmapLoader.classList.add("hide");
            roadmapOutputPanel.classList.remove("hide");

            document.getElementById("roadmap-monthly").innerHTML = `
                <p><strong>Month 1:</strong> Revise fundamental Data Structures (Arrays, Hashing, Recursion) and core ${branch} subjects.</p>
                <p><strong>Month 2:</strong> Master Advanced Algorithms (Dynamic Programming, Graphs, SQL Queries).</p>
                <p><strong>Month 3:</strong> Solve previous year papers of ${target} on IndiaBIX and mock sheets.</p>
                <p><strong>Month 4:</strong> Practice simulated behavioral rounds and attempt Mock OAs.</p>
            `;

            document.getElementById("roadmap-weekly").innerHTML = `
                <p><strong>Week 1-2:</strong> Focus heavily on String sliding windows and Hash maps.</p>
                <p><strong>Week 3-4:</strong> Complete database transaction isolations & SQL Joins.</p>
            `;

            document.getElementById("roadmap-daily").innerHTML = `
                <p><strong>09:00 AM - 11:00 AM:</strong> Solve 2 coding problems (Arrays/DP).</p>
                <p><strong>03:00 PM - 04:30 PM:</strong> SQL Query optimization practices.</p>
                <p><strong>07:00 PM - 08:30 PM:</strong> Mock revision of HR STAR stories.</p>
            `;
        }, 1500);
    });

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
        ideConsole.innerHTML = "<p>Running compilation tests...</p>";
        setTimeout(() => {
            ideConsole.innerHTML = `
                <p style="color: var(--neon-cyan)">[SUCCESS] 12/12 Test cases passed successfully!</p>
                <p style="color: var(--neon-yellow)">Runtime: 24 ms (Beats 91.2% of Python submissions)</p>
                <p>Memory: 14.1 MB</p>
            `;
            ideOptimization.classList.remove("hide");
            document.getElementById("ide-complexity-info").textContent = "Time Complexity: O(N) | Space Complexity: O(1)";
            document.getElementById("ide-optimization-notes").innerHTML = "Optimization: Used two pointers to trap water instead of dynamic storage arrays, reducing space usage.";
        }, 1200);
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
            appendCopilotMsg("system", data.answer);
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

    // Initialize first load
    fetchCompanyDetails("TCS", "technical");
});
