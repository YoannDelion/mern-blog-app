import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CategoryType from '../../types/category'
import './sideBar.css'

export default function SideBar() {

  const [categories, setCategories] = useState<CategoryType[]>([])

  useEffect(() => {
    (async () => {
      const res = await axios.get('/categories')
      setCategories(res.data)
    })()
  }, [])

  return (
    <div className='sidebar'>
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
          alt=""
        />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {categories.map(cat => (
            <li key={cat._id} className="sidebarListItem">
              <Link className='link' to={`/?cat=${cat.name}`}>
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  )
}
