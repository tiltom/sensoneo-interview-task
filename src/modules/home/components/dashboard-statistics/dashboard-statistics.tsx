import { useMemo } from "react";
import { Milk, CircleDashed, Building2, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../../components/card";
import { Skeleton } from "../../../../components/skeleton";
import { useGetDashboardStatistics } from "./hooks/use-get-dashboard-statistics";

export function DashboardStatistics() {
  const { activeProducts, pendingProducts, companies, users } = useGetDashboardStatistics();

  const stats = useMemo(
    () => [
      {
        title: "Active products",
        value: activeProducts.count,
        isLoading: activeProducts.isLoading,
        description: "Active products in system",
        icon: <Milk size={16} className="text-muted-foreground" />,
      },
      {
        title: "Pending products",
        value: pendingProducts.count,
        isLoading: pendingProducts.isLoading,
        description: "Products waiting for approval",
        icon: <CircleDashed size={16} className="text-muted-foreground" />,
      },
      {
        title: "Companies",
        value: companies.count,
        isLoading: companies.isLoading,
        description: "Registered companies",
        icon: <Building2 size={16} className="text-muted-foreground" />,
      },
      {
        title: "Users",
        value: users.count,
        isLoading: users.isLoading,
        description: "Registered users",
        icon: <Users size={16} className="text-muted-foreground" />,
      },
    ],
    [activeProducts, pendingProducts, companies, users]
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="shadow-none">
          <CardHeader className="flex flex-row items-start justify-between pb-2 space-y-0">
            <div className="space-y-1">
              <CardDescription className="text-sm font-medium text-foreground">
                {stat.title}
              </CardDescription>
              {stat.isLoading ? (
                <Skeleton className="h-10 w-20" />
              ) : (
                <CardTitle className="text-4xl font-bold">{stat.value}</CardTitle>
              )}
            </div>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
