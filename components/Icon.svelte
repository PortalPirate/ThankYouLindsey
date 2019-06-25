<!--
    Display an icon from https://material.io/tools/icons/?style=baseline.
    Place the name of the icon inside the tag.
-->

<script>
    export let color = 'primary';
    export let elevation = 0;

    let cssClass;
    export {cssClass as class};

    let textClass;
    $: textClass = `has-text-${color}`;
    $: shadowClass = `elevation-${elevation}`;
</script>

<span class="{cssClass} {shadowClass}" on:click>
    <i class="material-icons {textClass}">
        <slot></slot>
    </i>
</span>
