import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

interface BreadcrumbNavProps {
  items?: BreadcrumbItem[];
}

export default function BreadcrumbNav({ 
  items = []
}: BreadcrumbNavProps) {
  const location = useLocation();
  
  // Generate breadcrumbs based on current path if no items provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', path: '/', icon: <Home className="h-4 w-4" /> }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Handle special cases
      if (segment === 'eips') {
        breadcrumbs.push({ label: 'EIPs', path: currentPath });
      } else if (segment === 'projects') {
        breadcrumbs.push({ label: 'Projects', path: currentPath });
      } else if (segment === 'analytics') {
        breadcrumbs.push({ label: 'Analytics', path: currentPath });
      } else if (segment === 'search') {
        breadcrumbs.push({ label: 'Search', path: currentPath });
      } else if (segment === 'eip' && pathSegments[index + 1]) {
        // This is an EIP detail page
        const eipNumber = pathSegments[index + 1];
        breadcrumbs.push({ 
          label: `EIP-${eipNumber}`, 
          path: currentPath + `/${eipNumber}` 
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = items.length > 0 ? items : generateBreadcrumbs();

  return (
    <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
      <div className="flex items-center gap-2">
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center gap-2 transition-colors duration-200 ${
                index === breadcrumbs.length - 1
                  ? 'text-white font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
            {index < breadcrumbs.length - 1 && (
              <ChevronRight className="h-4 w-4 text-slate-600" />
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
}
