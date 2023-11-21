type FoodInformation = {
    foodId: string;
    imageUrlList: string[];
    title: string;
    subTitle: string;
    introduce: string;
    ingredientList: string[];
    steps: Step[];
    videoLink: string;
};

type Step = {
    title: string;
    content: string;
};
