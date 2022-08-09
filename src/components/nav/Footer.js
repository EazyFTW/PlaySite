import { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Footer extends Component {

    render() {
        const currentYear = new Date().getFullYear();

        return (
            <div className="mx-4 xxl:mx-0 text-black dark:text-white">
                <div className="font-lufga text-center py-2">
                    &copy; {currentYear === 2022 ? currentYear : `2022 - ${currentYear}`} <NavLink to="/">PlayCover</NavLink>. All rights reserved.
                </div>
            </div>
        )
    }
}