require.config({
  paths: {
    vs: "https://unpkg.com/monaco-editor@0.12.0/min/vs",
  },
});

window.MonacoEnvironment = { getWorkerUrl: () => proxy };

let proxy = URL.createObjectURL(
  new Blob(
    [
      `
      self.MonacoEnvironment = {
        baseUrl: 'https://unpkg.com/monaco-editor@0.12.0/min/'
      };
      importScripts('https://unpkg.com/monaco-editor@0.12.0/min/vs/base/worker/workerMain.js');
      `,
    ],
    { type: "text/javascript" }
  )
);
let editor;
let editorTerminal = (data) => {
  require(["vs/editor/editor.main"], function () {
    editor = monaco.editor.create(
      document.getElementById("question-ptoverka"),
      {
        value: [
          `function ${data.fun_name} {
            
}`,
        ].join("\n"),
        language: "javascript",
        theme: "vs-dark",
      }
    );
  });
};
