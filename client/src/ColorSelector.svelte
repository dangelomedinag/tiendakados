<script>
  import { productsconfig } from '../../app/config/tienda.config';
  import { Checkbox } from 'svelte-mui';

  function colorlabel(color) {
    const {
      blanco,
      negro,
      azul,
      azul_mar,
      azul_opa,
      verde_agu,
      verde_osc,
      rojo,
      gris,
      gris_osc,
      vinotinto,
    } = productsconfig.colores;
    if (color === blanco) {
      return 'whitesmoke;';
    }
    if (color === negro) {
      return 'black';
    }
    if (color === azul) {
      return '#0184BA';
    }
    if (color === azul_mar) {
      return '#1B2040';
    }
    if (color === azul_opa) {
      return '#3D5C7D';
    }
    if (color === gris) {
      return '#959595';
    }
    if (color === gris_osc) {
      return '#4E4E4E';
    }
    if (color === verde_agu) {
      return '#9DE4CE';
    }
    if (color === verde_osc) {
      return '#36644F';
    }
    if (color === rojo) {
      return '#A61212';
    }
    if (color === vinotinto) {
      return '#701C1C';
    }
  }
  export let colors = [];
  export let favorite = [];

  function onAll(e) {
    let on = e.target.checked;

    favorite = on ? Array.from(colors) : [];
  }
</script>

<style>
  div {
    max-width: 100%;
    overflow: auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  }
</style>

<div>
  {#each colors as item}
    <Checkbox color={colorlabel(item)} bind:group={favorite} value={item}>
      <span>{item}</span>
    </Checkbox>
  {/each}
</div>
