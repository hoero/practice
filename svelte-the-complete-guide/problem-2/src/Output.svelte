<script>
    export let goal;

    $: loud = goal.endsWith('!') ? true : false;
</script>

<h1 class:red={loud}>{goal}</h1>

<style>
    .red {
        color: red;
    }
</style>
