<script>
    import meetups from './Meetups/meetups-store.js';
    import Header from './UI/Header.svelte';
    import MeetupGrid from './Meetups/MeetupGrid.svelte';
    import MeetupForm from './Meetups/MeetupForm.svelte';
    import MeetupDetail from './Meetups/MeetupDetail.svelte';

    let editMode = null,
        editId,
        page = 'overview',
        pageData = {};

    function savedMeetup() {
        editMode = null;
        editId = null;
    }

    function cancelEdit() {
        editMode = null;
        editId = null;
    }

    function showDetails(event) {
        page = 'details';
        pageData.id = event.detail;
    }

    function closeDetail() {
        page = 'overview';
        pageData = {};
    }

    function startEdit(event) {
        editMode = 'edit';
        editId = event.detail;
    }
</script>

<Header />

<main>
    {#if page === 'overview'}
        {#if editMode == 'edit'}
            <MeetupForm
                id={editId}
                on:save={savedMeetup}
                on:cancel={cancelEdit}
            />
        {/if}
        <MeetupGrid
            meetups={$meetups}
            on:showdetails={showDetails}
            on:edit={startEdit}
            on:add={() => (editMode = 'edit')}
        />
    {:else}
        <MeetupDetail id={pageData.id} on:close={closeDetail} />
    {/if}
</main>

<style>
    main {
        margin-top: 5rem;
    }
</style>
