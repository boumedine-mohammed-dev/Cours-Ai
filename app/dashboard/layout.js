import React from 'react'
import DashpoardProvider from './Provider'
export default function layout({ children }) {
    return (
        <DashpoardProvider>
            {children}
        </DashpoardProvider>
    )
}


