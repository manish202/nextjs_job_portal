import React from "react";

const AdminLayout = ({children}: Readonly<{children: React.ReactNode}>) => {
    return (
        <div className="box">
            <h1>AdminLayout</h1>
            {children}
        </div>
    )
}

export default AdminLayout;