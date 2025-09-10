import { Button } from './ui/button';

export default function ChatButton() {
   return (
      <div className="fixed bottom-6 right-6">
         <Button className="rounded-full size-14 bg-blue-600 hover:bg-blue-700 shadow-lg">💬</Button>
      </div>
   );
}
