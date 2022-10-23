import React from 'react';
import {ChevronRightIcon} from "@heroicons/react/24/solid";

const BreadCrumb = ({ title }) => {

    return (
        <div className="flex items-center mt-10 mx-4 text-[#a98cf1] font-semibold text-base">
            Database Services
            <ChevronRightIcon className="h-4 w-4 mx-3"/>
            {title}
        </div>
    );
};

export default BreadCrumb;
