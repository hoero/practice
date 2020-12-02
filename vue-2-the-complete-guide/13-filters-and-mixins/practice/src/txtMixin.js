export const txtMixin = {
    computed: {
        counts() {
            return this.txt + ' (' + this.txt.length + ')';
        }
    }
};
