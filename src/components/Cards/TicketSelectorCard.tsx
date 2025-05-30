import { Card, CardContent } from '../ui/card'
import { MinusCircle, PlusCircle } from 'lucide-react'
import { Button } from '../ui/button';

interface TicketSelectorCardProps {
  name: string;
  available: number;
  price: number;
  description: string;
  quantity: number;
};

export default function TicketSelectorCard({
  name,
  description,
  available,
  quantity,
  price,
}: TicketSelectorCardProps) {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-muted-foreground mb-1">{description}</p>
            <p className="text-primary font-semibold">${price}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {available} tickets available
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => { }}
              disabled={quantity === 0}
            >
              <MinusCircle className="h-4 w-4" />
              <span className="sr-only">Decrease</span>
            </Button>
            <span className="w-6 text-center font-medium">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => { }}
              disabled={quantity >= available}
            >
              <PlusCircle className="h-4 w-4" />
              <span className="sr-only">Increase</span>
            </Button>
          </div>
        </div>

        {quantity > 0 && (
          <div className="mt-4 text-right">
            <p className="text-sm font-medium">
              Subtotal: <span className="text-primary">${price * quantity}</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
