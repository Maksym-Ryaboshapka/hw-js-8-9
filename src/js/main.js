import _ from "lodash";
import { v4 as uuid } from "uuid";

const taskInput = document.querySelector("#task-name");
const taskBtn = document.querySelector("#add-task");
const taskList = document.querySelector(".list");

class Task {
  constructor({ name, isDone, id }) {
    this.name = name;
    this.isDone = isDone;
    this.id = id;
  }
}

const tasks = [];

const tasksLocalStorage = JSON.parse(localStorage.getItem("tasks"));

if (tasksLocalStorage !== null) {
  if (tasksLocalStorage.length !== 0) {
    tasksLocalStorage.forEach((task) => {
      const item = document.createElement("li");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      if (task.isDone) checkbox.setAttribute("checked", "");

      const text = document.createElement("p");
      text.classList.add("task-text");
      text.textContent = task.name;
      text.style.display = "inline";
      text.style.margin = "0 15px";

      if (task.isDone) text.style.textDecoration = "line-through";
      else text.style.textDecoration = "none";

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";

      const taskData = new Task({
        name: task.name,
        isDone: task.isDone,
        id: task.id,
      });

      tasks.push(taskData);

      taskList.prepend(item);
      item.append(checkbox);
      item.append(text);
      item.append(removeBtn);

      const doTask = (e) => {
        if (checkbox.checked) text.style.textDecoration = "line-through";
        else text.style.textDecoration = "none";
  
        let currIndex;
  
        tasks.forEach((task, index) => {
          if (task.id === taskData.id) currIndex = index;
        });
  
        const currTask = new Task({
          name: text.textContent,
          isDone: checkbox.checked,
          id: taskData.id,
        });
  
        tasks[currIndex] = currTask;
  
        localStorage.setItem("tasks", JSON.stringify(tasks));
      };
  
      const removeTask = (e) => {
        item.remove();
        _.remove(tasks, (task) => task.id === taskData.id);
  
        checkbox.removeEventListener("click", doTask);
        removeBtn.removeEventListener("click", removeTask);
  
        localStorage.setItem("tasks", JSON.stringify(tasks));
      };
  
      checkbox.addEventListener("click", doTask);
      removeBtn.addEventListener("click", removeTask);
    });
  }
}

taskBtn.addEventListener("click", () => {
  if (taskInput.value !== "") {
    const item = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const text = document.createElement("p");
    text.classList.add("task-text");
    text.textContent = taskInput.value;
    text.style.display = "inline";
    text.style.margin = "0 15px";

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";

    taskInput.value = "";

    const taskData = new Task({
      name: text.textContent,
      isDone: checkbox.checked,
      id: uuid(),
    });

    tasks.push(taskData);

    taskList.prepend(item);
    item.append(checkbox);
    item.append(text);
    item.append(removeBtn);

    const doTask = (e) => {
      if (checkbox.checked) text.style.textDecoration = "line-through";
      else text.style.textDecoration = "none";

      let currIndex;

      tasks.forEach((task, index) => {
        if (task.id === taskData.id) currIndex = index;
      });

      const currTask = new Task({
        name: text.textContent,
        isDone: checkbox.checked,
        id: taskData.id,
      });

      tasks[currIndex] = currTask;

      localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    const removeTask = (e) => {
      item.remove();
      _.remove(tasks, (task) => task.id === taskData.id);

      checkbox.removeEventListener("change", doTask);
      removeBtn.removeEventListener("click", removeTask);

      localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    checkbox.addEventListener("click", doTask);
    removeBtn.addEventListener("click", removeTask);

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
