import { createContext, useEffect, useReducer } from "react";
import type { FC, ReactNode } from "react";
import PropTypes from "prop-types";

import { LecturerType } from "../types/lecturer";
import * as ImageManipulator from "expo-image-manipulator";
import { Image, ToastAndroid } from "react-native";

import axios from 'axios';

export const API_URL = "https://pokedex-uijzr7bcfa-ew.a.run.app";

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
  getLecturer: () => { },
  getLecturersList: () => { },
  addLecturer: () => { },
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

    // Helper function to get image size as a promise
    const getImageSize = (uri: string): Promise<{ width: number, height: number }> => {
      return new Promise((resolve, reject) => {
        Image.getSize(uri,
          (width, height) => resolve({ width, height }),
          error => reject(error)
        );
      });
    };

    const processImage = async () => {
      try {
        const { width, height } = await getImageSize(lecturer.image);

        // Check which is larger
        let newSize;
        if (width >= height) {
          newSize = { width: 500 };
        } else {
          newSize = { height: 500 };
        }

        // Resize image
        const manipResult = await ImageManipulator.manipulateAsync(
          lecturer.image,
          [{ resize: newSize }], // This will resize to a maximum width or height of 500px depending on which is larger
          { compress: 1, format: ImageManipulator.SaveFormat.JPEG } // 1 is maximum quality
        );

        return manipResult.uri;

      } catch (error) {
        console.log(error);
        ToastAndroid.show("error while processing image", ToastAndroid.SHORT)
        return null;
      }
    };

    processImage().then(manipulatedUri => {
      let form = new FormData();
      form.append('file', { uri: manipulatedUri, name: 'media', type: `image/jpeg` } as any)
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
        .catch((error) => {
          console.log(error);
          ToastAndroid.show("Couldn't add new lecturer", ToastAndroid.SHORT)
        });
    })


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
