import { Alert as BaseAlert } from '@chakra-ui/react';
import { useSetState } from 'react-use';
import { createContainer } from 'react-tracked';
import { useEffect, useRef } from 'react';

interface State {
  active: boolean;
  message: string;
  status: 'success' | 'error';
}

const initialState: State = {
  active: false,
  message: '',
  status: 'success',
};

const useMyState = () => useSetState<State>(initialState);

export const { Provider: AlertProvider, useTracked: useAlert } = createContainer(useMyState);

export function Alert() {
  const [state, setState] = useAlert();
  const timer = useRef<any>();

  useEffect(() => {
    if (state.active && !timer.current) {
      timer.current = setTimeout(() => {
        setState(initialState);
      }, 5_000);
    }
    return () => {
      clearTimeout(timer.current);
      timer.current = undefined;
    };
  }, [state.active]);

  return (
    state.active && (
      <BaseAlert
        variant="solid"
        maxWidth="400px"
        position="fixed"
        bottom="24px"
        right="24px"
        status={state.status}
      >
        {state.message}
      </BaseAlert>
    )
  );
}
