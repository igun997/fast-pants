<script>
    import { onMount, onDestroy, setContext } from 'svelte';
    import {isLogin} from "../Components/Common/Store";
    import base64 from 'base-64';
    import {toast} from "svelte-toastify";
    const dform = {
      username:null,
      password:null
    };
    let isLogged = false;
    isLogin.subscribe(v => {
        if (v === 1){
            isLogged = true;
        }
    })
    const fullID = localStorage.getItem("fullID");
    let decodedId = null;
    if (fullID){
        isLogged = true;
        decodedId = base64.encode(fullID);
    }
    async function login(){
        const req = await fetch(ps.env.endpoint+"api/wooapi/generate_login",{
            method:"POST",
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify(dform)
        })
        const result = await req.json();
        console.log(result)
        if (result.code !== undefined){
            if (result.code == 200){
                if (result.data.status === "ok"){
                    localStorage.setItem("loggedName",result.data.user.displayname)
                    localStorage.setItem("fullID",JSON.stringify(result.data))
                    isLogin.update(v =>{
                        v = 1
                        return v;
                    })
                    toast.success("Selamat Datang , "+result.data.user.displayname);
                }else {
                    toast.warning("Username & Password Tidak Sah");
                }
            }
        }else {
            if (result.message === "The given data was invalid."){
                toast.warning("Username & Password Tidak Boleh Kosong");
            }else {
                toast.error("Invalid Apps ");

            }

        }

    }
    let img = null;

</script>

<style>
    @import "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
    .login-container{
        margin-top: 5%;
        margin-bottom: 5%;
    }
    .login-form-1{
        padding: 5%;
        box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
    }
    .login-form-1 h3{
        text-align: center;
        color: #333;
    }
    .login-form-2{
        padding: 5%;
        background: #0062cc;
        box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
    }
    .login-form-2 h3{
        text-align: center;
        color: #fff;
    }
    .login-container form{
        padding: 10%;
    }
    .btnSubmit
    {
        width: 50%;
        border-radius: 1rem;
        padding: 1.5%;
        border: none;
        cursor: pointer;
    }
    .login-form-1 .btnSubmit{
        font-weight: 600;
        color: #fff;
        background-color: #0062cc;
    }
    .login-form-2 .btnSubmit{
        font-weight: 600;
        color: #0062cc;
        background-color: #fff;
    }
    .login-form-2 .ForgetPwd{
        color: #fff;
        font-weight: 600;
        text-decoration: none;
    }
    .login-form-1 .ForgetPwd{
        color: #0062cc;
        font-weight: 600;
        text-decoration: none;
    }
    iframe {
        overflow-x: hidden;
        overflow-y: hidden;
        width: 100%;
        height: 1000px;
    }
    .gap {
        margin-top: 20px;
    }

    .float{
        position:fixed;
        width:60px;
        height:60px;
        bottom:40px;
        right:40px;
        background-color:#0C9;
        color:#FFF;
        border-radius:50px;
        text-align:center;
        box-shadow: 2px 2px 3px #999;
    }

    .my-float{
        margin-top:22px;
    }

</style>
{#if !isLogged}
<div class="row login-container">
    <div class="col-md-6 offset-md-3 login-form-2">
        <h3>Silahkan Masuk</h3>
        <form>
            <div class="form-group">
                <input type="text" class="form-control" bind:value={dform.username} placeholder="Email / Username" />
            </div>
            <div class="form-group">
                <input type="password" class="form-control" bind:value={dform.password} placeholder="Your Password *" />
            </div>
            <div class="form-group">
                <button type="button" class="btnSubmit" on:click={login} >Login</button>
            </div>
            <div class="form-group">
                <a href="#" class="ForgetPwd" value="Login">Daftar</a>
            </div>
        </form>
    </div>
</div>
{:else}
    <div class="col-12  gap" style="margin-left: 10px">
        <img src="{img}" alt="">
    </div>
    <div class="col-12 gap">
    <iframe id="inner" allowfullscreen src="https://pridenjoyco.id/pants.php?key={ps.env.expivi_jwt}&jwt={localStorage.getItem('jwt')}&other={decodedId}" frameborder="0">
    </iframe>
    </div>
{/if}
