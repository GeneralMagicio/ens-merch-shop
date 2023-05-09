import { Layout } from '@components/common'
import Newsletter from '@components/common/Newsletter'
import { ChevronDown, ChevronUp } from '@components/icons'
import { Accordion } from '@components/ui/Accordion/Accordion'

export default function Home() {
  return (
    <>
      <div className="max-w-3xl mt-20 mb-44 mx-auto">
        <h2 className="text-5xl text-center font-bold">
          Frequently asked questions
        </h2>
        <div className="mt-14">
          <Accordion items={items} />
        </div>
      </div>
      <Newsletter />
    </>
  )
}

Home.Layout = Layout

const items = [
  {
    title: 'Why is my name not listed?',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper enim in risus suscipit egestas. Aliquam porttitor sit amet tellus vitae placerat.',
  },
  {
    title: 'Why do I need to sign a message with my wallet?',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper enim in risus suscipit egestas. Aliquam porttitor sit amet tellus vitae placerat.',
  },
  {
    title: 'Why can’t names with non-ASCII letters be ordered?',
    description:
      'Non-ASCII letters can’t be embroidered properly. Name is embroidered and we have to ensure it is done properly.',
  },
  {
    title: 'Why can’t name longer than 13 characters be ordered?',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper enim in risus suscipit egestas. Aliquam porttitor sit amet tellus vitae placerat.',
  },
]
