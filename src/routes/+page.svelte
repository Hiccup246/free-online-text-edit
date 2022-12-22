<script lang="ts">
	import SiteScreenshot from "$lib/images/site-screenshot.webp";

	export function metrics() {
		const textareaContent: string = (document.getElementById("textarea") as HTMLTextAreaElement)
			.value;
		const wordSplit = textareaContent.split(" ");
		const newLinesCount = textareaContent.split(/\r\n|\r|\n/).length;
		var wordCount = 0;

		for (var i = 0; i < wordSplit.length; i++) {
			if (wordSplit[i] != "") {
				wordCount += 1;
			}
		}

		const wordCountElem = document.getElementById("word-count");
		const lineCountElem = document.getElementById("line-count");

		if (wordCountElem) wordCountElem.innerHTML = "Word Count: " + wordCount;
		if (lineCountElem) lineCountElem.innerHTML = "Line Count: " + newLinesCount;
	}

	// Code inspired from https://robkendal.co.uk/blog/2020-04-17-saving-text-to-client-side-file-using-vanilla-js
	export function downloadToTxt() {
		const a = document.createElement("a");
		const textareaContent = (document.getElementById("textarea") as HTMLTextAreaElement).value;
		const file = new Blob([textareaContent], { type: "text/plain" });

		a.href = URL.createObjectURL(file);
		a.download = "text-edit-notes.txt";
		a.click();

		URL.revokeObjectURL(a.href);
	}
</script>

<svelte:head>
	<meta property="og:title" content="Free online text edit" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={SiteScreenshot} />
	<meta property="og:url" content="https://www.freeonlinetextedit.com" />
	<meta
		property="og:description"
		content="A simple, free online text area for jotting down what comes to mind"
	/>
	<meta property="og:site_name" content="Free online text edit" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content={SiteScreenshot} />
	<meta name="twitter:image:alt" content="A screenshot of www.freeonlinetextedit.com" />
	<meta name="twitter:title" content="Free online text edit" />
	<meta name="twitter:creator" content="@jameswattnz" />
</svelte:head>

<section>
	<!-- svelte-ignore a11y-autofocus -->
	<textarea
		aria-label="text edit"
		aria-labelledby="text edit"
		autofocus
		on:input={() => metrics()}
		id="textarea"
	/>
	<div class="message">
		<james-watt-calling-card modal-bg-color="#F3EFE0">
			<div class="message__description">Peace and love, peace and love!</div>
		</james-watt-calling-card>

		<button class="message__dwl-button" on:click={() => downloadToTxt()}>Download as .txt</button>

		<div class="message__textarea-counts">
			<span id="word-count">Word Count: 0</span>
			<span id="line-count">Line Count: 1</span>
		</div>
	</div>
</section>

<style>
	section {
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
		font-family: Times, serif;
	}

	@media (max-width: 566px) {
		.message {
			justify-content: center;
			flex-direction: column;
		}

		.message .message__description,
		.message .message__dwl-button,
		.message .message__textarea-counts {
			margin: 0 auto;
			width: fit-content;
		}
	}

	.message__description {
		padding: 10px;
	}

	.message__description:hover {
		text-decoration: underline;
	}

	.message__textarea-counts {
		padding: 10px;
		display: flex;
	}

	#line-count {
		margin-left: 10px;
	}

	.message__dwl-button {
		font-size: medium;
		background-color: var(--bg-color);
		cursor: pointer;
		margin: auto 0;
		font-family: inherit;
	}
</style>
