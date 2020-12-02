export const fruitMixin = {
    data() {
        return {
            fruits: ['Apple', 'Banana', 'Mango', 'Melon'],
            filterTxt: ''
        };
    },
    computed: {
        filtered() {
            return this.fruits.filter(el => el.match(this.filterTxt));
        }
    }
};
