/**
* Created on 01/09/19.
* Author : Swapnil Patil
* Details : Passing context to all components.
*/

import React from "react";
import configureStore from "./Store";

const store = configureStore();

export default React.createContext({ store: store, storeState: store.getState() });
