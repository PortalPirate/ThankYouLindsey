import {writable} from 'svelte/store';

const {subscribe, update, set} = writable(true);

function toggle() {
    update((value) => !value);
}

function pause() {
    set(false);
}

function play() {
    set(true);
}


export default {
    subscribe,
    toggle,
    pause,
    play,
};
