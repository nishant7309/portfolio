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
        if (!(event.target instanceof Element)) return;
        const link = event.target.closest("a");
        if (!link) return;
        menu.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
        toggle.querySelector(".toggle-glyph").textContent = "[+]";
    });
}

function initThemeToggle() {
    const toggle = document.querySelector(".theme-toggle");
    const state = document.querySelector(".theme-state");
    const terminalTheme = document.querySelector(".terminal-theme");
    if (!toggle || !state) return;

    const applyTheme = (theme) => {
        const isDark = theme === "dark";
        document.documentElement.dataset.theme = isDark ? "dark" : "light";
        toggle.setAttribute("aria-pressed", String(isDark));
        state.textContent = isDark ? "dark" : "light";
        if (terminalTheme) terminalTheme.textContent = isDark ? "dark" : "light";
    };

    let savedTheme = "dark";
    try {
        savedTheme = localStorage.getItem("theme") || "dark";
    } catch (error) {
        savedTheme = "dark";
    }

    applyTheme(savedTheme === "light" ? "light" : "dark");

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
    const prompt = document.querySelector(".terminal-prompt");
    const response = document.querySelector(".terminal-response");
    const mode = document.querySelector(".terminal-mode");

    if (!tabs.length || !panels.length || !command || !mode) return;

    const terminalCopy = {
        profile: {
            command: "run profile --focus safety",
            response: "profile loaded: research, systems, papers"
        },
        research: {
            command: "ls papers --sort signal",
            response: "2 papers found: MEMAUDIT, Probe-Rewrite-Evaluate"
        },
        stack: {
            command: "cat stack.txt",
            response: "stack loaded: PyTorch, vLLM, Modal, AWS, OpenCV"
        }
    };

    const replay = (element, className) => {
        if (!element) return;
        element.classList.remove(className);
        void element.offsetWidth;
        element.classList.add(className);
    };

    const writeCommand = (nextCommand, nextResponse) => {
        command.textContent = nextCommand;
        if (response) response.textContent = nextResponse;
        replay(prompt, "terminal-pulse");
        replay(response, "is-updated");
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
            if (active) replay(panel, "is-switching");
        });

        const copy = terminalCopy[name] || terminalCopy.profile;
        writeCommand(copy.command, copy.response);
        mode.textContent = name;
    };

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => setActiveTab(tab.dataset.terminalTab));
    });

    document.querySelectorAll("[data-terminal-command]").forEach((link) => {
        link.addEventListener("click", () => {
            writeCommand(link.dataset.terminalCommand, link.dataset.terminalResponse || "command accepted");
        });
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
