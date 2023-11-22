import { useEffect, useRef, useState } from "react";
import { Image, Keyboard, RefreshControl, View } from "react-native";
import { useNavigation, useRouter } from "expo-router";
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
import { dismissKeyboard } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoadingView } from "@/components/Styled/StyledView";
import { StyledRefreshControl } from "@/components/Styled/StyledLoading";
import StyledToast from "@/components/Styled/StyledToast";
import { useAuth } from "@/context/AuthContext";

type FoodItem = {
    title: string;
    imageUrl: string;
};
type FoodList = FoodItem[];

const useFoodListQuery = () =>
    useQuery<FoodList>({
        queryKey: ["food", "list"],
        queryFn: async () => {
            const querySnapshot = await getDocs(
                collection(FIREBASE_DB, "foods")
            );
            return querySnapshot.docs.map((doc) => doc.data()) as FoodList;
        },
    });

const Home = () => {
    console.log("Home re-render");
    const styles = useStyles();
    const { data, isPending, refetch, isFetching } = useFoodListQuery();

    return (
        <View
            style={styles.container}
            onStartShouldSetResponder={dismissKeyboard}
        >
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
            {isPending ? (
                <LoadingView />
            ) : (
                <FoodList
                    foodList={data || []}
                    isRefreshing={isFetching}
                    onRefresh={refetch}
                />
            )}
        </View>
    );
};

type FoodListProps = {
    foodList: FoodItem[];
    isRefreshing?: boolean;
    onRefresh?: () => void;
};

const FoodList = ({
    foodList,
    isRefreshing = false,
    onRefresh = () => {},
}: FoodListProps) => {
    const styles = useStyles();
    return (
        <StyledFlatList
            emptyTitle="No dish available!"
            refreshControl={
                <StyledRefreshControl
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                />
            }
            keyExtractor={({ title }) => title}
            numColumns={2}
            columnWrapperStyle={styles.foodListColumn}
            contentContainerStyle={{
                paddingHorizontal: 0,
                opacity: isRefreshing ? 0.4 : 1,
            }}
            data={foodList}
            renderItem={({ item }) => <FoodCard {...item} />}
        />
    );
};

const FoodCard = ({ title, imageUrl }: FoodItem) => {
    const styles = useStyles();
    const { user } = useAuth();
    const router = useRouter();
    const [love, setLove] = useState(false);

    const loveMutation = useMutation({
        mutationFn: async () => {
            if (!user || !user?.email) {
                StyledToast.show({
                    type: "warning",
                    text1: "This action requires authentication",
                });
                router.push("/login");
                return;
            }
            setLove((prev) => !prev);
            const docRef = doc(FIREBASE_DB, "users", user.email);
            await updateDoc(docRef, {
                favouritedFoods: love ? arrayRemove(title) : arrayUnion(title),
            });
        },
        onError: () => {
            StyledToast.show({
                type: "error",
                text1: `Fail to love ${title}`,
                text2: "Please try again",
            });
        },
    });

    const navigateToInformation = () =>
        router.push({
            pathname: "/information/[foodId]",
            params: { foodId: title },
        });

    return (
        <View style={styles.card}>
            <StyledImage
                source={{
                    uri: imageUrl,
                }}
                style={styles.cardImage}
                onPress={navigateToInformation}
            />
            <StyledPressable
                onPress={() => loveMutation.mutate()}
                style={styles.cardLoveButton}
            >
                <HeartIcon active={love} />
            </StyledPressable>
            <View style={styles.cardFooter}>
                <StyledText type="Heading_5" color="white">
                    {title}
                </StyledText>
                <StyledPressable
                    style={styles.redirectButton}
                    onPress={navigateToInformation}
                >
                    <ChevronRightIcon />
                </StyledPressable>
            </View>
        </View>
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
            height: hp(40),
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
