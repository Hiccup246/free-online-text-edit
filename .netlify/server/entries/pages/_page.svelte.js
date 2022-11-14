import { c as create_ssr_component } from '../../chunks/index.js';
const _page_svelte_svelte_type_style_lang = '';
const css = {
	code: 'textarea.svelte-eg9azc.svelte-eg9azc{display:block;overflow-x:hidden;overflow-y:scroll;resize:none;flex:1;line-height:20px;margin:0;background-color:var(--bg-color);font-size:16px}textarea.svelte-eg9azc.svelte-eg9azc:valid{border:2px solid var(--border-color);outline:none}.message.svelte-eg9azc.svelte-eg9azc{display:flex;justify-content:space-between;border-bottom:2px solid var(--border-color);border-left:2px solid var(--border-color);border-right:2px solid var(--border-color);font-family:Times, serif}@media(max-width: 566px){.message.svelte-eg9azc.svelte-eg9azc{justify-content:center;flex-direction:column}.message.svelte-eg9azc .message__description.svelte-eg9azc,.message.svelte-eg9azc .message__dwl-button.svelte-eg9azc,.message.svelte-eg9azc .message__textarea-counts.svelte-eg9azc{margin:0 auto;width:fit-content}}.message__description.svelte-eg9azc.svelte-eg9azc{padding:10px}.message__description.svelte-eg9azc.svelte-eg9azc:hover{text-decoration:underline}.message__textarea-counts.svelte-eg9azc.svelte-eg9azc{padding:10px;display:flex}#line-count.svelte-eg9azc.svelte-eg9azc{margin-left:10px}.message__dwl-button.svelte-eg9azc.svelte-eg9azc{font-size:medium;background-color:var(--bg-color);cursor:pointer;margin:auto 0;font-family:inherit}',
	map: null
};
function metrics() {
	const textareaContent = document.getElementById('textarea').value;
	const wordSplit = textareaContent.split(' ');
	const newLinesCount = textareaContent.split(/\r\n|\r|\n/).length;
	var wordCount = 0;
	for (var i = 0; i < wordSplit.length; i++) {
		if (wordSplit[i] != '') {
			wordCount += 1;
		}
	}
	document.getElementById('word-count').innerHTML = 'Word Count: ' + wordCount;
	document.getElementById('line-count').innerHTML = 'Line Count: ' + newLinesCount;
}
function downloadToTxt() {
	const a = document.createElement('a');
	const textareaContent = document.getElementById('textarea').value;
	const file = new Blob([textareaContent], { type: 'text/plain' });
	a.href = URL.createObjectURL(file);
	a.download = 'text-edit-notes.txt';
	a.click();
	URL.revokeObjectURL(a.href);
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	if ($$props.metrics === void 0 && $$bindings.metrics && metrics !== void 0)
		$$bindings.metrics(metrics);
	if ($$props.downloadToTxt === void 0 && $$bindings.downloadToTxt && downloadToTxt !== void 0)
		$$bindings.downloadToTxt(downloadToTxt);
	$$result.css.add(css);
	return `<textarea aria-label="${'text edit'}" aria-labelledby="${'text edit'}" autofocus id="${'textarea'}" class="${'svelte-eg9azc'}"></textarea>
<div class="${'message svelte-eg9azc'}"><james-watt-calling-card modal-bg-color="${'#F3EFE0'}"><div class="${'message__description svelte-eg9azc'}">Peace and love, peace and love!</div></james-watt-calling-card>

	<button class="${'message__dwl-button svelte-eg9azc'}">Download as .txt</button>

	<div class="${'message__textarea-counts svelte-eg9azc'}"><span id="${'word-count'}">Word Count: 0</span>
		<span id="${'line-count'}" class="${'svelte-eg9azc'}">Line Count: 1</span></div>
</div>`;
});
export { Page as default };
