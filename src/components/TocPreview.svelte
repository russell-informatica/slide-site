<script lang="ts">
  interface Props {
    items: string[];
  }

  let { items }: Props = $props();

  let expanded = $state(false);

  // Only offer expansion when there is likely something to reveal.
  const collapsible = $derived(items.length > 3);
  const collapsedMax = '4.5rem';
  const expandedMax = $derived(`${Math.max(items.length, 1) * 1.9 + 0.5}rem`);
</script>

<div class="relative z-10 mt-4 border-t border-border pt-3">
  <div
    class="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-text-secondary"
  >
    <span>Indice</span>
    {#if collapsible}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-3.5 w-3.5 transition-transform duration-300 {expanded ? 'rotate-180' : ''}"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6"></path>
      </svg>
    {/if}
  </div>

  <div class="relative mt-2">
    <ul
      class="space-y-1 overflow-hidden text-sm leading-relaxed text-text-secondary transition-[max-height] duration-300 ease-out"
      style="max-height: {expanded ? expandedMax : collapsedMax}"
    >
      {#each items as item}
        <li class="flex gap-2">
          <span class="text-border-secondary" aria-hidden="true">•</span>
          <span>{item}</span>
        </li>
      {/each}
    </ul>

    {#if collapsible && !expanded}
      <div
        class="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-surface to-transparent"
        aria-hidden="true"
      ></div>
    {/if}
  </div>

  {#if collapsible}
    <button
      type="button"
      class="absolute inset-0 z-10 cursor-pointer rounded-lg"
      aria-expanded={expanded}
      onclick={() => (expanded = !expanded)}
    >
      <span class="sr-only">{expanded ? 'Comprimi indice' : 'Espandi indice'}</span>
    </button>
  {/if}
</div>
