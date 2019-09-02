/**
* Created on 01/09/19.
* Author : Swapnil Patil
* Details : HOC for component to connect Redux with component.
*/

import React, { useContext } from "react";

import { Provider } from "react-redux";

import ReduxContext from "../redux/Context";

const withReduxStore = WrappedComponent => (props) => {
    const { store, storeState } = useContext(ReduxContext);
    return (
        <Provider store={store} storeState={storeState}>
            <WrappedComponent {...props} />
        </Provider>
    )
}

export default withReduxStore;