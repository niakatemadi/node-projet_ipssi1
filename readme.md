# CRUD Blog Application


# Authors
Madi NIAKATE and Walid CHIAKH

## Getting Started

Follow these instructions in order to set up the project

## Description

Creation of CRUD blog with nodejs, express and prisma

## Prerequisites

- NodeJS
- Prisma
- ExpressJS
- .env file with a <mark>DATABASE_URL</mark>

## Set up

1-  Clone the repository <mark>git clone https://github.com/niakatemadi/node-projet_ipssi1.git</mark>

2- Create .env file at the root of the project

3- copy theses variables(DATABASE_URL and JWT_SECRET) inside .env file : <mark>DATABASE_URL="postgres://node_ipssi_projet_pqig_user:nUTKK84eMz9K5erZXSMRekfLGN0Y6tC8@dpg-cf8had5a499fsd2spd70-a.oregon-postgres.render.com/node_ipssi_projet_pqig"</mark>
AND 
<mark>JWT_SECRET="azertez"</mark>

4- Project dependencies <mark>pnpm install</mark>

5- Migrate prisma with <mark>pnpm prisma migrate</mark>

6- install express types <mark>npm i --save-dev @types/express</mark>

7 - Open terminal and write <mark> pnpm prisma studio</mark>

8 -  Open terminal and write <mark>pnpm dev</mark> it will run the server

# Routes
 http://localhost:1254/
## User
`post    /signUp`
`post    /signIn`
**body :** {
	username : "",
	password : ""
} 
___
*update user username*

`put     /user/:userId`
**body :** {
	username : ""
} 
____
*Delete user by the user himself or by admin*

`delete  /user/:userId`

*get datas of a specific user by his id*

`get     /user/:userId`
____
**exemple :** 
method : post
path :  http://localhost:1254/signUp 

body : {
	username : "indigo",
	password : "indigo"
}
___

## Post
*creation of new post by a user*
`post /post`
**body:** : {
	post : "new post..",
	userId : "..."
} 
___
*update a post of a specific user*
`put /post/:postId`
**body :**  {
	post : "new post.."
}
___
*delete a post by admin or the owner of the post*
`delete /post/:postId`

*get all posts sorted by date (timestamp). We will receive all posts posted after this date*
`get /post/allPosts?from=1121112`

*get all posts of a specific user*
`get /post/allPosts/:userId`
___

**exemple :**  creation of new post

method : post
path :  http://localhost:1254/post 

body : {
	post : "new post..",
	userId : "fdf83c0b-7da8-40a8-a2d6-6f10e971b5f9"
}

**exemple :**  get all posts from a specific date

method : get
path :  http://localhost:1254/post/allPosts?from=11000000


___
## Comment
`post /comment/create`
**body:** : {
	message: "new post..",
	userId : "...",
	postId : "..."
} 
_____
`put /comment/:commentId`
**body:** : {
	message: "update comment.."
} 
____
`get /comment/comments/:postId`
`delete /comment/:commentId`
____
**exemple :** 
method : post
path :  http://localhost:1254/comment/create

body : {
	message : "new comment..",
	userId : "fdf83c0b-7da8-40a8-a2d6-6f10e971b5f9",
	postId : "8f27ac3d-efdf-48de-92fc-c3e95da399e4"
}