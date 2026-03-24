export function curryOnce(fn) {
  return function (arg1) {
    return function (arg2) {
      return fn(arg1, arg2);
    };
  };
}
export function renderRemoveBtn() {
  const btn = document.createElement("button");
  btn.textContent = "✗";
  btn.classList.add("remove");
  return btn;
}
export function renderAddTaskBtn() {
  const btn = document.createElement("button");
  btn.textContent = "Add Task";
  btn.classList.add("btn");
  return btn;
}

export function renderInputElement(placeholder) {
  const input = document.createElement("input");
  input.classList.add("input");
  input.placeholder = placeholder;
  return input;
}
