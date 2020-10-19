<script>
	import { productsconfig } from "../../app/config/tienda.config";
	import colorfilter from "./libs/ColorFilter";
	import comparesort from "./libs/CompareSort";
	import customDescription from "./libs/descriptionHTML";
	import skuGenerate from "./libs/skuGenerate";

	export let data, sizes, viewimg, htmlview, urlimages;
</script>

<style>
	table {
		font-family: Arial;
		font-weight: normal;
		font-size: 10pt;
		/* border: 1px solid rgb(66, 66, 66); */
	}
	tr,
	td {
		border: 1px solid rgb(221, 221, 221);
	}

	thead {
		background-color: rgb(223, 223, 223);
		text-align: center;
	}

	img.img {
		display: block;
		width: 10rem;
		height: auto;
	}
</style>

<table cellpadding="0" cellspacing="0">
	<thead>
		<tr>
			{#each productsconfig.headers as head (head)}
				<td>{head}</td>
			{/each}
		</tr>
	</thead>
	<tbody id="clipboarddata">
		{#each data as product (product.handle)}
			{#each sizes as size, index}
				{#each product.variants
					.filter(colorfilter)
					.sort(comparesort) as variant, i}
					<tr height="50">
						<!-- handle -->

						<td>
							{product.handle}
							{#if viewimg && index < 1}
								<img
									class="img"
									src="http://localhost:3000/static/{product.type.includes('Poleras') ? (product.type === productsconfig.polera_H.name ? 'polerahombre' : 'poleramujer') : 'poleronestodos'}/{variant.filename}"
									alt="xxx" />
							{/if}
						</td>

						<!-- Title -->

						{#if i < 1 && index < 1}
							<td>{product.title}</td>
						{:else}
							<td />
						{/if}

						<!-- Body (HTML) -->

						{#if i < 1 && index < 1}
							<td>
								{#if htmlview}
									{@html customDescription(product.title, product.type)}
								{:else}{customDescription(product.title, product.type)}{/if}
							</td>
						{:else}
							<td />
						{/if}

						<!-- Vendor -->

						{#if i < 1 && index < 1}
							<td>tiendakados</td>
						{:else}
							<td />
						{/if}

						<!-- Type -->

						{#if i < 1 && index < 1}
							<!-- <td>{product.type}</td> -->
							<td>{product.type}</td>
						{:else}
							<td />
						{/if}

						<!-- Tags -->
						{#if i < 1 && index < 1}
							<td>{product.type}</td>
						{:else}
							<td />
						{/if}

						<!-- Published -->

						{#if i < 1 && index < 1}
							<td>TRUE</td>
						{:else}
							<td />
						{/if}

						<!-- Option1 Name	 -->

						{#if i < 1 && index < 1}
							<td>Talla</td>
						{:else}
							<td />
						{/if}

						<!-- Option1 Value	-->
						<td>{size}</td>

						<!-- Option2 Name	-->
						{#if i < 1 && index < 1}
							<td>Color</td>
						{:else}
							<td />
						{/if}

						<!-- Option2 Value	-->
						<td>{variant.color}</td>

						<!-- Option3 Name	-->
						<td />

						<!-- Option3 Value -->
						<td />

						<!-- Variant SKU	-->

						<td>
							{product.handle
								.split('_')
								.join('')
								.slice(0, 5)
								.toUpperCase()}-{size
								.toString()
								.toUpperCase()}-{skuGenerate(product.type)}-{variant.color
								.split(' ')[0]
								.slice(0, 2)
								.toUpperCase()}{product.uuid.slice(0, 4)}
						</td>

						<!-- Variant Grams -->
						{#if product.type === productsconfig.polerones.name}
							<td>{productsconfig.polerones.peso}</td>
						{:else}
							<td>{productsconfig.polera_H.peso}</td>
						{/if}

						<!-- Variant Inventory Tracker -->
						<td>shopify</td>

						<!-- Variant Inventory Qty -->
						<td>99</td>

						<!-- Variant Inventory Policy -->
						<td>continue</td>

						<!-- Variant Fulfillment Service -->
						<td>manual</td>

						<!-- Variant Price -->
						<td>{product.variantPrice}</td>

						<!-- Variant Compare At Price -->
						<td />

						<!-- Variant Requires Shipping -->
						<td>TRUE</td>

						<!-- Variant Taxable -->
						<td>TRUE</td>

						<!-- Variant Barcode -->
						<td />

						<!-- Image Src -->
						{#if index < 1}
							<td>{urlimages}{variant.filename}</td>
						{:else if index == 1 && i < 1}
							<td>
								{#if product.type === productsconfig.polera_H.name}
									https://cdn.shopify.com/s/files/1/0489/5703/0565/files/med_polera_hombre.jpg
								{:else if product.type === productsconfig.polera_M.name}
									https://cdn.shopify.com/s/files/1/0489/5703/0565/files/med_polera_mujer.jpg
								{:else}
									https://cdn.shopify.com/s/files/1/0489/5703/0565/files/med_polerones_unisex.jpg
								{/if}
							</td>
						{:else}
							<td />
						{/if}

						<!-- Image Position -->
						{#if index < 1}
							<td>{i + 1}</td>
						{:else if index == 1 && i < 1}
							<td>{product.variants.length + 1}</td>
						{:else}
							<td />
						{/if}

						<!-- Image Alt Text -->
						{#if product.imageAltText}
							<td>{product.imageAltText}</td>
						{:else}
							<td />
						{/if}

						<!-- Gift Card -->
						<td>FALSE</td>

						<!-- SEO Title -->
						<td />
						<!-- SEO Description -->
						<td />
						<!-- Google Shopping / Google Product Category -->
						<td />
						<!-- Google Shopping / Gender -->
						<td />
						<!-- Google Shopping / Age Group -->
						<td />
						<!-- Google Shopping / MPN -->
						<td />
						<!-- Google Shopping / AdWords Grouping -->
						<td />
						<!-- Google Shopping / AdWords Labels -->
						<td />
						<!-- Google Shopping / Condition -->
						<td />
						<!-- Google Shopping / Custom Product -->
						<td />
						<!-- Google Shopping / Custom Label 0 -->
						<td />
						<!-- Google Shopping / Custom Label 1 -->
						<td />
						<!-- Google Shopping / Custom Label 2 -->
						<td />
						<!-- Google Shopping / Custom Label 3 -->
						<td />
						<!-- Google Shopping / Custom Label 4 -->
						<td />

						<!-- Variant Image -->
						<td>{urlimages}{variant.filename}</td>

						<!-- Variant Weight Unit -->
						<td>kg</td>

						<!-- Variant Tax Code -->
						<td />

						<!-- Cost per item -->
						<td>{product.costPerItem}</td>

						<!-- Collection -->
						{#if i < 1 && index < 1}
							<td>{product.collection}</td>
						{:else}
							<td />
						{/if}
					</tr>
				{/each}
			{/each}
		{/each}
	</tbody>
</table>
