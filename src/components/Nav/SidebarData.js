import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [{
        title: 'Dashboard',
        path: '/dashboard',
        icon: < AiIcons.AiFillHome / > ,
        cName: 'nav-text'
    },
    {
        title: 'Trades',
        path: '/trades',
        icon: < AiIcons.AiFillSignal / > ,
        cName: 'nav-text'
    }

];