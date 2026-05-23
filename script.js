document.addEventListener("DOMContentLoaded", () => {
    initMobileNav();
    initThemeToggle();
    initTerminalTabs();
    initSmoothScroll();
    initScrollReveal();
    initActiveNav();
});

function initMobileNav() {
    const toggle = document.querySelector(".nav-toggle");
    const menu = document.querySelector(".nav-menu");

    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("active");
        toggle.setAttribute("aria-expanded", String(isOpen));
        toggle.querySelector(".toggle-glyph").textContent = isOpen ? "[-]" : "[+]";
    });

    menu.addEventListener("click", (event) => {
        if (!(event.target instanceof HTMLAnchorElement)) return;
        menu.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
        toggle.querySelector(".toggle-glyph").textContent = "[+]";
    });
}

function initThemeToggle() {
    const toggle = document.querySelector(".theme-toggle");
    const state = document.querySelector(".theme-state");
    if (!toggle || !state) return;

    const applyTheme = (theme) => {
        const isDark = theme === "dark";
        document.documentElement.dataset.theme = isDark ? "dark" : "light";
        toggle.setAttribute("aria-pressed", String(isDark));
        state.textContent = isDark ? "dark" : "light";
    };

    let savedTheme = "light";
    try {
        savedTheme = localStorage.getItem("theme") || "light";
    } catch (error) {
        savedTheme = "light";
    }

    applyTheme(savedTheme === "dark" ? "dark" : "light");

    toggle.addEventListener("click", () => {
        const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        applyTheme(nextTheme);
        try {
            localStorage.setItem("theme", nextTheme);
        } catch (error) {
            document.documentElement.dataset.theme = nextTheme;
        }
    });
}

function initTerminalTabs() {
    const tabs = [...document.querySelectorAll("[data-terminal-tab]")];
    const panels = [...document.querySelectorAll("[data-terminal-panel]")];
    const command = document.querySelector(".terminal-command");
    const mode = document.querySelector(".terminal-mode");

    if (!tabs.length || !panels.length || !command || !mode) return;

    const commands = {
        profile: "run profile --focus safety",
        research: "run papers --source algoverse,arxiv",
        stack: "run stack --ship applied-ai"
    };

    const setActiveTab = (name) => {
        tabs.forEach((tab) => {
            const active = tab.dataset.terminalTab === name;
            tab.classList.toggle("active", active);
            tab.setAttribute("aria-selected", String(active));
        });

        panels.forEach((panel) => {
            const active = panel.dataset.terminalPanel === name;
            panel.classList.toggle("active", active);
            panel.hidden = !active;
        });

        command.textContent = commands[name] || commands.profile;
        mode.textContent = name;
    };

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => setActiveTab(tab.dataset.terminalTab));
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");
            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();
            const offset = targetId === "#hero" ? 0 : 72;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({ top, behavior: "smooth" });
        });
    });
}

function initScrollReveal() {
    const elements = document.querySelectorAll(
        ".section-heading, .prose-block, .fact-panel, .media-list, .work-row, .publication-panel, .skill-group, .contact-row"
    );

    if (!("IntersectionObserver" in window)) {
        elements.forEach((element) => element.classList.add("active"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.12 }
    );

    elements.forEach((element) => {
        element.classList.add("reveal");
        observer.observe(element);
    });
}

function initActiveNav() {
    const sections = [...document.querySelectorAll("main section[id]")];
    const navLinks = [...document.querySelectorAll(".nav-menu a[href^='#']")];

    if (!sections.length || !navLinks.length) return;

    const setActiveLink = () => {
        const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
        const activationLine = Math.min(window.innerHeight * 0.45, 360);
        const current = nearBottom
            ? sections.at(-1)
            : sections.filter((section) => section.getBoundingClientRect().top <= activationLine).at(-1) || sections[0];

        navLinks.forEach((link) => {
            link.classList.toggle("active", current && link.getAttribute("href") === `#${current.id}`);
        });
    };

    setActiveLink();
    window.addEventListener("scroll", setActiveLink, { passive: true });
}
