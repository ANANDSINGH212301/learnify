import { Loader, Loader2Icon } from 'lucide-react'
import { useThemestore } from '../store/useThemeStore'

const PageLoader = () => {
  const {theme} = useThemestore();
  return (
    <>
    <div className='min-h-screen flex items-center justify-center' data-theme={theme}>
        <Loader className='size-10 text-primary animate-spin'></Loader>
        <p className='text-2xl ml-3'>Loading...</p>
    </div>
    </>
  )
}

export default PageLoader