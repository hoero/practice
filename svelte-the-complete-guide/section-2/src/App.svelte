<script>
    import ContactCard from './ContactCard.svelte';

    let name = 'Max';
    let job = '';
    let image = '';
    let description = '';
    let formState = 'empty';
    let contacts = [];

    function addContact() {
        if (
            name.trim().length == 0 ||
            job.trim().length == 0 ||
            image.trim().length == 0 ||
            description.trim().length == 0
        ) {
            formState = 'invalid';
            return;
        }
        contacts = [
            ...contacts,
            { id: Math.random(), name, job, image, description },
        ];
        formState = 'done';
    }

    function deleteFirst() {
        contacts = contacts.slice(1);
    }

    function deleteLast() {
        contacts = contacts.slice(0, -1);
    }
</script>

<div id="form">
    <div class="form-control">
        <label for="userName">User Name</label>
        <input type="text" bind:value={name} id="userName" />
    </div>
    <div class="form-control">
        <label for="jobTitle">Job Title</label>
        <input type="text" bind:value={job} id="jobTitle" />
    </div>
    <div class="form-control">
        <label for="image">Image URL</label>
        <input type="text" bind:value={image} id="image" />
    </div>
    <div class="form-control">
        <label for="desc">Description</label>
        <textarea rows="3" bind:value={description} id="desc" />
    </div>
</div>

<button on:click={addContact}>Add Contact</button>
<button on:click={deleteFirst}>Delete First</button>
<button on:click={deleteLast}>Delete Last</button>

{#if formState === 'invalid'}
    <p>Invalid input. Please try again.</p>
{:else}
    <p>Please fill out the form and hit the button.</p>
{/if}

{#each contacts as contact, i (contact.id)}
    <h2>#{i + 1}</h2>
    <ContactCard
        image={contact.image}
        name={contact.name}
        job={contact.job}
        description={contact.description}
    />
{:else}
    <p>Please start adding some contacts, we found none!</p>
{/each}

<style>
    #form {
        width: 30rem;
        max-width: 100%;
    }
</style>
