<script>
    import {setContext} from 'svelte';

    export let Pages;
    
    let currentPage = Pages['/'].component;

    export function go(url, state = {}) {
        const {name = url} = Pages[url];
        history.pushState(state, name, url);
        navigate(url);
    }

    export function navigate(url) {
        const navEvent = new CustomEvent('navigate', {detail: {url}});
        window.dispatchEvent(navEvent);
        const {component} = Pages[url];
        currentPage = component;
    }
    
    setContext('routerGo', go);
</script>

<svelte:component this={currentPage} />
<svelte:window on:popstate={() => navigate(window.location.pathname)} />
