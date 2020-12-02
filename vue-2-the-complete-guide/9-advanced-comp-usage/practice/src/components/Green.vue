<template>
    <div>
        <slot name="title"></slot>
        <h2>
            <slot name="subtitle">assumenda-tempora-voluptatibus</slot>
        </h2>
        <slot name="content"></slot>
    </div>
</template>

<script>
</script>

<style scoped>
div {
    border: 1px solid green;
    background-color: lightgreen;
    padding: 30px;
    margin: 20px auto;
    text-align: center;
}
</style>