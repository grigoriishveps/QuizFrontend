import React from 'react';
import { Link } from 'react-router-dom'

export default function NavMenu(){
    // классы CSS для для всех ссылок для повышения читабельности кода
    const forLink = "py-2 d-none d-md-inline-block"

    return (
        <nav className="site-header sticky-top py-1">
            <div className="container d-flex flex-column flex-md-row justify-content-between">
                <Link to="/" className="py-2" href="#" aria-label="Product">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                         stroke="currentColor"
                         className="d-block mx-auto" role="img" viewBox="0 0 24 24" focusable="false">
                        <title>Product</title>
                        <circle cx="12" cy="12" r="10"></circle>
                        <path
                            d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"></path>
                    </svg>
                </Link>

                <Link to="/" className={forLink} >Задачи</Link>
                <Link to="/new" className={forLink}> Новый Quiz </Link>
                <Link to="/history" className={forLink}> История </Link>
                <Link to="/auth" className={forLink}> Enterprise </Link>

                <Link to="/auth" className={forLink}> Support </Link>
                <Link to="/auth" className={forLink}> Pricing </Link>
                <Link to="/auth" className={forLink} >Cart </Link>
            </div>
        </nav>
    );
}