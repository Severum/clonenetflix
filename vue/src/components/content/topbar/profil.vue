<template>
    <div id="profil">
        <svg :class="$style.svgprofil" v-on:click="toggle = !toggle">
            <rect rx="5" ry="5" width="30" height="30" style="fill:red;" />
        </svg>
        <div v-show="toggle" :class="[ toggle ? $style.profilbackgroundtoggle : '', $style.profilbackground ]" v-on:click="toggle = !toggle"></div>
        <div v-show="toggle" :class="$style.dropdownprofil">
            <a :class="$style.disconnect" v-on:click="disconnect()">Se déconnecter</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'profil',
    computed: {
        token () {
            return this.$store.state.token
        }
    },
    data: () => {
        return {
            toggle: false,
        }
    },
    created: () => {
    },
    mounted: () => {
    },
    methods: {
        disconnect: function() {
            this.$store.commit('setToken', null)
        }
    }
}
</script>

<style module>
.svgprofil {
    cursor: pointer;
    width: 30px;
    height: 30px;
    border: solid 1px;
    border-radius: 10px;
    border-color: #e5e5e5;
}
.profilbackground {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: black;
    opacity: 0;
    transition: all 0.2s ease;
}
.profilbackgroundtoggle {
    opacity: 0.3;
}
.dropdownprofil {
    display: flex;
    justify-content: center; 
    position: fixed;
    z-index: 1001;
    background: #141414; 
    border: solid 1px;
    border-radius: 3px;
    border-color: #e5e5e5;
    opacity: 0.9;
    top: 60px;
    right: 5vw;
    height: 20vh;
    width: 10vw;
    padding: 1vh;
}
.disconnect {
    flex: 0 0 auto;
    cursor: pointer;
    text-decoration: none;
    align-self: flex-end;
    color: #e5e5e5;
}
.disconnect:hover {
    text-decoration: underline;
}
</style>
