export const groupBy = (objectArray: any[], property: string) => {
    return objectArray.reduce((acc, obj) => {
        const key = obj[property];
        if (!acc[key]) {
            acc[key] = [];
        }

        // Add object to list for given key's value
        acc[key].push(obj);
        return acc;
    }, {});
};

declare global {
    interface Array<T> {
        groupBy(
            prop: string
        ): {
            [key: string]: Array<T>;
        };

        chunk(n: number): Array<Array<T>>;
    }

    interface ArrayConstructor {
        range(n: number): Array<number>;
    }
}

if (!Array.prototype.groupBy) {
    Array.prototype.groupBy = function (prop: string) {
        return this.reduce(function (groups, item) {
            const val = item[prop];
            groups[val] = groups[val] || [];
            groups[val].push(item);
            return groups;
        }, {});
    };
}

if (!Array.range) {
    Array.range = function (n: number) {
        // Array.range(5) --> [0,1,2,3,4]
        return Array.apply(null, Array(n)).map((x, i) => i);
    };
}

if (!Array.prototype.chunk) {
    Array.prototype.chunk = function (n: number) {
        // ACTUAL CODE FOR CHUNKING ARRAY:
        return Array.range(Math.ceil(this.length / n)).map((x, i) =>
            this.slice(i * n, i * n + n)
        );
    };
}
