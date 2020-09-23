<script>
    import {req} from "../../Components/Common/FetchData"
    let myName = "-";
    const myIdentity = JSON.parse(localStorage.getItem("fullIdentity"));
    myName = myIdentity.name;
    let myChild = [];
    const request = {
        type:"GET",
        content_type:"application/json",
        endpoint:ps.env.endpoint+"dash?type=1&user_id="+myIdentity.id
    }

    async function loadChild() {
        const res = await fetch(request.endpoint, {
            method: request.type,
            headers: {
                'Accept-Type': request.content_type
            }
        })
        const json = await res.json();
        myChild = json.detail;
    }
    loadChild();
</script>
<style>
    .chart {
        height: 20em;
        margin-bottom: 1.5em;
    }
    #dashboard_layout {
        padding-bottom: 100px;
    }
    .list-group-item {
        font-size: 11px !important;
    }
</style>
<div class="row" id="dashboard_layout">
    <div class="col-12">
        <div class="card chart">
            <div class="card-body">

            </div>
        </div>
    </div>
    <div class="col-12">
        <div class="card ">
            <div class="card-body">
               <div class="row">
                   <div class="col-6">
                       <img src="//via.placeholder.com/150" class="img-fluid rounded-circle" alt="">
                   </div>
                   <div class="col-6">
                       <h5>{myName}</h5>
                       {#each myChild as child,i}
                       <ul class="list-group">
                           <li class="list-group-item">
                               {child.name} ({child.born_weight} Kg)
                           </li>
                       </ul>
                       {/each}
                   </div>
               </div>
            </div>
        </div>
    </div>
</div>
