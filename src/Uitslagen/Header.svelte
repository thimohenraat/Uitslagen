<script>
  export let getoondeRows;
</script>

<header>
  <h1>
    <span id="feniks">AV Feniks</span>
    {getoondeRows}
    <span>Laatste 3 maanden</span>
  </h1>
</header>

<style>
  header {
    background: #144ddb;
    color: #f7f9fb;
    top: 0;
    left: 0;
    text-align: center;
    padding: 2%;
    margin-bottom: 2vh;
  }

  h1 {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0;
  }

  span#feniks {
    font-weight: 900;
    font-size: 3rem;
  }
</style>
