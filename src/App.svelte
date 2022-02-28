<script>
  import * as uitslagen from "../uitslagen2.json";
  import Tabel from "./Uitslagen/Tabel.svelte";
  import { isUnique, deleteNaN } from "./helpers/ModifieJSON";

  let uitslagenJSON = uitslagen.default;
  let unique = isUnique(uitslagenJSON);
  let geldig = deleteNaN(unique);
</script>

<main>
  <Tabel {geldig} />
</main>

<style>
</style>
