import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from '@/components/ui/dialog';
import type React from 'react';

type DialogModalProps = {
   title: string;
   description?: string;
   children?: React.ReactNode;
   onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
   isOpen?: boolean;
   setOpen?: (open: boolean) => void;
};

export default function DialogModal({
   title,
   description,
   children,
   onSubmit,
   isOpen,
   setOpen,
}: Readonly<DialogModalProps>): React.ReactElement {
   return (
      <Dialog open={isOpen} onOpenChange={setOpen}>
         <DialogContent className="sm:max-w-[700px]">
            <form onSubmit={onSubmit}>
               <DialogHeader>
                  <DialogTitle>{title}</DialogTitle>
                  {description && <DialogDescription>{description}</DialogDescription>}
               </DialogHeader>

               <div className="py-4">{children}</div>

               <DialogFooter>
                  <DialogClose asChild>
                     <Button variant="outline" type="button">
                        Cancel
                     </Button>
                  </DialogClose>
                  <Button variant={'outline'} type="submit">
                     Save
                  </Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   );
}
