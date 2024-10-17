<script lang="ts">
	import { onMount } from 'svelte';

	let characterCount = 0;
	let wordCount = 0
	let lineCount = 0;

	let currentFileName = "";
	let textAreaElement: HTMLTextAreaElement;

	// Code inspired from https://www.eddymens.com/blog/how-to-allow-the-use-of-tabs-in-a-textarea
	onMount(async () => {
		textAreaElement.onkeydown = (event) => {
			if (event.shiftKey && event.key == 'Tab') {
				const lastNewLine = textAreaElement.value.lastIndexOf('\n', textAreaElement.selectionStart);
				const indexOfLastTab = textAreaElement.value.lastIndexOf('\t', textAreaElement.selectionStart);

				if (
					(indexOfLastTab >= lastNewLine ||
						lastNewLine == -1 ||
						lastNewLine >= textAreaElement.selectionStart) &&
					indexOfLastTab != -1
				) {
					textAreaElement.setRangeText('', indexOfLastTab, indexOfLastTab + 1, 'end');
				}

				return false; //prevent default action
			}

			if (!event.shiftKey && event.key == 'Tab') {
				textAreaElement.setRangeText('\t', textAreaElement.selectionStart, textAreaElement.selectionStart, 'end');

				return false; //prevent default action
			}
		};
	});

	export function setMetrics(e: Event & { currentTarget: EventTarget & HTMLTextAreaElement}) {
		const textareaContent: string = e.currentTarget.value;

		wordCount = textareaContent.split(/\r\n|\r|\n|\s/).filter(word => word != '').length;
		lineCount = textareaContent.split(/\r\n|\r|\n/).length;
		characterCount = textareaContent.length;		
	}

	// Code inspired from https://robkendal.co.uk/blog/2020-04-17-saving-text-to-client-side-file-using-vanilla-js
	export function downloadToTxt() {
		const a = document.createElement('a');
		const textareaContent = textAreaElement.value;
		const file = new Blob([textareaContent], { type: 'text/plain' });

		a.href = URL.createObjectURL(file);
		a.download = txtFilename() || 'text-edit-notes';
		a.click();

		URL.revokeObjectURL(a.href);
	}

	export function txtFilename() {
		const inputValue = currentFileName;
		const inputWithoutTxtExtension = inputValue.replace('.txt', '');
		const trimmedInput = inputWithoutTxtExtension.trim();

		if (trimmedInput.length < 1) return null;

		return trimmedInput;
	}

	export function prettyPrint() {
		try {
			const prettyValue = JSON.stringify(JSON.parse(textAreaElement.value), null, 2);

			textAreaElement.value = prettyValue;
		} catch (_error) {
			alert('You can only pritty print valid JSON!');
		}
	}
</script>

<svelte:head>
	<meta property="og:title" content="Free online text edit" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://www.freeonlinetextedit.com/site-screenshot.webp" />
	<meta property="og:url" content="https://www.freeonlinetextedit.com" />
	<meta
		property="og:description"
		content="A simple, free online text area for jotting down what comes to mind"
	/>
	<meta property="og:site_name" content="Free online text edit" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content="https://www.freeonlinetextedit.com/site-screenshot.webp" />
	<meta name="twitter:image:alt" content="A screenshot of www.freeonlinetextedit.com" />
	<meta name="twitter:title" content="Free online text edit" />
	<meta name="twitter:creator" content="@jameswattnz" />
</svelte:head>

<div class="app">
	<!-- svelte-ignore a11y-autofocus -->
	<textarea aria-label="text edit" bind:this={textAreaElement} autofocus on:input={(e) => setMetrics(e)} class="textarea"/>

	<footer class="footer">
		<james-watt-calling-card modal-bg-color="#F3EFE0">
			<div class="message__description">Peace and love, peace and love!</div>
		</james-watt-calling-card>

		<div class="message__actions">
			<div class="message__buttons">
				<button class="message__dwl-button" on:click={() => downloadToTxt()}>Download Txt</button>
				<button
					class="message_pretty-print"
					title="JSON Pretty Print"
					on:click={() => prettyPrint()}>PP</button
				>
			</div>

			<input
				class="message__filename"
				type="text"
				maxlength="50"
				placeholder="Txt filename"
				on:input={(e) => currentFileName = e.currentTarget.value}
			/>
		</div>

		<div class="message__textarea-counts">
			<div class="word-count">Character count: {characterCount}</div>
			<div class="word-count">Word count: {wordCount}</div>
			<div class="line-count">Line count: {lineCount}</div>
		</div>
	</footer>
</div>

<style>
	.message__buttons {
		display: flex;
		justify-content: space-between;
		gap: 5px;
	}

	.app {
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.textarea {
		display: block;
		overflow-x: hidden;
		overflow-y: scroll;
		resize: none;
		flex: 1;
		line-height: 20px;
		margin: 0;
		background-color: var(--bg-color);
		font-size: 16px;
	}

	.textarea:valid {
		border: 2px solid var(--border-color);
		outline: none;
	}

	.footer {
		display: flex;
		justify-content: space-between;
		border-bottom: 2px solid var(--border-color);
		border-left: 2px solid var(--border-color);
		border-right: 2px solid var(--border-color);
		padding: 10px;
		align-items: center;
		gap: 10px;
	}

	.message__description {
		margin: auto 0;
		text-align: center;
		display: flex;
	}

	.message__description:hover {
		text-decoration: underline;
	}

	.message__textarea-counts {
		margin: auto 0;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		gap: 10px;
		justify-content: center;
	}

	.message__actions {
		margin: auto 0;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 30px;
		align-items: center;
	}

	.message__dwl-button {
		background-color: var(--bg-color);
		cursor: pointer;
	}

	.message__filename {
		background-color: var(--bg-color);
		text-align: center;
		height: 100%;
		outline: none;
		border-style: outset;
		appearance: unset;
	}

	.message__filename:focus {
		border-style: inset;
	}

	.message_pretty-print {
		width: fit-content;
	}

	@media (max-width: 566px) {
		.message {
			justify-content: center;
			flex-direction: column;
			gap: 20px;
		}

		.message__actions {
			grid-template-columns: repeat(1, minmax(0, 1fr));
		}
	}
</style>
