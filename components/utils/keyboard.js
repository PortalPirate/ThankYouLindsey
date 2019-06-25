export function filterKey(key, func, preventDefault = false) {
    return function filteredListener(event) {
        if (event.key === key) {
            if (preventDefault) {
                event.preventDefault();
            }
            func(event);
        }
    };
}
