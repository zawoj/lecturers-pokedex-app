import { createContext, useEffect, useReducer } from "react";
import type { FC, ReactNode } from "react";
import PropTypes from "prop-types";

import { LecturerType, LecturerLevel } from "../types/lecturer";
import * as FileSystem from 'expo-file-system';
import axios from 'axios';

const API_URL = "http://192.168.9.195:8080";

interface State {
  lecturer: LecturerType | null;
  lecturersList: LecturerType[];
}

export interface LecturerContextValue extends State {
  getLecturer: (id: string) => void;
  getLecturersList: () => void;
  addLecturer: (lecturer: LecturerType) => void;
}

interface LecturerProviderProps {
  children: ReactNode;
}

enum ActionType {
  INITIALIZEPALETTE = "INITIALIZEPALETTE",
  SETLECTURER = "SETLECTURER",
  ADDLECTURER = "ADDLECTURER",
  SETLECTURERSLIST = "SETLECTURERSLIST",
}

type InitializeAction = {
  type: ActionType.INITIALIZEPALETTE;
  payload: {
    lecturer: LecturerType;
    lecturersList: LecturerType[];
  };
};

type SetLecturerAction = {
  type: ActionType.SETLECTURER;
  payload: {
    lecturer: LecturerType;
  };
};

type SetLecturersListAction = {
  type: ActionType.SETLECTURERSLIST;
  payload: {
    lecturersList: LecturerType[];
  };
};

type AddLecturerAction = {
  type: ActionType.ADDLECTURER;
  payload: {
    lecturer: LecturerType;
  };
};

type Action =
  | InitializeAction
  | SetLecturerAction
  | SetLecturersListAction
  | AddLecturerAction;

type Handler = (state: State, action: any) => State;

const initialState: State = {
  lecturer: null,
  lecturersList: [],
};

const handlers: Record<ActionType, Handler> = {
  INITIALIZEPALETTE: (state: State, action: InitializeAction): State => {
    const { lecturer, lecturersList } = action.payload;

    return {
      ...state,
      lecturer,
      lecturersList,
    };
  },
  SETLECTURER: (state: State, action: SetLecturerAction): State => {
    const { lecturer } = action.payload;

    return {
      ...state,
      lecturer,
    };
  },
  SETLECTURERSLIST: (state: State, action: SetLecturersListAction): State => {
    const { lecturersList } = action.payload;

    return {
      ...state,
      lecturersList,
    };
  },
  ADDLECTURER: (state: State, action: AddLecturerAction): State => {
    const { lecturer } = action.payload;
    const newLecturersList = state.lecturersList
      ? [...state.lecturersList, lecturer]
      : [lecturer];

    return {
      ...state,
      lecturersList: newLecturersList,
    };
  },
};

const reducer = (state: State, action: Action): State =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const LecturerContext = createContext<LecturerContextValue>({
  ...initialState,
  getLecturer: () => {},
  getLecturersList: () => {},
  addLecturer: () => {},
});

export const LecturerProvider: FC<LecturerProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async (): Promise<void> => {
      try {
        getLecturersList();
      } catch (err) {
        console.error(err);
      }
    };

    initialize();
  }, []);

  const getLecturer = (id: string): void => {
    console.log(id);
    const res = fetch(`${API_URL}/users/${id}`).then((response) =>
      response.json()
    );
    res.then((data) => {
      console.log(data);
      dispatch({
        type: ActionType.SETLECTURER,
        payload: {
          lecturer: data,
        },
      });
    });
  };

  const getLecturersList = (): void => {
    const res = fetch(`${API_URL}/users`).then((response) => response.json());

    res.then((data) => {
      dispatch({
        type: ActionType.SETLECTURERSLIST,
        payload: {
          lecturersList: data,
        },
      });
    });

    // FETCHING FROM API
  };

  const addLecturer = (lecturer: LecturerType): void => {
    console.log(lecturer.image);

    let form = new FormData();
    form.append('file', { uri: lecturer.image, name: 'media', type: `image/jpeg` } as any)
    form.append("data", JSON.stringify(lecturer));

    const options = {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
      },
  };

  axios.post(`${API_URL}/users`, form, options)
  .then((response) => {
    console.log(response);
    getLecturersList();
  })
  .catch((error) => console.log(error));


  
  };

  return (
    // @ts-ignore
    <LecturerContext.Provider
      value={{
        ...state,
        getLecturer,
        getLecturersList,
        addLecturer,
      }}
    >
      {children}
    </LecturerContext.Provider>
  );
};

LecturerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const LecturerConsumer = LecturerContext.Consumer;
