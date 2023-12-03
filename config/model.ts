export type Step = {
  title: string;
  content: string;
};

export type Food = {
  // foodId: string; // name of this food
  title: string; // same as food
  imageUrlList: string[];
  subTitle: string;
  introduce: string;
  ingredientList: string[];
  steps: Step[];
  videoLink: string;
  loved?: boolean;
};

export type User = {
  fullname: string;
  email: string;
  favouritedFoods: string[];
  lovePosts: string[];
  myPosts: string[];
};

export type Comment = {
  commentId: string;
  username: string;
  content: string;
  createdAt: string;
};

export type Post = {
  postId: string;
  userId: string;
  username: string;
  content: string;
  imageUrlList: string[];
  loveNumber: number;
  comments: Comment[];
  createdAt: string;
};
