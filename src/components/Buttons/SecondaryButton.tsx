import { cn } from '@/lib/utils';
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react';

interface SecondaryButton {
    label: string;
    onClick?: () => void;
    className?: string;
    leadIcon?: React.ReactNode;
    trailIcon?: React.ReactNode;
    loading?: boolean;
    type?: 'button' | 'submit';

};

export default function SecondaryButton({
    label,
    onClick,
    className,
    leadIcon,
    trailIcon,
    loading,
    type,
}: SecondaryButton) {
    return (
        <Button onClick={onClick} type={type} className={cn('text-sm bg-primary-50 text-primary-main hover:bg-primary-100 transition-colors', className)}>
            {
                loading ? (
                    <div className="flex items-center">
                        {leadIcon && <span className="mr-2">{leadIcon}</span>}
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        <span>Loading...</span>
                    </div>
                ) : (
                    <>
                        {leadIcon && <span className="mr-2">{leadIcon}</span>}
                        {label}
                        {trailIcon && <span className="ml-2">{trailIcon}</span>}
                    </>
                )
            }
        </Button>
    )
}
