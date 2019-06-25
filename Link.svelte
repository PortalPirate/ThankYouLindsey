<script>
    import {getContext} from 'svelte';
    export let url;

    const go = getContext('routerGo');
</script>

<a href="url" on:click|preventDefault={() => go(url)}>
    <slot></slot>
</a>