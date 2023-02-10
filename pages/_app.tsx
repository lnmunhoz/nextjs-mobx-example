import {initStore, MobxContext} from "../lib/store";


const MyApp = (props) => {
  const {Component, pageProps, err} = props;
  const store = initStore(pageProps.initialState);

  return (
    <MobxContext.Provider value={store}>
      <Component {...pageProps} err={err}/>
    </MobxContext.Provider>
  );
};

export default MyApp;
