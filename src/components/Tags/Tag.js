import React from 'react'
import classes from './tag.module.css'
import { Link } from 'react-router-dom'

function Tag({tags, forFoodPage}) {
  return (
    <div className={classes.container} style={{justifyContent: forFoodPage ? 'start' : 'center',}}>
      {tags.map(tag => (
        <Link key={tag.name} to={`/tag/${tag.name}`}>
            {tag.name}
            {!forFoodPage && `(${tag.count})`}
        </Link>
      ))}
    </div>
  )
}

export default Tag
