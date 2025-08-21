import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NavItems, ROUTES } from '@/constants/Routes';
import { useUserStore } from '@/store/useUserStore';
import { Link, useNavigate } from '@tanstack/react-router';
import { ChevronDown, LogOut, UserCog2 } from 'lucide-react';

export default function Header() {
   const { email, role } = useUserStore();
   const location = { pathname: '/' };
   const navigate = useNavigate();

   const handleLogout = () => {
      navigate({ to: ROUTES.LOGIN });
      localStorage.clear();
      window.location.reload();
   };

   if (!email) {
      return null;
   }

   return (
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
         <div className="container mx-auto flex items-center justify-between px-6 py-2">
            <Link to="/" className="flex items-center space-x-2">
               <img src="/images/hotel.png" alt="Hotel Booking" className="size-12" />
               <span className="font-bold text-xl text-gray-900 tracking-wide">Hotel Booking</span>
            </Link>

            <ul className="hidden md:flex nav-links space-x-8 font-medium">
               {NavItems.map(item => {
                  const isActive =
                     (item.path === '/' && location.pathname === '/') ||
                     (item.path !== '/' && location.pathname.startsWith(item.path));
                  return (
                     <li key={item.path}>
                        <Link
                           to={item.path}
                           className={`relative transition-colors duration-200
                                       ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}
                                   `}
                        >
                           {item.label}
                           <span
                              className={`absolute left-0 -bottom-1 h-[2px] bg-blue-600 transition-all duration-300
                                          ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}
                                      `}
                           />
                        </Link>
                     </li>
                  );
               })}
            </ul>

            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-auto px-2">
                     <div className="flex items-center gap-2">
                        <Avatar className="size-8">
                           <AvatarImage src="/images/avatar.png" alt="@johndoe" />
                           <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="text-left hidden sm:block">
                           <p className="font-semibold capitalize text-gray-900">{email}</p>
                           <p className="text-sm text-gray-500 capitalize">{role}</p>
                        </div>
                        <ChevronDown className="ml-1 size-4 text-gray-500 transition-transform duration-200" />
                     </div>
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem onClick={() => {}} className="cursor-pointer">
                     <UserCog2 className="mr-2 size-4" />
                     <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                     <LogOut className="mr-2 size-4" />
                     <span>Log out</span>
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
      </header>
   );
}
