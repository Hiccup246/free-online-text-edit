<script>
	export const prerender = true;
	import './styles.css';
	import { PUBLIC_UMAMI_WEBSITE_ID, PUBLIC_UMAMI_WEBSITE_URL } from '$env/static/public';
</script>

<svelte:head>
	<!-- Umami Analytics Tracking Tags -->
	<script async defer data-website-id={PUBLIC_UMAMI_WEBSITE_ID} src={PUBLIC_UMAMI_WEBSITE_URL} />
</svelte:head>

<slot></slot>