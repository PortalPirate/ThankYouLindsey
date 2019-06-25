<div class="card">
    <header class="card-header">
        <h1 class="card-header-title">
            { title }
        </h1>
        <div class="card-header-icon">
            <Icon color="info">{icon}</Icon>
        </div>
    </header>
    <div class="card-content">
        <h1>{ $prefix }</h1>
        <button on:click={prefix.get}>Get new</button>
        <p>Path: { path }</p>
        <p>Type: { type }</p>
        {#if autoRename}
            <div>Rename Pattern: { renamePattern }</div>
        {/if}
    </div>
    <footer class="card-footer">
        <button
            class="card-footer-item is-danger button"
            on:click={() => removeDestination()}
        >
            Remove Destination
        </button>
    </footer>
</div>


<script>
import iconMap from '@/components/DestinationIcons';
import Icon from '@/components/Icon';
import {prefix} from '@/store/prefix';

export let path = '/test/';
export let title = 'Test destination';
export let autoRename = true;
export let renamePattern = /test/;
export let type = 'bug';

const removeDestination = () => {};

$: icon = iconMap[type] || 'bug_report';
</script>

<style lang="scss">
.card {
    margin: 5px;
    border-color: black;
    border-width: thin;
    border-style: solid;
    border-radius: 4px;
}
</style>