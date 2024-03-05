"use client"
import { store } from './store';
import { Provider } from 'react-redux';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/lib/integration/react';

export function ReduxStore({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistStore(store)}>
                {children}
            </PersistGate>
        </Provider>
    );
}
