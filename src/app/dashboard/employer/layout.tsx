import React from "react";

const EmployerLayout = ({children}: Readonly<{children: React.ReactNode}>) => {
    return (
        <div className="box">
            <h1>EmployerLayout</h1>
            {children}
        </div>
    )
}

export default EmployerLayout;