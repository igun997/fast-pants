<script>
    import {toast} from "svelte-toastify";
    import { isLogin }   from  "../Common/Store"
    let isLogged = false;
    let loggedName = null;
    const valid = localStorage.getItem("jwt");
    let fullID = localStorage.getItem("fullID");
    if (fullID){
        fullID = JSON.parse(fullID);
        isLogged = true;
        loggedName = fullID.user.displayname
    }
    if (valid === null){
        loginOwner();
    }else {

    }
    async function loginOwner() {
        const gooks = await  fetch(ps.env.endpoint+"api/auth/login",{
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body : JSON.stringify({
                username:((ps.env.default_user).split(":"))[0],
                password:((ps.env.default_user).split(":"))[1],
            })
        })
        const response = await gooks.json();
        if (response.access_token !== undefined){
            localStorage.setItem("jwt",response.access_token);
            toast.info("Your Data Will be Loaded ..");
        }else {
            toast.info("Owh Snap It Troubled");
        }
    }
    async function findMyAccount() {

    }
    isLogin.subscribe(v => {
        if (v === 1){
            loggedName = localStorage.getItem("loggedName");
            isLogged = true;
        }else if(v === 0){

            const jwt = localStorage.getItem("jwt");
            if (jwt === null){
                isLogged = 0;
            }else{
                async function f() {
                    const gooks = await fetch(ps.env.endpoint+"api/auth/me",{
                        method:"POST",
                        headers: {
                            "Content-Type":"application/json",
                            "Accept":"application/json",
                            "Authorize":"Bearer "+jwt
                        }
                    })
                    const response = await gooks.json();
                    if (response.id !== undefined){
                        isLogged = true;
                    }else{
                        loginOwner();
                    }
                }
                f();
            }
        }
    })
    async function logout() {
        localStorage.clear();
        location.reload();
    }
</script>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="collapse navbar-collapse w-100 order-1 order-lg-0" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item active">
                {#if isLogged}
                    <a class="nav-link" on:click={logout} href="#">Logout</a>
                {/if}
            </li>
        </ul>
    </div>
    <div class="d-flex w-100 order-0">
        <div class="w-100">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
        </div>
        <a class="navbar-brand text-center w-100" href="#">FAST PANTS</a>
        <span class="w-100"></span>
    </div>
    <span class="w-100"></span>

    <div class="collapse navbar-collapse float-right" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item active">
                {#if !isLogged}
                <a class="nav-link" href="/">Login</a>
                {:else}
                <a class="nav-link" href="#">{loggedName}</a>
                {/if}
            </li>
        </ul>
    </div>
</nav>
