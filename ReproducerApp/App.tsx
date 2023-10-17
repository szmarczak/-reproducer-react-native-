import React from 'react';
import {Text} from 'react-native';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let visible = false;

const X = () => {
  const [_, forceUpdate] = React.useReducer(() => Symbol(), Symbol());

  React.useLayoutEffect(() => {
    (console.log)('layout effect');

    return () => {
      (console.log)('cleanup');
    };
  }, []);

  if (!visible) {
    visible = true;
    throw (async () => {
      await sleep(1000);
    })();
  } else {
    setTimeout(() => {
      visible = false;
      forceUpdate();
    }, 1000);
  }

  return <Text>Hello, world!</Text>;
};

export default function App() {
  return (
    <React.Suspense>
      <X />
    </React.Suspense>
  );
}
