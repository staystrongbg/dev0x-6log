export interface Post {
  id: number;
  title: string;
  desc: string;
  img: string;
  date: string;
  uid: number;
  cat: string;
  users: Users;
}

//when incl. users in posts
export interface Users {
  id: number;
  img: string;
  username: string;
}

export interface Posts {
  posts: Post[];
}

export interface User {
  email: string | null;
  id: number | null;
  img: string | null;
  username: string | null;
}
