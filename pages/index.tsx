import Image from 'next/image'

import { useState } from 'react'

import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  'https://szomjeqqtgwdeuxynbjl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6b21qZXFxdGd3ZGV1eHluYmpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDg1MjUyNTAsImV4cCI6MTk2NDEwMTI1MH0.BVZLzRumwIqsGYi18_Y2wZ9ZdJI0pKLp0u2v8NsaQX4'
)

// const seedData = async () => {
//   await supabaseAdmin.from('images').insert([
//     {
//       name: 'Pedro Duarte',
//       href: 'https://twitter.com/peduarte/status/1463897468383412231',
//       userName: '@peduarte',
//       imgSrc: 'https://pbs.twimg.com/media/FFDOtLkWYAsWjTM?format=jpg',
//     },
//   ])
// }

// seedData()

export async function getStaticProps() {
  const { data } = await supabaseAdmin.from('images').select('*')
  return {
    props: {
      images: data,
    },
  }
}

type Image = {
  id: number
  href: string
  imgSrc: string
  name: string
  userName: string
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Gallery({ images }: { images: Image[] }) {
  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {images.map((image) => (
          <BlurImage key={image.id} image={image} />
        ))}
      </div>
    </div>
  )
}

function BlurImage({ image }: { image: Image }) {
  const [isLoading, setLoading] = useState(true)
  const { imgSrc, href, name, userName } = image
  return (
    <a href={href} className="group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <Image
          alt=""
          src={imgSrc}
          layout="fill"
          objectFit="cover"
          className={cn(
            'duration-700 ease-in-out group-hover:opacity-75',
            isLoading
              ? 'scale-110 blur-2xl grayscale'
              : 'scale-100 blur-0 grayscale-0'
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{userName}</p>
    </a>
  )
}
