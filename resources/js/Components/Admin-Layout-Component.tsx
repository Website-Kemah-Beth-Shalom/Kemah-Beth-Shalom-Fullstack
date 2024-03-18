import { BackButton } from './Button'

// this is top bar for admin menu page
type AdminTopBarProps = {
  title?: string,
  children?: React.ReactNode,
  backTo?: string,
}

const AdminTopBar = (
  Props: AdminTopBarProps
) => {
  return (
    <section
      className='w-full flex flex-row justify-between items-center gap-3 relative py-boxS border-b border-gray-300 bg-white shadow-sm'
    >
      {/* left side */}
      <div>
        {Props.backTo ?
          <BackButton
            href={Props.backTo}
          /> :
          <>
            <h1
              className='text-primaryAdmin text-[1.5rem] font-bold'
            >
              {Props.title}
            </h1>
          </>
        }
      </div>
      {/* right side */}
      <div
        className='flex flex-row justify-end items-center gap-3'
      >
        {Props.children}
      </div>
    </section>)
}

export {
  AdminTopBar
}