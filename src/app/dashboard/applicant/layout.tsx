import React from "react";

const ApplicantLayout = ({children}: Readonly<{children: React.ReactNode}>) => {
    return (
        <div className="box">
            <h1>ApplicantLayout</h1>
            {children}
        </div>
    )
}

export default ApplicantLayout;