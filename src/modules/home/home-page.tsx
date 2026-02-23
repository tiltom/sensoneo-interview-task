import { PageHeader } from "../../components/page-header";
import { DashboardStatistics } from "./components/dashboard-statistics/dashboard-statistics";
import { QuickActions } from "./components/quick-actions/quick-actions";
import { RecentProducts } from "./components/recent-products/recent-products";

export function HomePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Deposit management dashboard"
        description="Welcome to your deposit management system. Monitor and manage your products, companies, and users."
      />

      <div className="pt-2 flex flex-col gap-y-10">
        <section>
          <DashboardStatistics />
        </section>

        <QuickActions />

        <RecentProducts />
      </div>
    </div>
  );
}
