import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import { authRouters, publicRouters } from "../routes";
import { Context } from "../index";

const AppRouter = () => {
    const { user } = useContext(Context);
    return (
        <Routes>

            {user.isAuth && user.User.role === "ADMIN" && authRouters.map(({ path, Component }) => {
                return <Route key={path} path={path} element={<Component />} exact />
            })}
            {user.isAuth && user.User.role === "MANAGER" && authRouters.map(({ path, Component }) => {
                return <Route key={path} path={path} element={<Component />} exact />
            })}
            {publicRouters.map(({ path, Component }) => {
                return <Route key={path} path={path} element={<Component />} exact />
            })}
        </Routes>
    );
};

export default AppRouter;
