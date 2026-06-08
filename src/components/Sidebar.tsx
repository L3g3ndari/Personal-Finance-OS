"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: "📊" },
  { label: "Accounts", href: "/accounts", icon: "🏦" },
  { label: "Transactions", href: "/transactions", icon: "💳" },
  { label: "Budgets", href: "/budgets", icon: "💰" },
  { label: "Investments", href: "/investments", icon: "📈" },
  { label: "Goals", href: "/goals", icon: "🎯" },
  { label: "Bills", href: "/bills", icon: "📄" },
  { label: "Strategies", href: "/strategies", icon: "🧠" },
  { label: "Reports", href: "/reports", icon: "📋" },
  { label: "Forecasts", href: "/forecasts", icon: "🔮" },
  { label: "Journal", href: "/journal", icon: "📝" },
  { label: "Tax", href: "/tax", icon: "⚖️" },
  { label: "Health", href: "/health", icon: "❤️" },
  { label: "Settings", href: "/settings", icon: "⚙️" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-card hidden md:flex flex-col">
      <div className="p-6 border-b">
        <Link href="/dashboard" className="text-xl font-bold hover:text-primary transition-colors flex items-center gap-2">
          <span>💰</span>
          <span>Finance OS</span>
        </Link>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t text-xs text-muted-foreground">
        Personal Finance OS v0.1
      </div>
    </aside>
  );
}
