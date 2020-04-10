<template>
    <div class="container">
        <div class="row">
            <div
                class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"
            >
                <h1>Routing</h1>
                <hr />
                <router-view name="header-top"></router-view>
                <transition name="fade" mode="out-in"
                    ><router-view></router-view
                ></transition>
                <router-view name="header-bottom"></router-view>
            </div>
        </div>
    </div>
</template>

<script></script>

<style>
.fade-enter {
    opacity: 0;
}

.fade-enter-active {
    transition: opacity 0.2s;
}

.fade-leave {
}

.fade-leave-active {
    opacity: 0;
    transition: opacity 0.2s;
}
</style>
