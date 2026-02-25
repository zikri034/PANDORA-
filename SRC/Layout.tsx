import { Outlet, NavLink } from "react-router";
import { Home, Calendar, History, Settings, User, LogIn } from "lucide-react";
import { Toaster } from "sonner";
import { useAuth } from "../context/AuthContext";
import { AuthGuard } from "./AuthGuard";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router";

export default function Layout() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const getMembershipColor = (tier?: string) => {
    switch (tier) {
      case "vip":
        return "bg-gradient-to-r from-purple-500 to-pink-500";
      case "premium":
        return "bg-gradient-to-r from-blue-500 to-cyan-500";
      default:
        return "bg-slate-500";
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">PS Rent Pro</h1>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-full">
                <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-slate-200 dark:ring-slate-700 hover:ring-blue-500 transition-all">
                  <AvatarImage src={profile?.avatar || undefined} />
                  <AvatarFallback className={getMembershipColor(profile?.membershipTier)}>
                    <span className="text-white font-bold text-sm">
                      {profile?.name?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{profile?.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{profile?.email}</p>
                    <Badge variant="secondary" className="w-fit text-xs mt-1">
                      {profile?.membershipTier?.toUpperCase() || "FREE"}
                    </Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/my-rentals")}>
                  <History className="mr-2 h-4 w-4" />
                  My Rentals
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600 dark:text-red-400">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <LogIn size={16} />
              Sign In
            </button>
          )}
        </div>
      </header>

      <main id="main-content" className="flex-1 pb-20 overflow-auto focus:outline-none" tabIndex={-1}>
        <div className="max-w-md mx-auto p-4">
          <Outlet />
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-6 py-2 pb-safe flex justify-between items-center z-10" aria-label="Main Navigation">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg p-1 ${
              isActive ? "text-blue-600" : "text-slate-400"
            }`
          }
          aria-label="View Console Status"
        >
          <Home size={20} aria-hidden="true" />
          <span className="text-[10px] font-medium uppercase tracking-wider">Status</span>
        </NavLink>

        <NavLink
          to="/reserve"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg p-1 ${
              isActive ? "text-blue-600" : "text-slate-400"
            }`
          }
          aria-label="Reserve a Console"
        >
          <Calendar size={20} aria-hidden="true" />
          <span className="text-[10px] font-medium uppercase tracking-wider">Reserve</span>
        </NavLink>

        <NavLink
          to="/my-rentals"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg p-1 ${
              isActive ? "text-blue-600" : "text-slate-400"
            }`
          }
          aria-label="My Rental History"
        >
          <History size={20} aria-hidden="true" />
          <span className="text-[10px] font-medium uppercase tracking-wider">Rentals</span>
        </NavLink>

        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg p-1 ${
              isActive ? "text-blue-600" : "text-slate-400"
            }`
          }
          aria-label="Admin Settings"
        >
          <Settings size={20} aria-hidden="true" />
          <span className="text-[10px] font-medium uppercase tracking-wider">Admin</span>
        </NavLink>
      </nav>

      <Toaster position="top-center" richColors />
    </div>
  );
}