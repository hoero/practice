<script>
    import Output from './Output.svelte';

    let goal = '';
</script>

<input type="text" bind:value={goal} />
<Output {goal} />
