import { c as create_ssr_component, b as add_attribute } from '../../chunks/index.js';
const styles = '';
const PUBLIC_UMAMI_WEBSITE_URL = 'abc';
const PUBLIC_UMAMI_WEBSITE_ID = '123';
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	const prerender = true;
	if ($$props.prerender === void 0 && $$bindings.prerender && prerender !== void 0)
		$$bindings.prerender(prerender);
	return `${
		(($$result.head += `<!-- HEAD_svelte-q80rqw_START --><script async defer${add_attribute(
			'data-website-id',
			PUBLIC_UMAMI_WEBSITE_ID,
			0
		)}${add_attribute(
			'src',
			PUBLIC_UMAMI_WEBSITE_URL,
			0
		)}><\/script><!-- HEAD_svelte-q80rqw_END -->`),
		'')
	}

${slots.default ? slots.default({}) : ``}`;
});
export { Layout as default };
