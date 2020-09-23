<script>
    import { toast, ToastContainer } from "svelte-toastify";
    import { navigate } from "svelte-routing";
    const endpoint = ps.env.endpoint;
    let addUserForm = {
        "name":null,
        "username":null,
        "password":null,
        "no_hp":null,
        "email":null,
        "level":0,
        "status":1
    };
    let addBabyForm = {
        "user_id":0,
        "name":null,
        "jk":0,
        "birth":null,
        "born_weight":0
    }
    let result = null
    async function registerOn () {
        addUserForm.username = addUserForm.email;
        addBabyForm.jk = parseInt(addBabyForm.jk);
        const addUsers = await fetch(endpoint+"users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addUserForm)
        })

        const resAddUsers = await addUsers.json()

        if (resAddUsers.id !== undefined){
            addBabyForm.user_id = parseInt(resAddUsers.id);
            const addBaby = await fetch(endpoint+"babies", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(addBabyForm)
            })

            const resAddBaby = await addBaby.json()
            if (resAddBaby.id !== undefined){
                toast.success("Data Telah Tersimpan");
                navigate("/",{replace:true});
            }
        }else {
            toast.info("Registrasi Gagal")
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
    #register_layout {
        margin-top: 30%;
        padding-bottom: 100px;
    }
    .form-group {
        margin: 27px 20px 20px
    }
</style>
<div class="row" id="register_layout">
    <div class="col-12">
        <img src="//via.placeholder.com/150" alt="">
    </div>
    <div class="col-12">
        <div class="form-group">
            <label for="nama_lengkap_ibu">Nama Lengkap Ibu</label>
            <input type="text" id="nama_lengkap_ibu" bind:value={addUserForm.name} name="name" class="form-control">
        </div>

        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" bind:value={addUserForm.email} class="form-control">
        </div>

        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" bind:value={addUserForm.password} class="form-control">
        </div>

        <div class="form-group">
            <label for="no_hp">No Telepon</label>
            <input type="text" id="no_hp" name="no_hp" bind:value={addUserForm.no_hp} class="form-control">
        </div>

        <div class="form-group">
            <label for="nama_bayi">Nama Bayi</label>
            <input type="text" id="nama_bayi" name="nama_bayi" bind:value={addBabyForm.name} class="form-control">
        </div>

        <div class="form-group">
            <label for="jk_bayi">Jenis Kelamin</label>
            <select name="jk_bayi" class="form-control" bind:value={addBabyForm.jk} id="jk_bayi" >
                <option >== Pilih ==</option>
                <option value="0">Laki - Laki</option>
                <option value="1">Perempuan</option>
            </select>
        </div>

        <div class="form-group">
            <label for="bb_bayi">Berat Badan Bayi</label>
            <input type="number" id="bb_bayi" name="bb_bayi" bind:value={addBabyForm.born_weight} class="form-control">
        </div>

        <div class="form-group">
            <label for="tgl_bayi">Tanggal Lahir Bayi</label>
            <input type="date" id="tgl_bayi" name="tgl_bayi" bind:value={addBabyForm.birth} class="form-control">
        </div>
        <div class="form-group">
            <button class="btn btn-bblr pull-right" type="button" on:click={registerOn}>Register</button>
        </div>
    </div>
</div>