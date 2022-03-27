import SvgIcon from '@/components/SvgIcon'
import useScroll from '@/hooks/useScroll'
import useUser from '@/hooks/useUser'
import { resizeImage } from '@/utils/common'

const NavigationButtons = () => {
  const navigate = useNavigate()
  enum ACTION {
    BACK = 'back',
    FORWARD = 'forward',
  }
  const handleNavigate = (action: ACTION) => {
    if (action === ACTION.BACK) navigate(-1)
    if (action === ACTION.FORWARD) navigate(1)
  }
  return (
    <div className='flex gap-1'>
      {[ACTION.BACK, ACTION.FORWARD].map(action => (
        <div
          onClick={() => handleNavigate(action)}
          key={action}
          className='app-region-no-drag btn-hover-animation rounded-lg p-2 text-gray-500 transition duration-300 after:rounded-full after:bg-black/[.06] hover:text-gray-900 dark:text-gray-300 dark:after:bg-white/10 dark:hover:text-gray-200'
        >
          <SvgIcon className='h-5 w-5' name={action} />
        </div>
      ))}
    </div>
  )
}

const SearchBox = () => {
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()
  const toSearch = (e: React.KeyboardEvent) => {
    if (!keyword) return
    if (e.key === 'Enter') {
      navigate(`/search/${keyword}`)
    }
  }

  return (
    <div className='app-region-no-drag group flex w-[16rem] cursor-text items-center rounded-full bg-gray-500 bg-opacity-5 pl-2.5 pr-2 transition duration-300 hover:bg-opacity-10 dark:bg-gray-300 dark:bg-opacity-5'>
      <SvgIcon
        className='mr-2 h-4 w-4 text-gray-500 transition duration-300 group-hover:text-gray-600 dark:text-gray-400 dark:group-hover:text-gray-200'
        name='search'
      />
      <input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        onKeyDown={toSearch}
        type='text'
        className='flex-grow bg-transparent placeholder:text-gray-500 dark:text-white dark:placeholder:text-gray-400'
        placeholder='搜索'
      />
      <div
        onClick={() => setKeyword('')}
        className={classNames(
          'cursor-default rounded-full p-1 transition after:bg-gray-300 hover:bg-white/20 dark:text-white/50',
          !keyword && 'hidden'
        )}
      >
        <SvgIcon className='h-4 w-4' name='x' />
      </div>
    </div>
  )
}

const Settings = () => {
  return (
    <div className='app-region-no-drag btn-hover-animation rounded-lg p-2.5 text-gray-500 transition duration-300 after:rounded-full after:bg-black/[.06] hover:text-gray-900 dark:text-gray-300 dark:after:bg-white/10 dark:hover:text-gray-200'>
      <SvgIcon className='h-[1.125rem] w-[1.125rem]' name='settings' />
    </div>
  )
}

const Avatar = () => {
  const navigate = useNavigate()
  const { data: user } = useUser()

  const avatarUrl = resizeImage(user?.profile?.avatarUrl ?? '', 'sm')

  return (
    <img
      src={avatarUrl}
      onClick={() => navigate('/login')}
      className='app-region-no-drag h-9 w-9 rounded-full bg-gray-100 dark:bg-gray-700'
    />
  )
}

const Topbar = () => {
  /**
   * Show topbar background when scroll down
   */
  const [mainContainer, setMainContainer] = useState<HTMLElement | null>(null)
  const scroll = useScroll(mainContainer, { throttle: 100 })

  useEffect(() => {
    setMainContainer(document.getElementById('mainContainer'))
  }, [setMainContainer])

  return (
    <div
      className={classNames(
        'app-region-drag sticky top-0 z-30 flex h-16 min-h-[4rem] w-full cursor-default items-center justify-between px-8 transition duration-300',
        !scroll.arrivedState.top &&
          'bg-white bg-opacity-[.86] backdrop-blur-xl backdrop-saturate-[1.8] dark:bg-[#222] dark:bg-opacity-[.86]'
      )}
    >
      <div className='flex gap-2'>
        <NavigationButtons />
        <SearchBox />
      </div>

      <div className='flex items-center gap-3'>
        <Settings />
        <Avatar />
      </div>
    </div>
  )
}

export default Topbar