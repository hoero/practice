<script>
    import { createEventDispatcher } from 'svelte';
    import meetups from './meetups-store.js';
    import Input from '../UI/Input.svelte';
    import Button from '../UI/Button.svelte';
    import Modal from '../UI/Modal.svelte';
    import { isEmpty, validEmail } from '../helpers/validation.js';

    export let id = null;

    let title = '',
        subtitle = '',
        address = '',
        email = '',
        description = '',
        imageUrl = '';

    if (id) {
        const unsubscribe = meetups.subscribe((items) => {
            const selected = items.find((item) => item.id === id);
            title = selected.title;
            subtitle = selected.subtitle;
            address = selected.address;
            email = selected.contactEmail;
            description = selected.description;
            imageUrl = selected.imageUrl;
        });

        unsubscribe();
    }

    const dispatch = createEventDispatcher();

    $: titleValid = !isEmpty(title);
    $: subtitleValid = !isEmpty(subtitle);
    $: addressValid = !isEmpty(address);
    $: emailValid = validEmail(email);
    $: descriptionValid = !isEmpty(description);
    $: imageUrlValid = !isEmpty(imageUrl);
    $: formValid =
        titleValid &&
        subtitleValid &&
        addressValid &&
        emailValid &&
        descriptionValid &&
        imageUrlValid;

    function submit() {
        const data = {
            title,
            subtitle,
            description,
            imageUrl,
            contactEmail: email,
            address,
        };

        if (id) {
            meetups.update(id, data);
        } else {
            meetups.add(data);
        }
        dispatch('save');
    }

    function remove() {
        meetups.remove(id);
        dispatch('save');
    }

    function cancel() {
        dispatch('cancel');
    }
</script>

<Modal title="Add Meetup" on:cancel>
    <form on:submit|preventDefault={submit}>
        <Input
            id="title"
            label="Title"
            value={title}
            valid={titleValid}
            validityMessage="Please enter a valid title."
            on:input={(event) => (title = event.target.value)}
        />
        <Input
            id="subtitle"
            label="Subtitle"
            value={subtitle}
            valid={subtitleValid}
            validityMessage="Please enter a valid subtitle."
            on:input={(event) => (subtitle = event.target.value)}
        />
        <Input
            id="address"
            label="Address"
            value={address}
            valid={addressValid}
            validityMessage="Please enter a valid address."
            on:input={(event) => (address = event.target.value)}
        />
        <Input
            id="imageUrl"
            label="Image URL"
            value={imageUrl}
            valid={imageUrlValid}
            validityMessage="Please enter a valid image URL."
            on:input={(event) => (imageUrl = event.target.value)}
        />
        <Input
            id="email"
            label="Email"
            value={email}
            type="email"
            valid={emailValid}
            validityMessage="Please enter a valid email."
            on:input={(event) => (email = event.target.value)}
        />
        <Input
            id="description"
            label="Description"
            bind:value={description}
            controlType="textarea"
            valid={descriptionValid}
            validityMessage="Please enter a valid description."
        />
    </form>
    <div slot="footer">
        <Button mode="outline" on:click={cancel}>Cancel</Button>
        <Button on:click={submit} disabled={!formValid}>Save</Button>
        {#if id}
            <Button on:click={remove}>Delete</Button>
        {/if}
    </div>
</Modal>

<style>
    form {
        width: 100%;
    }
</style>
