import { Component } from 'react';

import { ChevronDownIcon, LinkIcon } from '@heroicons/react/outline';
import { NavLink } from 'react-router-dom';

import clsx from 'clsx';

import PropTypes from 'prop-types';

export default class Collapse extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: props.defaultOpen || false
        };
    }

    toggle = () => {
        this.setState({
            open: !this.state.open
        });
    }

    render() {
        const { open } = this.state;
        const { id, title, dropdown } = this.props;

        return (
            <div className="flex flex-col justify-center w-full" id={id}>
                <div className={clsx(open ? "rounded-t-xl" : "rounded-xl", "flex items-center justify-between py-3.5 px-6 font-itcavantgardestdmd bg-gray-500/5 dark:bg-gray-400/10 w-full cursor-pointer")} onClick={this.toggle}>
                    <div className="flex items-center space-x-2 lg:text-lg">
                        <NavLink to={`#${id}`} onClick={(e) => e.stopPropagation()}>
                            <LinkIcon className="w-4 h-4"/>
                        </NavLink>
                        <div>{title}</div>
                    </div>
                    <div className="flex items-center space-x-1">
                        <ChevronDownIcon className={clsx(open && "duration-300", !open && "rotate-90 ", "w-5 h-5 duration-300")}/>
                    </div>
                </div>
                {open && (
                    <div className="py-5 rounded-b-xl bg-gray-900/5 dark:bg-gray-300/5">
                        <div className="mx-5 font-itcavantgardestdmd font-medium text-gray-800 dark:text-gray-200 text-[14px] md:text-base space-y-2">
                            <div>{dropdown}</div>
                        </div>
                </div>
                )}
            </div>
        );
    }
}

Collapse.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    defaultOpen: PropTypes.bool,
    dropdown: PropTypes.any.isRequired
}