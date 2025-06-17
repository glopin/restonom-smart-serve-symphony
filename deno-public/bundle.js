// deno-src/main.tsx
import React2 from "https://esm.sh/react@18.2.0";
import ReactDOM from "https://esm.sh/react-dom@18.2.0/client";

// deno-src/App.tsx
import React from "https://esm.sh/react@18.2.0";
function App() {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "Hello World from Deno React!"));
}
var App_default = App;

// deno-src/main.tsx
ReactDOM.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ React2.createElement(React2.StrictMode, null, /* @__PURE__ */ React2.createElement(App_default, null))
);
