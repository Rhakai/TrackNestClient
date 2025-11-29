'use client'; 

import React from 'react';
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();

    // Define your menu items
    const items: MenuItem[] = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => { router.push('/') } // Navigate to Home
        },
        {
            label: 'Dashboard',
            icon: 'pi pi-dashboard',
            command: () => { router.push('/dashboard') } // Navigate to Home
        },
        {
            label: 'Portfolio',
            icon: 'pi pi-briefcase',
            command: () => { router.push('/portfolio') } // Navigate to Portfolio page
        },
        {
            label: 'Transactions',
            icon: 'pi pi-list',
            command: () => { router.push('/transactions') }
        },
        {
            label: 'Reports',
            icon: 'pi pi-chart-line',
            items: [ // Submenu example
                {
                    label: 'Gains/Losses',
                    icon: 'pi pi-dollar'
                },
                {
                    label: 'Dividends',
                    icon: 'pi pi-wallet'
                }
            ]
        }
    ];

    // Optional: Content for the left side (Logo)
    const start = (
        <div className="flex align-items-center mr-4">
            <span className="font-bold text-xl text-primary">Track Nest</span>
        </div>
    );

    // Optional: Content for the right side (User Profile/Logout)
    const end = (
        <div className="flex align-items-center gap-2">
            <i className="pi pi-user p-2 border-circle surface-200"></i>
        </div>
    );

    return (
        <div className="card">
            <Menubar model={items} start={start} end={end} />
        </div>
    );
}