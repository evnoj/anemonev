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

    setInitialTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (systemDark ? 'night' : 'day');

        document.documentElement.setAttribute('data-theme', initialTheme);
        this.updateIcon(initialTheme === 'night');
    }

    toggleTheme() {
        document.body.classList.add('theme-transition');
        const isNight = document.documentElement.getAttribute('data-theme') === 'night';
        const newTheme = isNight ? 'day' : 'night';

        document.documentElement.setAttribute('data-theme', newTheme);
        this.updateIcon(!isNight);
        localStorage.setItem('theme', newTheme);

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
