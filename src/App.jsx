import React, { useContext } from 'react';
import { AuthContext } from './auth/AuthProvider.jsx';
import { NotificationProvider } from './contexts/NotificationContext.jsx';
import AppRouter from './routers/AppRouter.jsx';

const LoadingScreen = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '24px', backgroundColor: '#f9fafb' }}>
        Loading application...
    </div>
);

function App() {
    const { loading: authLoading } = useContext(AuthContext);

    // This check is the key. It prevents anything else from rendering until auth is ready.
    if (authLoading) {
        return <LoadingScreen />;
    }

    // --- THIS IS THE CORRECT STRUCTURE ---
    // Once loading is false, we render the NotificationProvider, which in turn renders the router.
    // This guarantees that NotificationProvider and useSocket only ever run when the auth state is stable.
    return (
        <NotificationProvider>
            <AppRouter />
        </NotificationProvider>
    );
}

export default App;