Array.prototype.chunk = function chunkArray(chunkSize) {
    const r = [];
    for (let i = 0; i < this.length; i += chunkSize) {
        r.push(this.slice(i, i + chunkSize));
    }
    return r;
};
