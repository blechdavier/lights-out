<script lang="ts">
  import {
    generateSolvableBoard,
    generateToggleMatrix,
    solveLinearSystem,
  } from "$lib";

  let showAnswers = false;
  let size = 3;
  let board = generateSolvableBoard(size);
  let toggles = generateToggleMatrix(size);
  let solution = solveLinearSystem(toggles, board);

  function regenBoard() {
    board = generateSolvableBoard(size);
    toggles = generateToggleMatrix(size);
    solution = solveLinearSystem(toggles, board);
  }

  function toggleSquare(x: number, y: number) {
    board[y * size + x] = !board[y * size + x];
    if (x != 0) {
      board[y * size + x - 1] = !board[y * size + x - 1];
    }
    if (x != size - 1) {
      board[y * size + x + 1] = !board[y * size + x + 1];
    }
    if (y != 0) {
      board[(y - 1) * size + x] = !board[(y - 1) * size + x];
    }
    if (y != size - 1) {
      board[(y + 1) * size + x] = !board[(y + 1) * size + x];
    }
    toggles = generateToggleMatrix(size);
    solution = solveLinearSystem(toggles, [...board]);
    console.log([...solution]);
  }
</script>

<div class="flex flex-col items-center justify-center h-screen">
  <h1 class="text-4xl font-black inline-block font-title mb-2">
    Lights Out 💡
  </h1>
  <p class="text-gray-600 mb-8">
    Turn all the lights out to win. Press any light to begin.
  </p>
  <div class="space-y-1 mb-8">
    {#each { length: size }, i}
      <div class="flex space-x-1">
        {#each board.slice(i * size, i * size + size) as x, j}
          <button
            class="flex items-center justify-center w-8 h-8 rounded"
            class:bg-yellow-500={x}
            class:bg-gray-300={!x}
            on:click={() => toggleSquare(j, i)}
          >
            {#if showAnswers && solution[i * size + j]}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                class:text-white={x}
                class:text-black={!x}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-click"
                ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
                  d="M3 12l3 0"
                /><path d="M12 3l0 3" /><path d="M7.8 7.8l-2.2 -2.2" /><path
                  d="M16.2 7.8l2.2 -2.2"
                /><path d="M7.8 16.2l-2.2 2.2" /><path
                  d="M12 12l9 3l-4 2l-2 4l-3 -9"
                /></svg
              >
            {/if}
          </button>
        {/each}
      </div>
    {/each}
  </div>
  <div class="flex space-x-2 items-center mb-2">
    <select
      class="bg-white rounded-full text-black border border-gray-300 font-medium text-sm px-5 py-2.5"
      bind:value={size}
      on:change={regenBoard}
    >
      {#each { length: 16 }, i}
        <option value={i + 3}>{i + 3}x{i + 3} grid</option>
      {/each}
    </select>
    <button
      class="aspect-square p-2.5 bg-white rounded-full text-black border border-gray-300 font-medium text-sm hover:bg-gray-50"
      aria-label="New Board"
      on:click={regenBoard}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>
    </button>

    <button
      class="w-32 py-2.5 bg-white rounded-full text-black border border-gray-300 font-medium text-sm hover:bg-gray-50"
      on:click={() => (showAnswers = !showAnswers)}
    >
      {showAnswers ? "Hide Solution" : "Show Solution"}
    </button>
  </div>
  <p class="text-gray-600">
    Solver (heavily) inspired by
    <a class="underline" href="https://www.youtube.com/watch?v=1izbpSk3ays"
      >this video</a
    >.
  </p>
</div>
