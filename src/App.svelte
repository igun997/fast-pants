<script>
	import { Router, Link, Route } from "svelte-routing";
	import Popper from 'popper.js';
	import { toast, ToastContainer } from "svelte-toastify";
	import 'bootstrap/dist/js/bootstrap.bundle.min';
	import Foot from "./Components/Partials/Foot.svelte";
	import Menus from "./Components/Partials/Menus.svelte";
	import Head from "./Components/Partials/Head.svelte";
	import Landing from "./Pages/Landing.svelte"
	import Products from "./Pages/Products.svelte"
	import ProductDetail from "./Pages/ProductDetail.svelte"
	toast.configure({
		position: "top-left"
	});
	export let url = "";
</script>
<svelte:head>
	<svelte:component this="{Head}"/>
</svelte:head>
<Router url="{url}">
	<svelte:component this="{Menus}"/>
	<div class="container">
		<Route path="/" component="{Landing}" />
		<Route path="/products" component="{Products}" />
		<Route path="/product/:id" component="{ProductDetail}" let:params>
			<ProductDetail id="params.id" />
		</Route>
	</div>
	<ToastContainer />

</Router>
<svelte:component this="{Foot}"/>
