import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

type AlertDialogProps = {
   buttonLabel?: string;
   title?: string;
   description?: string;
   cancel?: string;
   confirm?: string;
   confirmAction?: () => void;
   open?: boolean;
   setOpen?: (open: boolean) => void;
};

export default function AlertModal({
   buttonLabel = 'Book Now',
   title,
   description,
   cancel,
   confirm,
   confirmAction,
   open,
   setOpen,
}: Readonly<AlertDialogProps>) {
   return (
      <AlertDialog open={open} onOpenChange={setOpen}>
         <AlertDialogTrigger asChild>
            <Button variant="outline" className="cursor-pointer">
               {buttonLabel}
            </Button>
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>{title}</AlertDialogTitle>
               <AlertDialogDescription>{description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel className="cursor-pointer">{cancel}</AlertDialogCancel>
               <AlertDialogAction
                  className="cursor-pointer"
                  onClick={() => {
                     confirmAction?.();
                  }}
               >
                  {confirm}
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}
