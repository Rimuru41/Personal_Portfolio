// Skills Loader Logic
document.getElementById('load-skills')?.addEventListener('click', async () => {
    const container = document.getElementById('skills-container');
    if (!container) return;

    container.innerHTML = "Fetching skills from server...";

    try {
        const response = await fetch('/api/skills');
        const data = await response.json();

        setTimeout(() => {
            container.innerHTML = `💻 Technical Stack: ${data.skills.join(' • ')}`;
        }, 500);
    } catch (error) {
        container.innerHTML = "Failed to load skills.";
    }
});

// Project Management Logic
const projectModal = document.getElementById('project-modal');
const deleteModal = document.getElementById('delete-modal');
const projectForm = document.getElementById('project-form');
const modalTitle = document.getElementById('modal-title');
const confirmDeleteBtn = document.getElementById('confirm-delete-btn');

let currentProjectId = null;

// Helper: Toggle Modal
const toggleModal = (modal, show = true) => {
    modal.classList.toggle('active', show);
    if (!show && modal === projectModal) projectForm.reset();
};

// Event Delegation for Card Actions
document.addEventListener('click', (e) => {
    // Menu Dropdown Toggle
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

    // Edit Button
    if (e.target.classList.contains('edit-btn')) {
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

    // Delete Button
    if (e.target.classList.contains('delete-btn')) {
        currentProjectId = e.target.dataset.id;
        toggleModal(deleteModal, true);
    }
});

// Add Project Button
document.getElementById('add-project-btn')?.addEventListener('click', () => {
    currentProjectId = null;
    modalTitle.innerText = "Add Project";
    document.getElementById('project-id').value = "";
    toggleModal(projectModal, true);
});

// Form Submission (Add/Edit)
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
            location.reload();
        } else {
            alert("Failed to save project.");
        }
    } catch (error) {
        console.error("Error saving project:", error);
    }
});

// Delete Operation
confirmDeleteBtn?.addEventListener('click', async () => {
    if (!currentProjectId) return;

    try {
        const response = await fetch(`/api/projects/${currentProjectId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            location.reload();
        } else {
            alert("Failed to delete project.");
        }
    } catch (error) {
        console.error("Error deleting project:", error);
    }
});

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