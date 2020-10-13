<script>
  import { createEventDispatcher } from "svelte";
  import { Textfield, Checkbox, Button } from "svelte-mui";
  const dispatch = createEventDispatcher();
  export let dataTemp;
  export let matchData = [];
  export let searchModal;
  export let sle = [];
  // $: console.log(sle);

  function closeModal() {
    dispatch("closemodal");
    //console.log("close modal");
  }

  function findProduct(e) {
    let textSearch = e.target.value;
    matchData = [];
    dataTemp.forEach((el) => {
      let posibleMatch = el.handle.split("_");

      if (el.handle.includes(textSearch)) {
        matchData = [...matchData, el];
      }
    });
  }
</script>

<style>
  .foreground {
    cursor: pointer;
    position: fixed;
    z-index: 30;
    top: 50%;
    left: 50%;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.5);
  }

  .content {
    display: flex;
    padding: 1rem;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    position: fixed;
    z-index: 50;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    max-height: 80%;
    max-width: 80%;
    background: white;
    border-radius: 15px;
  }

  .search-label {
    width: 80%;
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .results {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* overflow-y: auto; */
    overflow: hidden;
    padding: 1rem;
    border-radius: 15px;
    border: 1px solid rgb(226, 226, 226);
    width: 100%;
    height: 100%;
    max-height: 100%;
    max-width: 100%;
  }

  .column {
    width: 100%;
    height: 100%;
  }
  .check-list {
    overflow-y: auto;
  }
  .selectedList {
    width: 70%;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(218, 218, 218);
  }
</style>

{#if searchModal}
  <section on:click={closeModal} class="foreground" />
  <div class="content">
    <div class="search-label">
      <Textfield
        autocomplete="off"
        label="buscar producto"
        on:keyup={findProduct}
        required
        type="search"
        message="escribe una palabra ej.'gato'" />
      <slot />
    </div>
    <div class="results">
      <div class="check-list column">
        <p>{matchData.length} coincidencias</p>
        {#each matchData as match}
          <!-- <button>{match.handle}</button> -->
          <Checkbox class="thin" checked="true" bind:group={sle} value={match}>
            {match.handle}
          </Checkbox>
        {:else}
          <p>sin coincidencias</p>
        {/each}
      </div>
      <div class="selectedList column">
        <p>{sle.length} productos seleccionados</p>
        {#each sle as s (s.handle)}
          <Checkbox class="thin" checked="true">{s.handle}</Checkbox>
        {/each}
      </div>
    </div>
  </div>
{/if}
