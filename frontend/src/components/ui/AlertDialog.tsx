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
import { useState } from 'react';

type AlertDialogProps = {
   buttonLabel?: string;
   title?: string;
   description?: string;
   cancel?: string;
   confirm?: string;
   confirmAction?: () => void;
};

export default function AlertDialogDemo({
   buttonLabel = 'Book Now',
   title,
   description,
   cancel,
   confirm,
   confirmAction,
}: Readonly<AlertDialogProps>) {
   const [open, setOpen] = useState<boolean>(false);

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
                     setOpen(false);
                  }}
               >
                  {confirm}
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}
