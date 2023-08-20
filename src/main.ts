import van from "vanjs-core"
import type { State } from "vanjs-core"

const { ul, li, div, label, input } = van.tags

type Posts = {
  body: string
  id: number
  title: string
  userId: number
}[]

type BlogListProps = {
  posts: Posts
}

const SearchPanel = ({ keyword }: { keyword: State<string> }) => (
  div(
    { style: 'display: flex; flex-direction: column; align-items: start;' },
    label({ for: 'keyword' }, 'キーワード'),
    input({
      type: 'text',
      id: 'keyword',
      oninput: (e) => {
        keyword.val = e.target.value
      }
    })
  )
)

const BlogList = ({ posts }: BlogListProps) => ul(
  posts.map(post => li(post.title))
)

const App = async () => {
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts').then(r => r.json()) as Posts
  const keyword = van.state("")

  return (
    div(
      div(
        { style: "margin-bottom: 1rem;" },
        SearchPanel({ keyword }),
      ),
      () => BlogList({ posts: posts.filter(post => post.title.includes(keyword.val)) })
    )
  )
}

const app = document.getElementById('app')
if (app) {
  ;(async () => {
    van.add(app, await App())
  })()
}