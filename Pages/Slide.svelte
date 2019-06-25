<div 
    transition:fade={{duration: transitionTime}} 
    on:introend 
    on:outroend 
    class="slideBody"
>
    <img 
        {src}
        alt=""
    />
    <div>
        <slot></slot>
    </div>
</div>

<script>
    import {fade} from 'svelte/transition';
    import {transitionTime} from '@/appConfig.yaml';
    export let src = '';
</script>