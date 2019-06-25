<script>
import {onDestroy, onMount} from 'svelte';
import playing from '@/store/playing';
import {slides} from '@/Pages/';
import {filterKey} from '@/components/utils/keyboard';

import {slideTime} from '@/appConfig.yaml';

let cssClass = '';
export {cssClass as class};
const iconMap = {
    [false]: 'play_arrow',
    [true]: 'pause',
};

let currentIndex = 0;
$: currentSlide = slides[currentIndex];

let timer = false;
let out = false;


$: {
    if (!$playing) {
        clearTimeout(timer);
    }
}

onDestroy(() => clearTimeout(timer));

$: icon = iconMap[$playing];


function outroEnd() {
    if (currentIndex < slides.length - 2) {
        currentIndex += 1;
    } else if (currentIndex === slides.length - 2) {
        currentIndex += 1;
        clearTimeout(timer);
        playing.pause();
    }
    out = false;
}

function introEnd() {
    timer = setTimeout(() => {
        out = true;
    }, slideTime);
}

$: pKey = function pKey(event) {
    if ($playing) {
        event.preventDefault();
        playing.pause();
        clearTimeout(timer);
    } else {
        playing.play();
        introEnd();
    }
};

function rKey(event) {
    clearTimeout(timer);
    currentIndex = -1;
    playing.play();
}

onMount(() => {
    playing.play();
    introEnd();
});
</script>

<style>
    :global(.navbar-icon) {
        padding: 0.5em;
    }
</style>

<div class={cssClass}>
    {#if !out}
        <svelte:component 
            this={currentSlide} 
            on:outroend={outroEnd}
            on:introend={introEnd}
        />
    {/if}
</div>

<svelte:body on:keyup={filterKey('p', pKey)} on:keyup={filterKey('r', rKey)}/>