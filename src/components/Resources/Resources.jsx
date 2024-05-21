import Link from 'next/link';

import { ResourceCard, SecondaryButton } from '../index';

export default function Resources({ resources, title, preamble }) {
  return (
    <>
      <div className='resources-outer-container flex flex-column flex-align-center'>
        <h2 className='text-align-center margin-b--xxs'>{title ? title : 'Resources'}</h2>
        <p className='text-align-center margin-t--zero margin-b--xs large-text'>
          {preamble ? preamble : null}
        </p>
        <div className='resources-inner-container'>
          {resources.map((resource) => (
            <ResourceCard
              key={resource.id}
              img={resource.image?.url || null}
              url={resource.url}
              title={resource.title}
              resourceType={resource.resourceType?.type}
            />
          ))}
        </div>
        <div className='button-wrapper'>
          <Link href='../../resources' className='link-browse'>
            <SecondaryButton title='BROWSE ALL RESOURCES' className='button' />
          </Link>
        </div>
      </div>
    </>
  );
}
