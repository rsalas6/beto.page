export const ui = {
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.blog": "Blog",
    "nav.projects": "Proyectos",
    "nav.tools": "Herramientas",
    "nav.resume": "CV",

    // Home
    "home.greeting": "¡Hola Mundo!",
    "home.intro":
      "Soy Roberto Salas, Ingeniero de Software con más de una década de experiencia. Mi especialidad es el desarrollo de aplicaciones web, automatización de procesos y optimización de flujos de trabajo.",
    "home.connect": "Conectemos",
    "home.connect.description":
      "Si quieres ponerte en contacto conmigo o simplemente saludar, encuéntrame en redes sociales o envíame un correo.",
    "home.latest.posts": "Últimas Publicaciones",
    "home.see.all": "Ver todo",

    // Resume
    "resume.title": "Currículum",
    "resume.download": "Descargar CV",
    "resume.about": "Sobre mí",
    "resume.experience": "Experiencia",
    "resume.education": "Educación",
    "resume.projects": "Proyectos",
    "resume.skills": "Habilidades",
    "resume.available": "Disponible para trabajar",

    // Footer
    "footer.rights": "Todos los derechos reservados",

    // 404
    "404.title": "Página no encontrada",
    "404.description": "La página que buscas no existe.",
    "404.back": "Volver al inicio",

    // Common
    "common.loading": "Cargando...",
    "common.error": "Ha ocurrido un error",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.blog": "Blog",
    "nav.projects": "Projects",
    "nav.tools": "Tools",
    "nav.resume": "Resume",

    // Home
    "home.greeting": "Hello World!",
    "home.intro":
      "I'm Roberto Salas, a Software Engineer with over a decade of experience. I specialize in web application development, process automation, and workflow optimization.",
    "home.connect": "Let's Connect",
    "home.connect.description":
      "If you want to get in touch with me or just say hi, reach out on social media or send me an email.",
    "home.latest.posts": "Latest Posts",
    "home.see.all": "See all",

    // Resume
    "resume.title": "Resume",
    "resume.download": "Download Resume",
    "resume.about": "About",
    "resume.experience": "Experience",
    "resume.education": "Education",
    "resume.projects": "Projects",
    "resume.skills": "Skills",
    "resume.available": "Available for work",

    // Footer
    "footer.rights": "All rights reserved",

    // 404
    "404.title": "Page not found",
    "404.description": "The page you're looking for doesn't exist.",
    "404.back": "Back to home",

    // Common
    "common.loading": "Loading...",
    "common.error": "An error occurred",
  },
} as const;

export type UiKey = keyof (typeof ui)["es"];
