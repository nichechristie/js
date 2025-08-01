import { AppFooter } from "@/components/footers/app-footer";
import { ErrorProvider } from "@/contexts/error-handler";

export default function DashboardLayout(props: { children: React.ReactNode }) {
  return (
    <ErrorProvider>
      <div className="flex min-h-dvh flex-col bg-background">
        <div className="flex grow flex-col">{props.children}</div>
        <AppFooter />
      </div>
    </ErrorProvider>
  );
}
