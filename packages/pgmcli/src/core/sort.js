export function sort(a, b) {
    if (a.created_at < b.created_at) {
        // a is less than b by created_at
        return -1;
    }
    else if (a.created_at > b.created_at) {
        return 1;
    }
    // if they are equal
    return a.id.localeCompare(b.id);
}
//# sourceMappingURL=sort.js.map