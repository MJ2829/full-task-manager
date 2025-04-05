document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    let tasks = [];
    let isEditing = false;
    let editingId = null;

    taskForm.addEventListener('click', (e) => {
        const vti = taskInput.value.trim();
        if (vti !== '') {
            if (isEditing) {
                tasks = tasks.map(task =>
                    task.id === editingId ? { ...task, text: vti } : task
                );
                isEditing = false;
                editingId = null;
                taskForm.innerText = "Agregar";
            } else {
                const task = {
                    id: Date.now(),
                    text: vti,
                    complete: false
                };
                tasks.push(task);
            }
            renderTasks();
            taskInput.value = '';
        }
    });

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.style.padding = '10px';
            li.style.margin = '5px 0';

            if (task.complete) {
                li.style.backgroundColor = 'lightgreen';
                li.innerHTML = `
                    <div>${task.text}</div>
                    <div style="color: green; font-weight: bold;">Completado</div>
                `;
            } else {
                li.innerHTML = `
                    <span>${task.text}</span>
                    <div>
                        <button class="complete-btn" onclick="toggleComplete(${task.id})">Completar</button>
                        <button class="edit-btn" onclick="editTask(${task.id})">Editar</button>
                        <button class="delete-btn" onclick="deleteTask(${task.id})">Eliminar</button>
                    </div>
                `;
            }

            taskList.appendChild(li);
        });
    }

    window.deleteTask = function (id) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    }

    window.editTask = function (id) {
        const et = tasks.find(t => t.id === id);
        if (et) {
            taskInput.value = et.text;
            taskForm.innerText = "Guardar";
            isEditing = true;
            editingId = et.id;
        }
    }

    window.toggleComplete = function (id) {
        tasks = tasks.map(task =>
            task.id === id ? { ...task, complete: !task.complete } : task
        );
        renderTasks();
    }
});
