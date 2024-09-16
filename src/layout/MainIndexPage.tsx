import { MainIndexPageProps } from '@/utils/types'

const MainIndexPage = ({ children }: MainIndexPageProps) => {
  return (
    <div className='w-full h-screen overflow-hidden text-white'>
      {children}
    </div>
  )
}

export default MainIndexPage
