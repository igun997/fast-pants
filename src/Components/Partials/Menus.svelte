<script>
import {isLogin} from  "../Common/Store.js";
import { navigate } from "svelte-routing";
import Icon from "fa-svelte";
import { faHome,faNewspaper,faVideo,faBell,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
let login = 0;

const unsubscribe = isLogin.subscribe(value => {
    console.log(value)
    login = value;
});
isLogin.update(n => {
    const localLogin = parseInt(localStorage.getItem("isLogin"));
    if (localLogin === 1){
        n = localLogin;
    }else {
         n = 0;
    }
    return n;
});
function logOut() {
    isLogin.update(n => n - 1);
    localStorage.setItem("isLogin",0);
    localStorage.setItem("fullIdentity",null);
    navigate("/",{replace:true})
}
console.log(login)
</script>
<style>
    .bblr-color {
        background-color: #4a4e4d;
    }
    .icon-size {
        width: 50px;
        height: 50px;
    }
</style>
<nav class="navbar fixed-bottom navbar-expand-sm navbar-dark bblr-color">
    {#if (login === 0)}
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <a class="nav-link" href="/">Login</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/register">Register</a>
            </li>
        </ul>
    </div>
    {:else}
    <a class="navbar-toggler" href="/home"  type="button"  >
        <Icon icon="{faHome}" />
    </a>

    <a class="navbar-toggler " href="/artikel" type="button"  >
        <Icon icon="{faNewspaper}" />
    </a>

    <a class="navbar-toggler " href="/video"  type="button"  >
        <Icon icon="{faVideo}" />
    </a>

    <a class="navbar-toggler " href="/alarm"  type="button"  >
        <Icon icon="{faBell}" />
    </a>
    <button class="navbar-toggler " on:click={logOut} type="button"  >
        <Icon icon="{faSignOutAlt}" />
    </button>

    {/if}
</nav>