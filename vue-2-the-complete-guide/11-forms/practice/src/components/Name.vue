<template>
    <div class="form-group">
        <label>
            <slot></slot>
        </label>
        <input
            type="text"
            class="form-control"
            :value="name"
            @change="changed($event.target.value)"
        />
    </div>
</template>

<script>
export default {
    props: ['name'],
    methods: {
        changed(value) {
            this.$emit('input', value);
        }
    }
};
</script>