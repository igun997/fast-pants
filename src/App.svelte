<script>
	import { Router, Link, Route } from "svelte-routing";
	import Popper from 'popper.js';
	import { toast, ToastContainer } from "svelte-toastify";
	import 'bootstrap/dist/js/bootstrap.bundle.min';
	import Foot from "./Components/Partials/Foot.svelte";
	import Menus from "./Components/Partials/Menus.svelte";
	import Head from "./Components/Partials/Head.svelte";
	import HomeBL from "./Pages/BeforeLogin/Home.svelte";
	import RegisterBL from "./Pages/BeforeLogin/Register.svelte";
	import Dashboard from "./Pages/AfterLogin/Dashboard.svelte"
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
	<style>
		.pull-right {
			float: right;
		}
		.btn-bblr {
			color: #fff;
			background-color: #0e9aa7;
			border-color: #0e9aa7;
		}

		.btn-bblr:hover {
			color: #fff;
			background-color: #3da4ab;
			border-color: #3da4ab;
		}

		.btn-bblr:focus, .btn-primary.focus {
			color: #fff;
			background-color: #3da4ab;
			border-color: #3da4ab;
			box-shadow: 0 0 0 0.2rem rgba(61, 164, 171, 0.5);
		}

		.btn-bblr.disabled, .btn-primary:disabled {
			color: #fff;
			background-color: #0e9aa7;
			border-color: #0e9aa7;
		}

		.btn-bblr:not(:disabled):not(.disabled):active, .btn-bblr:not(:disabled):not(.disabled).active,
		.show > .btn-bblr.dropdown-toggle {
			color: #fff;
			background-color: #75b4b8;
			border-color: #75b4b8;
		}

		.btn-bblr:not(:disabled):not(.disabled):active:focus, .btn-bblr:not(:disabled):not(.disabled).active:focus,
		.show > .btn-bblr.dropdown-toggle:focus {
			box-shadow: 0 0 0 0.2rem rgba(61, 164, 171, 0.5);
		}
	</style>
	<div class="container">
		<Route path="/" component="{HomeBL}" />
		<Route path="register" component="{RegisterBL}" />
		<Route path="home" component="{Dashboard}" />
	</div>
	<ToastContainer />

</Router>
<svelte:component this="{Foot}"/>
