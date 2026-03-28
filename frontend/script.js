document.addEventListener('DOMContentLoaded', () => {
  const projectForm = document.getElementById('projectForm');
  const projectsList = document.getElementById('projectsList');
  const testimonialsList = document.getElementById('testimonialsList');
  const certificationsList = document.getElementById('certificationsList');

  loadProjects();
  loadTestimonials();
  loadCertifications();

  // Handle Project Form Submission
  if (projectForm) {
    projectForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const title = this.title.value.trim();
      const description = this.description.value.trim();
      const github = this.github.value.trim();
      const videoFile = this.video.files[0];

      if (!title || !description || !github || !videoFile) {
        alert("Please fill in all fields.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const videoURL = reader.result;
        const newProject = { title, description, github, video: videoURL };

        let projects = JSON.parse(localStorage.getItem('projects')) || [];
        projects.push(newProject);
        localStorage.setItem('projects', JSON.stringify(projects));

        displayProject(newProject);
        this.reset();
      };

      reader.readAsDataURL(videoFile);
    });
  }

  // Display Project in DOM
  function displayProject(project) {
    const div = document.createElement('div');
    div.className = 'project-card animate__animated animate__fadeInUp';
    div.innerHTML = `
      <h3>${project.title}</h3>
      <video controls src="${project.video}" class="project-video"></video>
      <p>${project.description}</p>
      <a href="${project.github}" target="_blank" class="btn">View on GitHub</a>
    `;
    projectsList.prepend(div);
  }

  // Load Stored Projects
  function loadProjects() {
    const stored = JSON.parse(localStorage.getItem('projects')) || [];
    stored.forEach(displayProject);
  }

  // Load Testimonials
  function loadTestimonials() {
    const testimonials = [
      { name: 'Alice N.', message: 'Vincent is an exceptional developer!' },
      { name: 'John K.', message: 'Reliable, skilled, and very creative!' },
      { name: 'Grace O.', message: 'Innovative and great team player!' }
    ];
    testimonials.forEach(t => {
      const div = document.createElement('div');
      div.className = 'testimonial-card animate__animated animate__fadeInUp';
      div.innerHTML = `
        <strong>${t.name}</strong>
        <p>${t.message}</p>
      `;
      testimonialsList.appendChild(div);
    });
  }

  // Load Certifications
  function loadCertifications() {
    const certs = [
      { title: 'Certified Web Developer', issuer: 'FreeCodeCamp' },
      { title: 'Responsive Design Expert', issuer: 'Coursera' },
      { title: 'JavaScript Algorithms Mastery', issuer: 'Udemy' }
    ];
    certs.forEach(c => {
      const div = document.createElement('div');
      div.className = 'cert-card animate__animated animate__fadeInUp';
      div.innerHTML = `
        <strong>${c.title}</strong>
        <p>Issued by: ${c.issuer}</p>
      `;
      certificationsList.appendChild(div);
    });
  }
});
