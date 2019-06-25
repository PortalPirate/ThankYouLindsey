<div class="content">
    {#if type === 'Images'}
        <img src={url} class="sorterItem" alt=""/>
    {:else if type === 'Videos'}
        <video
            class="sorterItem"
            src={url}
            playsinline
            preload="auto"
            controls
        />
    {/if}
    <span class="level">
        {#each destinations as destination}
            <DestinationButton
                key={destination.url}
                src-path="{path}"
            />
        {/each}
    </span>
</div>

<script>
import DestinationButton from '@/components/DestinationButton';

export let url;
export let type;
export let destinations;

</script>


<style lang="scss">
.sorterItem {
    top: 0;
    left: 0;
    max-width: 70vw;
    max-height: 65vh;
    background-color: black;
    @at-root #{selector-unify(&, img)} {
        height: auto;
    }
}
.content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
</style>