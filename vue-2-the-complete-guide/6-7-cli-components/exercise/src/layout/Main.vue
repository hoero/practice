<template>
    <div class="row">
        <Servers />
        <ServerDetails />
    </div>
</template>

<script>
import ServerDetails from '../components/ServerDetails';
import Servers from '../components/Servers';

export default {
    components: {
        ServerDetails,
        Servers
    }
};
</script>