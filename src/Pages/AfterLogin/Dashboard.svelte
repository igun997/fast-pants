<script>
    import { scaleLinear } from 'd3-scale';
    import points from '../../Components/Seeds/Dashboard';
    //Chart Section
    const yTicks = [0, 2, 4, 6, 8];
    const xTicks = [1980, 1990, 2000, 2010];
    const padding = { top: 20, right: 15, bottom: 20, left: 25 };

    let width = 500;
    let height = 200;
    $: xScale = scaleLinear()
        .domain([minX, maxX])
        .range([padding.left, width - padding.right]);

    $: yScale = scaleLinear()
        .domain([Math.min.apply(null, yTicks), Math.max.apply(null, yTicks)])
        .range([height - padding.bottom, padding.top]);

    $: minX = points[0].x;
    $: maxX = points[points.length - 1].x;
    $: path = `M${points.map(p => `${(xScale(p.x)-25)},${(yScale(p.y))}`).join('L')}`;
    $: area = `${path}L${xScale(maxX)},${yScale(0)}L${xScale(minX)},${yScale(0)}Z`;

    function formatMobile (tick) {
        return tick;
    }
    //END CART
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
    .chart, h2, p {
        width: 100%;
        max-width: 500px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 30px;
    }

    svg {
        position: relative;
        width: 100%;
        height: 200px;
        overflow: visible;
    }

    .tick {
        font-size: .725em;
        font-weight: 200;
    }

    .tick line {
        stroke: #aaa;
        stroke-dasharray: 2;
    }

    .tick text {
        fill: #666;
        text-anchor: start;
    }

    .tick.tick-0 line {
        stroke-dasharray: 0;
    }

    .x-axis .tick text {
        text-anchor: middle;
    }

    .path-line {
        fill: none;
        stroke: rgb(0,100,100);
        stroke-linejoin: round;
        stroke-linecap: round;
        stroke-width: 2;
    }

    .path-area {
        fill: rgba(0,100,100,0.2);
    }
    #dashboard_layout {
        padding-bottom: 100px;
    }
    .list-group-item {
        font-size: 11px !important;
    }
    .gap_card {
        margin-bottom: 30px;
    }
</style>
<div class="row" id="dashboard_layout">
    <div class="col-12 gap_card" style="padding: 0px 0px 0px">
        <div class="card">
            <div class="card-body chart" bind:clientWidth={width} bind:clientHeight={height}>
                <svg>
                    <!-- y axis -->
                    <g class="axis y-axis" transform="translate(0, {padding.top})">
                        {#each yTicks as tick}
                            <g class="tick tick-{tick}" transform="translate(0, {yScale(tick) - padding.bottom})">
                                <line x2="100%"></line>
                                <text y="-4">{tick} {tick === 8 ? ' sample batas' : ''}</text>
                            </g>
                        {/each}
                    </g>

                    <!-- x axis -->
                    <g class="axis x-axis">
                        {#each xTicks as tick}
                            <g class="tick tick-{ tick }" transform="translate({xScale(tick)},{height})">
                                <line y1="-{height}" y2="-{padding.bottom}" x1="0" x2="0"></line>
                                <text y="-2">{width > 380 ? tick : formatMobile(tick)}</text>
                            </g>
                        {/each}
                    </g>

                    <!-- data -->
                    <path class="path-line" d={path}></path>
                </svg>
            </div>
        </div>
    </div>
    <div class="col-12 gap_card">
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
                   <div class="col-12">
                       <hr>
                       <a href="bblr" class="btn btn-bblr btn-lg float-right">Data Anak</a>

                   </div>
               </div>
            </div>
        </div>
    </div>
</div>
