import React, { useEffect, useState } from 'react'
import './Nav.css'
function Nav() {
    const [show, handleSow] = useState(false)
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleSow(true);
            } else {
                handleSow(false);
            }
        });
        return () => {
            window.removeEventListener("scroll")
        }
    }, [])

    return (
        <div className={`nav ${show && "nav_black"}`}>
            <img
                className="nav_logo"
                src="netflix.png" alt="Netflix Logo" />

            <img
                className="nav_avathar"
                src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png" alt="" />
        </div>
    )
}

export default Nav
