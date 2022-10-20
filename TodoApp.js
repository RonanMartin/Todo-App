    // MODEL - SECTION
    //if localstorage has a todos array, then use it
    //Otherwise use the default array.

    let todos;

    //Retrieve localStorage
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    //Check if it's an array
    if (Array.isArray(savedTodos)) {
      todos = savedTodos
    }else{
      todos = [{
      title: 'Get groceries',
      dueDate: '2022-10-15',
      id: 'id1'
    }, {
      title: 'Wash car', 
      dueDate: '2022-10-16',
      id: 'id2'
    }, {
      title: 'Make dinner',
      dueDate: '2022-10-17',
      id: 'id3'
    }];

    }


    // Creates a Todo

    function createTodo(title, dueDate){
      const id = '' + new Date().getTime();
      
        todos.push({
          title: title,
          dueDate: dueDate,
          id: id
        });    

        saveTodos()
      }
    // Deletes a Todo
    function removeTodo (idToDelete) {

      todos = todos.filter(todo => {
        if  (todo.id === idToDelete) {
          return false;
        } else {
          return true;
        }
      });

      saveTodos();
    }

    function saveTodos(){
      localStorage.setItem('todos', JSON.stringify(todos));
    }

    function toggleTodo(todoId, checked) {
        todos.forEach(function(todo) {
          if  (todo.id === todoId) {
            todo.isDone = checked
          }
        }); 

        saveTodos()
      }

    function setEditing(todoId) {
        todos.forEach(function (todo) {
          if (todo.id === todoId) {
            todo.isEditing = true;
          }
        });

        saveTodos();
      }

    function updateTodo(todoId, newTitle, newDate) {
        todos.forEach(function (todo) {
          if (todo.id === todoId) {
            todo.title = newTitle;
            todo.dueDate = newDate;
            todo.isEditing = false;
          }
        });

        saveTodos();
      }  


    // CONTROLLER - SECTION    
    function addTodo() {
      const textbox = document.getElementById('todo-title');
      const title = textbox.value;

      const datePicker = document.getElementById ('date-picker')
      const dueDate = datePicker.value

      createTodo (title, dueDate) 

      render();
    } 

    function deleteTodo(event) {
      const deleteButton = event.target;
      const idToDelete = deleteButton.id;

      removeTodo(idToDelete)
      render ()
    }

    function checkTodo (event) {
      const checkbox = event.target;

      const todoId = checkbox.dataset.todoId;
      const checked = checkbox.checked 

      toggleTodo(todoId, checked);

      render();
    }

    function onEdit(event) {
        const editButton = event.target;
        const todoId = editButton.dataset.todoId;

        setEditing(todoId);
        render();
      }

    function onUpdate(event) {
        const updateButton = event.target;
        const todoId = updateButton.dataset.todoId;

        const textbox = document.getElementById('edit-title-' + todoId);
        const newTitle = textbox.value;

        const datePicker = document.getElementById('edit-date-' + todoId);
        const newDate = datePicker.value;

        updateTodo(todoId, newTitle, newDate);
        render();
      }

    
    //VIEW - SECTION

    function render() {
      document.getElementById('todo-list').innerHTML = '';
     
      todos.forEach(todo => {
      const elementCenter = document.createElement('div');
      elementCenter.style = 'display: flex; flex-direction: row; border-bottom-width: 2px; border-bottom-style: solid; border-bottom-color:rgb(55, 55, 255);'
      
      const element = document.createElement('div');
      element.style = 'display: flex; flex: 3; min-width: 300px; '

        const elementCheckbox = document.createElement('div');
        elementCheckbox.style = 'flex: 0.6; text-align: left;'
        element.appendChild(elementCheckbox);

        const elementText = document.createElement('div');
        elementText.style = 'flex: 10;text-align: left; margin-top: 14px; height: 100%; word-break: break-word; '
        element.appendChild(elementText);

        const elementDate = document.createElement('div');
        elementDate.style = 'flex: 3;text-align: right; margin-top: 12px'
        element.appendChild(elementDate);
              
      const elementbutton = document.createElement('div');
      elementbutton.style = 'flex: 1; min-width: 200px; margin-top: 4px;'

      elementCenter.appendChild(element);
      elementCenter.appendChild(elementbutton)

      // If this todo is being edited, render a textbox, date picker and a
          // button for saving the edits.
          if (todo.isEditing === true) {
            const textbox = document.createElement('input');
            textbox.type = 'text';
            textbox.id = 'edit-title-' + todo.id;
            textbox.style = 'margin-top: 8px; height: 25px; width: 250px; font-size: 18px; border: 1px solid rgb(170, 170, 170); padding-top: 1px;';
            element.appendChild(textbox);

            const datePicker = document.createElement('input');
            datePicker.type = 'date';
            datePicker.id = 'edit-date-' + todo.id;
            datePicker.style = 'margin-top: 8px; padding-bottom: 1px; height: 26px;width: 130px;font-size: 18px;border: 1px solid rgb(170, 170, 170);';
            element.appendChild(datePicker);

            const updateButton = document.createElement('button');
            updateButton.innerText = 'Update';
            updateButton.dataset.todoId = todo.id;
            updateButton.style = 'height: 26px; width: 60px; margin-top:  5px; margin-bottom: 8px; margin-left: 12px; font-size: 15px; border: solid; border-width: 1px; border-color: rgb(77, 255, 122); background-color: rgb(189, 255, 206); padding-bottom: 0px; padding-left: 2px; padding-right: 2px; cursor: pointer;'
            updateButton.onclick = onUpdate;
            elementbutton.appendChild(updateButton);

          // If this todo is not being edited, render what we had before
          // and add an "Edit" button.
          } else {

            elementText.innerText = todo.title + ' ';
            elementDate.innerText = todo.dueDate


        const checkbox  = document.createElement('input');
        checkbox.type = 'checkbox';        
        checkbox.onchange = checkTodo;
        checkbox.style = 'margin-top: 15px;'
        checkbox.dataset.todoId = todo.id;
        if (todo.isDone === true) {
            checkbox.checked = true;
          } else {  
            checkbox.checked = false;
          }
          elementCheckbox.appendChild(checkbox);  

        const editButton = document.createElement('button');
            editButton.innerText = 'Edit';
            editButton.style = 'height: 26px; width: 60px; margin-top: 4px; margin-left: 12px; font-size: 15px; border: solid; border-width: 1px; border-color: #60ecff; background-color: rgb(197, 237, 255); padding-bottom: 0px; padding-left: 2px; padding-right: 2px; cursor: pointer;'
            editButton.onclick = onEdit;
            editButton.dataset.todoId = todo.id;
            elementbutton.appendChild(editButton);
      
        const deleteButton = document.createElement('button')
        deleteButton.innerText = 'Delete';
        deleteButton.style = 'height: 26px; width: 70px; margin-top: 4px; margin-left: 12px; margin-bottom: 8px; font-size: 15px; border: solid; border-width: 1px; border-color: rgb(245, 53, 39  ); background-color: rgb(255, 141, 133); padding-bottom: 0px; padding-left: 2px; padding-right: 2px; cursor: pointer;'
        deleteButton.onclick = deleteTodo
        deleteButton.id = todo.id 
        elementbutton.appendChild(deleteButton);
          };


      const todoList = document.getElementById('todo-list');
      todoList.appendChild(elementCenter);
      
        });
    }
    
    render();