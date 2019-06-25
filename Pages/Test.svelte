<script>
    import Link from '@/Link';
    import {fade} from 'svelte/transition';
    let path = location.pathname;
</script>
<div transition:fade={{duration: 1000}}>
    <p>{path}</p>
    <p>Hello</p>
    <Link url="/Test2">
        Test2 Link
    </Link>
</div>

<svelte:window on:navigate={({detail: {url}}) => path = url} />