<script lang="ts">
	import { onMount } from 'svelte';

	let menuVisible = false;
	let characterCount = 0;

	// Code inspired from https://www.eddymens.com/blog/how-to-allow-the-use-of-tabs-in-a-textarea
	onMount(async () => {
		var inputField = document.getElementById('textarea') as HTMLTextAreaElement;
		const thisRef = inputField;

		inputField.onkeydown = (event) => {
			if (event.shiftKey && event.key == 'Tab') {
				const lastNewLine = inputField.value.lastIndexOf('\n', thisRef.selectionStart);
				const indexOfLastTab = inputField.value.lastIndexOf('\t', thisRef.selectionStart);

				if (
					(indexOfLastTab >= lastNewLine ||
						lastNewLine == -1 ||
						lastNewLine >= thisRef.selectionStart) &&
					indexOfLastTab != -1
				) {
					thisRef.setRangeText('', indexOfLastTab, indexOfLastTab + 1, 'end');
				}

				return false; //prevent default action
			}

			if (!event.shiftKey && event.key == 'Tab') {
				thisRef.setRangeText('\t', thisRef.selectionStart, thisRef.selectionStart, 'end');

				return false; //prevent default action
			}
		};
	});

	export function setMetrics() {
		const textareaContent: string = (document.getElementById('textarea') as HTMLTextAreaElement)
			.value;

		characterCount = textareaContent.length;

		if (textareaContent == '') return setWordLineCount(0, 0);

		const wordSplit = textareaContent.split(/\r\n|\r|\n|\s/);
		const newLinesCount = textareaContent.split(/\r\n|\r|\n/).length;
		var wordCount = 0;

		for (var i = 0; i < wordSplit.length; i++) {
			if (wordSplit[i] != '') {
				wordCount += 1;
			}
		}

		setWordLineCount(wordCount, newLinesCount);
	}

	export function setWordLineCount(wordCount: number, lineCount: number) {
		const wordCountElem = document.getElementById('word-count');
		const lineCountElem = document.getElementById('line-count');

		if (wordCountElem) wordCountElem.innerHTML = 'Word Count: ' + wordCount;
		if (lineCountElem) lineCountElem.innerHTML = 'Line Count: ' + lineCount;
	}

	// Code inspired from https://robkendal.co.uk/blog/2020-04-17-saving-text-to-client-side-file-using-vanilla-js
	export function downloadToTxt() {
		const a = document.createElement('a');
		const textareaContent = (document.getElementById('textarea') as HTMLTextAreaElement).value;
		const file = new Blob([textareaContent], { type: 'text/plain' });

		a.href = URL.createObjectURL(file);
		a.download = txtFilename() || 'text-edit-notes';
		a.click();

		URL.revokeObjectURL(a.href);
	}

	export function txtFilename() {
		const inputValue = (document.getElementById('filename-input') as HTMLInputElement).value;
		const inputWithoutTxtExtension = inputValue.replace('.txt', '');
		const trimmedInput = inputWithoutTxtExtension.trim();

		if (trimmedInput.length < 1) return null;

		return trimmedInput;
	}

	export function prettyPrint() {
		try {
			const textarea = document.getElementById('textarea') as HTMLTextAreaElement;

			const prettyValue = JSON.stringify(JSON.parse(textarea.value), null, 2);

			textarea.value = prettyValue;
		} catch (_error) {
			alert('You can only pritty print valid JSON!');
		}
	}

	export function toggleMenu() {
		menuVisible = !menuVisible;
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
	<div class="burger-menu">
		{#if menuVisible}
			<div class="text-metadata">
				<span id="word-count">Word Count: 0</span>
				<span id="line-count">Line Count: 0</span>
				<div>Character count: {characterCount}</div>
				<button
					class="message_pretty-print"
					title="JSON Pretty Print"
					on:click={() => prettyPrint()}>Format JSON</button
				>

				<div class="download-text">
					<input
						class="download-filename"
						type="text"
						maxlength="50"
						placeholder="Txt filename"
						id="filename-input"
					/>
					<button class="download-text-button" on:click={() => downloadToTxt()}>Download Txt</button>
				</div>

				<div class="message__description">Peace and love, peace and love!</div>
			</div>
		{/if}

		<button class="burger-toggle" on:click={() => toggleMenu()}>
			<div class="burger-line"></div>
			<div class="burger-line"></div>
			<div class="burger-line"></div>
		</button>
	</div>

	<!-- svelte-ignore a11y-autofocus -->
	<textarea aria-label="text edit" autofocus on:input={() => setMetrics()} id="textarea" />
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

	textarea {
		display: block;
		overflow-x: hidden;
		overflow-y: scroll;
		resize: none;
		flex: 1;
		line-height: 20px;
		margin: 0;
		background-color: var(--bg-color);
		font-size: 16px;
		z-index: 0;
	}

	textarea:valid {
		border: 2px solid var(--border-color);
		outline: none;
	}

	.message {
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

	.burger-menu {
		z-index: 1;
		position: absolute;
		right: 0;
		top: 0;
		border: 2px solid var(--border-color);
		display: flex;
		flex-direction: row;
		gap: 20px;
		justify-content: flex-end;
		/* padding: 5px 5px; */
		padding: 10px 5px;
		background-color: var(--bg-color);

	}

	.burger-toggle {
		border: none;
		width: 40px;
		display: flex;
		flex-direction: column;
		gap: 5px;
		cursor: pointer;
	}

	.burger-line {
		width: 100%;
		height: 2px;
		background-color: var(--border-color);
	}

	.text-metadata {
		padding: 0 20px;
		display: flex;
		flex-direction: column;
		align-items: self-start;
		gap: 10px;
	}

	.download-text {
		display: flex;
		flex-direction: column;
		background-color: var(--bg-color);
	}

	.download-text-button {
		border-top: none;
		background-color: var(--bg-color);
		cursor: pointer;
	}

	.download-filename {
		text-align: center;
		height: 100%;
		outline: none;
		border-style: outset;
		appearance: unset;
	}

	.download-filename:focus {
		border-style: inset;
	}
</style>
