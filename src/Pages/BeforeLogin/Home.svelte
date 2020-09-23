<script>

import { toast, ToastContainer } from "svelte-toastify";
import { navigate } from "svelte-routing";
import {isLogin} from "../../Components/Common/Store"
const endpoint = ps.env.endpoint;
let dform = {
    email:"",
    password:""
};
let result = null
localStorage.setItem("isLogin",0);
async function loginOn () {
    const res = await fetch(endpoint+"auth", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dform)
    })

    const json = await res.json()

   if (json.status === 200){
       toast.success("Username & Password Benar")
       localStorage.setItem("isLogin",1);
       localStorage.setItem("fullIdentity",JSON.stringify(json.detail));
       isLogin.update(n => n + 1);
       navigate("/home", { replace: true });
   }else {
       toast.info("Silahkan Cek Kembali Username & Password Anda")
   }
}
</script>
<style>
    img {
        max-height: 100px;
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 80px;
    }
    #home_layout {
        margin-top: 30%;
    }
    .form-group {
        margin: 27px 20px 20px
    }
</style>
<div class="row" id="home_layout">
    <div class="col-12">
        <img src="//via.placeholder.com/150" alt="">
    </div>
    <div class="col-12">
        <div class="form-group">
            <label for="email">Email</label>
            <input type="text" id="email" bind:value={dform.email} name="email" class="form-control">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" bind:value={dform.password} name="password" class="form-control">
        </div>

        <div class="form-group">
            <button class="btn btn-bblr btn-block" on:click={loginOn} type="button">Login</button>
        </div>
    </div>
</div>