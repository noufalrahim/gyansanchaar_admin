
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DialogModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onConfirm?: () => void;
    onCancel?: () => void;
    title: string;
    description?: string;
    children?: React.ReactNode;
    className?: string;
    isLoading?: boolean;
};

export default function DialogModal({ open, setOpen, onConfirm, onCancel, isLoading, title, description, children, className }: DialogModalProps) {

    return (
        <Dialog open={open} onOpenChange={() => setOpen(false)}>
            <DialogContent className={cn("bg-white max-h-[90vh] overflow-y-auto", className)}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription className='text-light-200'>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
            <DialogFooter className="flex flex-col space-y-2">
                {
                    onConfirm &&
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full"
                        onClick={onConfirm}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading
                            </>
                        ) : (
                            "Confirm"
                        )}
                    </Button>
                }
                {
                    onCancel &&
                    <Button
                        variant="ghost"
                        type="button"
                        onClick={onCancel}
                        className="w-full"
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                }
            </DialogFooter>
        </Dialog>
    );
}
