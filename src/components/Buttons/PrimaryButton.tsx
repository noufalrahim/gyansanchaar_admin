import { cn } from '@/lib/utils';
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react';

interface PrimaryButtonProps {
    label: string;
    onClick?: () => void;
    className?: string;
    leadIcon?: React.ReactNode;
    trailIcon?: React.ReactNode;
    loading?: boolean;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
};

export default function PrimaryButton({
    label,
    onClick,
    className,
    leadIcon,
    trailIcon,
    disabled = false,
    loading,
    type,
}: PrimaryButtonProps) {
    return (
        <Button onClick={(e) => {
            e.stopPropagation();
        if(onClick){
                onClick();
            }
        }} className={cn('bg-primary-main hover:bg-primary-950 text-white text-sm', className)} type={type} disabled={disabled}>
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
