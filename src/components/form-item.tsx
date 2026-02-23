import { Label } from "./label";
import { cn } from "../lib/utils";

function FormItem({ className, label, error, children }: { className?: string; label: string; error?: string; children: React.ReactNode }) {
  return (  
    <div className={cn("space-y-2", className)}>
      <Label>{label}</Label>
      {children}
      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </div>
  );
}

export { FormItem };
