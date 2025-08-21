export const SpinnerLoadingPulse = () => {
   return (
      <div className="absolute inset-0 flex items-center justify-center">
         <div className="relative">
            <div className="size-12 rounded-full border-4 border-t-red-500 border-r-green-500 border-b-yellow-500 border-l-blue-500 animate-spin absolute top-0" />
         </div>
      </div>
   );
};
