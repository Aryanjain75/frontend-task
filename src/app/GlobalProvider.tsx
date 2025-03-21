"use client";
import React, { ReactNode } from "react";

import { Provider } from 'react-redux';
import store from '../Redux/store';


const GlobalProvider = ({children}: {children: ReactNode}) => {
  return (
    <>
            <Provider store={store}>
                {children}
      </Provider>

    </>
  );
};

export default GlobalProvider;
