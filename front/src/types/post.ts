import CategoryType from './category'

type PostType = {
  _id?: string,
  title: string,
  content: string,
  picture?: string,
  username: string,
  categories?: CategoryType[],
  createdAt?: string,
  updatedAt?: string
}

export default PostType