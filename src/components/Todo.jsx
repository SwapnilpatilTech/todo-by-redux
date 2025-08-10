import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  changeStatus,
  deleteTodo,
  updateTodo,
} from "../features/todo";
import Modal from "./Modal";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [modalInfo, setModalInfo] = useState(null);
  const [done, setDone] = useState(false);

  const { light, toggleTheme, view, toggleView } = useContext(AppContext);
  const todos = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  // Persiting Todo.
  useEffect(() => {
    localStorage.setItem("redux-todo", JSON.stringify(todos));
  }, [todos]);

  // Add Todo.
  const handleAdd = () => {
    if (title.trim() !== "") {
      dispatch(addTodo(title));
    }
    setTitle("");
  };

  // Event Listener.
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && title.trim() !== "") {
        dispatch(addTodo(title));
        setTitle("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [title, dispatch]);

  // Main UI.
  return (
    <section
      className={`w-10 sm:w-sm md:w-md lg:w-lg rounded-xl ${
        light ? "bg-amber-200 shadow-white shadow-sm" : "bg-black-200 "
      } h-150 md:h-200 p-5 transition-all duration-200 ease-in-out`}
    >
      {/* Title & Theme Toggle */}
      <section className="flex items-center justify-between">
        <p
          className={`font-bold text-4xl ${
            !light ? "text-black" : "text-neutral-600"
          } transition-all duration-200 ease-in-out`}
        >
          Todo Task list
        </p>

        {/* Theme Toggle */}
        <div>
          {/*  */}
        </div>
      </section>

      {/* Headline */}
      <p
        className={`italic text-sm mt-4 ${
          !light ? "text-neutral-700" : "text-neutral-600"
        } transition-all duration-200 ease-in-out`}
      >
      
      </p>
      <hr className="opacity-30 mt-3" />

      {/* Input Section */}
      <section className="flex items-center gap-5">
        {/* Input */}
        <input
          type="text"
          value={title}
          placeholder="today's task."
          className={`border border-neutral-500 mt-5 p-2 rounded-md outline-0 ${
            light
              ? "focus:ring-2 focus:ring-amber-400"
              : "focus:ring-2 focus:ring-blue-400"
          } flex-1 text-sm md:text-md transition-all duration-200 ease-in-out`}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Fire Button */}
        <button
          onClick={handleAdd}
          className={`flex items-center justify-center mt-5 h-12 w-12 rounded-full p-2 cursor-pointer font-bold text-[20px] ${
            light
              ? "bg-amber-500 shadow-md text-neutral-700 hover:bg-amber-700 hover:text-white"
              : "bg-white shadow-lg hover:bg-neutral-600 hover:text-white"
          } transition-all duration-300 ease-in-out`}
          title="Add Todo"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="icon icon-tabler icons-tabler-filled icon-tabler-circle-plus"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4.929 4.929a10 10 0 1 1 14.141 14.141a10 10 0 0 1 -14.14 -14.14zm8.071 4.071a1 1 0 1 0 -2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0 -2h-2v-2z" />
          </svg>
        </button>
      </section>

      {/* List Section */}
      <section>
        {todos.length === 0 ? (
          <p className="mt-5 font-bold light text-neutral-500 text-center text-sm select-none">
           
          </p>
        ) : (
          <section className="max-h-[580px] overflow-y-auto overflow-x-hidden mt-4 rounded-md scrollbar-thin pr-1">
            <ul className="space-y-4 list-none m-0 p-0">
              {[...todos]
                .sort((a, b) => a.status - b.status)
                .map((todo) => (
                  <li
                    key={todo.id}
                    className={`p-4 flex items-center gap-5 rounded-md transition-all duration-500 ease-in-out ${
                      light
                        ? "bg-neutral-600 text-white shadow-neutral-600 shadow-sm"
                        : "bg-white shadow-md"
                    } overflow-hidden text-ellipsis h-20
                ${todo.status ? "opacity-70" : "opacity-100"} 
                ${editingId === todo.id ? "pointer-events-none" : ""}
              `}
                  >
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={todo.status}
                      onChange={() => {
                        dispatch(changeStatus(todo.id));
                      }}
                      className={`appearance-none w-5 h-5 border-2 border-gray-300 rounded-full
                  transition-all duration-200 cursor-pointer focus:outline-none
                  ${
                    !light
                      ? `checked:bg-blue-500 checked:border-blue-500 focus:ring-2 focus:ring-blue-500`
                      : `checked:bg-amber-500 checked:border-amber-500 focus:ring-2 focus:ring-amber-500`
                  }`}
                    />

                    {/* Todo Text */}
                    <div
                      className={
                        editingId === todo.id
                          ? "pointer-events-none flex-1"
                          : "flex-1"
                      }
                    >
                      {editingId === todo.id ? (
                        <input
                          type="text"
                          value={editTitle}
                          placeholder="Type and click tick to save"
                          onChange={(e) => setEditTitle(e.target.value)}
                          className={`border px-2 py-1 rounded text-black w-23 sm:w-40 md:w-50 lg:w-65 placeholder:text-sm ${
                            light
                              ? "focus:ring-2 focus:ring-amber-400 outline-0 text-white"
                              : "focus:ring-2 focus:ring-blue-400 outline-0"
                          } pointer-events-auto`}
                          autoFocus
                        />
                      ) : (
                        <p
                          className={`truncate max-w-[65px] sm-max-w-[50px] md:max-w-[150px] lg:max-w-[200px]  transition-all duration-500 ${
                            todo.status ? "line-through text-gray-400" : ""
                          }`}
                        >
                          {todo.title}
                        </p>
                      )}
                    </div>

                    {/* Buttons */}
                    <section className="flex items-center gap-2 pointer-events-auto">
                      {/* View Btn */}
                      <button
                        className="h-6 w-6 md:h-8 md:w-8 bg-amber-500 rounded-full flex items-center justify-center cursor-pointer transform transition-transform duration-200 ease-in-out hover:scale-110 hover:bg-amber-600"
                        title="View"
                        onClick={() => {
                          setModalInfo(todo);
                          toggleView();
                        }}
                      >
                        {/* Eye Icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-[17px] h-[17px] md:w-[20px] md:h-[20px]"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 4c4.29 0 7.863 2.429 10.665 7.154l.22 .379l.045 .1l.03 .083l.014 .055l.014 .082l.011 .1v.11l-.014 .111a.992 .992 0 0 1 -.026 .11l-.039 .108l-.036 .075l-.016 .03c-2.764 4.836 -6.3 7.38 -10.555 7.499l-.313 .004c-4.396 0 -8.037 -2.549 -10.868 -7.504a1 1 0 0 1 0 -.992c2.831 -4.955 6.472 -7.504 10.868 -7.504zm0 5a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" />
                        </svg>
                      </button>

                      {/* Edit / Save Btn */}
                      <button
                        className="h-6 w-6 md:h-8 md:w-8 bg-emerald-500 rounded-full flex items-center justify-center cursor-pointer transform transition-transform duration-200 ease-in-out hover:scale-110 hover:bg-emerald-600"
                        title={editingId === todo.id ? "Save" : "Edit"}
                        onClick={() => {
                          if (editingId === todo.id) {
                            // Save
                            if (editTitle.trim() !== "") {
                              dispatch(
                                updateTodo({ id: todo.id, title: editTitle })
                              );
                            }
                            setEditingId(null);
                          } else {
                            // Enter Edit Mode
                            setEditingId(todo.id);
                            setEditTitle(todo.title);
                          }
                        }}
                      >
                        {editingId === todo.id ? (
                          // Tick Icon
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-[17px] h-[17px] md:w-[20px] md:h-[20px]"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l5 5l10 -10" />
                          </svg>
                        ) : (
                          // Edit Icon
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-[17px] h-[17px] md:w-[20px] md:h-[20px]"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                            <path d="M13.5 6.5l4 4" />
                          </svg>
                        )}
                      </button>

                      {/* Delete Btn */}
                      <button
                        className="h-6 w-6 md:h-8 md:w-8 bg-red-500 rounded-full flex items-center justify-center cursor-pointer transform transition-transform duration-200 ease-in-out hover:scale-110 hover:bg-red-600"
                        title="Delete"
                        onClick={() => {
                          dispatch(deleteTodo(todo.id));
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-[17px] h-[17px] md:w-[20px] md:h-[20px]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M4 7h16" />
                          <path d="M10 11v6" />
                          <path d="M14 11v6" />
                          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                          <path d="M9 7V4a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        </svg>
                      </button>
                    </section>
                  </li>
                ))}
            </ul>
          </section>
        )}

        {/* View Modal */}
        <section
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 ${
            view ? "block visible" : "hidden invisible"
          }`}
        >
          <Modal todo={modalInfo} />
        </section>
      </section>
    </section>
  );
};

export default Todo;
