<script>
    import Link from '@/Link';
    import {fade} from 'svelte/transition';
</script>

<div transition:fade={{duration: 1000}}>
    This is the second test page
    <Link url="/Test"> Test Page </Link>
</div>