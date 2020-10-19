<script>
	// imports
	import { productsconfig } from "../../app/config/tienda.config";
	import Search from "./search.svelte";
	import Spinner from "./spinner.svelte";
	import Table from "./Table.svelte";
	import ColorSelector from "./ColorSelector.svelte";
	import {
		Menu,
		Menuitem,
		Button,
		Textfield,
		Sidepanel,
		Icon,
		Snackbar,
		Checkbox,
	} from "svelte-mui";

	import { onMount } from "svelte";
	console.log(productsconfig);

	let appstate = {
		data_master: [],
		data: [],
		collections: [],
		// dom_table_element: null,
		shopify_img_url: "https://cdn.shopify.com/s/files/1/0489/5703/0565/files/",
		API_url: "http://localhost:3000/api/polerones",
		sizes: productsconfig.tallas,
		show_element: {
			viewimg: false,
			htmlview: false,
			menu_left: false,
			menu_right: false,
			snackbar: false,
			searchModal: false,
		},
	};

	// variables
	let matchData = [];
	let sle = [];
	let customSelect = [];
	let checked = false;

	// al inicializar componente
	onMount(async () => {
		const promise = await fetch(appstate.API_url);
		const response = await promise.json();

		appstate.data_master = response;
		appstate.data = response;
		console.log(appstate);

		appstate.collections = appstate.data_master
			.map((res) => res.collection)
			.reduce(
				(newTempArr, el) =>
					newTempArr.includes(el) ? newTempArr : [...newTempArr, el],
				[]
			);
	});

	// functions
	function onAll(e) {
		let on = e.target.checked;

		customSelect = on ? Array.from(appstate.data) : [];
	}
	function filterColle(catselect, typePol) {
		appstate.data = appstate.data_master;

		let datafiltered = appstate.data_master.filter(
			(prod) => prod.collection === catselect && prod.type.includes(typePol)
		);
		appstate.data = datafiltered;
		appstate.show_element.menu_left = !appstate.show_element.menu_left;
	}
	function filterCustom(customData) {
		appstate.data = customData;
		appstate.show_element.menu_right = false;
		appstate.show_element.searchModal = false;
	}
	function dataReset() {
		appstate.data = appstate.data_master;
	}
	// function downloadCSV() {
	//   var wb = XLSX.utils.table_to_book(appstate.dom_table_element);
	//   XLSX.writeFile(wb, `data.csv`);
	// }
	async function getShopifyStatusImage(srcimage) {
		let promise = await fetch(
			`https://cdn.shopify.com/s/files/1/0489/5703/0565/files/${srcimage}`
		);
		return promise;
	}

	new ClipboardJS(".btn");
</script>

<style>
	.svg-icon {
		width: 2em;
		height: 2em;
	}

	.svg-icon path {
		fill: #4691f6;
	}

	.checkimgurl {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		top: 0;
		right: 0;
		width: 20px;
		height: 20px;
		color: white;
	}
	.checkimgurl .ok {
		background-color: rgb(90, 216, 117);
	}
	.checkimgurl .fail {
		background-color: rgb(216, 90, 90);
	}

	.img {
		width: 250px;
		height: 250px;
	}

	.d-flex {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.d-row {
		flex-direction: row;
	}
	.d-col {
		flex-direction: column;
	}

	.container-row {
		width: 100%;
	}

	.customselected {
		padding: 1rem;
		position: sticky;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 60px;
		background-color: rgb(255, 255, 255);
		color: #aa9768;
	}

	:global(.side-panel) {
		width: 50% !important;
	}
	main {
		max-height: 100%;
		width: 100%;
		/* display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column; */
	}

	.form-value {
		width: 100%;
	}

	.form-label {
		/* padding: 0 5rem; */
		padding: 0 0.5rem;
		flex-shrink: 1;
		flex-grow: 0;
	}

	.form-label:last-child {
		flex-shrink: 1;
		flex-grow: 2;
	}

	.tablewrapper {
		/* width: 100%; */
		position: relative;
		margin: 1rem 0;
		width: 98%;
		height: 550px;
		/* background-color: #ebebeb; */
		overflow: auto;
		padding: 1rem;
	}
	.emptyProducts {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%);
		font-size: 2rem;
		font-weight: 300;
		color: rgb(206, 94, 79);
	}

	table {
		border-collapse: collapse;
	}
	/* table,
  th,
  td {
    border: 1px solid black;
  } */

	.side-panel-custom {
		padding: 1rem;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	.topbar {
		background-color: rgb(44, 44, 44);
		padding: 1rem 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.bottombar {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #ebebeb;
		padding: 0.2rem 1rem;
	}
</style>

<!-- componente de busqueda -->
<Search
	on:closemodal={() => {
		appstate.show_element.searchModal = !appstate.show_element.searchModal;
		matchData = [];
	}}
	dataTemp={appstate.data_master}
	{matchData}
	bind:sle
	searchModal={appstate.show_element.searchModal}>
	<Button
		color="accent"
		fullWidth="true"
		dense="true"
		on:click={filterCustom(sle)}>
		Cargar ({sle.length}) productos
	</Button>
</Search>

<!-- anuncio de copiado -->
<Snackbar
	bind:visible={appstate.show_element.snackbar}
	bottom="true"
	bg="rgb(25, 118, 210)">
	Copiado al Portapapeles<span slot="action">
		<Button
			color="#ff0"
			on:click={() => (appstate.show_element.snackbar = false)}>
			Cerrar
		</Button>
	</span>
</Snackbar>

<!-- selector de collecciones y tools -->
<Sidepanel
	disableScroll="true"
	left
	bind:visible={appstate.show_element.menu_left}>
	<div class="side-panel-custom">
		{#if appstate.data}
			<div class="button-side">
				<Button
					on:click={dataReset}
					color="primary"
					raised="true"
					dense="true"
					shaped="true"
					fullWidth="true">
					HOMBRE todos ({appstate.data_master.filter((el) =>
						el.type.includes('hombre')
					).length})
				</Button>
				<hr style="margin-bottom: 8px;" />
				{#each appstate.collections as categ (categ)}
					<Button
						color="primary"
						fullWidth="true"
						on:click={filterColle(categ, 'hombre')}
						dense="true">
						{categ}
						{appstate.data_master.filter((el) => el.collection == categ && el.type.includes('hombre')).length}
					</Button>
				{/each}
				<Button
					on:click={dataReset}
					color="primary"
					raised="true"
					dense="true"
					shaped="true"
					fullWidth="true">
					MUJER todos ({appstate.data_master.filter((el) =>
						el.type.includes('mujer')
					).length})
				</Button>
				<hr style="margin-bottom: 8px;" />
				{#each appstate.collections as categ (categ)}
					<Button
						color="primary"
						fullWidth="true"
						on:click={filterColle(categ, 'mujer')}
						dense="true">
						{categ}
						{appstate.data_master.filter((el) => el.collection == categ && el.type.includes('mujer')).length}
					</Button>
				{/each}
				<!-- polerones -->
				<Button
					on:click={dataReset}
					color="primary"
					raised="true"
					dense="true"
					shaped="true"
					fullWidth="true">
					POLERONES todos ({appstate.data_master.filter((el) => el.type === productsconfig.polerones.name).length})
				</Button>
				<hr style="margin-bottom: 8px;" />
				{#each appstate.collections as categ (categ)}
					<Button
						color="primary"
						fullWidth="true"
						on:click={filterColle(categ, productsconfig.polerones.name)}
						dense="true">
						{categ}
						{appstate.data_master.filter((el) => el.collection == categ && el.type === productsconfig.polerones.name).length}
					</Button>
				{/each}
			</div>
			<div class="tool-side">
				<Button
					class="btn"
					data-clipboard-target="#clipboarddata"
					color="accent"
					fullWidth="true"
					dense="true"
					on:click={() => {
						appstate.show_element.snackbar = true;
						appstate.show_element.menu_left = !appstate.show_element.menu_left;
						appstate.show_element.viewimg = false;
						appstate.show_element.htmlview = false;
					}}>
					copy
				</Button>

				<Button
					color="primary"
					fullWidth="true"
					dense="true"
					on:click={dataReset}>
					ALL PRODUCTS
				</Button>
			</div>
		{/if}
	</div>
</Sidepanel>

<!-- selector individual -->
<Sidepanel right bind:visible={appstate.show_element.menu_right}>
	<div class="side-panel-custom">
		{#if appstate.data}
			<div class="button-side">
				<Checkbox on:change={onAll} {checked}>Todos</Checkbox>
				<hr style="margin-bottom: 8px;" />
				{#each appstate.data as product (product.handle)}
					<Checkbox
						class="thin"
						checked="true"
						bind:group={customSelect}
						value={product}>
						{product.handle}
					</Checkbox>
				{/each}
			</div>
			<div class="customselected">
				<Button
					dis
					color="accent"
					fullWidth="true"
					dense="true"
					on:click={filterCustom(customSelect)}>
					Cargar ({customSelect.length}) productos
				</Button>
			</div>
		{/if}
	</div>
</Sidepanel>

<!-- barra superior -->
<div class="topbar">
	<Button
		outlined="true"
		color="primary"
		dense="true"
		on:click={() => (appstate.show_element.menu_left = !appstate.show_element.menu_left)}>
		menu
	</Button>

	<Button
		on:click={() => (appstate.show_element.viewimg = !appstate.show_element.viewimg)}
		raised={appstate.show_element.viewimg}
		color="primary">
		visualizar
	</Button>

	<Button color="primary" dense="true">
		<svg class="svg-icon" viewBox="0 0 20 20">
			<path
				fill="none"
				d="M16.889,8.82c0.002-0.038,0.006-0.075,0.006-0.112c0-1.427-1.158-2.585-2.586-2.585c-0.65,0-1.244,0.243-1.699,0.641c-0.92-1.421-2.513-2.364-4.333-2.364c-2.595,0-4.738,1.914-5.108,4.406c-1.518,0.361-2.648,1.722-2.648,3.35c0,1.904,1.543,3.447,3.447,3.447h12.065c1.904,0,3.447-1.543,3.447-3.447C19.48,10.547,18.377,9.201,16.889,8.82 M16.033,14.74H3.968c-1.426,0-2.585-1.16-2.585-2.586c0-1.2,0.816-2.233,1.985-2.512C3.71,9.561,3.969,9.279,4.021,8.931C4.333,6.838,6.162,5.26,8.277,5.26c1.461,0,2.811,0.736,3.61,1.971c0.135,0.21,0.355,0.351,0.604,0.385c0.039,0.006,0.08,0.008,0.119,0.008c0.207,0,0.408-0.074,0.566-0.212c0.316-0.275,0.719-0.428,1.133-0.428c0.951,0,1.725,0.773,1.723,1.733L16.027,8.78c-0.018,0.408,0.252,0.772,0.646,0.874c1.146,0.293,1.945,1.321,1.945,2.5C18.619,13.58,17.459,14.74,16.033,14.74" />
		</svg>
		0 / 0
	</Button>
	<Button
		on:click={() => (appstate.show_element.searchModal = !appstate.show_element.searchModal)}
		color="primary">
		{#if appstate.data}
			{appstate.data.length == 1 ? `${appstate.data.length} PRODUCTO` : `${appstate.data.length} PRODUCTOS`}
		{/if}
		<Icon
			path="M17,18A2,2 0 0,1 19,20A2,2 0 0,1 17,22C15.89,22 15,21.1 15,20C15,18.89 15.89,18 17,18M1,2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,11.97C16.96,12.58 16.3,13 15.55,13H8.1L7.2,14.63L7.17,14.75A0.25,0.25 0 0,0 7.42,15H19V17H7C5.89,17 5,16.1 5,15C5,14.65 5.09,14.32 5.24,14.04L6.6,11.59L3,4H1V2M7,18A2,2 0 0,1 9,20A2,2 0 0,1 7,22C5.89,22 5,21.1 5,20C5,18.89 5.89,18 7,18M16,11L18.78,6H6.14L8.5,11H16Z"
			style="margin: 0 8px 0 8px;" />
	</Button>
	<Button
		outlined="true"
		color="primary"
		dense="true"
		on:click={() => (appstate.show_element.menu_right = !appstate.show_element.menu_right)}>
		Selecionar
	</Button>
</div>

<!-- contenido tabla -->

<main>
	<div class="tablewrapper">
		{#if appstate.data}
			<Table
				data={appstate.data}
				sizes={appstate.sizes}
				htmlview={appstate.show_element.htmlview}
				urlimages={appstate.shopify_img_url}
				viewimg={appstate.show_element.viewimg} />
		{:else}
			<Spinner />
		{/if}
	</div>
</main>

<!-- barra inferior -->
<div class="bottombar">
	<div class="container-row">
		<div class="d-flex d-col">
			<ColorSelector
				colors={productsconfig.colores.array}
				favorite={productsconfig.polera_H.colorfavs} />
			<ColorSelector
				colors={productsconfig.colores.array_poleron}
				favorite={productsconfig.polerones.colorfavs} />
		</div>
	</div>
	<div class="container-row">
		<div class="d-flex d-row">
			<Textfield
				style="color: white;width: 150px"
				autocomplete="off"
				label="Precio poleras"
				required
				type="number"
				bind:value={productsconfig.polera_H.precio}
				message="no tocar si no es necesario" />

			<Textfield
				style="color: white;width: 150px"
				autocomplete="off"
				label="Precio polerones"
				required
				type="number"
				bind:value={productsconfig.polerones.precio}
				message="no tocar si no es necesario" />
			<div>
				{#if appstate.data}
					<Textfield
						style="color: white; min-width: 100%; width: 400px"
						autocomplete="off"
						label="productos activo"
						required
						type="text"
						value={appstate.data
							.map((item) => item.type)
							.reduce((arr, item) => (arr.includes(item) ? arr : [...arr, item]), [])
							.join(', ')}
						disabled="true"
						message="link apuntando a images del servidor" />
				{/if}
			</div>
		</div>
	</div>
	<div class="container-row">
		<Textfield
			style="color: white;"
			autocomplete="off"
			label="Url link images"
			required
			type="text"
			bind:value={appstate.shopify_img_url}
			message="link apuntando a images del servidor" />
	</div>
</div>
