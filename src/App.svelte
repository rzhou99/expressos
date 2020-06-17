<script>
  import { onMount } from "svelte";

  let data;
  onMount(async () => {
    console.log("mounting");
    data = await fetch("http://localhost:4000/information").then(x => x.json());
  });
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <h1>Hello there!</h1>

  <p>{data ? JSON.stringify(data) : 'Loading...'}</p>
  <p>
    Visit the
    <a href="https://svelte.dev/tutorial">Svelte tutorial</a>
    to learn how to build Svelte apps.
  </p>
</main>
