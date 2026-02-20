// Skills Loader Logic
document.getElementById('load-skills')?.addEventListener('click', async () => {
    const container = document.getElementById('skills-container');
    if (!container) return;

    container.innerHTML = "Fetching skills from server...";

    try {
        const response = await fetch('/api/skills');
        const data = await response.json();

        setTimeout(() => {
            // Build skills display - each skill is an object { id, skill_name }
            const skillNames = data.skills.map(s => s.skill_name);
            let html = `<div class="skills-list">💻 Technical Stack: ${skillNames.join(' • ')}</div>`;

            // If admin, show edit controls
            if (isAdmin) {
                html += `<div class="skills-admin">`;
                data.skills.forEach(skill => {
                    html += `<span class="skill-chip" data-id="${skill.id}">
                        ${skill.skill_name}
                        <button class="skill-remove" data-id="${skill.id}" title="Remove">×</button>
                    </span>`;
                });
                html += `<button id="add-skill-btn" class="skill-add-btn" title="Add Skill">+</button>`;
                html += `</div>`;
            }

            container.innerHTML = html;

            // Attach admin event listeners if admin
            if (isAdmin) {
                // Remove skill buttons
                container.querySelectorAll('.skill-remove').forEach(btn => {
                    btn.addEventListener('click', async (e) => {
                        e.stopPropagation();
                        const skillId = btn.dataset.id;
                        try {
                            const res = await fetch(`/api/skills/${skillId}`, { method: 'DELETE' });
                            if (res.ok) {
                                const chip = btn.closest('.skill-chip');
                                chip.remove();
                                // Update the display text
                                updateSkillsDisplay(container);
                            }
                        } catch (err) {
                            console.error('Error deleting skill:', err);
                        }
                    });
                });

                // Add skill button
                document.getElementById('add-skill-btn')?.addEventListener('click', () => {
                    const skillName = prompt('Enter skill name:');
                    if (!skillName || !skillName.trim()) return;

                    addSkill(skillName.trim(), container);
                });
            }
        }, 500);
    } catch (error) {
        container.innerHTML = "Failed to load skills.";
    }
});

// Helper: Add a skill via API and update UI
async function addSkill(skillName, container) {
    try {
        const response = await fetch('/api/skills', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ skill_name: skillName })
        });

        if (response.ok) {
            const data = await response.json();
            const skill = data.skill;

            // Add new chip before the + button
            const addBtn = document.getElementById('add-skill-btn');
            const chip = document.createElement('span');
            chip.classList.add('skill-chip');
            chip.dataset.id = skill.id;
            chip.innerHTML = `${skill.skill_name}<button class="skill-remove" data-id="${skill.id}" title="Remove">×</button>`;

            // Attach remove handler
            chip.querySelector('.skill-remove').addEventListener('click', async (e) => {
                e.stopPropagation();
                try {
                    const res = await fetch(`/api/skills/${skill.id}`, { method: 'DELETE' });
                    if (res.ok) {
                        chip.remove();
                        updateSkillsDisplay(container);
                    }
                } catch (err) {
                    console.error('Error deleting skill:', err);
                }
            });

            addBtn.parentElement.insertBefore(chip, addBtn);
            updateSkillsDisplay(container);
        }
    } catch (err) {
        console.error('Error adding skill:', err);
    }
}

// Helper: Update the skills display text after add/remove
function updateSkillsDisplay(container) {
    const chips = container.querySelectorAll('.skill-chip');
    const names = Array.from(chips).map(c => c.dataset.id ? c.childNodes[0].textContent.trim() : '').filter(Boolean);
    const listEl = container.querySelector('.skills-list');
    if (listEl) {
        listEl.textContent = `💻 Technical Stack: ${names.join(' • ')}`;
    }
}

// Project Management Logic (only runs if admin)
const projectModal = document.getElementById('project-modal');
const deleteModal = document.getElementById('delete-modal');
const projectForm = document.getElementById('project-form');
const modalTitle = document.getElementById('modal-title');
const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
const isAdmin = window.__isAdmin || false;

let currentProjectId = null;

// Helper: Toggle Modal
const toggleModal = (modal, show = true) => {
    if (!modal) return;
    modal.classList.toggle('active', show);
    if (!show && modal === projectModal && projectForm) projectForm.reset();
};

// Event Delegation for Card Actions
document.addEventListener('click', (e) => {
    // Menu Dropdown Toggle (admin only)
    if (e.target.classList.contains('menu-trigger')) {
        const dropdown = e.target.nextElementSibling;
        document.querySelectorAll('.menu-dropdown').forEach(d => {
            if (d !== dropdown) d.classList.remove('active');
        });
        dropdown.classList.toggle('active');
        return;
    }

    // Close dropdowns when clicking elsewhere
    if (!e.target.closest('.card-menu')) {
        document.querySelectorAll('.menu-dropdown').forEach(d => d.classList.remove('active'));
    }

    // Modal Close buttons
    if (e.target.classList.contains('closeModal') || e.target.classList.contains('modal')) {
        const modal = e.target.closest('.modal');
        if (modal) toggleModal(modal, false);
    }

    // Edit Button (admin only)
    if (e.target.classList.contains('edit-btn') && isAdmin) {
        currentProjectId = e.target.dataset.id;
        const card = e.target.closest('.project-card');

        // Populate Form
        document.getElementById('project-id').value = currentProjectId;
        document.getElementById('title').value = card.querySelector('h3').innerText;
        document.getElementById('description').value = card.querySelector('p').innerText;
        document.getElementById('tech_stack').value = card.querySelector('.tech-tag').innerText.trim();
        document.getElementById('link').value = card.querySelector('.project-link').href;

        modalTitle.innerText = "Edit Project";
        toggleModal(projectModal, true);
    }

    // Delete Button (admin only)
    if (e.target.classList.contains('delete-btn') && isAdmin) {
        currentProjectId = e.target.dataset.id;
        toggleModal(deleteModal, true);
    }
});

// Add Project Button (admin only)
document.getElementById('add-project-btn')?.addEventListener('click', () => {
    currentProjectId = null;
    modalTitle.innerText = "Add Project";
    document.getElementById('project-id').value = "";
    toggleModal(projectModal, true);
});

// Helper: Create a project card element
function createProjectCard(project) {
    const card = document.createElement('div');
    card.classList.add('project-card');
    card.dataset.id = project.id;
    card.innerHTML = `
        <div class="card-menu">
            <button class="menu-trigger">⋮</button>
            <div class="menu-dropdown">
                <button class="edit-btn" data-id="${project.id}">Edit</button>
                <button class="delete-btn" data-id="${project.id}">Delete</button>
            </div>
        </div>
        <div class="card-content">
            <span class="tech-tag">${project.tech_stack}</span>
            <h3>${project.project_name}</h3>
            <p>${project.description}</p>
            <a href="${project.link}" class="project-link" target="_blank">Source Code →</a>
        </div>
    `;
    return card;
}

// Helper: Update an existing project card in-place
function updateProjectCard(card, project) {
    card.querySelector('h3').innerText = project.project_name;
    card.querySelector('p').innerText = project.description;
    card.querySelector('.tech-tag').innerText = project.tech_stack;
    card.querySelector('.project-link').href = project.link;
    // Update data-id on edit/delete buttons too
    const editBtn = card.querySelector('.edit-btn');
    const deleteBtn = card.querySelector('.delete-btn');
    if (editBtn) editBtn.dataset.id = project.id;
    if (deleteBtn) deleteBtn.dataset.id = project.id;
}

// Form Submission (Add/Edit) - admin only
projectForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        Project_Name: document.getElementById('title').value,
        Description: document.getElementById('description').value,
        Tech_Stack: document.getElementById('tech_stack').value,
        Link: document.getElementById('link').value
    };

    const url = currentProjectId ? `/api/projects/${currentProjectId}` : '/api/projects';
    const method = currentProjectId ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const data = await response.json();
            const project = data.project;
            const grid = document.querySelector('.project-grid');

            if (currentProjectId) {
                // Edit: update the existing card
                const existingCard = document.querySelector(`.project-card[data-id="${currentProjectId}"]`);
                if (existingCard) updateProjectCard(existingCard, project);
            } else {
                // Add: append a new card to the grid
                const newCard = createProjectCard(project);
                grid.appendChild(newCard);
            }

            toggleModal(projectModal, false);
        } else {
            alert("Failed to save project.");
        }
    } catch (error) {
        console.error("Error saving project:", error);
    }
});

// Delete Operation - admin only
confirmDeleteBtn?.addEventListener('click', async () => {
    if (!currentProjectId) return;

    try {
        const response = await fetch(`/api/projects/${currentProjectId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            // Remove the card from the DOM
            const card = document.querySelector(`.project-card[data-id="${currentProjectId}"]`);
            if (card) card.remove();
            toggleModal(deleteModal, false);
            currentProjectId = null;
        } else {
            alert("Failed to delete project.");
        }
    } catch (error) {
        console.error("Error deleting project:", error);
    }
});

// ==========================================
// Login / Logout Logic
// ==========================================

const loginModal = document.getElementById('login-modal');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const adminCornerBtn = document.getElementById('admin-corner-btn');

// Admin corner button click
adminCornerBtn?.addEventListener('click', () => {
    if (isAdmin) {
        // Logout
        handleLogout();
    } else {
        // Show login modal
        toggleModal(loginModal, true);
    }
});

// Login form submission
loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginError.textContent = '';

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            // Reload to get admin UI from server
            location.reload();
        } else {
            const data = await response.json();
            loginError.textContent = data.error || 'Invalid credentials';
        }
    } catch (error) {
        loginError.textContent = 'Connection error. Please try again.';
    }
});

// Logout handler
async function handleLogout() {
    try {
        const response = await fetch('/api/logout', { method: 'POST' });
        if (response.ok) {
            location.reload();
        }
    } catch (error) {
        console.error('Logout error:', error);
    }
}

// Navigation logic
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const sectionId = targetId.substring(1);

            // Hide all sections
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.add('hidden');
            });

            // Show target section
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.remove('hidden');
                window.scrollTo(0, 0); // Reset scroll
            }
        }
    });
});