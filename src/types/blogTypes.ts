// the types used for the blog operations

// create a blog data
export interface CreateBlogData {
  title: string;
  content: string;
  authorId: number;
}

export interface UpdateBlogData {
  title?: string;
  content?: string;
}
