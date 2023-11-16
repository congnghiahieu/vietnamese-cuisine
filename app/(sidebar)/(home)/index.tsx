import { useEffect, useRef, useState } from "react";
import { Image, View } from "react-native";
import { useRouter } from "expo-router";
import { makeStyles, useTheme, useThemeMode } from "@rneui/themed";
import StyledText from "@/components/Styled/StyledText";
import { SearchInput } from "@/components/Styled/StyledInput";
import StyledPressable from "@/components/Styled/StyledPressable";
import { StyledFlatList } from "@/components/Styled/StyledList";
import { ChevronRightIcon, HeartIcon, SearchIcon } from "@/components/Icon";
import { STYLES } from "@/lib/constants";
import { hp } from "@/lib/utils";
import StyledImage from "@/components/Styled/StyledImage";
import { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB } from "@/config/firebase";
import {
    query,
    collection,
    where,
    getDocs,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    arrayRemove,
    arrayUnion,
} from "firebase/firestore";

import { DocumentData } from "firebase/firestore";
import { setParams } from "expo-router/src/global-state/routing";

interface Food {
    title: string;
    imageUrl: string;
}

const Home = () => {
    const [foodList, setFoodList] = useState<Food[]>([]);
    const getFoodList = async () => {
        try {
            const querySnapshot = await getDocs(
                collection(FIREBASE_DB, "foods")
            );
            const fetchedFoodList = querySnapshot.docs.map((doc) => {
                const { title, imageUrl } = doc.data();
                return { title, imageUrl } as Food;
            });
            setFoodList(fetchedFoodList);
        } catch (error) {
            console.error(
                "Error fetching food list data from FIRESTORE:",
                error
            );
        }
    };

    useEffect(() => {
        getFoodList();
    }, []);

    const styles = useStyles();
    return (
        <View style={styles.container}>
            <View>
                <StyledText type="Heading_4" color="grey">
                    Let's find your favourite {"\n"}
                    Vietnamese food
                </StyledText>
            </View>
            <SearchInput
                placeholder="Search"
                rightIcon={
                    <StyledPressable style={styles.searchButton}>
                        <SearchIcon />
                    </StyledPressable>
                }
            />
            <FoodList foodList={foodList} />
            {/* <FoodList foodList={[]} /> */}
        </View>
    );
};

type FoodItem = {
    title: string;
    imageUrl: string;
};

const FoodCard = ({ title, imageUrl }: FoodItem) => {
    const styles = useStyles();
    const [love, setLove] = useState(false);
    const router = useRouter();

    async function loveFood() {
        const user = FIREBASE_AUTH.currentUser;
        console.log(user?.email);
        try {
            if (!user) {
                router.push("/login");
            }
            if (user?.email) {
                setLove((prev) => !prev);
                const docRef = doc(FIREBASE_DB, "users", user.email);
                if (love) {
                    await updateDoc(docRef, {
                        favoriteFoods: arrayRemove(title),
                    });
                } else {
                    await updateDoc(docRef, {
                        favoriteFoods: arrayUnion(title),
                    });
                }
            }
        } catch (error: any) {
            alert(error.message);
        }
    }

    return (
        <View style={styles.card}>
            <StyledImage
                source={{
                    uri: imageUrl,
                }}
                style={styles.cardImage}
            />
            <StyledPressable onPress={loveFood} style={styles.cardLoveButton}>
                <HeartIcon active={love} />
            </StyledPressable>
            <View style={styles.cardFooter}>
                <StyledText type="Heading_5" color="white">
                    {title}
                </StyledText>
                <StyledPressable
                    style={styles.redirectButton}
                    onPress={() =>
                        router.push({
                            pathname: "/information",
                            params: { id: title },
                        })
                    }
                >
                    <ChevronRightIcon />
                </StyledPressable>
            </View>
        </View>
    );
};

type FoodListProps = {
    foodList: FoodItem[];
};

const FoodList = ({ foodList }: FoodListProps) => {
    const styles = useStyles();
    return (
        <StyledFlatList
            emptyTitle="No dish available!"
            keyExtractor={({ title }) => title}
            numColumns={2}
            columnWrapperStyle={styles.foodListColumn}
            contentContainerStyle={{
                paddingHorizontal: 0,
            }}
            data={foodList}
            renderItem={({ item }) => <FoodCard {...item} />}
        />
    );
};

const useStyles = makeStyles((theme) => {
    const dT = theme.mode === "dark";
    return {
        container: {
            flex: 1,
            paddingHorizontal: STYLES.PADDING.PADDING_16,
            gap: STYLES.GAP.GAP_16,
        },
        searchButton: {
            backgroundColor: dT ? "rgba(255, 255, 255, 0.2)" : "#eee",
            borderRadius: STYLES.RADIUS.RADIUS_10,
        },
        redirectButton: {
            backgroundColor: theme.colors.white,
            borderRadius: STYLES.RADIUS.RADIUS_50,
        },
        foodListColumn: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
        },
        card: {
            flexBasis: "49%",
            height: hp(35),
            maxHeightheight: 300,
            position: "relative",
            borderRadius: STYLES.RADIUS.RADIUS_10,
            backgroundColor: dT ? theme.colors.black : theme.colors.white,
            ...(dT
                ? STYLES.SHADOW.SHADOW_WHITE_8
                : STYLES.SHADOW.SHADOW_BLACK_8),
        },
        cardImage: {
            zIndex: 0,
            width: "100%",
            height: "100%",
            borderRadius: STYLES.RADIUS.RADIUS_10,
        },
        cardLoveButton: {
            position: "absolute",
            top: 0,
            right: 0,
            margin: STYLES.MARGIN.MARGIN_4,
            zIndex: 1,
        },
        cardFooter: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            margin: STYLES.MARGIN.MARGIN_4,
            zIndex: 1,
        },
    };
});

export default Home;
