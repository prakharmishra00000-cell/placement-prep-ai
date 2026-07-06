document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("search-btn");
    const companyInput = document.getElementById("company-name");
    const categoryCards = document.querySelectorAll(".radio-card");
    const resultsContainer = document.getElementById("results-container");
    // API Data Elements
    const salaryContainer = document.getElementById("salary-info-container");
    const careerTimeline = document.getElementById("career-timeline");
    const skillsList = document.getElementById("skills-progress-list");
    const topicsList = document.getElementById("topics-weight-list");
    const tipsBox = document.getElementById("category-tips-box");
    const pyqsContainer = document.getElementById("pyqs-container");

    // Chat Elements
    const chatInput = document.getElementById("chat-input");
    const sendChatBtn = document.getElementById("send-chat-btn");
    const chatMessages = document.getElementById("chat-messages");

    let currentCompany = "TCS";
    let currentCategory = "technical";

    // Handle Radio Card Selectors
    categoryCards.forEach(card => {
        card.addEventListener("click", () => {
            categoryCards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");
            const radioInput = card.querySelector("input[type='radio']");
            radioInput.checked = true;
            currentCategory = radioInput.value;
        });
    });

    // Handle Analyze Button Click
    searchBtn.addEventListener("click", () => {
        const companyName = companyInput.value.trim();
        if (!companyName) {
            alert("Please enter a company name.");
            return;
        }
        currentCompany = companyName;
        fetchCompanyDetails(currentCompany, currentCategory);
    });

    // Enable enter key for search
    companyInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            searchBtn.click();
        }
    });

    // Fetch Details from Backend API
    function fetchCompanyDetails(company, category) {
        searchBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Researching in Deep...';
        searchBtn.disabled = true;
        fetch(`/api/search?company=${encodeURIComponent(company)}&category=${category}`)
            .then(res => {
                if (!res.ok) throw new Error("Search failed.");
                return res.json();
            })
            .then(data => {
                renderDashboard(data);
                resultsContainer.classList.remove("hide");
                
                // Add a welcome system message to chat about this company
                appendChatMessage("system", `I have analyzed ${data.name} for the ${category.toUpperCase()} interview round. Review the fetched statistics and live PYQs above. You can ask me custom questions below!`);
            })
            .catch(err => {
                console.error(err);
                alert("Error fetching company details. Make sure the server is running.");
            })
            .finally(() => {
                searchBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i> Analyze & Retrieve PYQs';
                searchBtn.disabled = false;
            });
    }

    // Render Dashboard Panels
    function renderDashboard(data) {
        // 1. Salary Tiers
        salaryContainer.innerHTML = "";
        data.salary.tiers.forEach(tier => {
            const div = document.createElement("div");
            div.className = "salary-tier";
            div.innerHTML = `
                <div class="tier-name">${tier.name}</div>
                <div class="tier-package">${tier.package}</div>
                <div class="tier-inhand">${tier.inhand}</div>
                <div class="tier-details">${tier.details}</div>
            `;
            salaryContainer.appendChild(div);
        });

        // 2. Career Path Timeline
        careerTimeline.innerHTML = "";
        data.career_path.forEach(level => {
            const item = document.createElement("div");
            item.className = "timeline-item";
            item.innerHTML = `
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <div class="timeline-role">${level.role} (${level.level})</div>
                    <div class="timeline-meta">
                        <span>Avg. Package: ${level.salary}</span>
                        <span class="time">${level.duration}</span>
                    </div>
                </div>
            `;
            careerTimeline.appendChild(item);
        });

        // 3. Required Skills (with animated progress bars)
        skillsList.innerHTML = "";
        data.skills.forEach(skill => {
            const wrapper = document.createElement("div");
            wrapper.className = "skill-bar-wrapper";
            wrapper.innerHTML = `
                <div class="skill-label">
                    <span>${skill.name}</span>
                    <span class="skill-pct">${skill.level}%</span>
                </div>
                <div class="bar-bg">
                    <div class="bar-fill" style="width: 0%"></div>
                </div>
            `;
            skillsList.appendChild(wrapper);
            // Trigger animation frame to animate bar
            setTimeout(() => {
                wrapper.querySelector(".bar-fill").style.width = `${skill.level}%`;
            }, 100);
        });

        // 4. Topic Weightages (with animated progress bars)
        topicsList.innerHTML = "";
        data.topics.forEach(topic => {
            const wrapper = document.createElement("div");
            wrapper.className = "topic-bar-wrapper";
            wrapper.innerHTML = `
                <div class="topic-label">
                    <span>${topic.name}</span>
                    <span class="topic-pct">${topic.weight}% Weight</span>
                </div>
                <div class="bar-bg">
                    <div class="bar-fill" style="width: 0%"></div>
                </div>
            `;
            topicsList.appendChild(wrapper);
            // Trigger animation frame to animate bar
            setTimeout(() => {
                wrapper.querySelector(".bar-fill").style.width = `${topic.weight}%`;
            }, 100);
        });

        // 5. Category Tips
        const tipText = data.tips[currentCategory] || "Research standard aptitude problems and domain questions.";
        tipsBox.innerHTML = `
            <p><i class="fa-solid fa-circle-info text-neon-cyan"></i> ${tipText}</p>
        `;

        // 6. PYQ Questions List
        pyqsContainer.innerHTML = "";
        if (data.pyqs && data.pyqs.length > 0) {
            data.pyqs.forEach((q, idx) => {
                const item = document.createElement("div");
                item.className = "pyq-card-item animate-fade-in";
                
                // Formulate Options Layout
                let optHtml = "";
                if (q.options && q.options.length > 0) {
                    optHtml = '<div class="pyq-options">';
                    q.options.forEach(opt => {
                        const isCorrect = opt.toLowerCase() === q.answer.toLowerCase() || opt.includes(q.answer);
                        optHtml += `<div class="pyq-option ${isCorrect ? 'correct' : ''}">${opt}</div>`;
                    });
                    optHtml += '</div>';
                }

                item.innerHTML = `
                    <div class="pyq-meta">
                        <span>Source: <strong>${q.source}</strong></span>
                        <span class="year">${q.year}</span>
                    </div>
                    <div class="pyq-question">Q${idx + 1}: ${q.question}</div>
                    ${optHtml}
                    <button class="sol-toggle-btn" onclick="toggleSolution(${idx})">
                        <i class="fa-solid fa-eye"></i> Show Solution & Explanation
                    </button>
                    <div class="pyq-solution hide" id="sol-${idx}">
                        <strong>Correct Answer:</strong> ${q.answer}<br>
                        <strong>Explanation:</strong><br>
                        ${q.solution.replace(/\n/g, "<br>")}
                    </div>
                `;
                pyqsContainer.appendChild(item);
            });
        } else {
            pyqsContainer.innerHTML = '<p class="text-muted">No PYQs fetched for this search query. Try another company.</p>';
        }
    }

    // Toggle Solution Visibility Helper Function
    window.toggleSolution = function(idx) {
        const solDiv = document.getElementById(`sol-${idx}`);
        const btn = solDiv.previousElementSibling;
        
        if (solDiv.classList.contains("hide")) {
            solDiv.classList.remove("hide");
            btn.innerHTML = '<i class="fa-solid fa-eye-slash"></i> Hide Solution';
        } else {
            solDiv.classList.add("hide");
            btn.innerHTML = '<i class="fa-solid fa-eye"></i> Show Solution & Explanation';
        }
    };

    // Chat Functionality
    sendChatBtn.addEventListener("click", () => {
        const prompt = chatInput.value.trim();
        if (!prompt) return;

        appendChatMessage("user", prompt);
        chatInput.value = "";

        // Query Backend Agent
        fetch("/api/query", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: prompt,
                company: currentCompany,
                category: currentCategory
            })
        })
        .then(res => res.json())
        .then(data => {
            appendChatMessage("system", data.answer);
        })
        .catch(err => {
            console.error(err);
            appendChatMessage("system", "Sorry, I couldn't process your request right now. Check if the server is healthy.");
        });
    });

    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            sendChatBtn.click();
        }
    });

    function appendChatMessage(sender, text) {
        const div = document.createElement("div");
        div.className = `message ${sender}-msg`;
        
        const avatar = sender === "user" ? '<i class="fa-solid fa-user"></i>' : '<i class="fa-solid fa-robot"></i>';
        
        div.innerHTML = `
            <div class="msg-avatar">${avatar}</div>
            <div class="msg-body">${text.replace(/\n/g, "<br>")}</div>
        `;
        
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Auto-trigger search for TCS on load
    fetchCompanyDetails("TCS", "technical");
});
