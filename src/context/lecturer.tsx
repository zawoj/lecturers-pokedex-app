import { createContext, useEffect, useReducer } from "react";
import type { FC, ReactNode } from "react";
import PropTypes from "prop-types";

import { LecturerType, LecturerLevel } from "../types/lecturer";


interface State {
  lecturer: LecturerType | null;
  lecturersList: LecturerType[];
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


// TODO: delete this and connect API
const gebala : LecturerType = {
  id: "1234",
  name: "Maciej Gębala",
  level: LecturerLevel.DOCTOR,
  image: require("../../assets/gebala_portret.jpg"),
  description: "Jak jest doktor każdy widzi",
  classes: [],
  gradeDistribution: {
    s_2: 0,
    s_3: 0,
    s_3_5: 0,
    s_4: 0,
    s_4_5: 0,
    s_5: 0,
    s_5_5: 0,
  }
}

const initialState: State = {
  lecturer: null,
  lecturersList: [gebala, gebala, gebala, gebala],
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
