import { createContext, useEffect, useReducer } from "react";
import type { FC, ReactNode } from "react";
import PropTypes from "prop-types";

import { Sample } from "../types/sample";

interface State {
  currentSample: Sample;
  samples: Sample[];
}

export interface SampleContextValue extends State {
  setSample: (sample: Sample) => void;
}

interface SampleProviderProps {
  children: ReactNode;
}

enum ActionType {
  INITIALIZEPALETTE = "INITIALIZEPALETTE",
  SETPALETTE = "SETPALETTE",
}

type InitializeAction = {
  type: ActionType.INITIALIZEPALETTE;
  payload: {
    currentSample: Sample;
    samples: Sample[];
  };
};

type SetSampleAction = {
  type: ActionType.SETPALETTE;
  payload: {
    currentSample: Sample;
  };
};

type Action = InitializeAction | SetSampleAction;

type Handler = (state: State, action: any) => State;

const initialState: State = {
  currentSample: {
    id: "",
  },
  samples: [
    {
      id: "1",
    },
  ],
};

const handlers: Record<ActionType, Handler> = {
  INITIALIZEPALETTE: (state: State, action: InitializeAction): State => {
    const { currentSample, samples } = action.payload;

    return {
      ...state,
      currentSample,
      samples,
    };
  },
  SETPALETTE: (state: State, action: SetSampleAction): State => {
    const { currentSample } = action.payload;

    return {
      ...state,
      currentSample,
    };
  },
};

const reducer = (state: State, action: Action): State =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const SampleContext = createContext<SampleContextValue>({
  ...initialState,
  setSample: () => {},
});

export const SampleProvider: FC<SampleProviderProps> = (props) => {
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

  const setSample = async (sample: Sample): Promise<void> => {
    try {
      // await authApi.setSample(sample);
      dispatch({
        type: ActionType.SETPALETTE,
        payload: {
          currentSample: sample,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SampleContext.Provider
      value={{
        ...state,
        setSample,
      }}
    >
      {children}
    </SampleContext.Provider>
  );
};

SampleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const SampleConsumer = SampleContext.Consumer;
