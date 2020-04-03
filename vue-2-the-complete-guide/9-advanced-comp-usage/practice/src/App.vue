<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <br />
                <button class="btn btn-primary" @click="selected = 'app-blue'">Load Blue Template</button>
                <button class="btn btn-success" @click="selected = 'app-green'">Load Green Template</button>
                <button class="btn btn-danger" @click="selected = 'app-red'">Load Red Template</button>
                <hr />
                <component :is="selected">Soluta et inventore nihil optio vel sunt.</component>
                <!-- <app-blue>Fugit omnis distinctio quam accusantium perspiciatis reprehenderit rem officia et. Porro id nemo exercitationem dolores.</app-blue>
                <app-green>
                    <h1 slot="title">eos et sed</h1>
                    <p
                        slot="content"
                    >Vel sit et tempora ut quisquam ut dolores sint dolorem. Et atque ut voluptatem blanditiis mollitia. Laboriosam eius omnis. Qui unde impedit provident at.</p>
                </app-green>
                <app-red>
                    <h6>
                        Dolorem dolor natus facere magni occaecati quasi.
                        Quia sunt enim tempore iusto consequatur iste.
                        Neque rem illo et.
                        Ut rerum molestiae.
                        Culpa omnis error sequi mollitia molestiae qui iure.
                    </h6>
                </app-red>-->
            </div>
        </div>
    </div>
</template>

<script>
import Blue from './components/Blue.vue';
import Green from './components/Green.vue';
import Red from './components/Red.vue';

export default {
    data() {
        return { selected: 'app-blue' };
    },
    components: {
        appBlue: Blue,
        appGreen: Green,
        appRed: Red
    }
};
</script>

<style>
</style>
