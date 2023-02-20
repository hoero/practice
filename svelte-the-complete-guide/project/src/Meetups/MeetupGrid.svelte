<script>
    import { createEventDispatcher } from 'svelte';
    import { flip } from 'svelte/animate';
    import { scale } from 'svelte/transition';
    import MeetupItem from './MeetupItem.svelte';
    import MeetupFilter from './MeetupFilter.svelte';
    import Button from '../UI/Button.svelte';

    export let meetups;

    let favsOnly = false;

    const dispatch = createEventDispatcher();

    $: filteredMeetups = favsOnly
        ? meetups.filter((m) => m.isFavorite)
        : meetups;

    function setFilter(event) {
        favsOnly = event.detail === 1;
    }
</script>

<section id="meetup-controls">
    <MeetupFilter on:select={setFilter} />
    <Button on:click={() => dispatch('add')}>New Meetup</Button>
</section>

<section id="meetups">
    {#each filteredMeetups as meetup (meetup.id)}
        <div transition:scale animate:flip={{ duration: 300 }}>
            <MeetupItem
                id={meetup.id}
                title={meetup.title}
                subtitle={meetup.subtitle}
                imageUrl={meetup.imageUrl}
                description={meetup.description}
                address={meetup.address}
                email={meetup.contactEmail}
                isFav={meetup.isFavorite}
                on:showdetails
                on:edit
            />
        </div>
    {/each}
</section>

<style>
    #meetup-controls {
        display: flex;
        justify-content: space-between;
        margin: 1rem;
    }

    #meetups {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 1rem;
    }

    @media (min-width: 768px) {
        #meetups {
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>
