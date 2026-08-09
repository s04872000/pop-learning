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

    const courseList = document.getElementById("courseList");

    courses.forEach(course => {

        const card = document.createElement("div");

        card.className = "card";

card.innerHTML = `
    <div class="icon">${course.icon}</div>
    <h3>${course.name}</h3>
    <p>${course.description}</p>
    <button onclick='showCourse(${JSON.stringify(course.name)}, ${JSON.stringify(course.description)}, ${JSON.stringify(course.details)})'>
    了解課程
</button>
`;

        courseList.appendChild(card);
    });
}

loadCourses();