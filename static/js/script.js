class ThemeManager {
    constructor() {
        this.toggle = document.getElementById('theme-toggle');
        if (!this.toggle) return;

        this.icon = document.getElementById('theme-icon');
        const { iconBase, iconNight, iconDay } = this.toggle.dataset;
        this.iconBase = iconBase;
        this.iconNight = iconNight;
        this.iconDay = iconDay;

        this.init();
    }

    init() {
        this.setInitialTheme();
        this.toggle.addEventListener('click', () => this.toggleTheme());
    }

    loadSyntaxTheme(theme) {
        let link = document.getElementById(`syntax-${theme}`);
        if (link) {
            console.log(`enabling ${theme}`)
            link.disabled = false;
        } else {
            console.log(`loading ${theme}`)
            link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = `/css/syntax-theme-${theme}.css`;
            link.id = `syntax-${theme}`;
            document.head.appendChild(link);
        }
    }

    setInitialTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (systemDark ? 'night' : 'day');

        document.documentElement.setAttribute('data-theme', theme);
        this.loadSyntaxTheme(theme)
        this.updateIcon(theme === 'night');
    }

    toggleTheme() {
        document.body.classList.add('theme-transition');
        const isNight = document.documentElement.getAttribute('data-theme') === 'night';
        const theme = isNight ? 'day' : 'night';

        document.documentElement.setAttribute('data-theme', theme);
        this.updateIcon(!isNight);
        localStorage.setItem('theme', theme);

        this.loadSyntaxTheme(theme)
        if (theme === 'day') {
            document.getElementById('syntax-night').disabled = true;
        } else {
            document.getElementById('syntax-day').disabled = true;
        }

        // Use requestAnimationFrame for better performance on transition
        requestAnimationFrame(() => {
            setTimeout(() => {
                document.body.classList.remove('theme-transition');
            }, 300);
    });
    }

    updateIcon(isNight) {
        if (this.icon) {
            this.icon.setAttribute('href',
                `${this.iconBase}${isNight ? this.iconNight : this.iconDay}`);
        }
    }
}

// Initialize when content is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ThemeManager());
} else {
    new ThemeManager();
}
