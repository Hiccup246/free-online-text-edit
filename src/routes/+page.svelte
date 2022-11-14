<script lang="ts">
	export function metrics() {
		const textareaContent: string = (document.getElementById('textarea') as HTMLTextAreaElement)
			.value;
		const wordSplit = textareaContent.split(' ');
		const newLinesCount = textareaContent.split(/\r\n|\r|\n/).length;
		var wordCount = 0;

		for (var i = 0; i < wordSplit.length; i++) {
			if (wordSplit[i] != '') {
				wordCount += 1;
			}
		}
		document.getElementById('word-count')!.innerHTML = 'Word Count: ' + wordCount;

		document.getElementById('line-count')!.innerHTML = 'Line Count: ' + newLinesCount;
	}

	// Code inspired from https://robkendal.co.uk/blog/2020-04-17-saving-text-to-client-side-file-using-vanilla-js
	export function downloadToTxt() {
		const a = document.createElement('a');
		const textareaContent = (document.getElementById('textarea') as HTMLTextAreaElement).value;
		const file = new Blob([textareaContent], { type: 'text/plain' });

		a.href = URL.createObjectURL(file);
		a.download = 'text-edit-notes.txt';
		a.click();

		URL.revokeObjectURL(a.href);
	}
</script>

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

<style>
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
