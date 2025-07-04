import { Loader, Loader2Icon } from 'lucide-react'

const PageLoader = () => {
  return (
    <>
    <div className='min-h-screen flex items-center justify-center'>
        <Loader className='size-10 text-primary animate-spin'></Loader>
        <p className='text-2xl ml-3'>Loading...</p>
    </div>
    </>
  )
}

export default PageLoader