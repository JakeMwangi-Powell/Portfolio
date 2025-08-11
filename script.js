// CONFIG object to store profile, skills, projects, etc.
const CONFIG = {
  PROFILE: {
    name: "Jake Mwangi-Powell",
    title: "AI Engineer",
    location: "United Kingdom",
    bio: "Passionate about AI, Machine Learning, and Automation.",
    avatar: "avatar.jpg"
  },
  LINKS: {
    linkedin: "https://www.linkedin.com/in/jakempowell/",
    github: "https://github.com/jakempowell"
  },
  SKILLS: {
    programming: ["Python", "JavaScript", "C++"],
    tools: ["Power BI", "Power Automate", "Azure"],
    languages: ["English", "French"]
  },
  PROJECTS: [
    {
      title: "AI Model for EV Utilization",
      slug: "ev-utilization-model",
      summary: "Predictive model for EV charging station usage.",
      longDescription: "### Overview\nThis project uses machine learning to predict the utilization of EV charging stations.",
      techStack: ["Python", "Azure ML", "Pandas"],
      date: "2025-05-15",
      links: { demo: "#", repo: "#" },
      images: ["https://via.placeholder.com/150"],
      featured: true
    }
  ],
  BLOG: [
    {
      title: "My First Blog Post",
      slug: "first-blog",
      date: "2025-06-01",
      content: "This is a sample blog post.",
      tags: ["AI", "Machine Learning"]
    }
  ]
};

// Simple utility to convert markdown to HTML (basic version)
function markdownToHtml(md) {
  return md.replace(/### (.*)/g, '<h3>$1</h3>')
           .replace(/\*\*(.*)\*\*/g, '<b>$1</b>')
           .replace(/_(.*)_/g, '<i>$1</i>')
           .replace(/\n/g, '<br>');
}

// Function to render different pages
function renderPage(route) {
  let content = '';

  if (route === '#/projects') {
    content = `<h2>Projects</h2>${renderProjects()}`;
  } else if (route.startsWith('#/projects/')) {
    content = renderProjectDetail(route.substring(12));
  } else if (route === '#/about') {
    content = renderAbout();
  } else if (route === '#/contact') {
    content = renderContact();
  } else if (route === '#/blog') {
    content = renderBlog();
  } else if (route === '#/404') {
    content = "<h2>404 - Page Not Found</h2>";
  } else {
    content = renderHome();
  }

  document.getElementById('root').innerHTML = content;
}

// Rendering home page
function renderHome() {
  return `
    <div class="hero">
      <h1>Welcome to my portfolio!</h1>
      <p>AI Engineer | Data Science | Automation</p>
      <button onclick="location.href='#/projects'">View Projects</button>
    </div>
  `;
}

// Rendering projects page
function renderProjects() {
  return `
    <div class="project-list">
      ${CONFIG.PROJECTS.map(project => `
        <div class="project-card">
          <h3>${project.title}</h3>
          <p>${project.summary}</p>
          <button onclick="location.href='#/projects/${project.slug}'">View Details</button>
        </div>
      `).join('')}
    </div>
  `;
}

// Rendering project detail
function renderProjectDetail(slug) {
  const project = CONFIG.PROJECTS.find(p => p.slug === slug);
  if (!project) return '<h2>Project Not Found</h2>';

  return `
    <h2>${project.title}</h2>
    <div>${markdownToHtml(project.longDescription)}</div>
    <p><a href="${project.links.repo}">View Repository</a> | <a href="${project.links.demo}">Live Demo</a></p>
  `;
}

// Rendering about page
function renderAbout() {
  return `
    <h2>About Me</h2>
    <p>${CONFIG.PROFILE.bio}</p>
    <p>Location: ${CONFIG.PROFILE.location}</p>
    <p>Skills: ${CONFIG.SKILLS.programming.join(', ')}</p>
  `;
}

// Rendering blog page
function renderBlog() {
  return `
    <h2>Blog</h2>
    ${CONFIG.BLOG.map(post => `
      <div>
        <h3><a href="#/blog/${post.slug}">${post.title}</a></h3>
        <p>${post.date}</p>
      </div>
    `).join('')}
  `;
}

// Rendering contact page
function renderContact() {
  return `
    <h2>Contact</h2>
    <form onsubmit="handleSubmit(event)">
      <input type="text" placeholder="Name" required />
      <input type="email" placeholder="Email" required />
      <textarea placeholder="Your Message" required></textarea>
      <button type="submit">Submit</button>
    </form>
  `;
}

// Dummy submit handler for contact form
function handleSubmit(event) {
  event.preventDefault();
  alert("Form submitted!");
}

// Listen for route changes using hash change
window.addEventListener('hashchange', () => {
  renderPage(location.hash);
});

// Initialize the app
function initApp() {
  renderPage(location.hash || '#/');
}

initApp();
