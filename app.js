const input = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') addTask();
    });

    function getTasksFromStorage() {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    }

    function saveTasksToStorage(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        const tasks = getTasksFromStorage();
        tasks.forEach((task, index) => {
        const li = document.createElement('li');

        const taskSpan = document.createElement('span');
        taskSpan.className = 'task-text' + (task.completed ? ' completed' : '');
        taskSpan.innerHTML = task.completed
            ? `<i class="fas fa-check-circle"></i> ${task.text}`
            : `<i class="fas fa-tasks"></i> ${task.text}`;
        taskSpan.onclick = () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasksToStorage(tasks);
            renderTasks();
        };

        const time = document.createElement('div');
        time.className = 'timestamp';
        time.innerText = task.timestamp;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`;
        deleteBtn.onclick = () => {
            tasks.splice(index, 1);
            saveTasksToStorage(tasks);
            renderTasks();
        };

        li.appendChild(taskSpan);
        li.appendChild(time);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
        });
    }

    function addTask() {
        const text = input.value.trim();
        if (!text) return;

        const tasks = getTasksFromStorage();
        const timestamp = new Date().toLocaleString();
        tasks.unshift({ text, timestamp, completed: false });
        saveTasksToStorage(tasks);
        renderTasks();
        input.value = '';
    }

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
    }

    // Load saved tasks on page load
    window.onload = renderTasks;