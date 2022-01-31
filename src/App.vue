<template>
    <div id="app">
        <b-jumbotron header="Cabeleleila Leila">
            <!-- <h1>Salão de beleiza Cabeleleila Leila</h1> -->
        </b-jumbotron>
        <transition
            enter-active-class="animated rubberBand"
            leave-active-class="animated rollOut">
            <router-view/>
        </transition>
    </div>
</template>
<script>

</script>
<style>
#app {
	display: flex;
    flex-direction: column;
    align-items: center;
}

</style>
