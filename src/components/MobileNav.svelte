<script lang="ts">
  import { Menu, X } from '@lucide/svelte';

  interface NavLink {
    href: string;
    label: string;
  }

  interface Props {
    links: NavLink[];
    currentPath: string;
  }

  let { links, currentPath }: Props = $props();

  let open = $state(false);
  let buttonEl: HTMLButtonElement | undefined = $state();
  let panelEl: HTMLDivElement | undefined = $state();

  function normalizePath(path: string): string {
    if (path === '/') return '/';
    return path.endsWith('/') ? path.slice(0, -1) : path;
  }

  function isCurrent(href: string): boolean {
    return normalizePath(currentPath) === normalizePath(href);
  }

  function close() {
    open = false;
  }

  function onWindowClick(event: MouseEvent) {
    if (!open) return;
    // Use the path captured when the event was dispatched. The toggle swaps
    // the icon (Menu <-> X), which detaches the clicked SVG node; a later
    // `buttonEl.contains(target)` would then be false and wrongly close us.
    const path = event.composedPath();
    if (buttonEl && path.includes(buttonEl)) return;
    if (panelEl && path.includes(panelEl)) return;
    close();
  }

  function onWindowKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') close();
  }
</script>

<svelte:window onclick={onWindowClick} onkeydown={onWindowKeydown} />

<button
  bind:this={buttonEl}
  type="button"
  class="inline-flex size-11 items-center justify-center rounded-[var(--button-radius)] border border-border text-text transition-colors hover:border-border-secondary hover:bg-bg-secondary md:hidden"
  aria-label={open ? 'Chiudi il menu' : 'Apri il menu'}
  aria-expanded={open}
  aria-controls="mobile-nav-menu"
  onclick={() => (open = !open)}
>
  {#if open}
    <X size={20} />
  {:else}
    <Menu size={20} />
  {/if}
</button>

{#if open}
  <div
    bind:this={panelEl}
    id="mobile-nav-menu"
    class="absolute inset-x-0 top-full border-b border-border bg-bg px-[var(--space-lg)] py-[var(--space-sm)] shadow-(--shadow-lg) md:hidden"
  >
    <ul class="flex list-none flex-col gap-1 p-0" role="list">
      {#each links as link}
        <li>
          <a
            href={link.href}
            class="block rounded-[var(--radius-lg)] px-3 py-2 text-sm font-medium no-underline transition-colors {isCurrent(
              link.href,
            )
              ? 'bg-bg-secondary text-text'
              : 'text-text-secondary hover:bg-bg-secondary hover:text-text'}"
            aria-current={isCurrent(link.href) ? 'page' : undefined}
            onclick={close}
          >
            {link.label}
          </a>
        </li>
      {/each}
    </ul>
  </div>
{/if}
