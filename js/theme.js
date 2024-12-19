import { storage } from './storage.js';

export const theme = (() => {

    const THEME_DARK = 'dark';
    const THEME_LIGHT = 'light';
    const themeColors = {
        '#000000': '#ffffff',
        '#ffffff': '#000000',
        '#212529': '#f8f9fa',
        '#f8f9fa': '#212529'
    };
    const themeLight = ['#ffffff', '#f8f9fa'];
    const themeDark = ['#000000', '#212529'];

    let theme = null;
    let metaTheme = null;
    let observerDark = null;

    const toDark = (element) => {
        if (element.classList.contains('text-dark')) {
            element.classList.remove('text-dark');
            element.classList.add('text-light');
        }

        if (element.classList.contains('btn-theme-dark')) {
            element.classList.remove('btn-theme-dark');
            element.classList.add('btn-theme-light');
        }

        if (element.classList.contains('bg-light')) {
            element.classList.remove('bg-light');
            element.classList.add('bg-dark');
        }

        if (element.classList.contains('bg-white')) {
            element.classList.remove('bg-white');
            element.classList.add('bg-black');
        }

        if (element.classList.contains('bg-theme-light')) {
            element.classList.remove('bg-theme-light');
            element.classList.add('bg-theme-dark');
        }

        if (element.classList.contains('color-theme-white')) {
            element.classList.remove('color-theme-white');
            element.classList.add('color-theme-black');
        }

        if (element.classList.contains('btn-outline-dark')) {
            element.classList.remove('btn-outline-dark');
            element.classList.add('btn-outline-light');
        }

        if (element.classList.contains('bg-cover-white')) {
            element.classList.remove('bg-cover-white');
            element.classList.add('bg-cover-black');
        }
    };

    const onDark = () => {
        theme.set('active', THEME_DARK);
        document.documentElement.setAttribute('data-bs-theme', THEME_DARK);

        const elements = document.querySelectorAll('.text-dark, .btn-theme-dark, .bg-light, .bg-white, .bg-theme-light, .color-theme-white, .btn-outline-dark, .bg-cover-white');
        elements.forEach((e) => observerDark.observe(e));
    };

    const isDarkMode = () => {
        return theme.get('active') === THEME_DARK;
    };

    const change = () => {
        // Prevent switching to light mode
        onDark();
    };

    const init = () => {
        theme = storage('theme');
        metaTheme = document.querySelector('meta[name="theme-color"]');

        observerDark = new IntersectionObserver((es, o) => {
            es.filter((e) => e.isIntersecting).forEach((e) => toDark(e.target));
            es.filter((e) => !e.isIntersecting).forEach((e) => toDark(e.target));

            o.disconnect();

            const now = metaTheme.getAttribute('content');
            metaTheme.setAttribute('content', themeLight.some((i) => i === now) ? themeColors[now] : now);
        });

        // Always force dark theme
        theme.set('active', THEME_DARK);
        onDark();

        const toggle = document.getElementById('darkMode');
        if (toggle) {
            toggle.checked = true; // Ensure dark mode toggle is always on
            toggle.parentElement.style.display = 'none'; // Hide toggle if needed
        }
    };

    return {
        change,
        init,
        isDarkMode
    };
})();
