import {
    CalendarDaysIcon,
    DocumentTextIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";

export const dashboardCards = [
    {
        title: "Events Management",
        description: "Create events and review their publish status.",
        icon: CalendarDaysIcon,
        href: "/admin/events",
        actionLabel: "Open Events",
    },
    {
        title: "Team Management",
        description: "Manage team members, roles, and permissions for the admin dashboard.",
        icon: UsersIcon,
        href: "/admin/team",
        actionLabel: "Open Team",
    },
    {
        title: "Site Review",
        description: "Review the public website and latest content updates.",
        icon: DocumentTextIcon,
        href: "/",
        actionLabel: "Open Website",
    },
];