function showCourse(title, text, details) {

    const modal = document.getElementById("modal");

    const icons = {
        "國小數學": "🔢",
        "國中數學": "📐",
        "國中英文": "🔤",
        "國中生物": "🧬",
        "國中理化": "⚗️"
    };

    document.getElementById("modalIcon").textContent =
        icons[title] || "📚";

    document.getElementById("modalTitle").textContent = title;

    let html = `<p>${text}</p>`;

    if (details && details.length > 0) {

        html += `
            <h4>課程內容</h4>
            <ul>
        `;

        details.forEach(item => {
            html += `<li>${item}</li>`;
        });

        html += `
            </ul>
        `;
    }

    document.getElementById("modalText").innerHTML = html;

    modal.classList.add("show");
}


function closeCourse() {
    document.getElementById("modal").classList.remove("show");
}


document.getElementById("modal").addEventListener("click", e => {

    if (e.target.id === "modal") {
        closeCourse();
    }

});


document.addEventListener("keydown", e => {

    if (e.key === "Escape") {
        closeCourse();
    }

});

async function testBackend() {

    const response = await fetch("/api/hello");

    const data = await response.json();

    console.log(data.message);

}

testBackend();

async function loadCourses() {

    const response = await fetch("/api/courses");

const courses = await response.json();

const order = [
    "國小數學",
    "國小英文",
    "國中數學",
    "國中英文",
    "國中生物",
    "國中理化"
];

courses.sort((a, b) => {
    return order.indexOf(a.name) - order.indexOf(b.name);
});

const courseList = document.getElementById("courseList");

    courses.forEach(course => {

        const card = document.createElement("div");

        card.className = "card";

card.innerHTML = `
    <div class="icon">${course.icon}</div>
    <h3>${course.name}</h3>
    <p>${course.description}</p>
    <button onclick='showCourse(${JSON.stringify(course.name)}, ${JSON.stringify(course.description)}, [])'>
        了解課程
    </button>
`;

        courseList.appendChild(card);
    });
}

loadCourses();
// 聯絡表單
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const result = document.getElementById("contactResult");

        const data = {
            name: document.getElementById("contactName").value.trim(),
            phone: document.getElementById("contactPhone").value.trim(),
            email: document.getElementById("contactEmail").value.trim(),
            subject: document.getElementById("contactSubject").value,
            message: document.getElementById("contactMessage").value.trim()
        };

        try {

            const response = await fetch("/api/contacts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const resultData = await response.json();

            if (!response.ok) {
                throw new Error(resultData.message || "送出失敗");
            }

            result.textContent = "✅ 已收到您的詢問，我們會盡快與您聯絡！";
            result.style.color = "#c74376";

            contactForm.reset();

        } catch (error) {

            console.error(error);

            result.textContent =
                "❌ 送出失敗，請稍後再試或直接使用 LINE 聯絡我們。";

            result.style.color = "#d33";
        }
    });
}