# Skip.js

面倒な儀式をスキップして、すぐにロジックを書くためのライブラリです。

This is a library for skipping the tedious ceremony of setting up a basic HTML page and getting straight to writing your JavaScript logic.

## Features

- **Boilerplate Automation**: Automatically sets up the HTML document's `lang`, `title`, `charset`, and `viewport`.
- **No Global Pollution**: Only exposes a single `Skip` object to the global namespace.
- **Helper Functions**: Provides convenient helper functions (`$`, `$$`, `sleep`, `print`) within a sandboxed `run` function.
- **TypeScript Support**: Includes a `skip.d.ts` file for type definitions and autocompletion in modern editors.

## Usage

1.  **Include the script:**

    ```html
    <script src="skip.js"></script>
    ```

2.  **Start the application:**

    Call `Skip.start()` and pass a configuration object. The main logic of your application goes inside the `run` function.

    ```html
    <div id="app"></div>

    <script>
        Skip.start({
            targetId: "app", // The ID of the element where content will be rendered
            title: "My Skip.js App",
            run: async ({ print, sleep, $ }) => {
                print("<h1>Hello, Skip.js!</h1>");

                await sleep(1000);
                print("<p>This message appeared after 1 second.</p>");

                const appDiv = $("#app");
                appDiv.style.border = "1px solid black";
                appDiv.style.padding = "1em";
            }
        });
    </script>
    ```

## Configuration

The `Skip.start` function accepts a configuration object with the following optional properties:

| Option       | Type       | Default                 | Description                                                                                             |
|--------------|------------|-------------------------|---------------------------------------------------------------------------------------------------------|
| `targetId`   | `string`   | `'special_start'`       | The `id` of the HTML element where `print()` will render content. If not found, it will be created.     |
| `lang`       | `string`   | `'ja'`                  | Sets the `lang` attribute of the `<html>` tag.                                                          |
| `title`      | `string`   | `'SkipJS App'`          | Sets the document's title.                                                                              |
| `charset`    | `string`   | `'UTF-8'`               | Sets the document's character set via a `<meta>` tag.                                                   |
| `viewport`   | `string`   | `'width=device-width, initial-scale=1.0'` | Sets the viewport meta tag for responsive design.                                                       |
| `autoClear`  | `boolean`  | `false`                 | If `true`, clears the `innerHTML` of the target element before running.                                   |
| `run`        | `function` | `undefined`             | An `async` function containing your application's logic. It receives an object with helper functions. |

## Helper Functions

The `run` function receives an object containing the following helper functions:

| Function | Signature                                | Description                                               |
|----------|------------------------------------------|-----------------------------------------------------------|
| `print`  | `(html: string) => void`                 | Renders an HTML string inside the `targetId` element.     |
| `sleep`  | `(ms: number) => Promise<void>`          | Pauses execution for a specified number of milliseconds.  |
| `$`      | `(selector: string) => Element \| null`  | A shortcut for `document.querySelector`.                  |
| `$$`     | `(selector: string) => NodeListOf<Element>` | A shortcut for `document.querySelectorAll`.               |
