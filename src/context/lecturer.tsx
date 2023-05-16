import { createContext, useEffect, useReducer } from "react";
import type { FC, ReactNode } from "react";
import PropTypes from "prop-types";

import { LecturerType } from "../types/lecturer";

interface State {
  lecturer: LecturerType | null;
  lecturersList: LecturerType[] | null;
}

export interface LecturerContextValue extends State {
  setLecturer: (lecturer: LecturerType) => void;
  setLecturersList: (lecturers: LecturerType[]) => void;
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
  lecturersList: null,
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
  setLecturer: () => {},
  setLecturersList: () => {},
  addLecturer: () => {},
});

export const LecturerProvider: FC<LecturerProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async (): Promise<void> => {
      try {
        // const getSamples = await authApi.getSamples();
        // const currentSample = await authApi.getSample();
        // dispatch({
        //   type: ActionType.INITIALIZEPALETTE,
        //   payload: {
        //     currentSample,
        //     samples: getSamples,
        //   },
        // });
      } catch (err) {
        console.error(err);
      }
    };

    initialize();
  }, []);

  const setLecturer = (lecturer: LecturerType): void => {
    // FETCHING FROM API
    dispatch({
      type: ActionType.SETLECTURER,
      payload: {
        lecturer,
      },
    });
  };

  const setLecturersList = (lecturersList: LecturerType[]): void => {
    // FETCHING FROM API
    dispatch({
      type: ActionType.SETLECTURERSLIST,
      payload: {
        lecturersList,
      },
    });
  };

  const addLecturer = (lecturer: LecturerType): void => {
    // FETCHING FROM API
    dispatch({
      type: ActionType.ADDLECTURER,
      payload: {
        lecturer,
      },
    });
  };

  return (
    // @ts-ignore
    <LecturerContext.Provider
      value={{
        ...state,
        setLecturer,
        setLecturersList,
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
