type Step = {
    title: string;
    content: string;
};

type Food = {
    foodId: string; // name of this food
    imageUrlList: string[];
    title: string;
    subTitle: string;
    introduce: string;
    ingredientList: string[];
    steps: Step[];
    videoLink: string;
};

type User = {
    email: string
    favoriteFoods: string[] 
}




