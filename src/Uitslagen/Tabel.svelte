<script>
  import { onMount, beforeUpdate, afterUpdate } from "svelte";
  import SvelteTable from "svelte-table";
  import { filterArray } from "../helpers/ModifieFilter";
  import { getNewRows } from "../helpers/ModifieRows";
  import { getBesteResultaten } from "../helpers/BesteResultaten";
  import Button from "./Button.svelte";
  import Header from "./Header.svelte";

  export let geldig;
  let rows = geldig;

  let selectedCols = [
    "atleet",
    "categorie",
    "onderdeel",
    "resultaat",
    "wedstrijd",
  ];

  let besteResultaten = getBesteResultaten(rows);

  let getoondeRows = "Alle resultaten";
  const toggleRows = () => {
    if (getoondeRows === "Alle resultaten") {
      rows = besteResultaten;
      getoondeRows = "Beste resultaten";
    } else {
      rows = geldig;
      getoondeRows = "Alle resultaten";
    }
    updateRows();
  };

  //maak alle velden leeg(ingevulde inputvelden)
  let selections = {};
  const clear = () => {
    selections = {};
    updateRows();
  };
  $: isDisabled = !Object.values(selections).some((s) => s != undefined);
  $: if (isDisabled) {
    clear();
  }

  $: if (selections.categorie || selections.onderdeel || selections.wedstrijd) {
    updateRows();
  }

  //update welke rijen er getoond worden
  let newRows = [];
  const updateRows = () => {
    setTimeout(function () {
      newRows = getNewRows();
    }, 0);
  };

  //filters arrays
  let categorieFilter;
  let onderdeelFilter;
  let wedstrijdFilter;
  $: if (newRows != 0) {
    categorieFilter = filterArray(newRows, "categorie");
    onderdeelFilter = filterArray(newRows, "onderdeel");
    wedstrijdFilter = filterArray(newRows, "wedstrijd");
  } else {
    categorieFilter = filterArray(rows, "categorie");
    onderdeelFilter = filterArray(rows, "onderdeel");
    wedstrijdFilter = filterArray(rows, "wedstrijd");
  }

  //maak resultaat geheel getal zodat er op gesorteerd kan worden
  const geheelGetal = (str) =>
    parseFloat(str.replace(":", "").replace(",", ""));

  const COLUMNS = {
    atleet: {
      key: "atleet",
      title: "Atleet",
      value: (v) => v.atleet,
      sortable: true,
      searchValue: (v) => v.atleet.replace(/\s{2,}/g, " "),
    },
    categorie: {
      key: "categorie",
      title: "Categorie",
      value: (v) => v.categorie.trim(),
      sortable: true,
      filterOptions: () => {
        return categorieFilter;
      },
    },
    onderdeel: {
      key: "onderdeel",
      title: "Onderdeel",
      value: (v) => v.onderdeel,
      sortable: true,
      filterOptions: () => {
        return onderdeelFilter;
      },
    },
    resultaat: {
      key: "resultaat",
      title: "Resultaat",
      value: (v) => geheelGetal(v.resultaat),
      sortable: true,
      renderValue: (v) => v.resultaat,
    },
    wedstrijd: {
      key: "wedstrijd",
      title: "Wedstrijd",
      value: (v) => v.wedstrijd.trim(),
      sortable: true,
      filterOptions: () => {
        return wedstrijdFilter;
      },
    },
  };

  //tabel uitklappen
  let expandedArr = [];
  const handleRowClick = (event) => {
    const row = event.detail.row;
    if (!row.$expanded) {
      expandedArr = [...expandedArr, row.id];
    } else {
      expandedArr = expandedArr.filter((id) => id !== row.id);
    }
  };

  $: cols = selectedCols.map((key) => COLUMNS[key]);
  //om de filterOptions te updaten nadat er een nieuwe filter is geklikt
  const updateColumns = () => {
    cols = selectedCols.map((key) => COLUMNS[key]);
    console.log("1");
  };

  onMount(() => {
    document
      .getElementsByTagName("input")[0]
      .setAttribute("placeholder", "Naam atleet");
    document
      .getElementsByTagName("select")[0]
      .getElementsByTagName("option")[0].innerHTML = "Categorie";
    document
      .getElementsByTagName("select")[1]
      .getElementsByTagName("option")[0].innerHTML = "Onderdeel";
    document
      .getElementsByTagName("select")[2]
      .getElementsByTagName("option")[0].innerHTML = "Wedstrijd";

    let titelFilter = document.createElement("H2");
    let titelSorteer = document.createElement("H2");
    titelFilter.innerHTML = "Filter";
    titelSorteer.innerHTML = "Sorteer";
    document.getElementsByTagName("th")[0].prepend(titelFilter);
    document.getElementsByTagName("th")[5].prepend(titelSorteer);
  });

  beforeUpdate(() => {
    updateColumns();
  });
</script>

<Header {getoondeRows} />

<span class="button-container">
  <Button on:click={clear} disabled={isDisabled}>Clear filters</Button>
  <Button on:click={toggleRows} {getoondeRows}>
    {#if getoondeRows === "Alle resultaten"}
      Beste resultaten
    {:else}
      Alle resultaten
    {/if}
  </Button>
</span>

<SvelteTable
  columns={cols}
  {rows}
  bind:filterSelections={selections}
  bind:expanded={expandedArr}
  expandRowKey="id"
  on:clickRow={handleRowClick}
  classNameTable={["table"]}
  classNameSelect={["select"]}
  classNameThead={["thead"]}
  classNameTbody={["tbody"]}
  classNameRow={["tr"]}
  classNameRowExpanded="row-expanded"
  classNameExpandedContent="expanded-content"
>
  <svelte:fragment slot="expanded" let:row>
    Plaats: {row.plaats}<br />
    Datum: {row.datum}<br />
    {#if row.wind != "NT"}
      Wind: {row.wind}
    {/if}
  </svelte:fragment>
</SvelteTable>

<style>
  .button-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 25px;
  }

  :global(table) {
    width: 90vw !important;
    border-collapse: collapse;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2vh;
    margin-bottom: 2vh;
    border-radius: 10px;
    overflow: hidden;
  }

  :global(h2) {
    font-size: 1.4rem;
    text-align: left;
    margin: 0 0 15px 0;
  }

  :global(select, input) {
    background-color: #f7f9fb;
    border-radius: 5px;
    border: none;
    color: #20292f;
    padding: 10px;
    font-size: 1.1rem;
  }

  :global(select) {
    font-size: 0.9rem;
  }

  :global(::placeholder) {
    color: #5f707a;
    font-size: 1.1rem;
  }

  :global(thead tr:nth-child(1) th) {
    padding: 15px;
    border-bottom: 2px solid #20292f;
    vertical-align: bottom;
  }

  :global(thead tr:nth-child(2) th) {
    font-weight: 700;
    font-size: 1.1rem;
    padding: 15px;
    vertical-align: bottom;
  }

  :global(tbody td) {
    padding: 15px;
    font-size: 0.9rem;
  }

  :global(thead tr) {
    background-color: #144ddb;
    color: #f7f9fb;
    text-align: center;
  }

  :global(tbody tr:nth-child(odd)) {
    background-color: #e7ebee;
  }

  :global(tbody tr:nth-child(odd)) {
    border-top: thin solid #dbe1e6;
    border-bottom: thin solid #dbe1e6;
  }

  :global(tbody tr:last-of-type) {
    border-bottom: thick solid #144ddb;
  }

  :global(.row-expanded) {
    background-color: #20292f !important;
    color: #f7f9fb;
  }
  :global(.expanded-content) {
    background-color: #dbe1e6;
  }
</style>
