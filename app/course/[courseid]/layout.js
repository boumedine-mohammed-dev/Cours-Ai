'use client'
import { useState } from "react";
import { SelectChaptersContext } from "@/context/SelectChapters";

export default function RootLayout({ children }) {
    const [selected, setselected] = useState(0)
    return (
        <SelectChaptersContext.Provider value={{ selected, setselected }}>
            {children}
        </SelectChaptersContext.Provider>


    );
}
