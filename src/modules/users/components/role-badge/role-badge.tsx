import { cva, type VariantProps } from 'class-variance-authority';
import { Gavel, Shield, User } from 'lucide-react';
import { Badge } from '@/core/components/ui/badge';
import { cn } from '@/core/lib/utils';

const roleBadgeVariants = cva('inline-flex items-center gap-1', {
  variants: {
    role: {
      admin: 'bg-blue-100 text-blue-800',
      jury: 'bg-purple-100 text-purple-800',
      participant: 'bg-amber-200 text-black',
    },
  },
  defaultVariants: {
    role: 'participant',
  },
});

export interface RoleBadgeProps extends VariantProps<typeof roleBadgeVariants> {
  role: 'admin' | 'jury' | 'participant';
  className?: string;
}

const roleConfig = {
  admin: {
    icon: Shield,
    label: 'Admin',
  },
  jury: {
    icon: Gavel,
    label: 'Jurado',
  },
  participant: {
    icon: User,
    label: 'Participante',
  },
};

export function RoleBadge({ role, className }: RoleBadgeProps) {
  const config = roleConfig[role];
  const Icon = config.icon;

  return (
    <Badge
      className={cn(roleBadgeVariants({ role }), className)}
      variant={role === 'participant' ? 'outline' : 'default'}
    >
      <Icon className="mr-1 h-3 w-3" />
      {config.label}
    </Badge>
  );
}
