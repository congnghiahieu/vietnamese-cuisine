import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { Image, View } from "react-native";
import {
    Redirect,
    useFocusEffect,
    useNavigation,
    useRouter,
} from "expo-router";
import { StackActions } from "@react-navigation/native";
import { makeStyles } from "@rneui/themed";
import { STYLES } from "@/lib/constants";
import { hp } from "@/lib/utils";
import StyledText from "@/components/Styled/StyledText";
import { EmptyList, StyledFlatList } from "@/components/Styled/StyledList";
import StyledPressable from "@/components/Styled/StyledPressable";
import { ChevronRightIcon, HeartDislikeIcon } from "@/components/Icon";
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
} from "firebase/firestore";
import { useAuthStates } from "@/states/auth";
import { HoldingView } from "@/components/Styled/StyledView";
import { useAuth } from "@/context/AuthContext";

const Favourites = () => {
    console.log("Favourites re-render");
    // const user = FIREBASE_AUTH.currentUser;
    // const { user } = useAuthentication();
    const { user } = useAuth();
    // if (!user) {
    //   return <Redirect href={'/login'} />;
    // }

    const [favouriteList, setFavouriteList] = useState<Favourite[]>([]);
    const getFavouriteList = async () => {
        



        try {
            if (user?.email) {
                let favouriteList: Favourite[] = [];
                const docRef = doc(FIREBASE_DB, "users", user.email);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const fetchedFavouriteList =
                        docSnap.data()?.favouritedFoods || [];
                    for (const foodId of fetchedFavouriteList) {
                        const foodRef = doc(FIREBASE_DB, "foods", foodId);
                        const foodSnap = await getDoc(foodRef);
                        if (foodSnap.exists()) {
                            const { title, imageUrl } = foodSnap.data();
                            const temp: Favourite = { title, imageUrl };
                            favouriteList.push(temp);
                        }
                    }
                }
                setFavouriteList(favouriteList);
                console.log(favouriteList);
            }
        } catch (error) {
            console.error(
                "Error fetching food list data from FIRESTORE:",
                error
            );
        }
    };

    useEffect(() => {
        getFavouriteList();
    }, []);
    return (
        <FavouriteList favouriteList={favouriteList} />
        // <FavoriteList favoriteList={[]} />
    );
};

type Favourite = {
    title: string;
    imageUrl: string;
};

const FavouriteCard = ({ title, imageUrl }: Favourite) => {
    const styles = useStyles();
    const router = useRouter();

    return (
        <View style={styles.card}>
            <StyledImage
                source={{
                    uri: imageUrl,
                }}
                style={styles.cardImage}
            />
            <StyledPressable style={styles.cardDislikeButton}>
                <HeartDislikeIcon />
            </StyledPressable>
            <View style={styles.cardFooter}>
                <StyledText type="Heading_5" color="white">
                    {title}
                </StyledText>
                <StyledPressable
                    style={styles.redirectButton}
                    onPress={() =>
                        router.push({
                            pathname: "/information/[foodId]",
                            params: {
                                foodId: "Phở",
                            },
                        })
                    }
                >
                    <ChevronRightIcon />
                </StyledPressable>
            </View>
        </View>
    );
};

type FavouriteListProps = {
    favouriteList: Favourite[];
};

const FavouriteList = ({ favouriteList }: FavouriteListProps) => {
    return (
        <StyledFlatList
            emptyTitle=""
            keyExtractor={({ title }) => title}
            data={favouriteList}
            renderItem={({ item }) => <FavouriteCard {...item} />}
            ListEmptyComponent={FavouriteEmpty}
        />
    );
};

const FavouriteEmptySubField = () => {
    const router = useRouter();

    return (
        <StyledPressable onPress={() => router.push("/(sidebar)")}>
            <StyledText
                type="SubInputField"
                color="orange"
                style={{
                    textDecorationLine: "underline",
                }}
            >
                Explore more Vietnamese food
            </StyledText>
        </StyledPressable>
    );
};

const FavouriteEmpty = () => {
    return (
        <EmptyList
            title="No favourite dish"
            subField={<FavouriteEmptySubField />}
        />
    );
};

const useStyles = makeStyles((theme) => {
    const dT = theme.mode === "dark";
    return {
        redirectButton: {
            backgroundColor: theme.colors.white,
            borderRadius: STYLES.RADIUS.RADIUS_50,
        },
        card: {
            flexBasis: "100%",
            height: hp(40),
            position: "relative",
            borderRadius: STYLES.RADIUS.RADIUS_10,
            backgroundColor: dT ? theme.colors.black : theme.colors.white,
            ...STYLES.SHADOW.SHADOW_ORANGE_8,
        },
        cardImage: {
            zIndex: 0,
            width: "100%",
            height: "100%",
            borderRadius: STYLES.RADIUS.RADIUS_10,
        },
        cardDislikeButton: {
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
            margin: STYLES.MARGIN.MARGIN_8,
            zIndex: 1,
        },
    };
});

export default Favourites;
