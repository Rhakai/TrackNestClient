import Link from 'next/link';
import { 
  LayoutDashboard, 
  CircleDot, 
  BarChart3, 
  Folder, 
  Users, 
  Database, 
  FileText, 
  Settings, 
  HelpCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Lifecycle', icon: CircleDot, href: '#' },
  { label: 'Analytics', icon: BarChart3, href: '#' },
  { label: 'Projects', icon: Folder, href: '#' },
  { label: 'Team', icon: Users, href: '#' },
];

const docItems = [
  { label: 'Data Library', icon: Database, href: '#' },
  { label: 'Reports', icon: FileText, href: '#' },
];

export function Sidebar() {
  return (
    <div className="w-64 border-r bg-sidebar h-screen flex flex-col p-4">
      <div className="px-3 py-4 mb-4 text-foreground font-bold text-lg">
        Track Nest
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Home
          </h2>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href}>
                <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-accent hover:text-accent-foreground text-muted-foreground">
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Documents
          </h2>
          <nav className="space-y-1">
            {docItems.map((item) => (
              <Link key={item.label} href={item.href}>
                <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-accent hover:text-accent-foreground text-muted-foreground">
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="mt-auto space-y-1">
        <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-accent hover:text-accent-foreground text-muted-foreground">
          <Settings className="h-4 w-4" />
          Settings
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-accent hover:text-accent-foreground text-muted-foreground">
          <HelpCircle className="h-4 w-4" />
          Get Help
        </Button>
      </div>
    </div>
  );
}