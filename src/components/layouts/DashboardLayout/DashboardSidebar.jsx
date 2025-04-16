import { Link, useLocation } from 'react-router-dom';
import { useUserStore } from '@/stores/user.store';
import { useAuthStore } from '@/stores/auth.store';
import { 
  Home, 
  Users, 
  Settings, 
  BarChart2, 
  FileText, 
  LogOut,
  X,
  User,
  ShieldCheck
} from 'lucide-react';

const DashboardSidebar = ({ isOpen, setIsOpen, isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
  const user = useUserStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
  };

  // Navigation links data structure with categories
  const navLinks = [
    {
      category: "Main",
      links: [
        { 
          path: '/dashboard', 
          name: 'Dashboard', 
          icon: <Home className="w-5 h-5" />, 
          adminOnly: false 
        },
        { 
          path: '/profile', 
          name: 'Profile', 
          icon: <User className="w-5 h-5" />, 
          adminOnly: false 
        }
      ]
    },
    {
      category: "Management",
      links: [
        { 
          path: '/reports', 
          name: 'Reports', 
          icon: <FileText className="w-5 h-5" />, 
          adminOnly: false 
        },
        { 
          path: '/users', 
          name: 'Users', 
          icon: <Users className="w-5 h-5" />, 
          adminOnly: true 
        },
        { 
          path: '/analytics', 
          name: 'Analytics', 
          icon: <BarChart2 className="w-5 h-5" />, 
          adminOnly: true 
        }
      ]
    },
    {
      category: "Preferences",
      links: [
        { 
          path: '/settings', 
          name: 'Settings', 
          icon: <Settings className="w-5 h-5" />, 
          adminOnly: false 
        }
      ]
    }
  ];

  if (!user) {
    return null;
  }
  
  // CSS classes based on sidebar state
  const sidebarWidth = isCollapsed ? 'w-20' : 'w-64';
  const sidebarClasses = `
    fixed inset-y-0 left-0 z-40 bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 ease-in-out shadow-xl
    ${sidebarWidth}
    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
  `;
  
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={sidebarClasses}>
        <div className="h-full flex flex-col">
          {/* App Logo & Close Button */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            {!isCollapsed && (
              <div className="flex items-center">
                <div className="h-8 w-8 rounded bg-blue-500 flex items-center justify-center mr-2">
                  <span className="font-bold text-white">A</span>
                </div>
                <h1 className="text-xl font-bold text-white">AppName</h1>
              </div>
            )}
            {isCollapsed && (
              <div className="mx-auto h-8 w-8 rounded bg-blue-500 flex items-center justify-center">
                <span className="font-bold text-white">A</span>
              </div>
            )}
            
            {/* Mobile close button */}
            {!isCollapsed && (
              <button 
                onClick={() => setIsOpen(false)}
                className="lg:hidden p-1 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {/* User Profile Section */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-center mb-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-xl font-bold shadow-md">
                {user.name.charAt(0)}
              </div>
            </div>
            {!isCollapsed && (
              <div className="text-center">
                <h3 className="font-bold text-lg truncate">{user.name}</h3>
                <div className="flex items-center justify-center mt-1 text-sm">
                  <ShieldCheck className="w-4 h-4 text-green-400 mr-1" />
                  <span className="text-gray-300">
                    {user.role === 'admin' ? 'Administrator' : 'User'}
                  </span>
                </div>
                {user.isVerified && (
                  <span className="inline-block mt-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                    Verified
                  </span>
                )}
              </div>
            )}
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {navLinks.map((category, categoryIndex) => {
              // Filter out admin-only links for non-admin users
              const filteredLinks = category.links.filter(link => 
                !link.adminOnly || user.role === 'admin'
              );
              
              // Skip empty categories
              if (filteredLinks.length === 0) return null;
              
              return (
                <div key={categoryIndex} className="mb-6">
                  {!isCollapsed && (
                    <h3 className="px-4 mb-2 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                      {category.category}
                    </h3>
                  )}
                  <ul className="space-y-1">
                    {filteredLinks.map((link) => {
                      const isActive = location.pathname === link.path;
                      
                      return (
                        <li key={link.path}>
                          <Link
                            to={link.path}
                            className={`
                              flex items-center px-3 py-2.5 rounded-lg transition-all
                              ${isCollapsed ? 'justify-center' : ''}
                              ${isActive 
                                ? 'bg-blue-600 text-white shadow-md' 
                                : 'text-gray-300 hover:bg-gray-700'}
                            `}
                            onClick={() => setIsOpen(false)}
                            title={isCollapsed ? link.name : ''}
                          >
                            <span className={`${isCollapsed ? '' : 'mr-3'}`}>{link.icon}</span>
                            {!isCollapsed && (
                              <>
                                <span className="text-sm">{link.name}</span>
                                {link.adminOnly && (
                                  <span className="ml-auto bg-gray-700 text-xs px-1.5 py-0.5 rounded">
                                    Admin
                                  </span>
                                )}
                              </>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </nav>
          
          {/* Logout Button */}
          <div className="p-4 border-t border-gray-700">
            <button
              onClick={handleLogout}
              className={`
                flex items-center text-sm text-gray-300 hover:bg-gray-700 rounded-lg transition-colors
                ${isCollapsed ? 'justify-center p-3' : 'px-3 py-2.5 w-full'}
              `}
              title={isCollapsed ? 'Logout' : ''}
            >
              <LogOut className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3">Logout</span>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;