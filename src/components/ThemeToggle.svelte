<script lang="ts">
import { Moon, Sun } from '@lucide/svelte';

let isDark = $state(false);

$effect(() => {
  isDark = document.documentElement.classList.contains('dark');
});

function toggle() {
  isDark = !isDark;
  document.documentElement.classList.toggle('dark', isDark);
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  const theme = isDark ? 'dark' : 'light';

  // biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API lacks broad browser support
  document.cookie = `theme=${theme}; path=/; max-age=31536000; SameSite=Lax`;

  try {
    localStorage.setItem('theme', theme);
  } catch {
    // Ignore storage failures in restricted browsing contexts.
  }
}
</script>

<button
  onclick={toggle}
  class="theme-toggle"
  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
  type="button"
>
  <span class="theme-icon theme-icon-sun"><Sun size={20} /></span>
  <span class="theme-icon theme-icon-moon"><Moon size={20} /></span>
</button>

<style>
  .theme-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.75rem;
    height: 2.75rem;
    padding: 0.5rem;
    border: 1px solid var(--color-border);
    border-radius: var(--button-radius);
    background: transparent;
    color: var(--color-text);
    cursor: pointer;
    transition: background-color var(--transition-fast), border-color var(--transition-fast);
  }

  .theme-toggle:hover {
    background: var(--color-bg-secondary);
    border-color: var(--color-border-secondary);
  }

  /* Both icons are always rendered so the server output and the hydrated
     output are identical (no swap after hydration). The visible icon is
     chosen by the `.dark` class, which the inline <head> script applies
     before the first paint. */
  .theme-icon {
    display: inline-flex;
  }

  .theme-icon-sun {
    display: none;
  }

  :global(html.dark) .theme-icon-sun {
    display: inline-flex;
  }

  :global(html.dark) .theme-icon-moon {
    display: none;
  }
</style>
