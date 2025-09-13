import React from 'react'
import Feature from './Feature'
import { FaFileArchive, FaHammer, FaShieldAlt } from 'react-icons/fa'

const Features = () => {
  return (
    <section className='w-full'>
      <div className='container mx-auto w-full p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-8'>
        <Feature
          title='No Data Collection'
          description='Quizpot will never collect or save any kind of information about you'
          icon={
            <FaShieldAlt size={ 48 } />
          }
        />
        <Feature
          title='Simple Quiz Management'
          description='To host a quiz all you need is the .qp file and your selected Quizpot instance handles the rest'
          icon={
            <FaFileArchive size={ 48 } />
          }
        />
        <Feature
          title='Simple Editing Experience'
          description='Unlocking full potential of your quizzes with a simple and free editor'
          icon={
            <FaHammer size={ 48 } />
          }
        />
      </div>
    </section>
  )
}

export default Features