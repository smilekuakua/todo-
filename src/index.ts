const page = document.getElementById("page");
const list = document.querySelector<HTMLUListElement>("#list");
const title = document.querySelector<HTMLInputElement>("#title");
const form = document.querySelector<HTMLFormElement>("#form");
const description = document.querySelector<HTMLTextAreaElement>("#description");
const deleteTasks = document.querySelector<HTMLFormElement>("delete-button");

type Task = {
  title: String;
  description: String;
  completed: Boolean;
  createdAt: Date;
};

let tasks: Task[] = loadTask();
tasks.forEach(addListItem);

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    title?.value == "" ||
    title?.value == null ||
    description?.value == "" ||
    description?.value == null
  )
    return;

  const newtask = {
    title: title.value,
    description: description.value.trim(),
    completed: false,
    createdAt: new Date(),
  };

  tasks.push(newtask);
  addListItem(newtask);
  title.value = "";
  description.value = "";
  saveTasks();
});

function addListItem(task: Task) {
  const div = document.createElement("div");
  const li = document.createElement("li");
  const br = document.createElement("br");
  const name = document.createElement("div");
  const texte = document.createElement("div");
  const checkbox = document.createElement("input");
  const row = document.createElement("div");
  name.textContent = task.title.trim();
  texte.textContent = task.description.trim();

  checkbox.type = "checkbox";
  checkbox.checked = task.completed.valueOf();
  checkbox.className = "";
  row.className ="flex gflex justify-between  content-center items-center"

  row.appendChild(name);
  row.appendChild(checkbox);
  div.appendChild(row);
  div.appendChild(texte);
  li.className = "bg-slate-200 dark:bg-slate-800 dark:text-teal-50 p-3 mb-2";
  li.appendChild(div);
  li.addEventListener('click', (e) => {
    e.preventDefault();
    checkbox.checked = !checkbox.checked;
    task.completed = !task.completed;
    saveTasks();
   
  });
  if (task.completed) {
    name.className="line-through ";
    texte.className="hidden ";
   
  } 
  list?.appendChild(li);
}


function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
  reload();
}

function loadTask(): Task[] {
  const taskJSON = localStorage.getItem("TASKS");
  if (taskJSON == null) return [];
  return JSON.parse(taskJSON);
}

function reload() {
  window.location.reload();
}

