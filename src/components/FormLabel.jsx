function FormLabel({ children }) {
  return (
    <div className='flex items-center pt-7 pb-7'>
      <span className='w-full h-[1px] bg-[#DBDBDB] flex-1 '></span>
      <p className='px-4 font-[600]'>{children}</p>
      <span className='w-full h-[1px] bg-[#DBDBDB] flex-1'></span>
    </div>
  );
}

export default FormLabel;
