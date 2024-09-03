import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'
// this is component that show card (preview at home page of blogs)
// appwrite give id in form of $id (just variable)
function PostCard({$id, title, featuredImage}) {
    
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}   //$id is (blog post id) && featuredImage is (that image id)
            //so we passed that image id to get preview
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard