<script lang="ts">
	import { page } from '$app/state';
</script>

<center class="padded">
  <h1>{page.status}</h1>
  <p>{page.error.message}</p>
</center>