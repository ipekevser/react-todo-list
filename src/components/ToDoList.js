import { useRef, useState } from "react";

import { v4 as uuid } from "uuid";

const ToDoList = () => {
  const [newList, setNewList] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const inputRef = useRef(null);
  const priorityRef = useRef("");
  const dateRef = useRef("");
  const unique_id = uuid();

  const addNewTaskHandler = () => {
    const taskInput = inputRef.current.value;
    const priorityInput = priorityRef.current.value;
    const dateInput = dateRef.current.value;

    const newTaskObject = {
      task: taskInput,
      priority: priorityInput,
      dueDate: dateInput,
      id: unique_id,
      isDone: false,
    };

    console.log("deneme", priorityInput, dateInput);
    if (
   /*    priorityRef.current.value !== "Priority" &&
      inputRef.current.value !== "" &&
      dateRef.current.value !== "" */
      true
    ) {
      setNewList((prev) => [...prev, newTaskObject]);
    }
    inputRef.current.value = "";
    dateRef.current.value = "";
    priorityRef.current.value = "Priority";
  };

  const removeTaskHandler = (data) => {
    const tempList = [...newList];
    const filteredTempList = tempList.filter((item) => item.id !== data);
    setNewList([...filteredTempList]);
  };

  const checkTaskHandler = (data) => {
    const tempList = [...newList];
    const checkedItem = newList.find((item) => item.id === data);
    const checkedItemPlace = tempList.indexOf(checkedItem);
    tempList[checkedItemPlace].isDone = !tempList[checkedItemPlace].isDone;
    setNewList([...tempList]);
  };

  let renderList = [...newList];
  const showSelectedTasksHandler = (e) => {
    setSelectedTasks(e.target.textContent);
  };

  if (selectedTasks === "All") {
    renderList = [...newList];
  } else if (selectedTasks === "Done") {
    const tempList = [...newList];
    renderList = tempList.filter((item) => item.isDone === true);
  } else if (selectedTasks === "ToDo") {
    const tempList = [...newList];
    renderList = tempList.filter((item) => item.isDone === false);
  }

  return (
    <div>
      <h2 className="text-center mt-4 mb-3 fw-bold header">To Do List</h2>
      <div className="input-group d-flex flex-nowrap">
        <input
          type="text"
          className="form-control w-50"
          placeholder="New ToDo"
          ref={inputRef}
        ></input>
        <select
          type="text"
          className="form-select form-select-sm w-25"
          ref={priorityRef}
          placeholder="Priority"
        >
          <option value="Priority">Priority</option>
          <option value="Critical">Critical</option>
          <option value="Important">Important</option>
          <option value="Normal">Normal</option>
          <option value="Low">Low</option>
        </select>
        <input type="date" className="form-control w-25" ref={dateRef}></input>
        <button className="btn btn-dark btn-sm" onClick={addNewTaskHandler}>
          Add New Task
        </button>
      </div>
      <div className="d-flex justify-content-between m-5">
        <button
          className="btn bg-success btn-outline-success p-2 text-dark bg-opacity-25 w-25"
          onClick={showSelectedTasksHandler}
        >
          All
        </button>
        <button
          className="btn bg-success btn-outline-success p-2 text-dark bg-opacity-25 w-25"
          onClick={showSelectedTasksHandler}
        >
          Done
        </button>
        <button
          className="btn bg-success btn-outline-success p-2 text-dark bg-opacity-25 w-25"
          onClick={showSelectedTasksHandler}
        >
          ToDo
        </button>
      </div>

      <div className="w-100 mt-3">
        <ul className="p-0">
          {renderList.map((item, index) => (
            <li
              className="d-flex p-3 mb-3 border justify-content-between rounded"
              key={index}
            >
              <div className="d-flex w-75 justify-content-around">
                <div
                  className={
                    item.isDone === true ? "text-secondary" : "text-dark"
                  }
                >
                  {item.task}
                </div>
                <div
                  className={
                    item.isDone === true ? "text-secondary" : "text-dark"
                  }
                >
                  {item.priority}
                </div>
                <div
                  className={
                    item.isDone === true ? "text-secondary" : "text-dark"
                  }
                >
                  {item.dueDate}
                </div>
              </div>
              <div className="form-check d-flex w-25 justify-content-around">
                <button
                  className={`btn btn-sm border-4 ${
                    item.isDone ? "text-success" : "text-secondary"
                  }`}
                  onClick={() => checkTaskHandler(item.id)}
                >
                  <i
                    className={`${
                      item.isDone ? "fa fa-check-square" : "far fa-square"
                    }`}
                  />
                </button>

                <button
                  className="mx-2 text-secondary p-0 border-0 bg-transparent"
                  /*  onClick={editHandler} */
                >
                  <i className="fas fa-pen" />
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeTaskHandler(item.id)}
                >
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="d-flex justify-content-evenly w-100 position-absolute bottom-0 border border-danger h-25 ">
        <button className="btn btn-lg bg-danger btn-outline-danger p-2 text-dark bg-opacity-25 bottom-0 start-0 ">
          Delete Done Tasks
        </button>
        <button className="btn btn-lg bg-danger btn-outline-danger p-2 text-dark bg-opacity-25 bottom-0 end-0" >
          Delete All Tasks
        </button>
      </div>
    </div>
  );
};

export default ToDoList;
