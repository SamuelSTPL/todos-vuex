import axios from "axios";

const state = {
  todos: []
};

const getters = {
  allTodos: (state) => state.todos
};

const actions = {
  // Fetch a list of Todos from JSONPlaceholder
  async fetchTodos({ commit }) {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
    commit("setTodos", res.data);
  },
  //Add a todo
  async addTodo({ commit }, title) {
    const res = await axios.post("https://jsonplaceholder.typicode.com/todos", {
      title,
      completed: false
    });
    commit("newTodo", res.data);
  },
  //Delete a single todo
  async deleteTodo({ commit }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    commit("removeTodo", id);
  },
  //Filter todos based on number passed as arg
  async filterTodos({ commit }, e) {
    // Get selected number from the e argument
    const limit = parseInt(
      e.target.options[e.target.options.selectedIndex].innerText
    );
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit${limit}`
    );
    commit("setTodos", res.data);
  },
  //Toggle/ Update Todo
  async updateTodo({ commit }, updTodo) {
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${updTodo.id}`,
      updTodo
    );
    commit("updateTodo", res.data);
  }
};
// Change/ alter/ mutate the state
const mutations = {
  // Todos setter using the commit in "actions"
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) =>
    (state.todos = state.todos.filter((todo) => todo.id !== id)),
  updateTodo: (state, updTodo) => {
    const index = state.todos.findIndex((todo) => (todo.id = updTodo.id));
    if (index !== -1) {
      state.todos.splice(index, 1, updTodo);
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
