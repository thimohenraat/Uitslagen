<script>
  export let mode = null;
  export let disabled = false;
  export let getoondeRows = "Clear";
  console.log(mode);
</script>

<button class={(mode, getoondeRows)} type="button" on:click {disabled}>
  <slot />
</button>

<style>
  button {
    color: #f7f9fb;
    border: none;
    border-radius: 10px;
    padding: 10px;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
  }

  button.Alle {
    background: #144ddb;
  }

  button.Beste {
    background: #f7f9fb;
    color: #144ddb;
    border: thin solid #144ddb;
  }

  button.Clear {
    background: #db144d;
  }

  button:hover:enabled {
    transform: scale(1.1);
  }

  button:disabled {
    background: rgba(219, 20, 77, 0.5);
    cursor: default;
  }
</style>
