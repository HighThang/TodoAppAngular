import { ETodoStatus } from "./components/todo-header/todo-header.enum";

export interface Todo {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: ETodoStatus;
}

export interface TodoFilter {
  status: ETodoStatus;
  searchText: string;
}