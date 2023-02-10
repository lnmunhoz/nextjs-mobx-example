import {action, makeObservable, observable} from "mobx";
import {enableStaticRendering} from "mobx-react";
import {createContext, useContext} from "react";

enableStaticRendering(typeof window === "undefined");

export class Store {
  todos = []

  constructor() {
    makeObservable(this, {
      todos: observable,
      addTodo: action
    })
  }

  hydrate = (data) => {
    if (!data) return;

    if ('todos' in data) {
      this.todos = data.todos
    }
  };


  addTodo = () => {
    this.todos.push('Todo from client')
  }

}

// init a client store that we will send to client (one store for client)
let clientStore

export const initStore = (initData): Store => {
// check if we already declare store (client Store), otherwise create one
  const store = clientStore ?? new Store();
// hydrate to store if receive initial data
  if (initData) store.hydrate(initData)

// Create a store on every server request
  if (typeof window === "undefined") return store
// Otherwise it's client, remember this store and return
  if (!clientStore) clientStore = store;
  return store
}

export const MobxContext = createContext<Store>({
  todos: [],
  hydrate: () => console.log('noop')
});


// Hook for using store
export function useStore() {
  return useContext(MobxContext)
}