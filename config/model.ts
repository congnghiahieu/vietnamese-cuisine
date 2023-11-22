export type Step = {
  title: string;
  content: string;
};


export type Food = {
  foodId: string; // name of this food
  title: string // same as food
  imageUrlList: string[];
  subTitle: string;
  introduce: string;
  ingredientList: string[];
  steps: Step[];
  videoLink: string;
};

export type User = {
  fullname: string;
  email: string;
  favouritedFoods: string[];
  lovePosts: string[];
};

export type Comment = {
  commentId: string;
  userId: string;
  content: string;
  createAt: string;
};

export type Post = {
  postId: string;
  userId: string;
  content: string;
  imageUrlList: string[];
  loveNumber: number;
  comments: Comment[];
  createdAt: string;
};


