<script>
    import {toast} from "svelte-toastify";

    let human = "Buddy";
    const valid = localStorage.getItem("jwt");
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
</script>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="collapse navbar-collapse w-100 order-1 order-lg-0" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item active">
                <a class="nav-link" href="https://pridenjoyco.id"> Back To Store</a>
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
                <a class="nav-link" href="https://pridenjoyco.id/my-account/"> Hi , human</a>
            </li>
        </ul>
    </div>
</nav>
