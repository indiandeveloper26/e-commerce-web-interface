// "use client";

// import { Provider } from "react-redux";
// import { store } from "./store";



// export default function ProviderWrapper({ children }) {
//     return <Provider store={store}>{children}</Provider>;
// }








"use client";

import { Provider, useDispatch } from "react-redux";

import { useEffect, useState } from "react";

import { store } from "./store";
import { setUserFromStorage } from "./authslice";

export default function ProviderLayout({ children }) {
    return (
        <Provider store={store}>
            <Hydrate>{children}</Hydrate>
        </Provider>
    );
}

function Hydrate({ children }) {
    const dispatch = useDispatch();
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const user = localStorage.getItem("user");
            if (user) {
                dispatch(setUserFromStorage(JSON.parse(user)));
            }
            setHydrated(true);
        }
    }, [dispatch]);

    if (!hydrated) return null; // SSR mismatch avoid

    return children;
}
